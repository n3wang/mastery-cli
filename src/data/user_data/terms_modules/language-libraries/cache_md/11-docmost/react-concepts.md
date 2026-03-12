# React Concepts Flashcards - Docmost Project

#### Advanced Custom Hooks with State Synchronization
Custom hooks can manage complex state interactions, side effects, and cross-component synchronization. Docmost's useAuth demonstrates advanced patterns like cleanup, error recovery, and state consistency:

```typescript
export default function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [, setCurrentUser] = useAtom(currentUserAtom);

  const handleSignIn = async (data: ILogin) => {
    setIsLoading(true);
    try {
      const response = await login(data);
      // Complex branching logic based on security requirements
      if (response?.userHasMfa) {
        navigate(APP_ROUTE.AUTH.MFA_CHALLENGE);
      } else if (response?.requiresMfaSetup) {
        navigate(APP_ROUTE.AUTH.MFA_SETUP_REQUIRED);
      } else {
        navigate(APP_ROUTE.HOME);
      }
    } catch (err) {
      setIsLoading(false);
      // Centralized error handling with user feedback
      notifications.show({ message: err.response?.data.message, color: "red" });
    }
  };

  const handleLogout = async () => {
    setCurrentUser(RESET); // Jotai state reset
    await logout();
    window.location.replace(APP_ROUTE.AUTH.LOGIN); // Hard navigation
  };

  return { signIn: handleSignIn, logout: handleLogout, isLoading };
}
```

This pattern handles async operations, state cleanup, navigation side effects, and error boundaries.
:p In a React application with complex authentication flows, how would you design a custom hook that manages multiple authentication states, handles MFA challenges, ensures proper cleanup on logout, and maintains consistency between local state and global atoms? What are the key considerations for error handling and state synchronization?
??x
Design considerations:
1. **State Management Strategy**: Use atomic state (Jotai/Zustand) for global auth state, local useState for UI-specific state
2. **Error Boundaries**: Centralized error handling with user notifications and fallback states
3. **Cleanup Patterns**: Reset global state on logout, clear tokens, invalidate React Query cache
4. **Side Effect Management**: Use useEffect for token validation, automatic logout on expiry
5. **Security Flow**: Handle MFA challenges, token refresh, session management
6. **Navigation Logic**: Conditional routing based on auth state, prevent navigation during loading

Example structure:
```typescript
function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setUser] = useAtom(userAtom);
  const queryClient = useQueryClient();
  
  const cleanup = useCallback(() => {
    setUser(RESET);
    queryClient.clear();
    localStorage.removeItem('tokens');
  }, []);
  
  // Complex auth logic with proper error boundaries
}
```
x??

---

#### Advanced Jotai Patterns: Derived Atoms and State Composition
Jotai enables sophisticated state architectures with derived atoms, async atoms, and state composition. Docmost demonstrates complex patterns for user permissions and real-time collaboration:

```typescript
import { atom } from 'jotai';
import { atomWithReset, RESET } from 'jotai/utils';

// Base atoms
export const currentUserAtom = atomWithReset<User | null>(null);
export const workspaceAtom = atom<Workspace | null>(null);

// Derived atom for computed state
export const userPermissionsAtom = atom((get) => {
  const user = get(currentUserAtom);
  const workspace = get(workspaceAtom);
  
  if (!user || !workspace) return null;
  
  return {
    canCreatePages: user.role === 'admin' || user.role === 'editor',
    canManageUsers: user.role === 'admin',
    workspaceId: workspace.id,
  };
});

// Async atom for API data
export const userStatsAtom = atom(async (get) => {
  const user = get(currentUserAtom);
  if (!user) return null;
  
  const response = await fetch(`/api/users/${user.id}/stats`);
  return response.json();
});

// Write-only atom for actions
export const logoutActionAtom = atom(null, (get, set) => {
  set(currentUserAtom, RESET);
  set(workspaceAtom, RESET);
  // Clear other related state
});
```

This demonstrates atom composition, derived state, async operations, and coordinated state updates.
:p How would you architect a complex state management system using Jotai that handles user authentication, workspace context, derived permissions, real-time collaboration state, and optimistic updates? What patterns would you use for state composition, async operations, and coordinated updates across multiple atoms?
??x
Advanced Jotai architecture patterns:

1. **Atom Composition Strategy**:
   - Base atoms for core entities (user, workspace, pages)
   - Derived atoms for computed state (permissions, UI state)
   - Async atoms for server state with suspense integration
   - Action atoms for complex state orchestration

2. **State Synchronization**:
   - Use atomWithReset for resettable state
   - Derived atoms automatically update when dependencies change
   - Coordinate related state updates with action atoms

3. **Real-time Integration**:
   - WebSocket atoms that update based on external events
   - Optimistic updates with rollback capabilities
   - Conflict resolution for collaborative editing

4. **Performance Optimization**:
   - Atomic granularity prevents unnecessary re-renders
   - Lazy evaluation of derived state
   - Selective subscriptions for large datasets

Example architecture:
```typescript
// Core state
const userAtom = atomWithReset<User | null>(null);
const documentsAtom = atomFamily((id: string) => 
  atomWithReset<Document | null>(null)
);

// Derived permissions
const permissionsAtom = atom((get) => 
  computePermissions(get(userAtom), get(workspaceAtom))
);

// Real-time collaboration
const collaborationAtom = atom((get) => {
  const doc = get(currentDocumentAtom);
  return createWebSocketConnection(doc?.id);
});
```
x??

---

#### Advanced React Query Patterns: Optimistic Updates and Cache Management
React Query enables sophisticated server state management with optimistic updates, infinite queries, and intelligent cache invalidation. Docmost uses complex patterns for real-time collaboration and performance:

```typescript
// Complex query with dependencies and cache management
export const useUserStats = (userId?: string) => {
  return useQuery({
    queryKey: ['user-stats', userId],
    queryFn: () => getUserStats(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error.status === 404) return false;
      return failureCount < 3;
    },
  });
};

// Optimistic mutation with rollback
export const useUpdatePageMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updatePage,
    onMutate: async (newPageData) => {
      await queryClient.cancelQueries(['pages', newPageData.id]);
      
      const previousPage = queryClient.getQueryData(['pages', newPageData.id]);
      
      // Optimistically update cache
      queryClient.setQueryData(['pages', newPageData.id], (old) => ({
        ...old,
        ...newPageData,
        updatedAt: new Date().toISOString(),
      }));
      
      return { previousPage };
    },
    onError: (err, newPageData, context) => {
      // Rollback on error
      queryClient.setQueryData(['pages', newPageData.id], context?.previousPage);
    },
    onSettled: (data, error, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries(['pages']);
      queryClient.invalidateQueries(['recent-pages']);
    },
  });
};

// Infinite query for pagination
export const useInfinitePages = (spaceId: string) => {
  return useInfiniteQuery({
    queryKey: ['pages', 'infinite', spaceId],
    queryFn: ({ pageParam = 0 }) => getPages(spaceId, pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length : undefined;
    },
    select: (data) => ({
      pages: data.pages.flatMap(page => page.items),
      pageParams: data.pageParams,
    }),
  });
};
```

This demonstrates advanced caching strategies, optimistic updates, error recovery, and infinite pagination.
:p Design a React Query architecture for a collaborative document editor that handles real-time updates, optimistic editing, conflict resolution, offline support, and complex cache invalidation. How would you implement optimistic mutations that can be rolled back, handle race conditions between local and remote updates, and maintain cache consistency across multiple query keys?
??x
Advanced React Query architecture for collaborative editing:

1. **Optimistic Update Strategy**:
   - Immediate UI updates with onMutate
   - Store rollback data in mutation context
   - Implement conflict resolution with server reconciliation
   - Use mutation queues for ordered operations

2. **Cache Invalidation Patterns**:
   - Granular invalidation by query key patterns
   - Related data updates (pages, comments, users)
   - Background refetch for stale collaborative data
   - Smart cache updates to avoid refetch waterfalls

3. **Real-time Integration**:
   - WebSocket updates trigger query invalidation
   - Selective cache updates based on change events
   - Optimistic merging with server state
   - Timestamp-based conflict resolution

4. **Offline/Error Handling**:
   - Mutation retry with exponential backoff
   - Offline queue with persistence
   - Graceful degradation for network issues
   - User feedback for sync status

Implementation example:
```typescript
const useCollaborativeDocument = (docId: string) => {
  const queryClient = useQueryClient();
  
  // Real-time subscription
  useEffect(() => {
    const socket = io();
    socket.on(`doc:${docId}:update`, (update) => {
      queryClient.setQueryData(['document', docId], (old) => 
        mergeOperationalTransform(old, update)
      );
    });
    return () => socket.disconnect();
  }, [docId]);
  
  // Optimistic mutation with conflict resolution
  const updateMutation = useMutation({
    mutationFn: updateDocument,
    onMutate: async (changes) => {
      const snapshot = queryClient.getQueryData(['document', docId]);
      queryClient.setQueryData(['document', docId], 
        applyOptimisticUpdate(snapshot, changes)
      );
      return { snapshot, timestamp: Date.now() };
    },
    onError: (error, variables, context) => {
      if (context?.snapshot) {
        queryClient.setQueryData(['document', docId], context.snapshot);
      }
    },
    retry: (failureCount, error) => {
      return error.status !== 409 && failureCount < 3; // Don't retry conflicts
    }
  });
};
```
x??

---

#### TypeScript Props Interface
TypeScript interfaces define the shape of component props, providing type safety and better developer experience:

```typescript
interface StatusBadgeProps {
  status: 'draft' | 'published' | 'archived' | 'under-review';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'medium',
  className = '',
}) => {
  // component logic
};
```

Optional props use `?` and union types restrict values to specific strings.
:p How do TypeScript interfaces improve React component development?
??x
TypeScript interfaces provide type safety by defining the exact shape of props.
Benefits: Compile-time error checking, better IDE autocomplete, self-documenting code.
Features: Optional props with `?`, union types for restricted values, default parameters.
Example:
```typescript
interface Props {
  name: string;
  age?: number;
  role: 'admin' | 'user';
}
```
x??

---

#### CSS Modules Pattern
CSS Modules provide locally scoped CSS to avoid naming conflicts. Docmost uses them for component styling:

```typescript
import styles from './status-badge.module.css';

export const StatusBadge = ({ status }) => {
  const badgeClasses = [
    styles.badge,
    styles[status],
    className,
  ].filter(Boolean).join(' ');

  return <span className={badgeClasses}>...</span>;
};
```

Classes are automatically scoped and can be dynamically combined.
:p What are CSS Modules and how do they solve styling conflicts in React?
??x
CSS Modules automatically scope CSS classes to the component that imports them.
Benefits: No naming conflicts, modular styles, dynamic class combination.
Classes are imported as objects and accessed with dot notation.
Example:
```typescript
import styles from './Button.module.css';
<button className={styles.primary}>Click</button>
```
x??

---

#### React Router Navigation Hook
useNavigate provides programmatic navigation within React applications:

```typescript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navigate after successful login
if (response?.userHasMfa) {
  navigate(APP_ROUTE.AUTH.MFA_CHALLENGE);
} else {
  navigate(APP_ROUTE.HOME);
}

// Replace current history entry
navigate(APP_ROUTE.AUTH.LOGIN, { replace: true });
```

Can navigate to different routes programmatically based on application logic.
:p How does the useNavigate hook work in React Router?
??x
useNavigate returns a function for programmatic navigation between routes.
Can pass route paths, state objects, and options like `replace: true`.
Useful for navigation after form submissions, authentication, or conditional routing.
Example:
```typescript
const navigate = useNavigate();
navigate('/dashboard');
navigate('/login', { replace: true });
```
x??

---

#### Error Handling with Try-Catch in Async Functions
Proper error handling in React components using async/await with try-catch blocks:

```typescript
const handleSignIn = async (data: ILogin) => {
  setIsLoading(true);
  
  try {
    const response = await login(data);
    setIsLoading(false);
    navigate(APP_ROUTE.HOME);
  } catch (err) {
    setIsLoading(false);
    notifications.show({
      message: err.response?.data.message,
      color: "red",
    });
  }
};
```

Always reset loading state in both success and error cases.
:p How should you handle errors in async React functions?
??x
Use try-catch blocks with async/await for proper error handling.
Always reset loading states in both success and error paths.
Display user-friendly error messages using notification systems.
Example:
```typescript
try {
  await apiCall();
  setSuccess(true);
} catch (err) {
  setError(err.message);
} finally {
  setLoading(false);
}
```
x??

---

#### Feature-Based Folder Structure
Docmost organizes code by features rather than file types, keeping related files together:

```
src/features/
├── auth/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── queries/
├── user/
│   ├── components/
│   ├── atoms/
│   ├── services/
│   └── types/
```

Each feature contains all its related components, hooks, services, and types.
:p What are the benefits of feature-based folder structure in React?
??x
Feature-based structure groups related files together by business domain.
Benefits: Easier to find related code, better maintainability, clearer boundaries.
Each feature folder contains components, hooks, services, types for that domain.
Alternative to grouping by file type (all components together, all services together).
x??

---

#### Internationalization with react-i18next
React applications can support multiple languages using react-i18next:

```typescript
import { useTranslation } from "react-i18next";

export default function useAuth() {
  const { t } = useTranslation();
  
  notifications.show({
    message: t("Account created successfully. Please log in to set up two-factor authentication."),
  });
}
```

The `t` function translates keys to the current language. Translation files are stored in public/locales/.
:p How does react-i18next enable internationalization in React apps?
??x
react-i18next provides the useTranslation hook that returns a `t` function for translations.
Translation keys map to actual text in different language files.
Supports pluralization, interpolation, and namespace organization.
Example:
```typescript
const { t } = useTranslation();
<p>{t('welcome_message')}</p>
```
x??

---

#### Mantine UI Notifications
Mantine provides a notification system for showing user feedback:

```typescript
import { notifications } from "@mantine/notifications";

notifications.show({
  message: "Operation completed successfully",
  color: "green",
});

notifications.show({
  message: err.response?.data.message,
  color: "red",
});
```

Notifications can have different colors, auto-dismiss timers, and action buttons.
:p How do Mantine notifications provide user feedback in React apps?
??x
Mantine notifications show temporary messages to users for feedback.
Can specify color (green for success, red for error), auto-dismiss, and actions.
Displayed as toast messages that don't block the UI.
Example:
```typescript
notifications.show({
  message: "Success!",
  color: "green"
});
```
x??

---

#### Conditional Rendering Based on Application State
React components can render different content based on application state and conditions:

```typescript
// Check if MFA is required
if (response?.userHasMfa) {
  navigate(APP_ROUTE.AUTH.MFA_CHALLENGE);
} else if (response?.requiresMfaSetup) {
  navigate(APP_ROUTE.AUTH.MFA_SETUP_REQUIRED);
} else {
  navigate(APP_ROUTE.HOME);
}

// Environment-based rendering
if (isCloud()) {
  // Cloud-specific logic
} else {
  // Self-hosted logic
}
```

Use logical operators and conditional statements to control application flow.
:p How do you implement conditional rendering and navigation in React?
??x
Use if-else statements, ternary operators, and logical operators for conditional rendering.
Can conditionally navigate, render components, or execute different logic paths.
Common patterns: authentication checks, feature flags, environment detection.
Example:
```typescript
{user ? <Dashboard /> : <Login />}
{isLoading && <Spinner />}
```
x??

---

#### Component Composition Pattern
React components can be composed together to build complex UIs from simple parts:

```typescript
// Composed auth hook that handles multiple auth flows
export default function useAuth() {
  return {
    signIn: handleSignIn,
    invitationSignup: handleInvitationSignUp,
    setupWorkspace: handleSetupWorkspace,
    forgotPassword: handleForgotPassword,
    passwordReset: handlePasswordReset,
    logout: handleLogout,
    isLoading,
  };
}
```

Single hook provides all authentication-related functionality through composition of smaller functions.
:p What is component composition in React and why is it important?
??x
Component composition combines smaller, focused components/functions into larger, more complex ones.
Benefits: Reusability, separation of concerns, easier testing, modular design.
Each piece handles one responsibility, then they're composed together.
Example: A form component composed of input, button, and validation components.
x??