# SignalR Basics

## What is SignalR?

SignalR is a library for ASP.NET that enables **real-time, bidirectional communication** between server and client using WebSockets (with automatic fallback to other protocols if WebSockets aren't available).

## Why Use SignalR for Games?

Traditional HTTP is **request-response**: the client asks, the server answers. This doesn't work well for real-time games where:
- Multiple players need instant updates when someone makes a move
- The server needs to push notifications to all players
- Low latency is critical

SignalR solves this with **persistent connections** where both sides can send messages anytime.

## Core Concepts

### 1. Hub (Server-Side)
A Hub is like a controller, but for real-time communication. It defines methods that clients can call.

```csharp
public class GameHub : Hub
{
    // Clients can call this method
    public async Task JoinRoom(JoinRoomRequest request)
    {
        // Add to group
        await Groups.AddToGroupAsync(Context.ConnectionId, request.RoomId);

        // Notify all clients in the group
        await Clients.Group(request.RoomId).SendAsync("event", eventData);
    }
}
```

**Key Points:**
- Inherits from `Hub`
- Methods are `async Task`
- `Context.ConnectionId` identifies the current connection
- Can send messages to specific clients or groups

### 2. Groups
Groups are like chat rooms - a way to organize connections.

```csharp
// Add connection to a group
await Groups.AddToGroupAsync(Context.ConnectionId, "room123");

// Send to everyone in the group
await Clients.Group("room123").SendAsync("event", data);
```

In our game system:
- Each game room = one SignalR group
- When a player makes a move, we broadcast it to everyone in that room's group

### 3. Clients Object
The `Clients` property lets you target who receives messages:

```csharp
// Send to the calling client only
await Clients.Caller.SendAsync("error", errorData);

// Send to everyone in a group
await Clients.Group("room123").SendAsync("event", data);

// Send to everyone except the caller
await Clients.OthersInGroup("room123").SendAsync("event", data);

// Send to specific connection
await Clients.Client(connectionId).SendAsync("message", data);
```

### 4. Client (JavaScript Example)

On the client side, you connect and listen for events:

```javascript
// Connect to the hub
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/game-hub")
    .build();

// Listen for events from server
connection.on("event", (data) => {
    console.log("Event received:", data);
});

connection.on("match_state", (state) => {
    console.log("Game state updated:", state);
});

// Start connection
await connection.start();

// Call server methods
await connection.invoke("JoinRoom", {
    roomId: "abc123",
    userId: "player1",
    displayName: "Alice"
});

await connection.invoke("PlayMove", "room123", "player1", {
    idempotencyKey: "unique-id",
    move: { from: "e2", to: "e4" }
});
```

## Message Flow Example

Let's trace what happens when Player 1 makes a chess move:

1. **Client → Server**: Player 1's browser calls `connection.invoke("PlayMove", ...)`
2. **Server Processes**: `GameHub.PlayMove()` method runs
   - Validates the move
   - Updates database
   - Updates game state
3. **Server → All Clients**: Server broadcasts to the room group:
   ```csharp
   await Clients.Group(roomId).SendAsync("event", moveEvent);
   await Clients.Group(roomId).SendAsync("match_state", newState);
   ```
4. **Clients Update**: Both players' browsers receive the events and update their UI

## Configuration in Program.cs

```csharp
// Register SignalR services
builder.Services.AddSignalR()
    .AddMessagePackProtocol();  // Binary protocol for efficiency

// Map the hub to an endpoint
app.MapHub<GameHub>("/game-hub");
```

The hub is now available at `ws://localhost:5000/game-hub` (or `wss://` for secure).

## MessagePack Protocol

By default, SignalR uses JSON. We added **MessagePack** for:
- **Smaller messages** (binary vs text)
- **Faster serialization**
- Better for games with frequent updates

## Connection Lifecycle

```csharp
// Override these methods to handle connection events
public override async Task OnConnectedAsync()
{
    // Called when client connects
    await base.OnConnectedAsync();
}

public override async Task OnDisconnectedAsync(Exception? exception)
{
    // Called when client disconnects
    // Clean up resources, remove from groups, etc.
    await base.OnDisconnectedAsync(exception);
}
```

## Error Handling

Always wrap hub methods in try-catch:

```csharp
public async Task PlayMove(string roomId, string playerId, MoveEnvelope move)
{
    try
    {
        // Process move
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error playing move");
        await Clients.Caller.SendAsync("error", new {
            code = "INTERNAL_ERROR",
            message = ex.Message
        });
    }
}
```

## Testing SignalR

You can test SignalR with:
1. **Browser Console** (using JavaScript)
2. **Postman** (has WebSocket support)
3. **SignalR .NET Client** (for automated tests)

## Key Differences from REST

| REST API | SignalR |
|----------|---------|
| Request-Response | Bidirectional |
| Stateless | Stateful (persistent connection) |
| Client initiates | Both can initiate |
| HTTP(S) | WebSocket (WS/WSS) |
| Good for CRUD | Good for real-time |

## Common Patterns in Our Game System

1. **Join Room**: Client joins → Added to group → Notify others
2. **Game Action**: Client sends move → Validate → Update DB → Broadcast to group
3. **Game Events**: Server detects condition (timeout, win) → Broadcast to group
4. **Error Handling**: Validation fails → Send error to caller only

## Resources

- [Official SignalR Documentation](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction)
- [JavaScript Client API](https://learn.microsoft.com/en-us/aspnet/core/signalr/javascript-client)
- [MessagePack Protocol](https://learn.microsoft.com/en-us/aspnet/core/signalr/messagepackhubprotocol)
