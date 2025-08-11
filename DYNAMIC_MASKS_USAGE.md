# Dynamic Quiz Deck Masks Configuration

This document explains how to configure dynamic quiz deck masks in `src/user_data/settings.json`.

## Current Configuration Structure

In your `settings.json`, the `quiz_decks_configuration` section controls which term decks are available for study:

```json
{
  "quiz_decks_configuration": {
    "masks": [
      {
        "title": "cloud-prep",
        "decks_to_enable": [
          "aws cloud practitioner"
        ]
      }
    ],
    "use_masks": [
      "cloud-prep"
    ]
  }
}
```

## How It Works

- **`masks`**: Array of mask configurations, each defining a study focus area
- **`use_masks`**: Array of mask titles that are currently active

## Adding New Study Masks

### Example 1: Full-Stack Developer Preparation
```json
{
  "title": "fullstack-dev",
  "decks_to_enable": [
    "react terms",
    "js advanced", 
    "design patterns",
    "system design",
    "best practices"
  ]
}
```

### Example 2: Data Science Focus
```json
{
  "title": "data-science-prep", 
  "decks_to_enable": [
    "machine learning pandas",
    "machine learning scikit learn",
    "python",
    "sql",
    "designing good charts"
  ]
}
```

### Example 3: Interview Preparation
```json
{
  "title": "interview-prep",
  "decks_to_enable": [
    "interview",
    "interview filter frequent", 
    "dsa",
    "design patterns",
    "system design"
  ]
}
```

## Complete Configuration Example

```json
{
  "quiz_decks_configuration": {
    "masks": [
      {
        "title": "cloud-prep",
        "decks_to_enable": ["aws cloud practitioner"]
      },
      {
        "title": "fullstack-dev", 
        "decks_to_enable": [
          "react terms",
          "js advanced",
          "design patterns", 
          "system design",
          "best practices"
        ]
      },
      {
        "title": "data-science-prep",
        "decks_to_enable": [
          "machine learning pandas",
          "python",
          "sql"
        ]
      }
    ],
    "use_masks": [
      "cloud-prep",
      "fullstack-dev" 
    ]
  }
}
```

## Available Deck Names

Here are the available deck names you can use in your masks:

### Programming Languages
- `python`, `js`, `typescript`, `java`, `csharp`, `cpp`, `swift`, `dart`, `php`, `r`, `matlab`, `kotlin`

### Frameworks & Technologies  
- `react terms`, `angular`, `flutter`, `dot net`, `python frameworks`, `chrome extensions`

### Development Practices
- `design patterns`, `dsa`, `system design`, `unit testing`, `best practices`, `js advanced`

### Data Science & AI
- `machine learning pandas`, `machine learning scikit learn`, `pytorch machine learning course`, `ai theory`, `designing good charts`

### Cloud & DevOps
- `aws cloud practitioner`, `aws associate dev`, `aws localstack`, `aws services`, `aws glossary`, `docker`

### Academic & Theory
- `discrete_math`, `probability`, `algebra`, `calculus one`, `artificial intelligence`, `network`

### Career & Soft Skills
- `interview`, `interview filter frequent`, `pragmatic programmer`, `life game lessons`, `coder terms`

### Business & Other
- `accounting`, `salesforce experience`, `sql`

## Features

✅ **Dynamic Loading**: Masks are loaded from settings.json at runtime  
✅ **Multiple Active Masks**: Enable multiple study areas simultaneously  
✅ **Easy Configuration**: Simple JSON structure for adding new masks  
✅ **Fallback Support**: System falls back to defaults if settings can't be loaded  
✅ **Console Logging**: See which masks are loaded and their status  

## Activation

Only masks listed in `use_masks` array will be active. This allows you to:
- Define multiple study plans but only activate specific ones
- Switch between different study focuses by updating the `use_masks` array
- Keep inactive masks as templates for future use

## System Behavior

When you start the quiz system:
1. System reads `masks` array from settings.json
2. Creates DeckMask objects for each mask configuration  
3. Sets `enabled: true` only for masks listed in `use_masks`
4. Applies active masks to filter available term decks
5. Shows console output confirming which masks were loaded

Example console output:
```
Created mask "cloud-prep" with decks: [aws cloud practitioner], enabled: true
Created mask "fullstack-dev" with decks: [react terms, js advanced, design patterns], enabled: false  
Loaded 2 masks from settings.json
```