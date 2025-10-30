# Guest Player System Usage

## Overview
The guest player system allows anonymous players to join games without creating accounts. Each guest gets a unique letter-number ID (like `AB1C23`) for easy sharing and friend connections.

## Key Features
- **Simple IDs**: Easy-to-share 6-character codes (letters + numbers)
- **Friend System**: Add other guests as friends using their IDs
- **Device Linking**: Optional device ID to recover guest accounts
- **Collision Detection**: Notifies when guest IDs are occupied

## API Endpoints

### 1. Register/Request Guest ID

**Auto-Generate ID:**
```http
POST /api/guest/register
{
  "deviceId": "optional-device-123",
  "displayName": "Player1"
}
```

**Use Specific ID:**
```http
POST /api/guest/register
{
  "guestId": "AB1C23",
  "deviceId": "optional-device-123", 
  "displayName": "Player1"
}
```

**Response:**
```json
{
  "guestId": "AB1C23",
  "displayName": "Player1", 
  "createdAt": "2025-10-30T00:00:00Z",
  "isActive": true
}
```

**Error if ID taken:**
```json
{
  "error": "ID_OCCUPIED",
  "message": "Guest ID 'AB1C23' is already in use"
}
```

### 2. Check ID Availability

```http
GET /api/guest/check/AB1C23
```

**Response:**
```json
{
  "guestId": "AB1C23",
  "isAvailable": false,
  "message": "Guest ID 'AB1C23' is already in use"
}
```

### 3. Add Friends

```http
POST /api/guest/AB1C23/friends
{
  "friendGuestId": "XY9Z87",
  "friendAlias": "Best Friend"
}
```

### 4. Get Friends List

```http
GET /api/guest/AB1C23/friends
```

**Response:**
```json
[
  {
    "friendGuestId": "XY9Z87",
    "friendDisplayName": "Player2",
    "friendAlias": "Best Friend", 
    "createdAt": "2025-10-30T00:00:00Z"
  }
]
```

## Using Guests in Games

### WebSocket Connection

Guests can join game rooms using their guest ID as the `userId`:

```javascript
await connection.invoke("JoinRoom", {
    roomId: "game-room-123",
    userId: "AB1C23",        // Guest ID as user ID
    displayName: "Player1"   // Their chosen display name
});
```

### REST API

Create rooms and use guest IDs in any game endpoint:

```http
POST /api/game/rooms
{
  "gameType": 0,
  "name": "Chess Game", 
  "maxPlayers": 2,
  "options": {
    "baseMin": 600000,
    "incSec": 3000
  }
}
```

## Guest ID Format

- **Length**: 6 characters
- **Pattern**: Letters and numbers (no I, O, 0, 1 to avoid confusion)
- **Example**: `AB2C34`, `XY9Z87`, `PQ5R68`
- **Case**: Always uppercase

## Device Recovery

If you provide a `deviceId` when registering, you can recover your guest ID later by registering again with the same device ID:

```http
POST /api/guest/register
{
  "deviceId": "my-device-123"
}
```

If a guest with that device ID exists, you'll get the existing guest back instead of creating a new one.

## Integration with Existing Game System

The guest system integrates seamlessly with the existing game infrastructure:

1. **PlayerSeat.UserId** can be either a regular user ID or guest ID
2. **Game WebSocket** accepts guest IDs in all methods
3. **Friend System** works independently of game rooms
4. **Display Names** are managed per-guest for consistency

## Example Client Usage

```javascript
// Register as guest
const response = await fetch('/api/guest/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        deviceId: 'my-phone-uuid',
        displayName: 'Chess Master'
    })
});

const guest = await response.json();
console.log('My guest ID:', guest.guestId); // e.g., "AB1C23"

// Connect to game
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/game-hub").build();
await connection.start();

// Join room as guest
await connection.invoke("JoinRoom", {
    roomId: "room123",
    userId: guest.guestId,     // Use guest ID as user ID
    displayName: guest.displayName
});

// Add friend
await fetch(`/api/guest/${guest.guestId}/friends`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        friendGuestId: 'XY9Z87',
        friendAlias: 'Chess Buddy'
    })
});
```

## Error Handling

Common error codes:
- `ID_OCCUPIED` - Guest ID is already taken
- `INVALID_FORMAT` - Guest ID format is invalid
- `NOT_FOUND` - Guest ID doesn't exist
- `ALREADY_FRIENDS` - Already friends with that guest
- `CANNOT_ADD_SELF` - Cannot add yourself as friend