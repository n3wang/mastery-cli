# Math Session Feature Documentation

## Overview

The Math Session feature allows you to practice math problems in structured sessions with automatic tracking of accuracy and performance metrics. You can:

1. **Select a math problem type** from available formulas (dynamically loaded)
2. **Solve multiple problems** in sequence (default: 10, customizable with `--n` flag)
3. **View detailed statistics** including accuracy, time taken, and problem-by-problem breakdown
4. **Track progress over time** with stats stored locally by session size

## Quick Start

### Run a Default Math Session (10 problems)

```bash
mastery math-session
# or short form
mastery math-ses
```

### Run Custom Session Size

```bash
# Solve 20 problems of one type
mastery math-ses --n=20

# Solve 5 problems
mastery math-ses --n=5

# Solve 50 problems
mastery math-ses --n=50
```

## Workflow

1. **Start Session**: Run `mastery math-session`
2. **Select Formula Type**: Choose from available math problem types
   - Simple arithmetic
   - Business/marketing calculations
   - Statistics basics
   - Algebra properties
   - (Custom types can be added to `src/terms-data/math_formulas.js`)
3. **Solve Problems**: Answer problems sequentially
   - Multiple attempts allowed (default: 3)
   - Type `calc` or `node` to open calculator
   - Type `skip` or `exit` to quit session
4. **View Report**: Automatic session report shows:
   - Total correct/wrong
   - Accuracy percentage
   - Time taken
   - Problems needing review

## Available Math Problem Types

The system includes these built-in formula categories:

### Math Simple
- Simple addition
- Simple subtraction
- Simple multiplication
- Simple division
- Operation precedence
- Variable formula templates

### Statistics Basics
- Variance calculation
- Standard deviation
- Probability selection
- Probability without replacement

### (Optional) Business & Marketing
- Conversion rate
- Customer lifetime value (CLV)
- Return on Investment (ROI)
- Customer retention rate

### (Optional) Algebra Properties
- Logarithm properties
- Square difference formula
- Custom algebra exercises

*Note: Categories can be enabled/disabled in `src/terms-data/math_formulas.js`*

## Data Storage

### Storage Location
Session stats are stored in:
```
.cache/queues/math_sessions.json
```

### Data Structure

Each session records:
- **Formula type** used
- **Accuracy** percentage
- **Duration** in milliseconds
- **Individual attempt** details (correct/incorrect, attempts taken)
- **Timestamp** of the session

### Storage Keys

Stats are organized by session size:
- `math_ses_5` - sessions with 5 problems
- `math_ses_10` - sessions with 10 problems (default)
- `math_ses_20` - sessions with 20 problems
- `math_ses_{N}` - any custom count

This allows separate tracking for different session intensities.

## Understanding the Report

After each session, you see:

```
============================================================
📊 SESSION REPORT
============================================================

📋 Formula Type: sum_simple
   Sum simple formula

📈 Performance:
   Correct: 8 / 10
   Wrong: 2 / 10
   Accuracy: 80%

⏱️  Timing:
   Total Time: 120s
   Avg per Problem: 12000ms

============================================================
❌ Problems to Review:
   Q3: solve for y, using 5000 + 3421 
      Your answer vs Expected: 8421
   Q7: solve for y, using 9532 - 1204 
      Your answer vs Expected: 8328
```

## Viewing Statistics

To see stored math session statistics, you can read the storage file:

```bash
# View raw stats (JSON)
cat .cache/queues/math_sessions.json | jq '.date_based_stats'

# Or access via code using MathStatsReporter
```

### Using MathStatsReporter in Code

```javascript
const { MathStatsReporter } = require('./src/MathStatsReporter');

const reporter = new MathStatsReporter();

// Display all stats
await reporter.displayAllStats();

// Display summary
await reporter.displaySummary();

// Get stats for specific session type
const stats = await reporter.getSessionTypeStats(10);

// Get top performing formulas
const topFormulas = await reporter.getTopFormulas(5);
```

## Adding Custom Math Problems

To add custom math problems:

1. Edit `src/terms-data/math_formulas.js`
2. Add a new formula object:

```javascript
const myCustomFormulas = [
  {
    formula_name: 'percentage-calc',
    form: 'y = sd_1 / sd_2 * 100',
    replace: ['sd_1', 'sd_2'],
    calculates: ['y'],
    ans_constraint: '.0',
    human: `Calculate percentage: sd_1 out of sd_2 equals what percentage?`
  }
];
```

3. Add to export at bottom:
```javascript
qmathformulas.push(...myCustomFormulas);
```

### Formula Parameters

- **formula_name**: Unique identifier (kebab-case)
- **form**: Mathematical expression with variables (sd_1, d_1, md_1, ld_1)
- **replace**: Variables to replace with random numbers
- **calculates**: Which variable to solve for
- **ans_constraint**: Answer format constraint
  - `.2` - two decimal places
  - `.0` - integer (no decimals)
  - `-.2` - negative numbers with two decimals
  - `+.0` - positive integers
- **human**: Human-readable question (optional)

### Variable Types

- `sd_N` - Small digit (2-20)
- `md_N` - Medium digit (2-50)
- `d_N` - Regular digit (2-100)
- `ld_N` - Large digit (1000-10000)

## Reusing Components

The Math Session feature reuses existing components:

1. **Quizzer.js** - Question generation and compilation
   - `compileQuestion()` - generates questions with random values
   - `compileValidQuestion()` - validates against constraints
   - `pickMathQuestion()` - selects random formula type

2. **LocalStorage.js** - Data persistence
   - Stores session stats by date and type
   - Structured format for easy querying

3. **Settings.js** - Configuration
   - Quiz attempt limits
   - Answer constraints
   - Online/offline mode

## Configuration

Settings can be customized in settings.json:

```javascript
{
  "queue_configurations": {
    "quiz_allow_reattempts": 3,  // Attempts per problem
    "hash_based_selection": {
      "enabled": true  // Smart formula selection
    }
  }
}
```

## Troubleshooting

**Q: Session won't start**
- Ensure math formulas are defined in `math_formulas.js`
- Check that at least one formula is added to `qmathformulas`

**Q: Stats not saving**
- Check that `.cache/queues/` directory exists (created automatically)
- Verify write permissions on vault directory

**Q: Wrong answers not tracked**
- Answers are converted to strings for comparison
- Ensure decimal precision matches `ans_constraint`

## Examples

### Example 1: Daily Math Practice

```bash
# Practice 10 simple problems daily
mastery math-ses

# Monthly: 20-problem intensive session
mastery math-ses --n=20
```

### Example 2: Skill Development Path

```bash
# Week 1: 5 problems daily (low intensity)
mastery math-ses --n=5

# Week 2: 10 problems daily (standard)
mastery math-ses --n=10

# Week 3: 20 problems daily (intensive)
mastery math-ses --n=20

# Week 4: Mix it up
mastery math-ses --n=15
```

### Example 3: Scripted Practice

```javascript
// In a script or test file
const { MathSessionManager } = require('./src/MathSessionManager');
const { Quizzer } = require('./src/Quizzer');

const quizzer = new Quizzer(formulas, enabledFormulas, deck, mastery);
const session = new MathSessionManager(quizzer);

// Run 15 problems
await session.runSession(15);

// Access stats programmatically
const accuracy = session.calculateAccuracy();
const duration = session.sessionStats.end_time - session.sessionStats.start_time;
```

## Future Enhancements

Potential improvements to the math session system:

1. **Advanced Filtering**
   - Filter by formula type directly: `mastery math-ses --formula=sum_simple`
   - Filter by difficulty level

2. **Leaderboard/Streaks**
   - Track consecutive perfect scores
   - Weekly/monthly leaderboards

3. **Adaptive Difficulty**
   - Automatically increase problem complexity based on accuracy
   - Suggest problem types based on weakness areas

4. **Detailed Analytics**
   - Time-to-solve trends
   - Most commonly missed problem types
   - Skill level assessment

5. **Integration with Study Sessions**
   - Math sessions as part of broader study flow
   - Combine with flashcard sessions

## File Structure

```
src/
├── MathSessionManager.js      # Main session runner
├── MathStatsReporter.js        # Stats display and analysis
├── Quizzer.js                 # Question generation (reused)
├── LocalStorage.js            # Data persistence (reused)
├── cli.js                     # --n flag definition
├── commands/
│   ├── registry.js            # math-session command registration
│   └── dispatch.js            # Handler mapping
├── terms-data/
│   └── math_formulas.js       # Formula definitions
└── utils.js                   # Handler implementation
```

## Contributing

To enhance the math session system:

1. Add new formulas to `math_formulas.js`
2. Extend `MathSessionManager` for new features
3. Add metrics to `MathStatsReporter`
4. Test with: `mastery math-ses --n=5`
