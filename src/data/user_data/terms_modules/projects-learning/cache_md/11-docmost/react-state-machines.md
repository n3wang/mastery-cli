# React State Machines Flashcards

#### Finite State Machine Basics
State machines provide predictable state management by defining explicit states and transitions, preventing impossible states:

```typescript
import { createMachine, interpret } from 'xstate';

const documentMachine = createMachine({
  id: 'document',
  initial: 'idle',
  context: {
    content: '',
    hasChanges: false,
  },
  states: {
    idle: {
      on: {
        EDIT: 'editing',
        LOAD: 'loading',
      },
    },
    loading: {
      invoke: {
        src: 'loadDocument',
        onDone: {
          target: 'idle',
          actions: 'setContent',
        },
        onError: 'error',
      },
    },
    editing: {
      on: {
        SAVE: 'saving',
        CANCEL: 'idle',
        TYPE: {
          actions: 'updateContent',
        },
      },
    },
    saving: {
      invoke: {
        src: 'saveDocument',
        onDone: 'idle',
        onError: 'error',
      },
    },
    error: {
      on: {
        RETRY: 'loading',
        DISMISS: 'idle',
      },
    },
  },
});
```

:p What are the key benefits of using finite state machines over traditional state management in React applications?
??x
**Benefits of Finite State Machines:**

1. **Impossible States Prevention**: Can't be in multiple conflicting states
2. **Predictable Transitions**: Clear rules for how state changes
3. **Visual Representation**: State charts make logic easy to understand
4. **Debugging**: Easy to track state transitions and identify issues
5. **Testing**: Can test all possible state combinations

Key advantages:
- **Deterministic**: Same input always produces same output
- **Declarative**: Describe what states exist, not how to manage them
- **Self-documenting**: State chart serves as documentation
- **Scalable**: Handle complex state logic without becoming unwieldy

Comparison with useState:
```typescript
// Traditional approach - can have impossible states
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [data, setData] = useState(null);
// What if isLoading=true AND isError=true?

// State machine approach - impossible states prevented
const [state] = useMachine(fetchMachine);
// State can only be 'loading', 'success', or 'error'
```
x??

---

#### Hierarchical States
State machines support nested states for modeling complex behaviors with substates and parallel concerns:

```typescript
const editorMachine = createMachine({
  id: 'editor',
  initial: 'active',
  states: {
    active: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            TYPE: 'typing',
            SELECT: 'selecting',
          },
        },
        typing: {
          after: {
            1000: 'idle', // Auto-return to idle after 1 second
          },
          on: {
            TYPE: {
              actions: 'updateContent',
            },
            SELECT: 'selecting',
          },
        },
        selecting: {
          on: {
            TYPE: 'typing',
            DESELECT: 'idle',
          },
        },
        // History state to remember last sub-state
        hist: {
          type: 'history',
          history: 'shallow',
        },
      },
      on: {
        BLUR: 'inactive',
        SAVE: 'saving',
      },
    },
    inactive: {
      on: {
        FOCUS: 'active.hist', // Return to previous sub-state
      },
    },
    saving: {
      invoke: {
        src: 'saveContent',
        onDone: 'active',
        onError: 'active',
      },
    },
  },
});
```

:p How do hierarchical states help organize complex UI behavior, and when would you use history states?
??x
**Hierarchical States Benefits:**

1. **Logical Grouping**: Related states are organized together
2. **Shared Transitions**: Parent state transitions apply to all children
3. **Code Reuse**: Common behavior defined at parent level
4. **Complexity Management**: Break down complex states into manageable parts

**History States Usage:**
- **Shallow History**: Remember only the immediate child state
- **Deep History**: Remember the entire nested state configuration
- **Use Cases**: Resume editing where user left off, maintain UI state across navigation

Example scenarios:
```typescript
// Media player with history
const playerMachine = createMachine({
  states: {
    playing: {
      initial: 'normal',
      states: {
        normal: {},
        fastForward: {},
        slowMotion: {},
        hist: { type: 'history' },
      },
    },
    paused: {
      on: {
        PLAY: 'playing.hist', // Resume at previous playback mode
      },
    },
  },
});
```

Benefits over flat state structure:
- Reduced state explosion
- Clearer state organization
- Easier maintenance and debugging
x??

---

#### Parallel States
State machines can model independent concerns that run simultaneously using parallel states:

```typescript
const collaborativeEditorMachine = createMachine({
  type: 'parallel',
  states: {
    // Document editing state
    document: {
      initial: 'idle',
      states: {
        idle: {
          on: { EDIT: 'editing' },
        },
        editing: {
          on: { SAVE: 'saving' },
        },
        saving: {
          invoke: {
            src: 'saveDocument',
            onDone: 'idle',
            onError: 'error',
          },
        },
        error: {},
      },
    },
    // Network connection state (independent)
    connection: {
      initial: 'disconnected',
      states: {
        disconnected: {
          invoke: {
            src: 'connectToServer',
            onDone: 'connected',
            onError: {
              target: 'disconnected',
              actions: 'scheduleReconnect',
            },
          },
        },
        connected: {
          on: {
            DISCONNECT: 'disconnected',
          },
        },
      },
    },
    // Collaboration state (independent)
    collaboration: {
      initial: 'solo',
      states: {
        solo: {
          on: {
            COLLABORATOR_JOINED: 'collaborative',
          },
        },
        collaborative: {
          on: {
            COLLABORATOR_LEFT: [
              {
                target: 'solo',
                cond: 'noCollaboratorsLeft',
              },
            ],
          },
        },
      },
    },
  },
});
```

:p When would you use parallel states in a React application, and how do they differ from hierarchical states?
??x
**Parallel States Use Cases:**

1. **Independent Concerns**: Features that operate simultaneously
2. **Cross-cutting Concerns**: Authentication, connectivity, notifications
3. **Multiple Modes**: UI can be in multiple states at once
4. **Complex Applications**: Apps with many independent features

**Parallel vs Hierarchical:**
- **Parallel**: Multiple states active simultaneously (AND relationship)
- **Hierarchical**: One state active at a time (OR relationship)

Common parallel state examples:
```typescript
// E-commerce app
const appMachine = createMachine({
  type: 'parallel',
  states: {
    auth: { /* login/logout states */ },
    cart: { /* shopping cart states */ },
    search: { /* search functionality states */ },
    notifications: { /* notification states */ },
  },
});

// Real-world benefits:
// - Cart can be updated while user is authenticated
// - Search can run while notifications are shown
// - Each concern is independent and testable
```

Key differences:
- **State representation**: Multiple state values vs single state path
- **Event handling**: Events can affect multiple parallel regions
- **Complexity**: Parallel states increase state space significantly
x??

---

#### Actions and Guards
State machines use actions for side effects and guards for conditional transitions:

```typescript
const documentMachine = createMachine({
  context: {
    content: '',
    savedContent: '',
    retryCount: 0,
  },
  states: {
    editing: {
      on: {
        TYPE: {
          actions: ['updateContent', 'markUnsaved'],
        },
        SAVE: {
          target: 'saving',
          cond: 'hasChanges',
          actions: 'incrementSaveAttempts',
        },
      },
    },
    saving: {
      invoke: {
        src: 'saveDocument',
        onDone: {
          target: 'idle',
          actions: ['markSaved', 'resetRetryCount'],
        },
        onError: [
          {
            target: 'saving',
            cond: 'canRetry',
            actions: 'incrementRetryCount',
          },
          {
            target: 'error',
            actions: 'notifyError',
          },
        ],
      },
    },
  },
}, {
  actions: {
    updateContent: assign({
      content: (_, event) => event.content,
    }),
    markUnsaved: assign({
      hasChanges: true,
    }),
    incrementRetryCount: assign({
      retryCount: (context) => context.retryCount + 1,
    }),
  },
  guards: {
    hasChanges: (context) => context.content !== context.savedContent,
    canRetry: (context) => context.retryCount < 3,
  },
});
```

:p How do actions and guards make state machines more powerful for handling complex business logic?
??x
**Actions in State Machines:**

1. **Side Effects**: Perform operations without changing state
2. **Context Updates**: Modify machine's extended state
3. **External Effects**: API calls, logging, notifications
4. **Timing**: Entry actions, exit actions, transition actions

**Guards (Conditions):**

1. **Conditional Logic**: Enable/disable transitions based on context
2. **Business Rules**: Encode domain logic directly in the machine
3. **Dynamic Behavior**: Same event can trigger different transitions
4. **Validation**: Prevent invalid state transitions

**Advanced Patterns:**
```typescript
// Action composition
const actions = {
  saveAndNotify: ['saveDocument', 'showSuccessMessage'],
  
  // Parameterized actions
  setError: assign({
    error: (_, event) => event.data.message,
  }),
  
  // Conditional actions
  maybeAutoSave: choose([
    {
      cond: 'autoSaveEnabled',
      actions: 'saveDocument',
    },
    {
      actions: 'scheduleAutoSave',
    },
  ]),
};

// Complex guards
const guards = {
  canSave: (context, event) => 
    context.hasChanges && 
    !context.isReadonly && 
    event.user.permissions.includes('write'),
    
  // Async guards (with invoke)
  hasValidData: 'validateDataService',
};
```

Benefits:
- **Declarative**: Logic is expressed as configuration
- **Testable**: Guards and actions can be tested independently
- **Reusable**: Actions and guards can be shared across machines
x??

---

#### React Integration Patterns
Integrating state machines with React components requires proper hooks and event handling:

```typescript
import { useMachine } from '@xstate/react';

const DocumentEditor = ({ documentId }) => {
  const [state, send] = useMachine(documentMachine, {
    context: {
      documentId,
    },
    services: {
      loadDocument: () => fetchDocument(documentId),
      saveDocument: (context) => saveDocument(context.documentId, context.content),
    },
    actions: {
      notifySuccess: () => toast.success('Document saved'),
      notifyError: () => toast.error('Failed to save'),
    },
  });

  // Derived state selectors
  const isEditing = state.matches('editing');
  const isSaving = state.matches('saving');
  const hasError = state.matches('error');
  const canSave = state.context.hasChanges && !isSaving;

  // Event handlers
  const handleContentChange = useCallback((content: string) => {
    send({ type: 'TYPE', content });
  }, [send]);

  const handleSave = useCallback(() => {
    send('SAVE');
  }, [send]);

  // Effect for auto-save
  useEffect(() => {
    const interval = setInterval(() => {
      if (canSave) {
        send('AUTO_SAVE');
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(interval);
  }, [canSave, send]);

  return (
    <div>
      <Editor
        content={state.context.content}
        onChange={handleContentChange}
        disabled={isSaving}
      />
      
      <SaveButton
        onClick={handleSave}
        disabled={!canSave}
        loading={isSaving}
      />
      
      {hasError && (
        <ErrorMessage
          message={state.context.error}
          onRetry={() => send('RETRY')}
        />
      )}
    </div>
  );
};
```

:p What are the best practices for integrating XState machines with React components and managing side effects?
??x
**React Integration Best Practices:**

1. **Hook Usage**:
   - Use `useMachine` for component-level state machines
   - Use `useActor` for communicating with spawned actors
   - Use `useSelector` for subscribing to specific state changes

2. **Service Injection**:
   - Pass async operations as services to the machine
   - Keep side effects outside of components
   - Use dependency injection for testability

3. **Event Handling**:
   - Wrap event handlers in `useCallback` for performance
   - Send events rather than directly manipulating state
   - Use event payloads for passing data

4. **State Selection**:
   - Use `state.matches()` for checking current state
   - Access context via `state.context`
   - Create derived selectors for computed values

**Advanced Patterns:**
```typescript
// Global state machine with React Context
const GlobalMachineContext = createContext();

const MachineProvider = ({ children }) => {
  const [state, send] = useMachine(globalMachine);
  
  return (
    <GlobalMachineContext.Provider value={[state, send]}>
      {children}
    </GlobalMachineContext.Provider>
  );
};

// Actor spawning for independent instances
const useDocumentActor = (documentId) => {
  const [state, send] = useMachine(parentMachine);
  
  useEffect(() => {
    const actor = spawn(documentMachine.withContext({ documentId }));
    send({ type: 'SPAWN_DOCUMENT', actor });
    
    return () => send({ type: 'STOP_DOCUMENT', documentId });
  }, [documentId]);
};

// Persistent state machines
const usePersistentMachine = (machineConfig, persistKey) => {
  const [state, send] = useMachine(machineConfig, {
    state: JSON.parse(localStorage.getItem(persistKey) || '{}'),
  });
  
  useEffect(() => {
    localStorage.setItem(persistKey, JSON.stringify(state));
  }, [state, persistKey]);
  
  return [state, send];
};
```
x??