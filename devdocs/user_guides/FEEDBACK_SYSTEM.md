# Feedback System Documentation

**Last Updated:** 2026-01-23

This document explains how the feedback system works and how it differs from the deletion queue system.

---

## Overview

Yes, the feedback system uses a **single JSON file** for storage, similar to the deletion queue, but with a different identification strategy.

---

## Storage Location

- **File Path:** `user_data/temp/term_feedback.json`
- **Storage Class:** `FeedbackStorage` (`src/FeedbackStorage.js`)
- **File Format:** Single JSON object (not an array)

---

## Data Structure

The feedback JSON uses a hash-based key-value structure:

```json
{
  "abc12345": {
    "feedback": "User's feedback text here",
    "timestamp": "2026-01-23T10:30:00.000Z",
    "history": [
      {
        "feedback": "Previous feedback version",
        "timestamp": "2026-01-22T09:15:00.000Z"
      }
    ]
  },
  "def67890": {
    "feedback": "Another term's feedback",
    "timestamp": "2026-01-23T11:00:00.000Z",
    "history": []
  }
}
```

**Structure:**
- **Key:** 8-character hash (SHA256 of term content)
- **Value:** Object containing:
  - `feedback`: Current feedback text
  - `timestamp`: ISO timestamp of when feedback was added/updated
  - `history`: Array of previous feedback versions (preserved when updating)

---

## Hash Generation

The feedback system identifies terms by **content hash**, not by name + location:

```javascript
generateTermHash(term, hashLength = 8) {
  const content = [
    term.term || '',
    term.description || '',
    term.example || '',
    term.prompt || ''
  ].join('|');
  const hash = crypto.createHash('sha256').update(content).digest('hex');
  return hash.substring(0, hashLength);
}
```

**What this means:**
- Same term content = same hash, regardless of which file it's in
- If you have the same term definition in multiple files, they share the same feedback
- Changing the term's description/example/prompt creates a different hash = new feedback entry

---

## Key Differences: Feedback vs Deletion Queue

| Feature | FeedbackStorage | DeletionQueueStorage |
|---------|----------------|---------------------|
| **File Location** | `user_data/temp/term_feedback.json` | `user_data/temp/deletion_queue.json` |
| **Data Structure** | Object `{ hash: {...} }` | Array `[{...}, {...}]` |
| **Identification** | Content hash (term + description + example + prompt) | Term name + folder path |
| **Purpose** | Store user corrections/notes | Ignore list for study sessions |
| **History** | ✅ Keeps history of previous feedback | ❌ No history |
| **Cross-file behavior** | Same content = same feedback (shared) | Same name in different files = separate entries |

---

## Usage Flow

### 1. Adding Feedback

When a user selects "Provide feedback about this term" during a study session:

```javascript
// User enters feedback text
this.feedbackStorage.addFeedbackByTerm(term_selected, feedback);

// Internally:
// 1. Generate hash from term content
// 2. Check if hash exists in data
// 3. If exists: move current feedback to history, update with new feedback
// 4. If new: create new entry
// 5. Save to JSON file
```

### 2. Retrieving Feedback

When displaying a term during study:

```javascript
const storedFeedback = this.feedbackStorage.getFeedbackByTerm(term_selected);

// Shows:
// - Current feedback text
// - Date when feedback was added
// - History of previous feedback versions (if any)
```

### 3. Feedback Display

Feedback appears:
- **Before answering:** Shows existing feedback/corrections if available
- **After incorrect answer:** Option to add/edit feedback
- **In deletion queue:** Marks terms that have feedback (for review)

---

## History Feature

The feedback system maintains a history of previous feedback versions:

```javascript
// When updating existing feedback:
if (this.data[hash]) {
  // Move current feedback to history
  this.data[hash].history.push({
    feedback: this.data[hash].feedback,
    timestamp: this.data[hash].timestamp
  });
  
  // Update with new feedback
  this.data[hash].feedback = newFeedback;
  this.data[hash].timestamp = newTimestamp;
}
```

**Use case:** Track how your understanding/corrections evolve over time.

---

## Integration with Deletion Queue

The deletion queue checks for feedback when adding terms:

```javascript
// In DeletionQueueStorage.addToQueue():
if (feedbackStorage) {
  const feedback = feedbackStorage.getFeedbackByTerm(term);
  hasFeedback = feedback !== null && feedback.feedback && feedback.feedback.trim() !== '';
}
```

This marks terms in the deletion queue that have feedback, so you can review them before ignoring.

---

## File Path Reference

Both systems store their JSON files in the same location:
- **Feedback:** `user_data/temp/term_feedback.json`
- **Deletion Queue:** `user_data/temp/deletion_queue.json`

You can access these files directly to:
- Review all feedback entries
- Manually edit feedback (though not recommended)
- Backup the files
- Understand what's being tracked

---

## Example Scenarios

### Scenario 1: Same Term in Multiple Files

**Term:** "Singleton Pattern"
- File A: `design-patterns.md` (description: "Ensures only one instance")
- File B: `java-patterns.md` (description: "Ensures only one instance")

**Feedback System:**
- Both generate the same hash (same content)
- Adding feedback to one applies to both
- They share the same feedback entry

**Deletion Queue:**
- File A entry: `{ termName: "Singleton Pattern", folderPath: "design-patterns.md" }`
- File B entry: `{ termName: "Singleton Pattern", folderPath: "java-patterns.md" }`
- Separate entries (different file paths)

### Scenario 2: Term Content Changes

**Original Term:**
- Description: "A design pattern"
- Hash: `abc12345`

**Updated Term:**
- Description: "A design pattern that ensures single instance"
- Hash: `def67890` (different hash)

**Feedback System:**
- Old feedback stored under `abc12345`
- New term has no feedback (new hash)
- Previous feedback is not automatically transferred

**Note:** This is a limitation - if you update term content, previous feedback won't automatically apply to the new version.

---

## API Methods

### FeedbackStorage

```javascript
// Get feedback for a term
getFeedbackByTerm(term) → { feedback, timestamp, history } | null

// Add/update feedback
addFeedbackByTerm(term, feedbackText) → boolean

// Get all feedback entries
getAllFeedback() → { hash1: {...}, hash2: {...} }

// Get count
getCount() → number

// Delete feedback
deleteFeedback(hash) → boolean

// Clear all feedback
clear() → void
```

---

## Comparison Summary

| Aspect | Feedback | Deletion Queue |
|--------|----------|---------------|
| **Storage** | Single JSON object | Single JSON array |
| **Key/ID** | Content hash | Term name + folder path |
| **Purpose** | Store corrections/notes | Ignore during study |
| **Persistence** | Permanent (until deleted) | Permanent (ignore list) |
| **History** | ✅ Yes | ❌ No |
| **Cross-file** | Shared by content | Separate by location |
| **File location** | `term_feedback.json` | `deletion_queue.json` |

---

## Recommendations

1. **Feedback is content-based:** If you update a term's content significantly, previous feedback won't apply
2. **Deletion queue is location-based:** Same term name in different files are tracked separately
3. **Both are persistent:** They survive across sessions and are stored in JSON files
4. **Manual editing possible:** Both JSON files can be edited manually, but use caution
5. **Backup both:** When backing up, include both `term_feedback.json` and `deletion_queue.json`

---

## Related Files

- `src/FeedbackStorage.js` - Feedback storage implementation
- `src/DeletionQueueStorage.js` - Deletion queue storage implementation
- `src/Quizzer.js` - Integration of both systems
- `user_data/temp/term_feedback.json` - Feedback data file
- `user_data/temp/deletion_queue.json` - Deletion queue data file
