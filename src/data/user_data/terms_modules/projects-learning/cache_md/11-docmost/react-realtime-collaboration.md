# React Real-time Collaboration Flashcards

#### WebSocket Provider Setup
Setting up real-time collaboration requires managing WebSocket connections with proper error handling and reconnection logic:

```typescript
export const useCollaboration = (pageId: string, user: User) => {
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    const collabProvider = new HocuspocusProvider({
      url: getCollaborationUrl(pageId),
      name: pageId,
      token: await getCollabToken(),
      onConnect: () => setIsConnected(true),
      onDisconnect: () => setIsConnected(false),
      onAuthenticationFailed: () => {
        refreshAuthToken().then(newToken => {
          collabProvider.setToken(newToken);
        });
      },
    });

    setProvider(collabProvider);
    return () => collabProvider.destroy();
  }, [pageId]);

  return { provider, isConnected };
};
```

:p How would you handle WebSocket reconnection, authentication failures, and connection state management in a collaborative React application?
??x
**WebSocket Connection Management:**

1. **Reconnection Strategy**: Exponential backoff with jitter, max retry attempts
2. **Authentication Handling**: Token refresh on auth failure, fallback to login
3. **State Management**: Track connection status, sync queue for offline changes
4. **Error Recovery**: Circuit breaker pattern, graceful degradation

Key patterns:
```typescript
const useReconnection = () => {
  const [retryCount, setRetryCount] = useState(0);
  
  const reconnect = useCallback(async () => {
    const delay = Math.min(1000 * Math.pow(2, retryCount), 30000);
    await new Promise(resolve => setTimeout(resolve, delay));
    // Attempt reconnection
  }, [retryCount]);
};
```
x??

---

#### Y.js Document Synchronization
Y.js provides conflict-free replicated data types (CRDTs) for automatic conflict resolution in collaborative editing:

```typescript
export const useYjsDocument = (pageId: string) => {
  const [yDoc, setYDoc] = useState<Y.Doc | null>(null);
  
  useEffect(() => {
    const doc = new Y.Doc();
    
    // Listen for document updates
    const handleUpdate = (update: Uint8Array, origin: any) => {
      if (origin !== 'local') {
        // Remote update - apply to editor
        applyUpdateToEditor(update);
      }
    };
    
    doc.on('update', handleUpdate);
    setYDoc(doc);
    
    return () => {
      doc.off('update', handleUpdate);
      doc.destroy();
    };
  }, [pageId]);

  const updateDocument = useCallback((changes: any) => {
    if (yDoc) {
      yDoc.transact(() => {
        // Apply local changes
        const yText = yDoc.getText('content');
        yText.insert(changes.index, changes.text);
      }, 'local');
    }
  }, [yDoc]);

  return { yDoc, updateDocument };
};
```

:p What are CRDTs and how do they solve the challenge of concurrent editing without requiring a central coordination server?
??x
**CRDTs (Conflict-free Replicated Data Types):**

1. **Mathematical Guarantee**: Operations are commutative, associative, and idempotent
2. **No Central Authority**: Each peer can apply operations independently
3. **Eventual Consistency**: All nodes converge to the same state eventually
4. **Operation-based vs State-based**: Y.js uses operation-based CRDTs

Benefits over Operational Transforms:
- No need for central server coordination
- Better offline support and P2P scenarios
- Simpler implementation without transform functions
- Proven convergence properties

Y.js specifically uses:
- Y.Text for collaborative text editing
- Y.Map for key-value data
- Y.Array for ordered lists
- Vector clocks for causality tracking
x??

---

#### Presence and Awareness System
Implementing user presence (cursors, selections) requires separate ephemeral state management from document content:

```typescript
export const usePresence = (provider: HocuspocusProvider, user: User) => {
  const [collaborators, setCollaborators] = useState<Map<number, UserPresence>>(new Map());
  
  useEffect(() => {
    if (!provider?.awareness) return;
    
    // Set local user state
    provider.awareness.setLocalStateField('user', {
      name: user.name,
      color: user.color,
      cursor: null,
      selection: null,
    });

    const handleAwarenessChange = () => {
      const states = provider.awareness.getStates();
      const newCollaborators = new Map();
      
      states.forEach((state, clientId) => {
        if (clientId !== provider.awareness.clientID && state.user) {
          newCollaborators.set(clientId, state.user);
        }
      });
      
      setCollaborators(newCollaborators);
    };

    provider.awareness.on('change', handleAwarenessChange);
    return () => provider.awareness.off('change', handleAwarenessChange);
  }, [provider, user]);

  const updateCursor = useCallback((position: { x: number; y: number }) => {
    if (provider?.awareness) {
      provider.awareness.setLocalStateField('cursor', position);
    }
  }, [provider]);

  return { collaborators, updateCursor };
};
```

:p How do you implement user presence indicators (cursors, selections) that are ephemeral and don't persist in the document history?
??x
**Presence System Implementation:**

1. **Ephemeral State**: Use awareness protocol separate from document state
2. **Real-time Updates**: Broadcast cursor/selection changes immediately
3. **Cleanup**: Automatic timeout for disconnected users
4. **Performance**: Throttle updates to avoid overwhelming the network

Key considerations:
- **Separate Protocol**: Presence data uses different channel than document changes
- **Timeout Handling**: Remove stale presence after connection timeout
- **Throttling**: Debounce cursor movements to reduce network traffic
- **Privacy**: Allow users to hide their presence/cursor

Example awareness update:
```typescript
const updatePresence = debounce((selection) => {
  awareness.setLocalStateField('selection', {
    anchor: selection.anchor,
    head: selection.head,
    timestamp: Date.now(),
  });
}, 100);
```
x??

---

#### Conflict Resolution Strategies
Handling conflicts when multiple users edit the same content simultaneously requires sophisticated merge strategies:

```typescript
export const useConflictResolution = (editor: Editor, yDoc: Y.Doc) => {
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  
  useEffect(() => {
    const handleConflict = (event: ConflictEvent) => {
      const conflict = {
        id: generateId(),
        type: event.type,
        localChange: event.localChange,
        remoteChange: event.remoteChange,
        timestamp: new Date(),
        resolved: false,
      };
      
      setConflicts(prev => [...prev, conflict]);
    };
    
    // Listen for conflicts
    yDoc.on('conflict', handleConflict);
    
    return () => yDoc.off('conflict', handleConflict);
  }, [yDoc]);

  const resolveConflict = useCallback((conflictId: string, resolution: 'local' | 'remote' | 'merge') => {
    const conflict = conflicts.find(c => c.id === conflictId);
    if (!conflict) return;

    yDoc.transact(() => {
      switch (resolution) {
        case 'local':
          // Keep local change, discard remote
          break;
        case 'remote':
          // Apply remote change, discard local
          break;
        case 'merge':
          // Attempt semantic merge
          const merged = mergeChanges(conflict.localChange, conflict.remoteChange);
          applyMergedChange(merged);
          break;
      }
    });

    setConflicts(prev => prev.filter(c => c.id !== conflictId));
  }, [conflicts, yDoc]);

  return { conflicts, resolveConflict };
};
```

:p What strategies can you use to resolve conflicts in collaborative editing when two users make incompatible changes to the same content?
??x
**Conflict Resolution Strategies:**

1. **Automatic Resolution**:
   - Last Writer Wins (simple but loses data)
   - Operational Transform (complex but preserves intent)
   - CRDT merge (mathematical convergence)

2. **Manual Resolution**:
   - Present conflict to users with diff view
   - Allow users to choose resolution strategy
   - Provide merge assistance with suggestions

3. **Semantic Merging**:
   - Understand content context (code, text, data)
   - Apply domain-specific merge rules
   - Preserve user intent when possible

4. **Prevention Strategies**:
   - Fine-grained locking (paragraph/line level)
   - Intent detection and warnings
   - Real-time conflict highlighting

Implementation approaches:
```typescript
const conflictResolver = {
  text: (local, remote) => {
    // For text: try to merge non-overlapping changes
    return mergeTextChanges(local, remote);
  },
  
  code: (local, remote) => {
    // For code: use AST-based merging
    return mergeCodeChanges(local, remote);
  },
  
  structured: (local, remote) => {
    // For structured data: field-level merging
    return mergeObjectChanges(local, remote);
  },
};
```
x??

---

#### Offline Support and Sync
Implementing offline editing with eventual consistency when reconnecting to the collaboration server:

```typescript
export const useOfflineSupport = (pageId: string, yDoc: Y.Doc) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingChanges, setPendingChanges] = useState<Change[]>([]);
  
  useEffect(() => {
    // Monitor online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      // Store changes locally while offline
      const persistence = new IndexeddbPersistence(pageId, yDoc);
      
      const handleUpdate = (update: Uint8Array) => {
        // Queue changes for sync when online
        setPendingChanges(prev => [...prev, {
          update,
          timestamp: Date.now(),
        }]);
      };
      
      yDoc.on('update', handleUpdate);
      
      return () => {
        yDoc.off('update', handleUpdate);
        persistence.destroy();
      };
    }
  }, [isOnline, pageId, yDoc]);

  const syncPendingChanges = useCallback(async () => {
    if (isOnline && pendingChanges.length > 0) {
      try {
        // Sync all pending changes
        await syncChangesToServer(pendingChanges);
        setPendingChanges([]);
      } catch (error) {
        console.error('Failed to sync pending changes:', error);
      }
    }
  }, [isOnline, pendingChanges]);

  return { isOnline, pendingChanges, syncPendingChanges };
};
```

:p How would you implement offline editing support that allows users to continue working when disconnected and properly syncs changes when they reconnect?
??x
**Offline Support Implementation:**

1. **Local Persistence**:
   - IndexedDB for storing document state
   - Queue pending operations while offline
   - Maintain vector clocks for ordering

2. **Conflict Detection on Reconnect**:
   - Compare local and remote vector clocks
   - Identify divergent changes
   - Apply conflict resolution strategies

3. **Sync Strategies**:
   - Delta sync (only changed parts)
   - Full document reconciliation if needed
   - Progress indicators for large syncs

4. **User Experience**:
   - Clear offline indicators
   - Show pending sync status
   - Allow users to force sync

Key components:
```typescript
class OfflineManager {
  private changeQueue: ChangeQueue;
  private persistence: IndexeddbPersistence;
  
  async syncOnReconnect() {
    const localState = await this.persistence.getState();
    const remoteState = await this.fetchRemoteState();
    
    const conflicts = this.detectConflicts(localState, remoteState);
    
    if (conflicts.length > 0) {
      return this.resolveConflicts(conflicts);
    }
    
    return this.applyPendingChanges();
  }
}
```
x??