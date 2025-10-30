# Games API Endpoints

## Overview
New simplified `/api/games` endpoints for Flutter app integration. These complement the existing `/api/game/rooms` endpoints and provide a streamlined interface.

## Available Endpoints

### 1. List Games
```http
GET /api/games?status=waiting&limit=20
```

**Query Parameters:**
- `status` (optional): Filter by game status (`waiting`, `active`, `finished`)
- `limit` (optional): Maximum games to return (default: 20, max: 100)

**Example Request:**
```bash
curl "http://localhost:5292/api/games?status=lobby&limit=10"
```

**Response:**
```json
{
  "games": [
    {
      "gameId": "abc123def456",
      "status": "lobby",
      "players": ["ZH25V8"],
      "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      "name": "Chess Game",
      "gameType": "chess",
      "maxPlayers": 2,
      "createdAt": "2025-10-30T02:58:31Z"
    }
  ]
}
```

### 2. Create Game
```http
POST /api/games
```

**Request Body:**
```json
{
  "guestId": "ZH25V8",
  "name": "My Chess Game"
}
```

**Response (201 Created):**
```json
{
  "gameId": "abc123def456",
  "status": "lobby",
  "players": ["ZH25V8"],
  "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  "name": "My Chess Game",
  "gameType": "chess",
  "maxPlayers": 2,
  "createdAt": "2025-10-30T02:58:31Z"
}
```

### 3. Get Specific Game
```http
GET /api/games/{gameId}
```

**Example:**
```bash
curl "http://localhost:5292/api/games/abc123def456"
```

**Response:**
```json
{
  "gameId": "abc123def456",
  "status": "active",
  "players": ["ZH25V8", "AB1C23"],
  "fen": "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
  "name": "My Chess Game",
  "gameType": "chess",
  "maxPlayers": 2,
  "createdAt": "2025-10-30T02:58:31Z"
}
```

### 4. Join Game
```http
PUT /api/games/{gameId}/join
```

**Request Body:**
```json
{
  "guestId": "AB1C23"
}
```

**Response (200 OK):**
```json
{
  "gameId": "abc123def456", 
  "status": "active",
  "players": ["ZH25V8", "AB1C23"],
  "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  "name": "My Chess Game",
  "gameType": "chess",
  "maxPlayers": 2,
  "createdAt": "2025-10-30T02:58:31Z"
}
```

### 5. Make Move
```http
PUT /api/games/{gameId}/move
```

**Request Body:**
```json
{
  "guestId": "ZH25V8",
  "from": "e2",
  "to": "e4",
  "promotion": "q"
}
```

**Response (200 OK):**
```json
{
  "gameId": "abc123def456",
  "status": "active", 
  "players": ["ZH25V8", "AB1C23"],
  "fen": "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
  "name": "My Chess Game",
  "gameType": "chess",
  "maxPlayers": 2,
  "createdAt": "2025-10-30T02:58:31Z"
}
```

## Error Responses

All endpoints return standardized error responses:

```json
{
  "error": "GUEST_NOT_FOUND",
  "message": "Guest ID not found or inactive"
}
```

**Common Error Codes:**
- `GUEST_NOT_FOUND` - Invalid or inactive guest ID
- `GAME_NOT_FOUND` - Game doesn't exist
- `JOIN_FAILED` - Cannot join game (full, already joined, etc.)
- `NOT_IN_GAME` - Guest is not a player in this game

## Integration with Existing System

### Relationship to `/api/game/rooms`
- **New endpoints (`/api/games`)**: Simplified for mobile app use
- **Existing endpoints (`/api/game/rooms`)**: Full-featured for web/advanced clients
- **Shared backend**: Both use the same `RoomManager` and database models

### WebSocket Integration
- Games created via REST can be joined via WebSocket (`/game-hub`)
- Use `gameId` as `roomId` in SignalR methods
- Real-time moves still recommended via WebSocket for best experience

## Flutter Integration Example

```dart
// Create game
final response = await http.post(
  Uri.parse('http://localhost:5292/api/games'),
  headers: {'Content-Type': 'application/json'},
  body: jsonEncode({
    'guestId': guestId,
    'name': 'Flutter Chess Game'
  }),
);

final game = jsonDecode(response.body);
print('Created game: ${game['gameId']}');

// Join game
await http.put(
  Uri.parse('http://localhost:5292/api/games/${game['gameId']}/join'),
  headers: {'Content-Type': 'application/json'},
  body: jsonEncode({'guestId': friendGuestId}),
);

// Make move
await http.put(
  Uri.parse('http://localhost:5292/api/games/${game['gameId']}/move'),
  headers: {'Content-Type': 'application/json'},
  body: jsonEncode({
    'guestId': guestId,
    'from': 'e2',
    'to': 'e4'
  }),
);
```

## Status Values

- **`lobby`**: Game created, waiting for players
- **`active`**: Game in progress
- **`finished`**: Game completed

## Notes

### Current Limitations
- **Move validation**: The `/move` endpoint is currently a placeholder
- **Real-time updates**: REST endpoints don't provide real-time notifications
- **FEN updates**: Game state parsing not fully implemented

### Recommended Usage
1. **Game creation/joining**: Use REST endpoints
2. **Real-time gameplay**: Use WebSocket (`/game-hub`) for moves
3. **Game listing**: Use REST for discovery and status checks

### For Full Real-time Experience
Combine REST + WebSocket:
```javascript
// 1. Create game via REST
const game = await createGame(guestId);

// 2. Connect to WebSocket for real-time updates  
const connection = new signalR.HubConnectionBuilder()
    .withUrl('/game-hub').build();
await connection.start();

// 3. Join via WebSocket for real-time events
await connection.invoke('JoinRoom', {
    roomId: game.gameId,
    userId: guestId,
    displayName: 'Player'
});

// 4. Make moves via WebSocket
await connection.invoke('PlayMove', game.gameId, guestId, {
    idempotencyKey: crypto.randomUUID(),
    move: { from: 'e2', to: 'e4' }
});
```