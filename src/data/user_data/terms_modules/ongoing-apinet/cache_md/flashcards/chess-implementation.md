# Chess Implementation Flashcards

## Chess Rules Implementation

#### Chess State Structure
The chess state is a C# record that holds all information needed to represent the game at any point in time. Records are used because they provide immutability and value equality by default.

```csharp
private record ChessState(
    string Turn,           // "white" or "black"
    string Position,       // Simplified position tracking
    long WhiteTimeMs,      // White's remaining time
    long BlackTimeMs,      // Black's remaining time
    int MoveCount,         // Total moves made
    string? Winner,        // "white", "black", "draw", or null
    string? GameOverReason // "checkmate", "timeout", "resign", etc.
);

// Creating new state (immutable)
var newState = state with { Turn = "black", MoveCount = state.MoveCount + 1 };
```

**Why record:** Immutability ensures old states aren't accidentally modified, crucial for move validation.

:p What is the chess state structure and why is it a record type?
??x
**ChessState is a record holding all game information:**

```csharp
private record ChessState(
    string Turn,          // Whose turn
    string Position,      // Board position
    long WhiteTimeMs,     // Time remaining
    long BlackTimeMs,
    int MoveCount,        // Move counter
    string? Winner,       // Game result
    string? GameOverReason
);
```

**Why record (not class):**
1. **Immutable by default** - Can't accidentally change
2. **Value equality** - Compare by content not reference
3. **with expression** - Easy copying with changes

```csharp
// Immutable update
var newState = oldState with {
    Turn = "black",
    MoveCount = oldState.MoveCount + 1
};
// oldState unchanged
```

**Benefit:** Old states preserved for validation/rollback
x??

---

#### Time Control Algorithm
Time controls in chess work with a base time plus increment per move. After each move, the player's time decreases by elapsed time, then increases by increment.

```csharp
// Time update algorithm (simplified)
if (state.Turn == "white")
{
    // White moved
    newWhiteTime = (state.WhiteTimeMs - elapsedMs) + incrementMs;
    newTurn = "black";
}
else
{
    // Black moved
    newBlackTime = (state.BlackTimeMs - elapsedMs) + incrementMs;
    newTurn = "white";
}

// Check for timeout
if (newWhiteTime <= 0)
{
    winner = "black";
    gameOverReason = "timeout";
}
```

**Example:** 10 min + 5 sec
- Start: 600,000ms
- After move (took 3000ms): 600,000 - 3,000 + 5,000 = 602,000ms

:p How does the chess time control algorithm work with increment?
??x
**Time control formula:**
```
NewTime = (OldTime - Elapsed) + Increment
```

**Implementation:**
```csharp
// Configuration
baseTimeMs = 600000;    // 10 minutes
incrementMs = 5000;     // 5 seconds

// After white's move
whiteTimeMs = (600000 - 3000) + 5000 = 602000;
turn = "black";

// Timeout check
if (whiteTimeMs <= 0) {
    winner = "black";
    reason = "timeout";
}
```

**Example game:**
```
Move 1: White starts 600s, uses 3s → 597s + 5s = 602s
Move 2: Black starts 600s, uses 5s → 595s + 5s = 600s
Move 3: White has 602s, uses 2s → 600s + 5s = 605s
```

**Math:** Each player gains net time if move < increment
- Move in 3s with 5s increment = gain 2s
- Move in 8s with 5s increment = lose 3s
x??

---

#### Move Validation Flow
Move validation happens in two stages: format validation and game rule validation. This separation allows for early rejection of malformed requests.

```csharp
public (bool ok, string? error) ValidateMove(
    GameRoom room, object state, string playerId,
    Dictionary<string, object> moveData)
{
    // Stage 1: Format validation
    if (!moveData.ContainsKey("from") || !moveData.ContainsKey("to"))
        return (false, "INVALID_MOVE_FORMAT");

    var from = moveData["from"]?.ToString();
    var to = moveData["to"]?.ToString();

    if (!IsValidSquare(from) || !IsValidSquare(to))
        return (false, "INVALID_SQUARE");

    // Stage 2: Permission validation
    var seat = room.Seats.FirstOrDefault(s => s.UserId == playerId);
    if (seat == null)
        return (false, "PLAYER_NOT_IN_ROOM");

    // Stage 3: Game state validation
    if (state.Turn != playerColor)
        return (false, "NOT_YOUR_TURN");

    // Stage 4: Chess rules (simplified here)
    // In full implementation: check piece rules, check, etc.

    return (true, null);
}
```

:p What are the stages of move validation in the chess implementation?
??x
**Move validation has 4 stages (fail fast):**

**Stage 1: Format validation**
```csharp
if (!moveData.ContainsKey("from") || !moveData.ContainsKey("to"))
    return (false, "INVALID_MOVE_FORMAT");

if (!IsValidSquare(from) || !IsValidSquare(to))
    return (false, "INVALID_SQUARE");
```
Check structure and format first (fastest)

**Stage 2: Permission validation**
```csharp
var seat = room.Seats.FirstOrDefault(s => s.UserId == playerId);
if (seat == null)
    return (false, "PLAYER_NOT_IN_ROOM");
```
Is this player in this game?

**Stage 3: Game state validation**
```csharp
if (state.Turn != playerColor)
    return (false, "NOT_YOUR_TURN");

if (state.Winner != null)
    return (false, "GAME_ALREADY_FINISHED");
```
Check game-level rules

**Stage 4: Chess rules validation**
- Is piece at 'from' square?
- Does piece belong to current player?
- Is move legal for that piece?
- Does move leave king in check?

**Order matters:** Fast checks first, expensive checks last
x??

---

## Command Pattern Implementation

#### Command Envelope Design
Commands are generic actions (resign, offer draw, chat) that aren't moves. We use an envelope pattern to make the system extensible.

```csharp
public record CommandEnvelope(
    string Type,                         // "resign", "offer_draw", etc.
    Dictionary<string, object>? Payload  // Optional command-specific data
);

// Usage
new CommandEnvelope("resign", null);
new CommandEnvelope("chat", new { message = "Good game!" });
new CommandEnvelope("offer_draw", new { timeLeft = 60000 });

// Handler uses switch on Type
switch (command.Type.ToLower())
{
    case "resign":
        // Handle resignation
        break;
    case "offer_draw":
        // Handle draw offer
        break;
    // ...
}
```

**Why envelope pattern:** New commands can be added without changing the interface.

:p What is the Command Envelope pattern and why is it used for game commands?
??x
**Command Envelope wraps command type + payload:**

```csharp
public record CommandEnvelope(
    string Type,                    // Command identifier
    Dictionary<string, object>? Payload  // Optional data
);

// Examples
new CommandEnvelope("resign", null);
new CommandEnvelope("offer_draw", null);
new CommandEnvelope("chat", new {
    message = "Good game!"
});
```

**Handler pattern:**
```csharp
switch (command.Type.ToLower())
{
    case "resign":
        return HandleResign(playerId);
    case "offer_draw":
        return HandleDrawOffer(playerId);
    default:
        return (false, "UNKNOWN_COMMAND", ...);
}
```

**Benefits:**
1. **Extensible**: Add commands without interface changes
2. **Type safe**: Payload is flexible per command
3. **Discoverable**: All commands go through one method
4. **Testable**: Easy to mock different commands

**Pattern:** Similar to message passing in actor systems
x??

---

#### Resignation Logic
When a player resigns, we need to determine the winner, update game state, and notify all players. The logic is straightforward but must be atomic.

```csharp
case "resign":
{
    // Find who resigned
    var seat = room.Seats.FirstOrDefault(s => s.UserId == playerId);
    var resignerColor = seat.Tags["color"];  // "white" or "black"

    // Winner is opponent
    var winner = resignerColor == "white" ? "black" : "white";

    // Update state (immutable record)
    var newState = state with
    {
        Winner = winner,
        GameOverReason = "resign"
    };

    // Update room status
    room.Status = "finished";
    room.FinishedAt = DateTime.UtcNow;

    // Create event for clients
    var evt = new GameEventDto(
        room.RoomId,
        room.Sequence + 1,
        "game_over",
        new { winner, reason = "resign", resignedBy = playerId }
    );

    return (true, null, newState, evt);
}
```

:p How is the resignation command implemented and what updates are made?
??x
**Resignation updates state, room, and notifies clients:**

```csharp
// 1. Identify resigner
var seat = room.Seats.First(s => s.UserId == playerId);
var resignerColor = seat.Tags["color"];  // "white"/"black"

// 2. Determine winner (opponent)
var winner = resignerColor == "white" ? "black" : "white";

// 3. Update game state (immutable)
var newState = state with {
    Winner = winner,
    GameOverReason = "resign"
};

// 4. Update room
room.Status = "finished";
room.FinishedAt = DateTime.UtcNow;
room.Sequence++;

// 5. Create event
var evt = new GameEventDto(
    roomId,
    sequence,
    "game_over",
    new { winner, reason = "resign", resignedBy = playerId }
);

// 6. Broadcast to all players
return (true, null, newState, evt);
```

**Updates are atomic:** All changes in single database transaction
x??

---

## Move Application

#### Immutable State Updates
When applying a move, we never modify the existing state. Instead, we create a new state object with updated values. This is functional programming style.

```csharp
public object ApplyMove(
    GameRoom room, object stateObj, string playerId,
    Dictionary<string, object> moveData, long serverMs)
{
    var state = (ChessState)stateObj;

    // Calculate time updates
    long newWhiteTime = state.WhiteTimeMs;
    long newBlackTime = state.BlackTimeMs;
    string newTurn;

    if (state.Turn == "white")
    {
        newWhiteTime = Math.Max(0, state.WhiteTimeMs - 1000) + incrementMs;
        newTurn = "black";
    }
    else
    {
        newBlackTime = Math.Max(0, state.BlackTimeMs - 1000) + incrementMs;
        newTurn = "white";
    }

    // Create NEW state (old state unchanged)
    return new ChessState(
        Turn: newTurn,
        Position: newPosition,
        WhiteTimeMs: newWhiteTime,
        BlackTimeMs: newBlackTime,
        MoveCount: state.MoveCount + 1,
        Winner: winner,
        GameOverReason: gameOverReason
    );
}
```

**Why immutable:** Allows rollback, simplifies debugging, prevents accidental modification.

:p Why do we use immutable state updates in ApplyMove and how is it implemented?
??x
**Immutable updates create NEW state instead of modifying existing:**

```csharp
// MUTABLE (bad)
state.Turn = "black";
state.MoveCount++;
return state;  // Modified original

// IMMUTABLE (good)
return new ChessState(
    Turn: "black",
    Position: newPosition,
    WhiteTimeMs: newWhiteTime,
    BlackTimeMs: newBlackTime,
    MoveCount: state.MoveCount + 1,
    Winner: null,
    GameOverReason: null
);
// Original state unchanged
```

**Benefits:**

**1. Rollback:**
```csharp
var oldState = state;  // Save reference
var newState = ApplyMove(...);
if (violation) {
    return oldState;  // Easy rollback
}
```

**2. Debugging:**
- Can compare old vs new
- History preserved
- No hidden mutations

**3. Thread safety:**
- Old state can't be modified
- Safe to read while computing new

**Pattern:** Functional programming in C#
x??

---

#### Square Validation
Chess squares are notated as file (a-h) + rank (1-8). We validate this format before processing moves.

```csharp
private static bool IsValidSquare(string square)
{
    // Must be exactly 2 characters
    if (square.Length != 2)
        return false;

    char file = square[0];  // First char: a-h
    char rank = square[1];  // Second char: 1-8

    // Validate file (column)
    bool validFile = file >= 'a' && file <= 'h';

    // Validate rank (row)
    bool validRank = rank >= '1' && rank <= '8';

    return validFile && validRank;
}

// Valid: "e2", "h8", "a1"
// Invalid: "i9", "e", "e22", "9a"
```

**Chess coordinates:** 64 squares = 8 files × 8 ranks

:p How is chess square notation validated and what are valid squares?
??x
**Chess squares: file (a-h) + rank (1-8)**

```csharp
private static bool IsValidSquare(string square)
{
    if (square.Length != 2)
        return false;

    char file = square[0];  // a-h
    char rank = square[1];  // 1-8

    return (file >= 'a' && file <= 'h') &&
           (rank >= '1' && rank <= '8');
}
```

**Valid squares:**
```
a1, a2, ..., a8   (file a, ranks 1-8)
b1, b2, ..., b8   (file b, ranks 1-8)
...
h1, h2, ..., h8   (file h, ranks 1-8)
```

**Total: 8 × 8 = 64 squares**

**Invalid examples:**
- "i9" - file 'i' doesn't exist, rank > 8
- "e" - only 1 character
- "e22" - too long
- "9a" - digits in wrong position

**Coordinate system:**
- Files (columns): a-h (left to right)
- Ranks (rows): 1-8 (bottom to top)
x??
