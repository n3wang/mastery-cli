# Board Game Platform Architecture

## Overview

This project implements a **pluggable board game platform** where you can add different games (Chess, Checkers, Catan, etc.) without changing the core infrastructure.

## Architecture Diagram

```
┌─────────────┐
│   Client    │ (Browser, Mobile App, etc.)
│ (WebSocket) │
└──────┬──────┘
       │
       │ SignalR (Real-time)
       │
┌──────▼──────────┐
│    GameHub      │ (SignalR Hub)
└──────┬──────────┘
       │
       │ Calls
       │
┌──────▼──────────┐
│  RoomManager    │ (Game Logic Service)
└──────┬──────────┘
       │
       ├─────────────┐
       │             │
┌──────▼──────┐  ┌──▼─────────┐
│ IGameRules  │  │  Database  │
│ (Chess)     │  │ (Postgres) │
└─────────────┘  └────────────┘
```

## Key Components

### 1. Database Layer (Models)

#### GameRoom
Represents a game room/lobby where players join.

```csharp
public class GameRoom
{
    public int Id { get; set; }
    public string RoomId { get; set; }  // Public identifier
    public string Name { get; set; }
    public GameType GameType { get; set; }
    public int MaxPlayers { get; set; }
    public string OptionsJson { get; set; }  // Flexible game options
    public string Status { get; set; }        // lobby, active, finished
    public string? StateJson { get; set; }    // Current game state
    public int Sequence { get; set; }         // Event sequence number

    public List<PlayerSeat> Seats { get; set; }
    public List<GameMove> Moves { get; set; }
}
```

**Key Design Decisions:**
- `RoomId` is a GUID for public use (URLs, client references)
- `Id` is the database primary key
- `OptionsJson` and `StateJson` use **JSONB** in PostgreSQL for flexibility
- Each game type can define its own options and state structure

#### PlayerSeat
Represents a player in a room.

```csharp
public class PlayerSeat
{
    public int Id { get; set; }
    public int GameRoomId { get; set; }
    public string UserId { get; set; }
    public string DisplayName { get; set; }
    public int SeatIndex { get; set; }
    public string TagsJson { get; set; }  // e.g., {"color":"white"}
}
```

#### GameMove
Records move history for replay and auditing.

```csharp
public class GameMove
{
    public int Id { get; set; }
    public int GameRoomId { get; set; }
    public string UserId { get; set; }
    public int MoveNumber { get; set; }
    public string MoveJson { get; set; }
    public string? IdempotencyKey { get; set; }
}
```

**Idempotency**: Prevents duplicate moves if a client retries a request.

### 2. Domain Layer (Rules & DTOs)

#### IGameRules Interface
The core abstraction that makes the system pluggable.

```csharp
public interface IGameRules
{
    string Key { get; }  // e.g., "chess:standard"

    // Initialize game state
    (bool ok, string? error, object? initialState) CreateInitialState(GameRoom room);

    // Validate a move
    (bool ok, string? error) ValidateMove(GameRoom room, object state,
        string playerId, Dictionary<string, object> moveData);

    // Apply validated move
    object ApplyMove(GameRoom room, object state, string playerId,
        Dictionary<string, object> moveData, long serverMs);

    // Handle commands (resign, draw, etc.)
    (bool handled, string? error, object? resultingState, GameEventDto? sideEvent)
        HandleCommand(GameRoom room, object state, string playerId,
        CommandEnvelope command, long serverMs);

    // Render state for clients
    object Render(object state);
}
```

**Why this design?**
- Each game implements its own rules
- State is `object` - games define their own state structure
- Move data is `Dictionary<string, object>` - flexible per game
- Server-authoritative: validation happens here

#### ChessRules Implementation

```csharp
public class ChessRules : IGameRules
{
    public string Key => "chess:standard";

    private record ChessState(
        string Turn,
        string Position,
        long WhiteTimeMs,
        long BlackTimeMs,
        int MoveCount,
        string? Winner,
        string? GameOverReason
    );

    // Implements all interface methods...
}
```

### 3. Service Layer

#### RoomManager
Coordinates game logic with database persistence.

**Key Methods:**
- `CreateRoomAsync()` - Creates a new room
- `TryJoinAsync()` - Adds player to room
- `StartGameAsync()` - Initializes game state using rules
- `PlayMoveAsync()` - Validates and applies moves
- `SendCommandAsync()` - Handles game commands

**Rules Registry:**
```csharp
private readonly Dictionary<string, IGameRules> _rulesRegistry = new()
{
    { "chess:standard", new ChessRules() },
    // Add more games here
};
```

### 4. Communication Layer

#### GameHub (SignalR)
WebSocket hub for real-time communication.

**Client Methods:**
```csharp
public async Task JoinRoom(JoinRoomRequest request)
public async Task StartGame(string roomId)
public async Task PlayMove(string roomId, string playerId, MoveEnvelope move)
public async Task SendCommand(string roomId, string playerId, CommandEnvelope command)
```

**Server Events (sent to clients):**
- `event` - Game events (player_joined, move, game_over, etc.)
- `match_state` - Complete game state updates
- `error` - Error notifications

#### GameController (REST API)
HTTP endpoints for non-real-time operations.

```csharp
POST /api/game/rooms          // Create room
GET  /api/game/rooms          // List rooms
GET  /api/game/rooms/{roomId} // Get room details
GET  /api/game/health         // Health check
```

## Data Flow Examples

### Creating and Starting a Chess Game

```
1. Client HTTP POST /api/game/rooms
   Body: {
     "gameType": 0,
     "name": "Chess Game",
     "maxPlayers": 2,
     "options": { "baseMin": 10, "incSec": 5 }
   }

2. Server creates GameRoom in database
   Returns: { "roomId": "abc123", ... }

3. Client 1 connects WebSocket to /game-hub
   Calls: JoinRoom({ roomId: "abc123", userId: "player1", ... })

4. Client 2 connects and joins
   Calls: JoinRoom({ roomId: "abc123", userId: "player2", ... })

5. Client 1 starts game
   Calls: StartGame("abc123")

6. Server:
   - Calls ChessRules.CreateInitialState()
   - Saves initial state to database
   - Broadcasts "game_started" event to both players
   - Broadcasts initial "match_state" to both players

7. Client 1 makes move
   Calls: PlayMove("abc123", "player1", {
     idempotencyKey: "uuid",
     move: { from: "e2", to: "e4" }
   })

8. Server:
   - Calls ChessRules.ValidateMove()
   - Calls ChessRules.ApplyMove()
   - Saves move to database
   - Updates room state
   - Broadcasts "move" event to both players
   - Broadcasts updated "match_state"
```

## State Management

### Server-Authoritative Design
The server is the **single source of truth**:
- Clients send move intentions
- Server validates using game rules
- Server updates state
- Server broadcasts result

This prevents cheating and ensures consistency.

### State Storage
Game state is stored in two ways:

1. **Current State** (`GameRoom.StateJson`)
   - Latest game position
   - Serialized game-specific state object

2. **Move History** (`GameMove` table)
   - Complete record of all moves
   - Enables replay and auditing
   - Supports idempotency

### Sequence Numbers
Each state change increments `GameRoom.Sequence`:
- Enables optimistic concurrency control
- Helps clients detect missed events
- Useful for reconnection logic

## Extensibility

### Adding a New Game

1. **Define State Structure**
   ```csharp
   private record CheckersState(
       string Turn,
       Dictionary<string, string> Board,
       int RedPieces,
       int BlackPieces
   );
   ```

2. **Implement IGameRules**
   ```csharp
   public class CheckersRules : IGameRules
   {
       public string Key => "checkers:standard";
       // Implement all methods...
   }
   ```

3. **Register in RoomManager**
   ```csharp
   _rulesRegistry = new Dictionary<string, IGameRules>
   {
       { "chess:standard", new ChessRules() },
       { "checkers:standard", new CheckersRules() }
   };
   ```

4. **Update GameType Enum**
   ```csharp
   public enum GameType
   {
       Chess = 0,
       Checkers = 1,
       Catan = 2
   }
   ```

That's it! No changes to database schema, SignalR hub, or core logic needed.

## Database Schema

### Tables
- `GameRooms` - Game room metadata
- `PlayerSeats` - Players in rooms
- `GameMoves` - Move history
- `TodoItems` - (Original todo app)

### Key Indexes
- `GameRooms.RoomId` - Unique index for fast lookups
- `PlayerSeats.(GameRoomId, UserId)` - Prevents duplicate joins
- `GameMoves.(GameRoomId, IdempotencyKey)` - Prevents duplicate moves
- `GameMoves.(GameRoomId, MoveNumber)` - Fast move history queries

### JSONB Benefits
PostgreSQL's JSONB type allows:
- Flexible schema per game type
- Fast queries on JSON fields
- Indexing JSON properties if needed
- No migrations when game state changes

## Security Considerations

### Current Implementation
This is a **minimal working demo** with basic security:
- No authentication (just user IDs)
- No authorization checks
- No rate limiting
- No input sanitization beyond validation

### Production Additions Needed
1. **Authentication**: Integrate ASP.NET Core Identity or JWT
2. **Authorization**: Verify player is in room before allowing moves
3. **Rate Limiting**: Prevent spam/DoS
4. **Input Validation**: Strict validation of all inputs
5. **Connection Limits**: Limit connections per user/IP
6. **Game State Validation**: Deeper validation in rules implementations

## Performance Considerations

### Current Design
- SignalR with MessagePack for efficiency
- Database connection pooling via EF Core
- In-memory rules registry (no per-request allocation)
- JSONB for flexible but fast state storage

### Scaling Options
1. **Redis Backplane** for multi-server SignalR
2. **Separate Read/Write** databases
3. **Caching** frequently accessed rooms
4. **Move Validation Workers** for CPU-intensive games

## Testing Strategy

### Unit Tests
- Test each `IGameRules` implementation independently
- Mock database for `RoomManager` tests

### Integration Tests
- Test full flow: create room → join → play moves
- Use in-memory database

### SignalR Tests
- Use `HubConnection` client for automated tests
- Test real-time message delivery

## Resources

- [Entity Framework Core](../entity-framework-basics.md)
- [SignalR Basics](../signalr-basics.md)
- [Dependency Injection](../dependency-injection.md) (to be created)
