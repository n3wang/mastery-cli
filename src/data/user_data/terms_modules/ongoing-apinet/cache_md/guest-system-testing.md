# Guest System Test Scenarios

## Test the Guest Player System

You can test these endpoints at **http://localhost:5292** using the Swagger UI.

### Scenario 1: Register New Guest

1. **Auto-generate guest ID:**
```http
POST /api/guest/register
{
  "displayName": "TestPlayer1",
  "deviceId": "test-device-123"
}
```

Expected response:
```json
{
  "guestId": "AB1C23",  // Auto-generated
  "displayName": "TestPlayer1", 
  "createdAt": "2025-10-30T...",
  "isActive": true
}
```

2. **Request specific guest ID:**
```http
POST /api/guest/register  
{
  "guestId": "PLAYER1",
  "displayName": "TestPlayer2"
}
```

### Scenario 2: Test ID Conflicts

1. Try to register with same ID again:
```http
POST /api/guest/register
{
  "guestId": "PLAYER1",
  "displayName": "AnotherPlayer"
}
```

Expected error:
```json
{
  "error": "ID_OCCUPIED",
  "message": "Guest ID 'PLAYER1' is already in use"
}
```

### Scenario 3: Check Availability

```http
GET /api/guest/check/PLAYER1
```

Response:
```json
{
  "guestId": "PLAYER1",
  "isAvailable": false,
  "message": "Guest ID 'PLAYER1' is already in use"
}
```

### Scenario 4: Device Recovery

1. Register guest with device ID:
```http
POST /api/guest/register
{
  "displayName": "RecoverableGuest",
  "deviceId": "device-456"
}
```

2. Later, "recover" by registering with same device ID:
```http
POST /api/guest/register
{
  "deviceId": "device-456"
}
```

Should return existing guest, not create new one.

### Scenario 5: Add Friends

1. Create two guests:
```http
POST /api/guest/register
{"guestId": "ALICE1", "displayName": "Alice"}
```

```http
POST /api/guest/register  
{"guestId": "BOB123", "displayName": "Bob"}
```

2. Alice adds Bob as friend:
```http
POST /api/guest/ALICE1/friends
{
  "friendGuestId": "BOB123",
  "friendAlias": "My Chess Buddy"
}
```

3. Check Alice's friends:
```http
GET /api/guest/ALICE1/friends
```

### Scenario 6: Use in Game

1. Create a chess room (using existing game API):
```http
POST /api/game/rooms
{
  "gameType": 0,
  "name": "Guest Game",
  "maxPlayers": 2,
  "options": {
    "baseMin": 600000,
    "incSec": 3000
  }
}
```

2. Connect to WebSocket and join with guest ID:
```javascript
// Browser console test
const conn = new signalR.HubConnectionBuilder()
    .withUrl("/game-hub").build();
await conn.start();

// Join room using guest ID as userId
await conn.invoke("JoinRoom", {
    roomId: "room-id-from-step-1",
    userId: "ALICE1",        // Guest ID
    displayName: "Alice"     // Guest display name
});
```

## Expected Behaviors

### ✅ Success Cases
- Auto-generated IDs are 6 characters, letters+numbers
- Specific IDs are accepted if available
- Device recovery works for existing guests
- Friends can be added and listed
- Guest IDs work in game rooms as regular user IDs

### ❌ Error Cases
- Duplicate IDs return `ID_OCCUPIED` error
- Invalid formats return `INVALID_FORMAT` error  
- Non-existent guests return `NOT_FOUND` errors
- Self-friending returns `CANNOT_ADD_SELF` error
- Duplicate friends return `ALREADY_FRIENDS` error

## Notes

- All guest IDs are converted to uppercase
- Guest system integrates seamlessly with existing game WebSocket hub
- Display names are stored per-guest for consistency
- Friend aliases are optional personal labels