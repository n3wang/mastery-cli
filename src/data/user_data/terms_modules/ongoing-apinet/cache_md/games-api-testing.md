# Testing the New Games API

## Quick Test Sequence

Test these endpoints at **http://localhost:5292** using Swagger UI or curl.

### 1. Register a Guest (if needed)
```bash
curl -X POST http://localhost:5292/api/guest/register \
  -H "Content-Type: application/json" \
  -d '{"displayName":"TestPlayer"}'
```
**Note the `guestId` from response (e.g., "ZH25V8")**

### 2. List Games (Initially Empty)
```bash
curl http://localhost:5292/api/games
```
**Expected:** `{"games": []}`

### 3. Create a Game
```bash
curl -X POST http://localhost:5292/api/games \
  -H "Content-Type: application/json" \
  -d '{"guestId":"ZH25V8","name":"Test Chess Game"}'
```
**Expected:** Game object with `gameId`, `status: "lobby"`, `players: ["ZH25V8"]`

### 4. List Games (Now Shows Your Game)
```bash
curl http://localhost:5292/api/games
```
**Expected:** Array with your created game

### 5. Get Specific Game
```bash
curl http://localhost:5292/api/games/YOUR_GAME_ID
```
Replace `YOUR_GAME_ID` with the `gameId` from step 3.

### 6. Register Second Guest
```bash
curl -X POST http://localhost:5292/api/guest/register \
  -H "Content-Type: application/json" \
  -d '{"displayName":"SecondPlayer"}'
```
**Note the second `guestId`**

### 7. Join the Game
```bash
curl -X PUT http://localhost:5292/api/games/YOUR_GAME_ID/join \
  -H "Content-Type: application/json" \
  -d '{"guestId":"SECOND_GUEST_ID"}'
```
**Expected:** Game now shows both players, status might change to "active"

### 8. Make a Move (Placeholder)
```bash
curl -X PUT http://localhost:5292/api/games/YOUR_GAME_ID/move \
  -H "Content-Type: application/json" \
  -d '{"guestId":"ZH25V8","from":"e2","to":"e4"}'
```
**Note:** This is currently a placeholder - it returns current state but doesn't validate/apply moves yet.

## Swagger UI Testing

1. Go to **http://localhost:5292**
2. Look for **"Games"** section (new controller)
3. Test endpoints in order:
   - POST `/api/games` (create)
   - GET `/api/games` (list)
   - GET `/api/games/{gameId}` (get specific)
   - PUT `/api/games/{gameId}/join` (join)
   - PUT `/api/games/{gameId}/move` (move - placeholder)

## Expected Results

### ✅ Working Features
- ✅ Create games with auto-generated game IDs
- ✅ List games with filtering by status
- ✅ Get specific game details
- ✅ Join games (validates guest exists, room capacity)
- ✅ Guest validation and error handling
- ✅ CORS support for web clients
- ✅ Integration with existing RoomManager

### 🚧 Placeholder Features
- 🚧 Move validation (endpoint exists but doesn't validate chess rules)
- 🚧 FEN state updates (returns starting position)
- 🚧 Real-time move notifications (use WebSocket for this)

## Error Testing

Try these to see error handling:

```bash
# Invalid guest ID
curl -X POST http://localhost:5292/api/games \
  -H "Content-Type: application/json" \
  -d '{"guestId":"INVALID","name":"Test"}'

# Join non-existent game  
curl -X PUT http://localhost:5292/api/games/invalid-game-id/join \
  -H "Content-Type: application/json" \
  -d '{"guestId":"ZH25V8"}'

# Get non-existent game
curl http://localhost:5292/api/games/invalid-game-id
```

## Ready for Flutter Integration

The endpoints now match your Flutter app expectations:

```dart
// This should now work with your Flutter app
final games = await http.get(Uri.parse('$baseUrl/api/games'));
final newGame = await http.post(
  Uri.parse('$baseUrl/api/games'),
  body: jsonEncode({'guestId': guestId, 'name': 'Flutter Game'}),
  headers: {'Content-Type': 'application/json'},
);
```

## Next Steps for Full Implementation

1. **Move validation**: Integrate with chess rules engine in `/move` endpoint
2. **Real-time updates**: Use WebSocket for live game updates
3. **Game state management**: Parse and update FEN strings properly
4. **Turn management**: Track whose turn it is
5. **Game completion**: Handle checkmate, stalemate, resignation