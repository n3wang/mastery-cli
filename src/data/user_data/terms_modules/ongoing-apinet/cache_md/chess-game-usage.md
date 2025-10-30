# Chess Game Usage Guide

This guide shows how to use the chess game API endpoints and WebSocket hub.

## Quick Start

### 1. Run the Application

```bash
dotnet run
```

The API will be available at `http://localhost:5000` (or your configured port).

### 2. Create a Chess Room (REST API)

**Request:**
```http
POST http://localhost:5000/api/game/rooms
Content-Type: application/json

{
  "gameType": 0,
  "name": "Quick Chess Game",
  "maxPlayers": 2,
  "options": {
    "baseMin": 600000,
    "incSec": 3000
  }
}
```

**Notes:**
- `gameType: 0` means Chess
- `baseMin`: Base time in milliseconds (600000 = 10 minutes)
- `incSec`: Increment per move in milliseconds (3000 = 3 seconds)

**Response:**
```json
{
  "roomId": "a1b2c3d4e5f6",
  "name": "Quick Chess Game",
  "gameType": 0,
  "maxPlayers": 2,
  "currentPlayers": 0,
  "options": {
    "baseMin": 600000,
    "incSec": 3000
  },
  "status": "lobby"
}
```

### 3. Connect to WebSocket

Using JavaScript/TypeScript:

```javascript
// Install SignalR client: npm install @microsoft/signalr

import * as signalR from "@microsoft/signalr";

// Connect to the hub
const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/game-hub")
    .withAutomaticReconnect()
    .build();

// Set up event listeners BEFORE starting
connection.on("event", (data) => {
    console.log("Event:", data);
    handleGameEvent(data);
});

connection.on("match_state", (state) => {
    console.log("State update:", state);
    updateGameBoard(state);
});

connection.on("error", (error) => {
    console.error("Error:", error);
});

// Start the connection
await connection.start();
console.log("Connected!");
```

### 4. Join the Room

**Player 1:**
```javascript
await connection.invoke("JoinRoom", {
    roomId: "a1b2c3d4e5f6",
    userId: "alice",
    displayName: "Alice"
});
```

**Player 2:**
```javascript
await connection.invoke("JoinRoom", {
    roomId: "a1b2c3d4e5f6",
    userId: "bob",
    displayName: "Bob"
});
```

**Events received by all players:**
```json
{
  "roomId": "a1b2c3d4e5f6",
  "sequence": 2,
  "eventType": "player_joined",
  "payload": {
    "userId": "bob",
    "displayName": "Bob",
    "playerCount": 2,
    "maxPlayers": 2
  }
}
```

### 5. Start the Game

Either player can start once the room is full:

```javascript
await connection.invoke("StartGame", "a1b2c3d4e5f6");
```

**Events received:**

1. **Game Started Event:**
```json
{
  "roomId": "a1b2c3d4e5f6",
  "sequence": 3,
  "eventType": "game_started",
  "payload": {
    "startedAt": "2025-10-29T12:34:56Z"
  }
}
```

2. **Initial State:**
```json
{
  "roomId": "a1b2c3d4e5f6",
  "sequence": 3,
  "state": {
    "turn": "white",
    "position": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
    "whiteTimeMs": 600000,
    "blackTimeMs": 600000,
    "moveCount": 0,
    "winner": null,
    "gameOverReason": null
  },
  "status": "active"
}
```

### 6. Make Moves

White makes the first move:

```javascript
await connection.invoke("PlayMove", "a1b2c3d4e5f6", "alice", {
    idempotencyKey: crypto.randomUUID(),  // Prevents duplicate moves
    move: {
        from: "e2",
        to: "e4"
    }
});
```

**Move Format:**
```json
{
  "from": "e2",    // Starting square (a-h, 1-8)
  "to": "e4",      // Destination square
  "promotion": "q" // Optional: for pawn promotion (q/r/b/n)
}
```

**Events received by both players:**

1. **Move Event:**
```json
{
  "roomId": "a1b2c3d4e5f6",
  "sequence": 4,
  "eventType": "move",
  "payload": {
    "from": "e2",
    "to": "e4"
  }
}
```

2. **Updated State:**
```json
{
  "roomId": "a1b2c3d4e5f6",
  "sequence": 4,
  "state": {
    "turn": "black",
    "position": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR|e2e4",
    "whiteTimeMs": 602000,  // 600000 - 1000 + 3000
    "blackTimeMs": 600000,
    "moveCount": 1,
    "winner": null,
    "gameOverReason": null
  },
  "status": "active"
}
```

### 7. Game Commands

#### Resign

```javascript
await connection.invoke("SendCommand", "a1b2c3d4e5f6", "alice", {
    type: "resign",
    payload: null
});
```

**Event received:**
```json
{
  "roomId": "a1b2c3d4e5f6",
  "sequence": 5,
  "eventType": "game_over",
  "payload": {
    "winner": "black",
    "reason": "resign",
    "resignedBy": "alice"
  }
}
```

#### Offer Draw

```javascript
await connection.invoke("SendCommand", "a1b2c3d4e5f6", "alice", {
    type: "offer_draw",
    payload: null
});
```

**Event received:**
```json
{
  "roomId": "a1b2c3d4e5f6",
  "sequence": 6,
  "eventType": "draw_offered",
  "payload": {
    "offeredBy": "alice"
  }
}
```

#### Accept Draw

```javascript
await connection.invoke("SendCommand", "a1b2c3d4e5f6", "bob", {
    type: "accept_draw",
    payload: null
});
```

**Event received:**
```json
{
  "roomId": "a1b2c3d4e5f6",
  "sequence": 7,
  "eventType": "game_over",
  "payload": {
    "winner": "draw",
    "reason": "agreement"
  }
}
```

## REST API Endpoints

### List All Rooms

```http
GET http://localhost:5000/api/game/rooms
```

**Response:**
```json
[
  {
    "roomId": "a1b2c3d4e5f6",
    "name": "Quick Chess Game",
    "gameType": 0,
    "maxPlayers": 2,
    "currentPlayers": 2,
    "options": {
      "baseMin": 600000,
      "incSec": 3000
    },
    "status": "active"
  }
]
```

### Get Room Details

```http
GET http://localhost:5000/api/game/rooms/a1b2c3d4e5f6
```

### Game Health Check

```http
GET http://localhost:5000/api/game/health
```

## Error Handling

All errors are sent to the caller via the `error` event:

```json
{
  "code": "NOT_YOUR_TURN",
  "message": "..."
}
```

**Common Error Codes:**
- `ROOM_NOT_FOUND` - Room doesn't exist
- `ROOM_FULL` - Can't join, room is full
- `GAME_ALREADY_STARTED` - Can't join after game started
- `NOT_YOUR_TURN` - Tried to move when it's not your turn
- `INVALID_MOVE_FORMAT` - Move data is malformed
- `INVALID_SQUARE` - Square notation is invalid (not a1-h8)
- `PLAYER_NOT_IN_ROOM` - User not in this room
- `GAME_NOT_ACTIVE` - Game hasn't started or already finished

## Client Example (Complete)

```javascript
class ChessClient {
    constructor(baseUrl, userId, displayName) {
        this.baseUrl = baseUrl;
        this.userId = userId;
        this.displayName = displayName;
        this.connection = null;
        this.currentRoomId = null;
    }

    async connect() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${this.baseUrl}/game-hub`)
            .withAutomaticReconnect()
            .build();

        this.connection.on("event", (data) => this.onEvent(data));
        this.connection.on("match_state", (state) => this.onStateUpdate(state));
        this.connection.on("error", (error) => this.onError(error));

        await this.connection.start();
        console.log("Connected to game hub");
    }

    async createRoom(name, baseMin = 600000, incSec = 3000) {
        const response = await fetch(`${this.baseUrl}/api/game/rooms`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                gameType: 0,
                name: name,
                maxPlayers: 2,
                options: { baseMin, incSec }
            })
        });

        const room = await response.json();
        return room.roomId;
    }

    async joinRoom(roomId) {
        this.currentRoomId = roomId;
        await this.connection.invoke("JoinRoom", {
            roomId: roomId,
            userId: this.userId,
            displayName: this.displayName
        });
    }

    async startGame() {
        await this.connection.invoke("StartGame", this.currentRoomId);
    }

    async makeMove(from, to, promotion = null) {
        const move = { from, to };
        if (promotion) move.promotion = promotion;

        await this.connection.invoke("PlayMove",
            this.currentRoomId,
            this.userId,
            {
                idempotencyKey: crypto.randomUUID(),
                move: move
            }
        );
    }

    async resign() {
        await this.connection.invoke("SendCommand",
            this.currentRoomId,
            this.userId,
            { type: "resign", payload: null }
        );
    }

    onEvent(data) {
        console.log("Event:", data.eventType, data.payload);
    }

    onStateUpdate(state) {
        console.log("State:", state);
    }

    onError(error) {
        console.error("Error:", error.code, error.message);
    }
}

// Usage
const client = new ChessClient("http://localhost:5000", "alice", "Alice");
await client.connect();
const roomId = await client.createRoom("My Game");
await client.joinRoom(roomId);
await client.startGame();
await client.makeMove("e2", "e4");
```

## Testing with Swagger

1. Navigate to `http://localhost:5000`
2. Use the Swagger UI to create rooms via REST API
3. Copy the `roomId` from the response
4. Use browser console or a SignalR client to connect and play

## Next Steps

- See [Game Architecture](./game-architecture.md) to understand how it works
- See [SignalR Basics](./signalr-basics.md) to learn about WebSockets
- See [Adding New Games](./extending-games.md) to add Checkers, Catan, etc.
