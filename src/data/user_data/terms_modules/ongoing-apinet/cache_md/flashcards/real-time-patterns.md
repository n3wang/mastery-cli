# Real-Time Communication Patterns Flashcards

## Event-Driven Architecture

#### Event Broadcasting Pattern
In event-driven systems, when something happens (a move, a join, etc.), we broadcast an event to all interested parties. This decouples the action from the reaction.

```csharp
// Action happens
var moveResult = await roomManager.PlayMoveAsync(...);

// Broadcast to interested parties (everyone in room)
await Clients.Group(roomId).SendAsync("event", new GameEventDto(
    roomId,
    sequence,
    "move",
    moveData
));

// Also broadcast updated state
await Clients.Group(roomId).SendAsync("match_state", newState);

// Clients react independently
connection.on("event", (evt) => {
    if (evt.eventType === "move") {
        animateMove(evt.payload);
    }
});
```

**Key principle:** Publishers don't know about subscribers. They just broadcast.

:p What is the event broadcasting pattern and how is it used in the game system?
??x
**Event broadcasting sends notifications to all interested parties without coupling:**

```csharp
// SERVER: Publish event
await Clients.Group(roomId).SendAsync("event", new {
    roomId,
    sequence,
    eventType: "move",
    payload: moveData
});

// CLIENTS: Subscribe to events
connection.on("event", (evt) => {
    switch (evt.eventType) {
        case "move": handleMove(evt.payload); break;
        case "player_joined": handleJoin(evt.payload); break;
        case "game_over": handleGameOver(evt.payload); break;
    }
});
```

**Decoupling benefits:**
1. Server doesn't know what clients do with events
2. Clients can ignore events they don't care about
3. Easy to add new event types
4. Multiple clients react independently

**Pattern:**
- Publisher: Sends to group
- Subscribers: Listen for event type
- Topic: Room ID (via SignalR groups)

**Similar to:** Observer pattern, pub/sub messaging
x??

---

#### Dual Event + State Pattern
We send both a specific event (what happened) and the full state (current situation). This handles network issues and different client implementations.

```csharp
// After a move is processed
await Clients.Group(roomId).SendAsync("event", new GameEventDto(
    roomId, sequence, "move", moveData
));

await Clients.Group(roomId).SendAsync("match_state", new MatchStateDto(
    roomId, sequence, fullState, status
));
```

**Why both?**
- Event: Efficient for animations, logs, immediate feedback
- State: Definitive source of truth, handles missed events

**Client strategies:**
```javascript
// Optimistic client - use events
connection.on("event", evt => animateMove(evt));

// Conservative client - use state
connection.on("match_state", state => renderBoard(state));

// Hybrid - event for UX, state for validation
connection.on("event", evt => animateMove(evt));
connection.on("match_state", state => {
    if (!boardMatchesState(state)) {
        renderBoard(state);  // Sync to truth
    }
});
```

:p Why do we send both event and match_state messages, and how should clients use them?
??x
**Dual messaging sends specific event + full state:**

```csharp
// 1. Event - What happened
await Clients.Group(roomId).SendAsync("event", new {
    type: "move",
    payload: { from: "e2", to: "e4" }
});

// 2. State - Current situation
await Clients.Group(roomId).SendAsync("match_state", new {
    turn: "black",
    position: "...",
    whiteTimeMs: 602000,
    // ... complete state
});
```

**Why both:**

**Event advantages:**
- Small payload
- Semantic meaning
- Good for animations
- Efficient

**State advantages:**
- Complete truth
- Handles missed events
- Client doesn't need to maintain state
- Self-correcting

**Client strategies:**

**Optimistic:**
```javascript
on("event") → animate immediately
```

**Conservative:**
```javascript
on("match_state") → render full board
```

**Hybrid (best):**
```javascript
on("event") → animate
on("match_state") → validate + correct if needed
```
x??

---

## Reconnection and Resilience

#### Connection State Management
Real-time connections can drop. Good clients track connection state and handle reconnection gracefully.

```javascript
// Client-side connection management
class GameConnection {
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("/game-hub")
            .withAutomaticReconnect([0, 2000, 5000, 10000])  // Retry delays
            .build();

        this.setupHandlers();
    }

    setupHandlers() {
        // Connection state changes
        this.connection.onreconnecting((error) => {
            console.log("Connection lost, reconnecting...");
            this.showReconnectingUI();
        });

        this.connection.onreconnected((connectionId) => {
            console.log("Reconnected!");
            this.hideReconnectingUI();
            this.resyncState();  // Request latest state
        });

        this.connection.onclose((error) => {
            console.log("Connection closed");
            this.showDisconnectedUI();
        });
    }

    async resyncState() {
        // After reconnect, get current state
        const state = await this.connection.invoke("GetCurrentState", this.roomId);
        this.renderState(state);
    }
}
```

:p How should clients handle connection state changes in SignalR?
??x
**Connection state management handles network issues:**

```javascript
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/game-hub")
    .withAutomaticReconnect([0, 2000, 5000, 10000])
    .build();

// Track state changes
connection.onreconnecting((error) => {
    // Lost connection, trying to reconnect
    console.log("Reconnecting...");
    showUI("Reconnecting...");
    disableControls();
});

connection.onreconnected((connectionId) => {
    // Reconnected successfully
    console.log("Reconnected!");
    showUI("Connected");
    resyncState();  // Get latest state
    enableControls();
});

connection.onclose((error) => {
    // Connection permanently closed
    console.log("Disconnected");
    showUI("Disconnected - Refresh page");
});
```

**Reconnection strategy:**
1. Lost connection → disable UI
2. Auto-retry with backoff: 0ms, 2s, 5s, 10s
3. On reconnect → request full state (may have missed events)
4. Update UI with latest state
5. Re-enable controls

**withAutomaticReconnect delays:**
- 1st retry: Immediate
- 2nd retry: 2 seconds later
- 3rd retry: 5 seconds later
- 4th+ retry: 10 seconds later
x??

---

#### State Resynchronization
After reconnecting, the client may have missed events. The solution is to request the full current state.

```csharp
// Server-side hub method for resync
public async Task<MatchStateDto> GetCurrentState(string roomId)
{
    var room = await _roomManager.GetRoomAsync(roomId);
    if (room == null)
        throw new Exception("Room not found");

    var state = JsonSerializer.Deserialize<object>(room.StateJson);
    var rules = _rulesRegistry[room.RulesKey];

    return new MatchStateDto(
        room.RoomId,
        room.Sequence,
        rules.Render(state),
        room.Status
    );
}

// Client-side resync
async resyncState() {
    try {
        const state = await connection.invoke("GetCurrentState", roomId);
        renderCompleteState(state);
        lastSeenSequence = state.sequence;
    } catch (error) {
        console.error("Failed to resync:", error);
    }
}
```

:p How does state resynchronization work after a client reconnects?
??x
**Resynchronization fetches current state after reconnection:**

**Server provides resync method:**
```csharp
public async Task<MatchStateDto> GetCurrentState(string roomId)
{
    var room = await GetRoom(roomId);
    var state = DeserializeState(room.StateJson);

    return new MatchStateDto(
        roomId,
        room.Sequence,
        state,
        room.Status
    );
}
```

**Client requests on reconnect:**
```javascript
connection.onreconnected(async () => {
    // Get current state
    const state = await connection.invoke(
        "GetCurrentState",
        roomId
    );

    // Update UI with server truth
    renderCompleteState(state);

    // Update sequence number
    lastSeenSequence = state.sequence;
});
```

**Why needed:**
- Missed events during disconnect
- Sequence gaps
- Server state may have changed
- Client state might be stale

**Alternative:** Request delta (events since sequence N)
```csharp
GetEventsSince(roomId, lastSeenSequence)
```
x??

---

## Performance Patterns

#### Group-Based Routing
SignalR groups provide efficient message routing. Instead of sending to each connection individually, we send once to a group.

```csharp
// INEFFICIENT - individual sends
foreach (var seat in room.Seats)
{
    await Clients.Client(seat.ConnectionId)
        .SendAsync("event", data);  // N database queries, N sends
}

// EFFICIENT - group send
await Clients.Group(room.RoomId)
    .SendAsync("event", data);  // 1 send to group
```

**How it works:**
1. When client joins room, add to group: `Groups.AddToGroupAsync()`
2. SignalR maintains group membership in memory
3. Broadcast to group sends to all members efficiently
4. When client disconnects, SignalR auto-removes from groups

**Performance difference:** O(1) vs O(n) where n = number of players

:p Why are SignalR groups more efficient than individual client sends?
??x
**Groups enable efficient one-to-many broadcasting:**

**Inefficient (individual sends):**
```csharp
// O(n) operations
foreach (var player in room.Players) {
    await Clients.Client(player.ConnectionId)
        .SendAsync("event", data);
}
```
- N separate send operations
- N network round-trips
- Scales linearly with players

**Efficient (group send):**
```csharp
// O(1) operation
await Clients.Group(room.RoomId)
    .SendAsync("event", data);
```
- 1 send operation
- SignalR handles distribution
- Constant time regardless of group size

**How groups work:**
```csharp
// Setup - add to group
await Groups.AddToGroupAsync(connectionId, groupName);

// SignalR maintains in memory:
// groups["room123"] = [conn1, conn2, conn3, ...]

// Broadcast - SignalR iterates internally
await Clients.Group("room123").SendAsync(...);
// SignalR loops through connections efficiently
```

**Performance:**
- 100 players: Individual = 100 ops, Group = 1 op
- Auto-cleanup on disconnect
x??

---

#### Lazy Database Loading
We don't load related data unless needed. EF Core provides `.Include()` for eager loading when we know we'll need it.

```csharp
// INEFFICIENT - N+1 queries
var room = await context.GameRooms.FindAsync(id);
foreach (var seat in room.Seats)  // Separate query for each seat!
{
    Console.WriteLine(seat.DisplayName);
}

// EFFICIENT - single query with JOIN
var room = await context.GameRooms
    .Include(r => r.Seats)      // JOIN in SQL
    .Include(r => r.Moves)      // JOIN in SQL
    .FirstOrDefaultAsync(r => r.RoomId == id);

foreach (var seat in room.Seats)  // Already loaded
{
    Console.WriteLine(seat.DisplayName);
}
```

**SQL generated:**
```sql
-- Inefficient (N+1)
SELECT * FROM GameRooms WHERE RoomId = 'abc';
SELECT * FROM PlayerSeats WHERE GameRoomId = 1;  -- Separate query!
SELECT * FROM PlayerSeats WHERE GameRoomId = 2;  -- For each room!

-- Efficient (JOIN)
SELECT r.*, s.*
FROM GameRooms r
LEFT JOIN PlayerSeats s ON r.Id = s.GameRoomId
WHERE r.RoomId = 'abc';
```

:p What is the N+1 query problem and how does Include() solve it?
??x
**N+1 problem: 1 query for parent + N queries for children**

**Problem code:**
```csharp
// 1 query for rooms
var rooms = await context.GameRooms.ToListAsync();

// N queries (one per room!)
foreach (var room in rooms) {
    foreach (var seat in room.Seats) {  // Lazy load
        Console.WriteLine(seat.DisplayName);
    }
}
```

**SQL generated:**
```sql
-- 1 query
SELECT * FROM GameRooms;

-- Then N queries
SELECT * FROM PlayerSeats WHERE GameRoomId = 1;
SELECT * FROM PlayerSeats WHERE GameRoomId = 2;
-- ... one per room
```

**Solution - Include():**
```csharp
var rooms = await context.GameRooms
    .Include(r => r.Seats)  // JOIN
    .ToListAsync();

foreach (var room in rooms) {
    foreach (var seat in room.Seats) {  // Already loaded
        Console.WriteLine(seat.DisplayName);
    }
}
```

**SQL generated:**
```sql
SELECT r.*, s.*
FROM GameRooms r
LEFT JOIN PlayerSeats s ON r.Id = s.GameRoomId;
```

**Result:** 1 query vs N+1 queries
x??

---

## Error Handling Patterns

#### Try-Catch in Hub Methods
Hub methods should always catch exceptions to prevent connection termination. Unhandled exceptions close the SignalR connection.

```csharp
public async Task PlayMove(string roomId, string playerId, MoveEnvelope move)
{
    try
    {
        var (success, error, evt, state) = await _roomManager.PlayMoveAsync(...);

        if (!success)
        {
            // Expected failure - send error event
            await Clients.Caller.SendAsync("error", new { code = error });
            return;
        }

        // Success - broadcast
        await Clients.Group(roomId).SendAsync("event", evt);
        await Clients.Group(roomId).SendAsync("match_state", state);
    }
    catch (Exception ex)
    {
        // Unexpected failure - log and send generic error
        _logger.LogError(ex, "Error playing move");
        await Clients.Caller.SendAsync("error", new {
            code = "INTERNAL_ERROR",
            message = ex.Message
        });
    }
}
```

**Without try-catch:** Exception → connection closes → client disconnected

:p Why must SignalR hub methods always use try-catch and how should errors be handled?
??x
**Unhandled exceptions in hub methods terminate the connection:**

**Problem (no try-catch):**
```csharp
public async Task PlayMove(...) {
    var result = await DoSomething();  // Throws exception
    // Connection terminates!
}
```

**Solution (try-catch):**
```csharp
public async Task PlayMove(...) {
    try {
        var (success, error, data) = await DoSomething();

        if (!success) {
            // Expected error
            await Clients.Caller.SendAsync("error",
                new { code = error });
            return;
        }

        // Success
        await Clients.Group(roomId).SendAsync("event", data);
    }
    catch (Exception ex) {
        // Unexpected error
        _logger.LogError(ex, "Unexpected error");
        await Clients.Caller.SendAsync("error", new {
            code = "INTERNAL_ERROR",
            message = "An error occurred"
        });
        // Connection stays alive
    }
}
```

**Error types:**
1. **Expected errors** (validation): Return error code
2. **Unexpected errors** (bugs): Log + send generic error

**Result:** Connection survives, client can retry
x??
