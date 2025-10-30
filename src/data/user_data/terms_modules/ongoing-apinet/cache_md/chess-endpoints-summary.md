# Chess Endpoints Implementation Summary

## Overview
The chess game uses a hybrid approach: **REST API** for room management and **WebSocket (SignalR)** for real-time gameplay.

## Implementation Steps

### 1. **Start Application**
```bash
dotnet run
# Access API: http://localhost:5292 (note: port 5292, not 5000)
```

### 2. **Create Chess Room (REST)**
```http
POST /api/game/rooms
{
  "gameType": 0,          // 0 = Chess
  "name": "Chess Game",
  "maxPlayers": 2,
  "options": {
    "baseMin": 600000,    // 10 minutes in ms
    "incSec": 3000        // 3 seconds increment
  }
}
```
**Returns:** `roomId` (e.g., "a1b2c3d4e5f6")

### 3. **Connect to WebSocket Hub**
```javascript
const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5292/game-hub")
    .build();

// Listen for events
connection.on("event", handleGameEvents);
connection.on("match_state", updateGameState);
connection.on("error", handleErrors);

await connection.start();
```

### 4. **Join Room (WebSocket)**
```javascript
await connection.invoke("JoinRoom", {
    roomId: "a1b2c3d4e5f6",
    userId: "player1",
    displayName: "Alice"
});
```

### 5. **Start Game (WebSocket)**
```javascript
await connection.invoke("StartGame", "a1b2c3d4e5f6");
```

### 6. **Make Moves (WebSocket)**
```javascript
await connection.invoke("PlayMove", "roomId", "userId", {
    idempotencyKey: crypto.randomUUID(),
    move: {
        from: "e2",
        to: "e4",
        promotion: "q"  // Optional: for pawn promotion
    }
});
```

### 7. **Game Commands (WebSocket)**
```javascript
// Resign
await connection.invoke("SendCommand", "roomId", "userId", {
    type: "resign",
    payload: null
});

// Offer Draw
await connection.invoke("SendCommand", "roomId", "userId", {
    type: "offer_draw",
    payload: null
});

// Accept Draw
await connection.invoke("SendCommand", "roomId", "userId", {
    type: "accept_draw",
    payload: null
});
```

## Key REST Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/game/rooms` | List all rooms |
| `POST` | `/api/game/rooms` | Create new room |
| `GET` | `/api/game/rooms/{roomId}` | Get room details |
| `GET` | `/api/game/health` | Health check |

## Key WebSocket Methods

| Method | Purpose | Parameters |
|--------|---------|------------|
| `JoinRoom` | Join game room | `{roomId, userId, displayName}` |
| `StartGame` | Start the game | `roomId` |
| `PlayMove` | Make a move | `roomId, userId, {idempotencyKey, move}` |
| `SendCommand` | Send game command | `roomId, userId, {type, payload}` |

## Event Types Received

| Event | Triggered When |
|-------|----------------|
| `player_joined` | Player joins room |
| `game_started` | Game begins |
| `move` | Move is made |
| `game_over` | Game ends |
| `draw_offered` | Draw is offered |
| `match_state` | Game state updates |
| `error` | Error occurs |

## Quick Test Sequence

1. **Create room** (REST API via Swagger at `http://localhost:5292`)
2. **Copy roomId** from response
3. **Connect WebSocket** (browser console or client)
4. **Join room** with 2 players
5. **Start game**
6. **Make moves** using chess notation (e.g., "e2" to "e4")

## Notes

- **Port:** Application runs on `5292`, not `5000` as shown in docs
- **Move Format:** Standard chess notation (a1-h8)
- **Idempotency:** Use `crypto.randomUUID()` to prevent duplicate moves
- **Time Control:** Specified in milliseconds
- **Game State:** Uses FEN-like position notation
- **Error Handling:** All errors sent via `error` event

## Minimal Client Example

```javascript
// 1. Connect
const conn = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5292/game-hub").build();
await conn.start();

// 2. Listen
conn.on("event", console.log);
conn.on("match_state", console.log);

// 3. Join & Play
await conn.invoke("JoinRoom", {roomId: "...", userId: "alice", displayName: "Alice"});
await conn.invoke("StartGame", "roomId");
await conn.invoke("PlayMove", "roomId", "alice", {
    idempotencyKey: crypto.randomUUID(),
    move: {from: "e2", to: "e4"}
});
```

This hybrid approach allows for efficient room management via REST while providing real-time gameplay through WebSockets.