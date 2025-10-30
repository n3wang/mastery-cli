# SignalR Concepts Flashcards

## Real-Time Communication Fundamentals

#### What is SignalR?
SignalR is a library for ASP.NET that enables bidirectional, real-time communication between server and client. Unlike traditional HTTP (request-response), SignalR maintains a persistent connection where both server and client can send messages at any time. It uses WebSockets when available, with automatic fallback to Server-Sent Events or Long Polling.

**Key Difference from REST:**
- REST: Client asks → Server responds → Connection closes
- SignalR: Connection stays open → Both sides can send anytime

:p What is SignalR and how does it differ from traditional HTTP/REST communication?
??x
SignalR is a library for bidirectional, real-time communication using persistent connections.

**Key differences:**
- **HTTP/REST**: Request-response, stateless, client initiates
- **SignalR**: Persistent connection, stateful, both can initiate

**Transport:**
- Uses WebSockets (with fallbacks to SSE/Long Polling)
- Connection stays alive for duration of session

**Use case:**
- Perfect for real-time apps: chat, games, live updates
x??

---

#### SignalR Hub Pattern
A Hub is like a controller for real-time communication. It's a server-side class that inherits from `Hub` and defines methods that clients can invoke. The Hub has access to `Context` (current connection info) and `Clients` (to send messages).

```csharp
public class GameHub : Hub
{
    // Clients can call this method
    public async Task JoinRoom(string roomId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
        await Clients.Group(roomId).SendAsync("player_joined", ...);
    }
}
```

:p What is a SignalR Hub and what are its key components?
??x
A Hub is a server-side class for handling real-time client calls.

**Structure:**
```csharp
public class GameHub : Hub
{
    // Methods clients can invoke
    public async Task MethodName(params) { }
}
```

**Key components:**
- **Context.ConnectionId**: Unique ID for current connection
- **Clients**: Object to send messages to clients
- **Groups**: Organize connections into channels

**Pattern:**
Client invokes → Hub method runs → Hub broadcasts to clients
x??

---

#### SignalR Groups
Groups are like chat rooms or channels. They allow you to organize connections and broadcast messages to specific subsets of clients. When a player joins a game room, we add their connection to a group named after the room ID.

```csharp
// Add connection to group
await Groups.AddToGroupAsync(Context.ConnectionId, "room123");

// Send to everyone in group
await Clients.Group("room123").SendAsync("event", data);

// Remove from group
await Groups.RemoveFromGroupAsync(Context.ConnectionId, "room123");
```

**In our chess game:** Each game room = one SignalR group. When a player makes a move, we broadcast to everyone in that room's group.

:p What are SignalR Groups and how are they used in the chess game?
??x
Groups organize connections into channels for targeted broadcasting.

**Operations:**
```csharp
// Add to group
await Groups.AddToGroupAsync(connectionId, groupName);

// Send to group
await Clients.Group(groupName).SendAsync("event", data);

// Remove from group
await Groups.RemoveFromGroupAsync(connectionId, groupName);
```

**Chess game usage:**
- Each game room = one SignalR group
- Group name = room ID
- When player moves, broadcast to group
- All players in room receive update simultaneously
x??

---

#### Client Targeting in SignalR
The `Clients` property provides different ways to target who receives messages. This is crucial for sending the right information to the right people.

```csharp
// Only the calling client
await Clients.Caller.SendAsync("error", errorData);

// Everyone in a group
await Clients.Group("room123").SendAsync("event", data);

// Everyone except caller
await Clients.OthersInGroup("room123").SendAsync("event", data);

// Specific connection
await Clients.Client(connectionId).SendAsync("message", data);

// Everyone connected
await Clients.All.SendAsync("announcement", data);
```

:p What are the different ways to target clients in SignalR and when would you use each?
??x
SignalR provides multiple targeting options via the `Clients` property:

**Targeting options:**
1. **Clients.Caller** - Only the client who called the method
   - Use for: Errors, personal confirmations

2. **Clients.Group(groupId)** - All clients in a group
   - Use for: Game moves, room events

3. **Clients.OthersInGroup(groupId)** - Group except caller
   - Use for: "Player X joined" (don't tell X they joined)

4. **Clients.Client(connectionId)** - Specific connection
   - Use for: Direct messages, specific notifications

5. **Clients.All** - Every connected client
   - Use for: Server announcements, global events
x??

---

## Message Flow and Communication

#### Client-Server Message Flow
Understanding how messages flow in SignalR is crucial for debugging and designing real-time features. The flow is bidirectional with clear patterns.

```
CLIENT CALLS SERVER:
1. Client: connection.invoke("PlayMove", roomId, moveData)
2. Transport: WebSocket sends message
3. Server: GameHub.PlayMove() method executes
4. Logic: Validate, process, update database

SERVER BROADCASTS TO CLIENTS:
5. Server: Clients.Group(roomId).SendAsync("event", data)
6. Transport: WebSocket sends to all connections in group
7. Client: connection.on("event", handler) receives
8. UI: Update game board
```

:p Trace the complete message flow when a player makes a chess move in our system.
??x
**Complete message flow for a chess move:**

**Client → Server:**
1. Client calls: `connection.invoke("PlayMove", roomId, playerId, moveData)`
2. WebSocket sends message to server
3. Hub receives: `GameHub.PlayMove()` executes
4. Hub calls: `RoomManager.PlayMoveAsync()`
5. RoomManager:
   - Loads room from database
   - Finds game rules (ChessRules)
   - Validates: `rules.ValidateMove()`
   - Applies: `rules.ApplyMove()`
   - Saves to database

**Server → Clients:**
6. RoomManager returns event and state
7. Hub broadcasts:
   - `Clients.Group(roomId).SendAsync("event", moveEvent)`
   - `Clients.Group(roomId).SendAsync("match_state", newState)`
8. All clients in group receive both messages
9. Clients update UI with new game state
x??

---

#### MessagePack Protocol
MessagePack is a binary serialization format that's more efficient than JSON. We use it in SignalR for smaller message sizes and faster serialization, which is important for real-time games with frequent updates.

```csharp
// Configuration in Program.cs
builder.Services.AddSignalR()
    .AddMessagePackProtocol();  // Add binary protocol
```

**Benefits:**
- **Smaller messages**: Binary vs text (30-50% smaller)
- **Faster serialization**: Native binary format
- **Type safety**: Preserves data types better than JSON

**Trade-off:** Requires MessagePack library on client side

:p Why do we use MessagePack protocol in SignalR and what are the benefits?
??x
MessagePack is a binary serialization format used instead of JSON.

**Configuration:**
```csharp
builder.Services.AddSignalR()
    .AddMessagePackProtocol();
```

**Benefits over JSON:**
1. **30-50% smaller messages** - Binary vs text
2. **Faster serialization** - Native binary format
3. **Better type preservation** - Maintains data types
4. **Lower bandwidth** - Important for mobile/real-time

**Use case:**
Perfect for real-time games with frequent updates (chess moves, state changes)

**Trade-off:**
Both client and server must support MessagePack
x??

---

## Connection Lifecycle

#### Connection Events
SignalR connections have a lifecycle that you can hook into. Understanding these events is crucial for handling disconnections, reconnections, and cleanup.

```csharp
public class GameHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        // Called when client connects
        var userId = Context.User?.Identity?.Name;
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        // Called when client disconnects
        // Clean up: remove from groups, update status, etc.
        await base.OnDisconnectedAsync(exception);
    }
}
```

**Common cleanup tasks:**
- Remove player from active games
- Update player status to offline
- Notify other players of disconnection

:p What are the SignalR connection lifecycle events and how should they be used?
??x
SignalR provides lifecycle hooks to handle connection changes:

**Events:**
```csharp
public override async Task OnConnectedAsync()
{
    // Connection established
    // Initialize user data, load state, etc.
}

public override async Task OnDisconnectedAsync(Exception? exception)
{
    // Connection lost
    // Clean up resources, notify others
}
```

**Common use cases:**

**OnConnected:**
- Authenticate user
- Load user preferences
- Send initial state

**OnDisconnected:**
- Remove from game rooms
- Update online status
- Notify other players
- Save partial game state

**Error handling:**
Check `exception` parameter to distinguish graceful vs error disconnect
x??

---

## Configuration and Setup

#### SignalR Registration and Mapping
SignalR requires two steps: service registration (dependency injection) and endpoint mapping (routing). Understanding both is essential for setup.

```csharp
// Program.cs - Service registration
builder.Services.AddSignalR()
    .AddMessagePackProtocol();  // Optional protocol

// Program.cs - Endpoint mapping
app.MapHub<GameHub>("/game-hub");  // URL path
```

**What happens:**
1. `AddSignalR()` registers SignalR services in DI container
2. `.AddMessagePackProtocol()` adds binary serialization support
3. `MapHub<T>()` maps the hub to a URL endpoint

**Client connects to:** `ws://localhost:5000/game-hub`

:p What are the two required steps to configure SignalR in ASP.NET Core?
??x
SignalR configuration has two required steps:

**1. Service Registration (in builder):**
```csharp
builder.Services.AddSignalR()
    .AddMessagePackProtocol();  // Optional
```
- Registers SignalR services in DI
- Configures protocols and options

**2. Endpoint Mapping (in app):**
```csharp
app.MapHub<GameHub>("/game-hub");
```
- Maps hub class to URL path
- Enables WebSocket endpoint

**Result:**
- WebSocket available at: `ws://domain/game-hub`
- Clients connect to this endpoint
- Hub methods become callable

**Order matters:** Register services before building app
x??
