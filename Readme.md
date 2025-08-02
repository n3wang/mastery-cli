# Mastery CLI

![](https://media.giphy.com/media/eveBk0ptKzjqUe0iTg/giphy.gif)

Docs: https://nenewang.github.io/mastery-cli/
compiled build: https://k00.fr/lak37m7l

Mastery CLI: Your Command Line Assistant for Programmer Development"

Mastery CLI is a ghost tool* designed to boost your programming/engineering skills. It features flashcards, DSA practice, statistics, and habit hooks. For instance, every commit now triggers a random flashcard or suggests a DSA problem to solve, fostering continuous learning.




| features                                                                | img                                   |
| ----------------------------------------------------------------------- | ------------------------------------- |
| Convert your Markdown Notes into Flashcards                             | ![alt text](img/markdown-toimage.png) |
| Upgrade your skills, and keep record of your progress with Mastery CLI. | ![alt text](img/progress-record.png)      |
| Auto flashcards deck sort algorithm that prioritizes the ones you need to study most using "least practiced first" algorithm | add image |
| Pushing Code and Flashcards Hook - Taking a page from cd ci pipelines, upgrade your skills by doing 2-3 flashcards after every commit or push with `mcli coa "message"` (git add --all, git commit -m "message" ) or `mcli poh` (push origin HEAD)  | ![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzYzYzU5NWJiMjNhNThkYzBkNTJlM2MxNjFjZjdiNzJiMTZhMGVmOSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/JavdJQ8YjfQyOq0Cfy/giphy.gif) | 
`mcli dsa --all` - checkout over more than 150+ offline data structures and algorithms problems, with a built-in compiler and offline tests. | ![alt text](img/dsa-problems.png) |
`cli dsa` - Use our algorithmic path to learn and master neetcode 150 problems one b one | ![alt text](img/dsa-path.png) |
`mcli ses` - Create a session for mastery an entire flashcards decks. (useful for studying for exams) | ![alt text](img/sessions.png) |


Key Highlights:

- Easily track personal project goals, such as daily commits.
- Access over 150 offline programming problems with accompanying offline tests and a built-in compiler.
- Utilize an offline algorithm that identifies weaknesses and generates quick flashcards for memory refresh.
- Preloaded with flascard decks from Computer Science Architecture, Networking, AWS, System Design, Design Patterns classes.


## Install and Test.
```
npm install -g mastery-cli
mcli report
mcli quiz
mcli report
```

- You need to install nvim for the dsa option to work
- Eventually you would be able to select your own editor.


Currently under development.
- We are cleaning up the codebase, and adding more features.
- Currently 100% offline. So that this can be used in corporate environments. (not sending any data to the cloud, and all is local)
- We are removing unused libraries to keep it as clean as possible, some libraries use local ones that you might need to install using:

```
npm install file:custom_modules/node-json-db-1.0.1
npm install file:custom_modules/terminal-charter-master
```


Setup your editor in `utils/dsa-cli/user_files/temp_settings.json` to use your preferred editor for DSA problems.


## Help

We support multiple ways to call the cli, for instance, you can use `mastery-cli`, `mastery`, or `mcli` to access the tool. 

Supported calls:

```
mcli
mastery
m-cli
```

### Settings.

Change the editor in 

```
utils/dsa-cli/user_files/temp_settings.json
```

## Usage

TODO: Add more usage examples


Commiting a code and pushing it to HEAD


## Skills Integration

Now you can track locally the type of cards you are studying, and the type of problems you are solving.
You will be able to see the progress of your skills, and the type of problems you are solving.

```
mcli skill
```
TODO Explain the skill system and the skill leveling up system, as well as how the skills report distributes by dates and the type of problems you are solving.


TODO add images of skill report with arrows explaining.


TODO Add the 


## Smart Term Selection - Train cards and distribute them based on practice history

an intelligent term selection system that remembers which flashcards you've practiced and prioritizes the ones you need to study most.

How It Works:

The system uses content-based hashing to track your practice history:

1. **Unique Term Identification**: Each flashcard gets a unique 8-character hash based on its content (term + description + example)
2. **Completion Tracking**: Every time you successfully complete a flashcard, the system increments its completion count
3. **Smart Selection**: When selecting terms for study, the system prioritizes cards with fewer completions by randomnly choosing a sample of `sample_size` cards (configurale at `src/user_data/settings.json`) and selecting the one with the least completions. Can be enabled/disabled


 Run the tests:

```bash
npx mocha tests/test_hash_storage.test.js          
#  Hash storage tests

npx mocha tests/test_quizzler.test.js              
# Quizzer integration tests
```

### Flashcards

TODO Explain the process of adding flashcards individually, or using the modules to add flashcards in bulk. (or even automatically)

```
mcli term
```

Math Problems:

```
mcli math
```


### Data Structures and Algorithms 

By default we include a datastructure algorithms module with over 150+ problems, and a built-in compiler to test your code. For more information about how to use it please refer to `EXTERNAL_DSA_PROBLEMS.md`


TODO Explain in depth the dsa system. And how to add new problems to the collection.

TODO Explain the Cloze Demo, Cloze Sessions and others. 


We have a collection of DSA problems that you can solve.

View DSA problems:
```
mcli dsa
```

- We keep track of solved problems, as well as new problems.


View all DSA Problems

```
mcli dsa --all
```


## Need Help?

- Run `mastery --help` for all commands
- Each command has detailed prompts to guide you
- Settings are explained when you first run the tool


## For Developers

Feel free to take a card at: https://github.com/users/n3wang/projects/3/views/2
And contribute

### Project Structure
```
src/
├── extensions/          # Feature modules
│   └── dsa-cli/        # Algorithm practice features
├── terms_data/         # Built-in flashcard content
├── user_data/          # Your personal settings and progress
└── utils/              # Helper functions
```

### Key Files
- `index.js` - Main entry point
- `src/constants.js` - Configuration constants
- `src/extensions/dsa-cli/` - All algorithm-related code
- `src/user_data/settings.json` - User preferences

### Queue Configuration

You can customize queue lengths and behavior for various core features by modifying `src/user_data/settings.json`:

```json
{
  "queue_configurations": {
    "quizzer_repetitive_limit": 3,           // Max repetitive questions in Quizzer
    "quizzer_force_learn_limit": 2,          // Force learn limit in Quizzer  
    "quizzer_force_learn_last_three": 3,     // Last items to process in force learn mode
    "term_scheduler_working_set_length": 5,  // Working set size for Terms Scheduler
    "mini_term_scheduler_working_set_length": 3, // Working set size for Mini Term Scheduler
    "quiz_allow_reattempts": 3,              // Number of allowed reattempts for quiz questions
    "hash_based_selection": {
      "enabled": true,                       // Enable smart term selection
      "sample_size": 15,                     // Terms to sample for selection (10-20 recommended)
      "hash_length": 8                       // Hash length for term identification
    }
  }
}
```

These settings control the behavior of:
- **Quizzer.js** (`src/Quizzer.js`): Controls repetitive questions, force learning modes, and smart term selection
- **HashStorage** (`src/HashStorage.js`): Manages hash-based term completion tracking and intelligent selection
- **TermScheduler** (`src/termScheduler.js`): Manages working set length for term learning
- **MiniTermScheduler** (`src/MiniTermScheduler.js`): Controls working set for mini term sessions

### Adding New Features
1. Create a new extension in `src/extensions/`
2. Export your commands from the extension
3. The main CLI will automatically discover them



### Adding Extensions

TODO Explain this part better

1. Create a new directory in `src/extensions/` for your extension
2. Add your code files to this directory
3. Export your commands from the extension
4. The main CLI will automatically discover them


