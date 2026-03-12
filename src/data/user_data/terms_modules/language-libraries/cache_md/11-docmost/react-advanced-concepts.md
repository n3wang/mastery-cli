# React Advanced Concepts Flashcards - Docmost Project

#### Real-time Collaboration Architecture with WebSockets and CRDTs
Docmost implements real-time collaborative editing using Hocuspocus (Y.js) for conflict-free replicated data types and WebSocket synchronization:

```typescript
// Collaboration provider setup
export const useCollaboration = (pageId: string, user: User) => {
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const [yDoc, setYDoc] = useState<Y.Doc | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    const doc = new Y.Doc();
    const collabProvider = new HocuspocusProvider({
      url: getCollaborationUrl(pageId),
      name: pageId,
      document: doc,
      token: await getCollabToken(),
      onConnect: () => setIsConnected(true),
      onDisconnect: () => setIsConnected(false),
      onAuthenticationFailed: () => {
        // Handle auth failure
        refreshAuthToken().then(newToken => {
          collabProvider.setToken(newToken);
        });
      },
    });

    // Awareness for cursor tracking
    collabProvider.awareness.setLocalStateField('user', {
      name: user.name,
      color: user.color,
      cursor: null,
    });

    setYDoc(doc);
    setProvider(collabProvider);

    return () => {
      collabProvider.destroy();
      doc.destroy();
    };
  }, [pageId, user]);

  // Operational transform handler
  const handleUpdate = useCallback((update: Uint8Array, origin: any) => {
    if (origin !== provider) {
      // Apply remote changes
      Y.applyUpdate(yDoc, update);
    }
  }, [yDoc, provider]);

  return { provider, yDoc, isConnected, awareness: provider?.awareness };
};

// TipTap editor integration with Y.js
export const useCollaborativeEditor = (pageId: string) => {
  const { yDoc, provider, isConnected } = useCollaboration(pageId, currentUser);
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Collaboration.configure({
        document: yDoc,
        field: 'content',
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: currentUser,
      }),
      // Custom extensions for mentions, embeds, etc.
    ],
    onUpdate: ({ editor, transaction }) => {
      // Handle local changes and sync
      if (!transaction.getMeta('fromCollab')) {
        // This is a local change, will be synced via Y.js
        broadcastPresence(editor.state.selection);
      }
    },
  });

  return { editor, isConnected, collaborators: provider?.awareness.getStates() };
};
```

This architecture handles conflict resolution, presence awareness, authentication, and real-time synchronization.
:p How would you architect a real-time collaborative text editor in React that handles multiple simultaneous editors, conflict resolution, presence awareness (cursors/selections), offline editing with sync on reconnect, and performance optimization for large documents? What are the key challenges in implementing operational transforms vs CRDTs, and how would you handle network partitions and eventual consistency?
??x
**Real-time Collaboration Architecture:**

1. **CRDT vs Operational Transforms**:
   - **CRDTs (Y.js)**: Mathematically proven convergence, no central authority needed, better for P2P
   - **OT**: Requires central server for ordering, more complex state management, better for centralized systems
   - **Choice**: CRDTs for easier implementation and better offline support

2. **Conflict Resolution Strategy**:
   - Use Y.js shared types (Y.Text, Y.Map) for automatic conflict resolution
   - Implement vector clocks for causality tracking
   - Last-writer-wins for metadata, semantic merging for content
   - Preserve user intent through operation context

3. **Presence and Awareness**:
   - Separate awareness protocol from document state
   - Ephemeral state for cursors, selections, user status
   - Timeout-based cleanup for disconnected users
   - Efficient updates using delta compression

4. **Performance Optimization**:
   - Lazy loading of document chunks
   - Incremental parsing and rendering
   - Virtual scrolling for large documents
   - Debounced synchronization for rapid changes

5. **Network Resilience**:
   - Offline-first architecture with local persistence
   - Exponential backoff for reconnection
   - Delta synchronization on reconnect
   - Conflict resolution for divergent offline changes

**Implementation patterns:**
```typescript
class CollaborativeDocument {
  private yDoc: Y.Doc;
  private provider: WebSocketProvider;
  private awareness: Awareness;
  
  constructor(docId: string) {
    this.yDoc = new Y.Doc();
    this.setupProvider(docId);
    this.handleOfflineSupport();
  }
  
  private handleOfflineSupport() {
    // IndexedDB persistence
    const persistence = new IndexeddbPersistence(docId, this.yDoc);
    
    // Sync on reconnect
    this.provider.on('status', ({ status }) => {
      if (status === 'connected') {
        this.syncPendingChanges();
      }
    });
  }
  
  private resolveConflicts(localOps: Operation[], remoteOps: Operation[]) {
    // Implement semantic conflict resolution
    return this.mergeOperations(localOps, remoteOps);
  }
}
```
x??

---

#### Advanced State Patterns: Finite State Machines and State Charts
Complex UI interactions benefit from formal state management using finite state machines. Docmost could implement FSM for page editing states:

```typescript
import { createMachine, interpret, assign } from 'xstate';

// Page editing state machine
const pageEditingMachine = createMachine({
  id: 'pageEditor',
  initial: 'idle',
  context: {
    pageId: null,
    content: '',
    lastSaved: null,
    collaborators: [],
    conflicts: [],
  },
  states: {
    idle: {
      on: {
        OPEN_PAGE: {
          target: 'loading',
          actions: assign({ pageId: (_, event) => event.pageId }),
        },
      },
    },
    loading: {
      invoke: {
        src: 'loadPage',
        onDone: {
          target: 'editing',
          actions: assign({
            content: (_, event) => event.data.content,
            lastSaved: (_, event) => event.data.updatedAt,
          }),
        },
        onError: 'error',
      },
    },
    editing: {
      initial: 'synced',
      states: {
        synced: {
          on: {
            TYPE: {
              target: 'unsaved',
              actions: assign({
                content: (_, event) => event.content,
              }),
            },
            COLLABORATOR_JOINED: {
              actions: assign({
                collaborators: (context, event) => [
                  ...context.collaborators,
                  event.user,
                ],
              }),
            },
          },
        },
        unsaved: {
          after: {
            2000: { target: 'saving' }, // Auto-save after 2s
          },
          on: {
            TYPE: {
              actions: assign({ content: (_, event) => event.content }),
            },
            SAVE: 'saving',
            CONFLICT_DETECTED: 'conflicted',
          },
        },
        saving: {
          invoke: {
            src: 'savePage',
            onDone: {
              target: 'synced',
              actions: assign({
                lastSaved: () => new Date().toISOString(),
              }),
            },
            onError: 'failed',
          },
        },
        conflicted: {
          on: {
            RESOLVE_CONFLICT: {
              target: 'saving',
              actions: assign({
                content: (_, event) => event.resolvedContent,
                conflicts: [],
              }),
            },
            DISCARD_CHANGES: {
              target: 'synced',
              actions: assign({
                content: (context, _) => context.lastSavedContent,
                conflicts: [],
              }),
            },
          },
        },
        failed: {
          on: {
            RETRY: 'saving',
            DISCARD: 'synced',
          },
        },
      },
      on: {
        CLOSE_PAGE: 'idle',
        NETWORK_ERROR: '.failed',
      },
    },
    error: {
      on: {
        RETRY: 'loading',
        CLOSE: 'idle',
      },
    },
  },
}, {
  services: {
    loadPage: (context) => fetchPage(context.pageId),
    savePage: (context) => savePage(context.pageId, context.content),
  },
});

// React hook for state machine
export const usePageEditor = (pageId: string) => {
  const [state, send] = useMachine(pageEditingMachine, {
    context: { pageId },
  });

  const actions = {
    openPage: (id: string) => send({ type: 'OPEN_PAGE', pageId: id }),
    updateContent: (content: string) => send({ type: 'TYPE', content }),
    save: () => send({ type: 'SAVE' }),
    resolveConflict: (content: string) => 
      send({ type: 'RESOLVE_CONFLICT', resolvedContent: content }),
  };

  return {
    state: state.value,
    context: state.context,
    actions,
    canSave: state.matches('editing.unsaved'),
    isLoading: state.matches('loading'),
    hasConflicts: state.matches('editing.conflicted'),
  };
};
```

FSMs provide predictable state transitions and prevent impossible states.
:p How would you implement a complex UI state management system using finite state machines for a collaborative document editor that handles editing states, auto-save, conflict resolution, network failures, and user presence? What are the advantages of FSMs over traditional state management, and how would you handle nested states and parallel state machines?
??x
**Finite State Machine Benefits for Complex UI:**

1. **Predictable State Transitions**:
   - Impossible states are prevented by design
   - Clear transition rules and guards
   - Deterministic behavior under all conditions
   - Visual representation of state flow

2. **Complex State Orchestration**:
   - Hierarchical states for nested behaviors
   - Parallel states for independent concerns
   - History states for returning to previous states
   - Guarded transitions with conditions

3. **Error Handling and Recovery**:
   - Explicit error states with recovery paths
   - Timeout handling for async operations
   - Network failure recovery strategies
   - Graceful degradation patterns

**Advanced FSM Patterns:**
```typescript
// Parallel state machines for independent concerns
const editorMachine = createMachine({
  type: 'parallel',
  states: {
    document: {
      initial: 'loading',
      states: {
        loading: { /* ... */ },
        editing: { /* ... */ },
        saving: { /* ... */ },
      },
    },
    collaboration: {
      initial: 'disconnected',
      states: {
        disconnected: { /* ... */ },
        connecting: { /* ... */ },
        connected: { /* ... */ },
      },
    },
    conflict: {
      initial: 'none',
      states: {
        none: { /* ... */ },
        detected: { /* ... */ },
        resolving: { /* ... */ },
      },
    },
  },
});

// Nested states with history
const editingState = {
  initial: 'idle',
  states: {
    idle: { /* ... */ },
    typing: {
      initial: 'normal',
      states: {
        normal: { /* ... */ },
        selecting: { /* ... */ },
        formatting: { /* ... */ },
      },
    },
    hist: { type: 'history' }, // Return to last sub-state
  },
};

// Guards and actions for complex logic
const guards = {
  canSave: (context, event) => 
    context.hasChanges && !context.isReadonly,
  hasConflicts: (context) => 
    context.conflicts.length > 0,
  isOnline: () => navigator.onLine,
};

const actions = {
  saveToLocal: assign({
    localSave: () => Date.now(),
  }),
  notifyCollaborators: (context, event) => {
    broadcastUpdate(context.pageId, event.changes);
  },
  mergeConflicts: assign({
    content: (context, event) => 
      mergeOperationalTransforms(context.content, event.remoteChanges),
  }),
};
```

**Integration with React:**
```typescript
const useDocumentEditor = () => {
  const [state, send] = useMachine(editorMachine);
  
  // Derived state selectors
  const selectors = {
    isEditing: state.matches('document.editing'),
    isConnected: state.matches('collaboration.connected'),
    hasConflicts: state.matches('conflict.detected'),
    canUndo: state.context.history.length > 0,
  };
  
  // Action creators
  const actions = useMemo(() => ({
    startEdit: () => send('START_EDIT'),
    saveDocument: () => send('SAVE'),
    resolveConflict: (resolution) => 
      send({ type: 'RESOLVE', resolution }),
  }), [send]);
  
  return { state, selectors, actions };
};
```
x??

---

#### Performance Optimization: React.memo, useMemo, and useCallback Patterns
Docmost optimizes rendering performance using memoization strategies for complex components and expensive computations:

```typescript
// Expensive computation memoization
const PageRenderer = React.memo(({ page, user, permissions }: PageProps) => {
  // Memoize expensive markdown parsing
  const renderedContent = useMemo(() => {
    return parseMarkdownWithPlugins(page.content, {
      mentions: true,
      embeds: true,
      diagrams: true,
      mathematics: true,
    });
  }, [page.content]);

  // Memoize permission checks
  const userPermissions = useMemo(() => {
    return computePagePermissions(user, page, permissions);
  }, [user.id, page.id, permissions]);

  // Stable event handlers
  const handleContentChange = useCallback((newContent: string) => {
    const optimisticUpdate = {
      id: page.id,
      content: newContent,
      updatedAt: new Date().toISOString(),
    };
    
    // Optimistic update with debounced save
    updatePageOptimistically(optimisticUpdate);
    debouncedSave(optimisticUpdate);
  }, [page.id, updatePageOptimistically, debouncedSave]);

  const handleCollaboratorCursor = useCallback((cursorData: CursorData) => {
    // Only update if cursor actually moved
    if (isEqual(cursorData, previousCursorRef.current)) return;
    
    updateCollaboratorCursor(cursorData);
    previousCursorRef.current = cursorData;
  }, [updateCollaboratorCursor]);

  return (
    <div className="page-renderer">
      <PageHeader 
        title={page.title}
        permissions={userPermissions}
        onEdit={handleContentChange}
      />
      <ContentEditor
        content={renderedContent}
        onChange={handleContentChange}
        onCursorChange={handleCollaboratorCursor}
        collaborators={page.collaborators}
      />
    </div>
  );
});

// Complex list virtualization with memoization
const PageList = ({ pages, onPageSelect }: PageListProps) => {
  // Memoize filtered and sorted pages
  const processedPages = useMemo(() => {
    return pages
      .filter(page => !page.isDeleted)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .map(page => ({
        ...page,
        searchHighlight: highlightSearchTerms(page.title, searchTerm),
      }));
  }, [pages, searchTerm]);

  // Virtualization for large lists
  const { virtualItems, totalSize } = useVirtualizer({
    count: processedPages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 60, []),
    overscan: 5,
  });

  // Memoize individual list items
  const MemoizedPageItem = React.memo(({ page, onSelect }: PageItemProps) => {
    const handleClick = useCallback(() => {
      onSelect(page.id);
    }, [page.id, onSelect]);

    return (
      <div onClick={handleClick} className="page-item">
        <PageThumbnail pageId={page.id} />
        <PageMetadata page={page} />
      </div>
    );
  });

  return (
    <div ref={parentRef} className="page-list-container">
      <div style={{ height: totalSize }}>
        {virtualItems.map(virtualRow => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: virtualRow.size,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <MemoizedPageItem
              page={processedPages[virtualRow.index]}
              onSelect={onPageSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
```

This demonstrates strategic memoization for expensive operations, stable references, and virtualization for performance.
:p In a complex React application with real-time collaboration, large datasets, and frequent updates, how would you implement a comprehensive performance optimization strategy? What are the trade-offs between React.memo, useMemo, and useCallback, and how would you identify and resolve performance bottlenecks in components with deep prop drilling, frequent re-renders, and expensive computations?
??x
**Comprehensive Performance Optimization Strategy:**

1. **Profiling and Measurement**:
   - Use React DevTools Profiler to identify slow components
   - Measure actual performance impact, not theoretical optimizations
   - Track key metrics: render time, component updates, memory usage
   - A/B test performance improvements

2. **Memoization Strategy**:
   - **React.memo**: For expensive components with stable props
   - **useMemo**: For expensive computations, not cheap operations
   - **useCallback**: Only when passing to memoized components or effect dependencies
   - Avoid over-memoization - can hurt performance if used incorrectly

3. **Structural Optimizations**:
   - Component splitting to minimize re-render scope
   - State lifting/lowering to appropriate levels
   - Context splitting to avoid unnecessary updates
   - Virtualization for large lists

4. **Real-time Data Optimization**:
   - Debouncing/throttling for rapid updates
   - Selective state updates (only changed fields)
   - Optimistic updates with conflict resolution
   - Background synchronization

**Advanced Patterns:**
```typescript
// Performance monitoring hook
const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      if (end - start > 16) { // > 1 frame
        console.warn(`Slow render: ${componentName} took ${end - start}ms`);
      }
    };
  });
};

// Selective memoization based on props
const ExpensiveComponent = React.memo(({ data, config, onUpdate }) => {
  // Only memoize if computation is actually expensive
  const processedData = useMemo(() => {
    if (data.length < 100) return data; // Skip memoization for small datasets
    return heavyProcessing(data, config);
  }, [data, config]);

  // Stable reference only when needed
  const handleUpdate = useCallback((id: string, changes: any) => {
    onUpdate(id, changes);
  }, [onUpdate]); // onUpdate should be stable from parent

  return <div>{/* render */}</div>;
}, (prevProps, nextProps) => {
  // Custom comparison for complex objects
  return (
    prevProps.data.length === nextProps.data.length &&
    isEqual(prevProps.config, nextProps.config) &&
    prevProps.onUpdate === nextProps.onUpdate
  );
});

// Context optimization for large apps
const UserContext = createContext();
const PermissionsContext = createContext();
const ThemeContext = createContext();

// Split contexts to prevent unnecessary re-renders
const AppProvider = ({ children }) => (
  <UserProvider>
    <PermissionsProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </PermissionsProvider>
  </UserProvider>
);

// Virtualization with dynamic heights
const DynamicVirtualList = ({ items }) => {
  const measureRef = useRef();
  
  const { virtualItems } = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback((index) => {
      // Dynamic size based on content
      return items[index].type === 'image' ? 200 : 60;
    }, [items]),
    measureElement: measureRef.current,
  });

  return (
    <div ref={parentRef}>
      {virtualItems.map(item => (
        <VirtualItem
          key={item.key}
          ref={measureRef}
          item={items[item.index]}
        />
      ))}
    </div>
  );
};
```

**Performance Debugging Checklist:**
1. Profile first, optimize second
2. Measure before and after optimizations
3. Check for unnecessary re-renders with React DevTools
4. Validate prop stability and reference equality
5. Monitor bundle size and code splitting effectiveness
6. Test performance on lower-end devices
x??