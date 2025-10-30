# Game Architecture Flashcards

## Pluggable Architecture Pattern

#### IGameRules Interface Design
The IGameRules interface is the core of our pluggable architecture. It defines a contract that any game must implement, allowing the system to support multiple games without changing core infrastructure. This is an example of the Strategy Pattern.

```csharp
public interface IGameRules
{
    string Key { get; }  // "chess:standard"
    (bool, string?, object?) CreateInitialState(GameRoom room);
    (bool, string?) ValidateMove(GameRoom room, object state,
        string playerId, Dictionary<string, object> moveData);
    object ApplyMove(GameRoom room, object state, ...);
    // ... more methods
}
```

**Key insight:** State is `object` - each game defines its own state structure. This provides maximum flexibility while maintaining type safety within each implementation.

:p What design pattern does IGameRules implement and why is the state type `object`?
??x
IGameRules implements the **Strategy Pattern** - different algorithms (game rules) with a common interface.

**Why state is `object`:**
```csharp
// ChessRules internal state
private record ChessState(string Turn, string Position, ...);

// CheckersRules would have different state
private record CheckersState(Dictionary<int,string> Board, ...);

// Interface accepts any type
object ApplyMove(GameRoom room, object state, ...);
```

**Benefits:**
1. Each game defines its own state structure
2. No common state constraints
3. Type safety within each implementation
4. Maximum flexibility

**Pattern:**
Interface is polymorphic, implementations are type-specific
x??

---

#### Rules Registry Pattern
The RoomManager uses a dictionary to map rule keys to implementations. This is a Registry Pattern that allows runtime lookup of game rules without hardcoding.

```csharp
private readonly Dictionary<string, IGameRules> _rulesRegistry = new()
{
    { "chess:standard", new ChessRules() },
    { "checkers:standard", new CheckersRules() },
    { "chess:960", new Chess960Rules() }
};

// Runtime lookup
if (_rulesRegistry.TryGetValue(room.RulesKey, out var rules))
{
    var state = rules.CreateInitialState(room);
}
```

**Adding a new game:** Just add one line to the registry. No other code changes needed.

:p How does the Rules Registry pattern work and what are its benefits?
??x
The Rules Registry is a **dictionary-based lookup pattern** for game implementations.

**Structure:**
```csharp
Dictionary<string, IGameRules> _rulesRegistry = new()
{
    { "chess:standard", new ChessRules() },
    { "checkers:standard", new CheckersRules() }
};

// Lookup at runtime
var rules = _rulesRegistry[room.RulesKey];
```

**Benefits:**
1. **Extensibility**: Add games without modifying core logic
2. **Runtime selection**: Game chosen based on room configuration
3. **Decoupling**: Core system doesn't know specific games
4. **Variant support**: Same game, different rules (chess vs chess960)

**To add game:**
1. Implement IGameRules
2. Add one line to registry
3. Done!
x??

---

#### Server-Authoritative Architecture
In our system, the server is the single source of truth. Clients send move intentions, but the server validates and applies them. This prevents cheating and ensures consistency across all clients.

```
CLIENT SIDE (untrusted):
- Render UI
- Send move requests
- Update UI based on server response

SERVER SIDE (authoritative):
- Validate ALL moves
- Update game state
- Persist to database
- Broadcast validated state to all clients

SECURITY MODEL:
Never trust client input - always validate
```

**Why this matters:** A malicious client can modify their code, but can't modify server logic.

:p What is server-authoritative architecture and why is it important for multiplayer games?
??x
Server-authoritative means the **server is the single source of truth** for game state.

**Flow:**
```
1. Client: "I want to move e2 to e4"
2. Server: Validates using ChessRules.ValidateMove()
3. Server: If valid, applies using ChessRules.ApplyMove()
4. Server: Saves to database
5. Server: Broadcasts validated state to ALL clients
6. Clients: Update UI with server state (not their input)
```

**Benefits:**
1. **Prevents cheating**: Client can't fake moves
2. **Consistency**: All clients see same state
3. **Validation**: Server enforces rules
4. **Replay**: Database has authoritative history

**Alternative (client-authoritative):**
- Fast but unsafe
- Client computes, server syncs
- Vulnerable to cheating
x??

---

## State Management

#### JSONB for Flexible State Storage
We use PostgreSQL's JSONB type to store game state. This allows each game to have its own state structure without requiring database migrations when adding new games or modifying state.

```csharp
// GameRoom entity
public string StateJson { get; set; }  // JSONB in database

// ChessRules stores this as JSON
private record ChessState(
    string Turn,
    string Position,
    long WhiteTimeMs,
    long BlackTimeMs
);

// EF Core configuration
entity.Property(e => e.StateJson).HasColumnType("jsonb");
```

**JSONB benefits:**
- Fast queries on JSON fields
- Indexable
- Efficient storage (binary)
- Flexible schema

:p Why do we use JSONB for storing game state and what are the benefits?
??x
JSONB is PostgreSQL's **binary JSON storage type** - flexible and performant.

**Usage in our system:**
```csharp
// Database column
public string StateJson { get; set; }

// EF Core mapping
.HasColumnType("jsonb")

// Different states per game
ChessState: { turn, position, whiteTimeMs, ... }
CheckersState: { board, redPieces, blackPieces, ... }
```

**Benefits:**
1. **No schema migration** when adding games
2. **Each game has unique structure**
3. **Fast queries** - can query JSON fields
4. **Indexable** - can create indexes on JSON paths
5. **Efficient** - binary format (not text JSON)

**vs Relational:**
- Relational: Rigid, requires migrations
- JSONB: Flexible, just serialize/deserialize
x??

---

#### Sequence Numbers for Optimistic Concurrency
Each state change increments the room's sequence number. This enables optimistic concurrency control, helps clients detect missed events, and supports reconnection scenarios.

```csharp
public class GameRoom
{
    public int Sequence { get; set; } = 0;  // Increments on each change
}

// Every move increments
room.Sequence++;

// Events include sequence
new GameEventDto(room.RoomId, room.Sequence, "move", data);
```

**Client usage:**
```javascript
let lastSeenSequence = 0;

connection.on("event", (data) => {
    if (data.sequence !== lastSeenSequence + 1) {
        // Missed events! Request full state
        connection.invoke("GetFullState", roomId);
    }
    lastSeenSequence = data.sequence;
});
```

:p What is the purpose of the sequence number in GameRoom and how can clients use it?
??x
Sequence is a **monotonically increasing counter** for state changes.

**Server side:**
```csharp
public int Sequence { get; set; } = 0;

// Every state change
room.Sequence++;

// Include in events
new GameEventDto(roomId, sequence: room.Sequence, ...);
```

**Client side uses:**

**1. Detect missed events:**
```javascript
if (data.sequence !== lastSeen + 1) {
    // We missed something!
    requestFullState();
}
```

**2. Optimistic concurrency:**
```javascript
// Send with expected sequence
sendMove({ expectedSeq: 42, move: ... });
// Server rejects if sequence changed
```

**3. Reconnection:**
```javascript
// "Give me all events after sequence 42"
reconnect({ lastSeenSeq: 42 });
```

**Pattern:** Version number for distributed state
x??

---

#### Idempotency Pattern
Idempotency means the same request can be made multiple times without changing the result beyond the first application. We use idempotency keys to prevent duplicate moves on network retries.

```csharp
public class GameMove
{
    public string? IdempotencyKey { get; set; }
}

// In RoomManager.PlayMoveAsync()
if (!string.IsNullOrEmpty(idempotencyKey))
{
    var existingMove = room.Moves
        .FirstOrDefault(m => m.IdempotencyKey == idempotencyKey);

    if (existingMove != null)
    {
        // Already processed - return success without reprocessing
        return (true, null, currentEvent, currentState);
    }
}

// Database constraint ensures uniqueness
entity.HasIndex(e => new { e.GameRoomId, e.IdempotencyKey })
      .IsUnique()
      .HasFilter("\"IdempotencyKey\" IS NOT NULL");
```

:p What is idempotency and how is it implemented in the move system?
??x
Idempotency means **same request multiple times = same result** (beyond first).

**Implementation:**
```csharp
// Client generates unique key
const moveId = crypto.randomUUID();
connection.invoke("PlayMove", roomId, playerId, {
    idempotencyKey: moveId,
    move: { from: "e2", to: "e4" }
});

// Server checks before processing
if (existingMove with moveId exists) {
    return existing result; // Don't reprocess
}

// Database constraint
UNIQUE (GameRoomId, IdempotencyKey) WHERE IdempotencyKey IS NOT NULL
```

**Why needed:**
1. **Network retries**: Client doesn't know if first request succeeded
2. **Double-clicks**: User mashes button
3. **Reconnection**: Resending pending moves

**Without idempotency:**
- Same move applied twice
- Game state corrupted

**Math analogy:** `f(x)` is idempotent if `f(f(x)) = f(x)`
x??

---

## Database Design

#### Entity Relationships
Our database has three main tables with specific relationships. Understanding these relationships is crucial for querying and maintaining data integrity.

```
GameRoom (1) ----< (many) PlayerSeat
   |
   |
   +----------< (many) GameMove

Relationships:
- One room has many seats (players)
- One room has many moves (history)
- Cascading delete: deleting room deletes seats and moves
```

```csharp
// EF Core configuration
modelBuilder.Entity<GameRoom>(entity =>
{
    entity.HasMany(e => e.Seats)
          .WithOne(e => e.GameRoom)
          .HasForeignKey(e => e.GameRoomId)
          .OnDelete(DeleteBehavior.Cascade);

    entity.HasMany(e => e.Moves)
          .WithOne(e => e.GameRoom)
          .HasForeignKey(e => e.GameRoomId)
          .OnDelete(DeleteBehavior.Cascade);
});
```

:p What are the entity relationships in the game database and how are they configured in EF Core?
??x
**Three main entities with one-to-many relationships:**

```
GameRoom
├─► PlayerSeat (1-to-many)
└─► GameMove (1-to-many)
```

**EF Core configuration:**
```csharp
// One-to-many: Room → Seats
entity.HasMany(r => r.Seats)      // Room has many seats
      .WithOne(s => s.GameRoom)   // Seat has one room
      .HasForeignKey(s => s.GameRoomId)
      .OnDelete(DeleteBehavior.Cascade);  // Delete room → delete seats

// One-to-many: Room → Moves
entity.HasMany(r => r.Moves)
      .WithOne(m => m.GameRoom)
      .HasForeignKey(m => m.GameRoomId)
      .OnDelete(DeleteBehavior.Cascade);
```

**Cascade delete:**
When room is deleted, all seats and moves are automatically deleted.

**Navigation properties:**
```csharp
room.Seats      // Access all players
room.Moves      // Access move history
seat.GameRoom   // Access parent room
```
x??

---

#### Composite Indexes and Constraints
We use composite indexes for two purposes: enforcing business rules (uniqueness) and improving query performance.

```csharp
// PlayerSeat - prevent user from joining same room twice
entity.HasIndex(e => new { e.GameRoomId, e.UserId })
      .IsUnique();

// GameMove - fast move history queries
entity.HasIndex(e => new { e.GameRoomId, e.MoveNumber });

// GameMove - prevent duplicate idempotency keys
entity.HasIndex(e => new { e.GameRoomId, e.IdempotencyKey })
      .IsUnique()
      .HasFilter("\"IdempotencyKey\" IS NOT NULL");  // Partial index
```

**Partial index:** Only indexes non-NULL idempotency keys, saving space.

:p What composite indexes exist in the game database and what is their purpose?
??x
**Composite indexes combine multiple columns for constraints or performance:**

**1. PlayerSeat uniqueness:**
```csharp
HasIndex(e => new { e.GameRoomId, e.UserId }).IsUnique();
```
- **Purpose**: Prevent same user joining room twice
- **Business rule**: One seat per user per room

**2. GameMove ordering:**
```csharp
HasIndex(e => new { e.GameRoomId, e.MoveNumber });
```
- **Purpose**: Fast queries for move history
- **Query**: "Get all moves for room 123, ordered by number"

**3. Idempotency constraint:**
```csharp
HasIndex(e => new { e.GameRoomId, e.IdempotencyKey })
    .IsUnique()
    .HasFilter("\"IdempotencyKey\" IS NOT NULL");
```
- **Purpose**: Prevent duplicate moves
- **Partial index**: Only non-NULL keys (saves space)

**Composite index benefits:**
- Faster WHERE clauses on both columns
- Enforces multi-column uniqueness
x??

---

## Service Layer Patterns

#### Scoped Database Access in Singleton Service
RoomManager is a singleton (lives for app lifetime), but DbContext must be scoped (per-request). We use IServiceScopeFactory to create scopes and get DbContext instances.

```csharp
public class RoomManager
{
    private readonly IServiceScopeFactory _scopeFactory;

    public RoomManager(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    public async Task<GameRoom> CreateRoomAsync(CreateRoomRequest request)
    {
        using var scope = _scopeFactory.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TodoContext>();

        // Use context...
        await context.SaveChangesAsync();

    } // Scope disposed here, DbContext released
}
```

**Why:** Singleton + DbContext = memory leaks and concurrency issues.

:p Why do we use IServiceScopeFactory in RoomManager and what problem does it solve?
??x
**Problem:** RoomManager is singleton, DbContext must be scoped.

**Service lifetimes:**
```csharp
// Program.cs
builder.Services.AddSingleton<RoomManager>();      // Lives entire app
builder.Services.AddDbContext<TodoContext>();      // Scoped per request
```

**Solution - Manual scope creation:**
```csharp
public class RoomManager
{
    private readonly IServiceScopeFactory _scopeFactory;

    public async Task<GameRoom> GetRoom(string id)
    {
        // Create scope
        using var scope = _scopeFactory.CreateScope();

        // Get scoped DbContext
        var context = scope.ServiceProvider
            .GetRequiredService<TodoContext>();

        // Use it
        return await context.GameRooms.FindAsync(id);

    } // Scope disposed, DbContext released
}
```

**Why scoped DbContext:**
- Prevents concurrency issues
- Avoids memory leaks
- Proper connection management
x??

---

#### Tuple Return Pattern for Error Handling
We use tuples to return multiple values including success status and error messages. This is cleaner than exceptions for expected failure cases.

```csharp
// Method signature
public async Task<(bool success, string? error, GameRoom? room)>
    TryJoinAsync(JoinRoomRequest request)
{
    // Success case
    return (true, null, room);

    // Error cases
    return (false, "ROOM_NOT_FOUND", null);
    return (false, "ROOM_FULL", null);
}

// Usage with deconstruction
var (success, error, room) = await roomManager.TryJoinAsync(request);
if (!success)
{
    await Clients.Caller.SendAsync("error", new { code = error });
    return;
}
// Use room...
```

:p What is the tuple return pattern and when should it be used instead of exceptions?
??x
**Tuple pattern returns multiple values including success/failure info:**

```csharp
// Return signature
(bool success, string? error, TResult? data)

// Success
return (true, null, result);

// Failure
return (false, "ERROR_CODE", null);

// Usage - deconstruction
var (success, error, data) = await Method();
if (!success) {
    HandleError(error);
    return;
}
UseData(data);
```

**When to use:**

**Tuples (expected failures):**
- Room not found ✓
- Room full ✓
- Invalid move ✓
- Business logic validation ✓

**Exceptions (unexpected failures):**
- Database connection lost
- Null reference bugs
- System errors

**Benefits of tuples:**
1. No exception overhead
2. Forces error handling (can't ignore)
3. Clear method contract
4. Compiler helps with nullability
x??
