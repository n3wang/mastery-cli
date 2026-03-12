# React Performance Optimization Flashcards

#### React.memo and Memoization Strategy
React.memo prevents unnecessary re-renders by memoizing components based on prop equality:

```typescript
// Basic memoization
const ExpensiveComponent = React.memo(({ data, onUpdate }: Props) => {
  const processedData = useMemo(() => {
    return expensiveDataProcessing(data);
  }, [data]);

  return <div>{/* render */}</div>;
});

// Custom comparison function
const OptimizedComponent = React.memo(({ user, settings, onUpdate }: Props) => {
  return <div>{/* render */}</div>;
}, (prevProps, nextProps) => {
  // Custom shallow comparison
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.user.name === nextProps.user.name &&
    isEqual(prevProps.settings, nextProps.settings) &&
    prevProps.onUpdate === nextProps.onUpdate
  );
});

// Avoiding memo for simple components
const SimpleComponent = ({ title }: { title: string }) => {
  // Don't memo simple components - overhead > benefit
  return <h1>{title}</h1>;
};
```

:p When should you use React.memo and what are the performance trade-offs of over-memoization?
??x
**React.memo Usage Guidelines:**

1. **Use When**:
   - Component renders frequently with same props
   - Expensive render calculations
   - Parent re-renders often but props rarely change
   - Component is in a list with stable keys

2. **Avoid When**:
   - Props change frequently
   - Component is cheap to render
   - Props are always new objects/functions
   - Component rarely re-renders

**Trade-offs of Over-memoization**:
- **Memory overhead**: Storing previous props and results
- **Comparison cost**: Prop comparison can be expensive
- **Bundle size**: Additional code for memoization logic
- **Development complexity**: Harder to debug and maintain

**Best Practices**:
```typescript
// ✅ Good - stable props, expensive render
const DataVisualization = React.memo(({ dataset, config }) => {
  return <ComplexChart data={dataset} config={config} />;
});

// ❌ Bad - props always change
const CurrentTime = React.memo(() => {
  const now = new Date(); // Always different
  return <span>{now.toISOString()}</span>;
});

// ✅ Good - custom comparison for deep objects
const UserProfile = React.memo(({ user }) => {
  return <div>{user.name}</div>;
}, (prev, next) => prev.user.id === next.user.id);
```
x??

---

#### useMemo for Expensive Computations
useMemo memoizes the result of expensive calculations to avoid recalculating on every render:

```typescript
const DataProcessor = ({ rawData, filters, sortBy }: Props) => {
  // Expensive computation - only recalculate when dependencies change
  const processedData = useMemo(() => {
    console.log('Processing data...'); // This should log infrequently
    
    return rawData
      .filter(item => filters.every(filter => filter(item)))
      .sort((a, b) => {
        if (sortBy.direction === 'asc') {
          return a[sortBy.field] - b[sortBy.field];
        }
        return b[sortBy.field] - a[sortBy.field];
      })
      .map(item => ({
        ...item,
        computed: expensiveCalculation(item),
      }));
  }, [rawData, filters, sortBy]);

  // Don't memoize cheap computations
  const itemCount = processedData.length; // Cheap - no memo needed

  // Conditional memoization based on data size
  const summary = useMemo(() => {
    if (processedData.length < 1000) {
      // Skip memoization for small datasets
      return generateSummary(processedData);
    }
    
    // Memoize for large datasets
    return generateSummary(processedData);
  }, [processedData]);

  return (
    <div>
      <SummaryView summary={summary} />
      <DataTable data={processedData} />
    </div>
  );
};
```

:p How do you decide when to use useMemo and what computations are worth memoizing?
??x
**useMemo Decision Criteria:**

1. **Computation Cost**:
   - Complex array operations (filter, map, sort)
   - Mathematical calculations
   - Object transformations
   - String manipulations on large data

2. **Frequency of Change**:
   - Dependencies change infrequently
   - Parent component re-renders often
   - Result is used in multiple places

3. **Data Size**:
   - Large arrays or objects
   - Network response processing
   - Image/file processing

**When NOT to use useMemo**:
```typescript
// ❌ Don't memoize primitives
const doubled = useMemo(() => count * 2, [count]);

// ❌ Don't memoize object creation if always consumed
const style = useMemo(() => ({ color: 'red' }), []);

// ❌ Don't memoize if dependencies always change
const timestamp = useMemo(() => Date.now(), [Math.random()]);

// ✅ Good useMemo examples
const expensiveValue = useMemo(() => {
  return largeArray.reduce((acc, item) => {
    return acc + complexCalculation(item);
  }, 0);
}, [largeArray]);

const filteredData = useMemo(() => {
  return data.filter(item => 
    item.category === selectedCategory &&
    item.price >= minPrice &&
    item.price <= maxPrice
  );
}, [data, selectedCategory, minPrice, maxPrice]);
```

**Performance measurement**:
- Profile with React DevTools
- Measure actual impact, not theoretical benefit
- Consider memory usage vs CPU savings
x??

---

#### useCallback for Stable References
useCallback memoizes function references to prevent child component re-renders:

```typescript
const ParentComponent = ({ items, onItemUpdate }: Props) => {
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // ✅ Stable callback - prevents child re-renders
  const handleItemClick = useCallback((itemId: string) => {
    onItemUpdate(itemId, { clicked: true, timestamp: Date.now() });
  }, [onItemUpdate]);

  // ✅ Stable callback with dependencies
  const handleItemFilter = useCallback((item: Item) => {
    return item.name.toLowerCase().includes(filter.toLowerCase());
  }, [filter]);

  // ❌ Don't useCallback if not passed to memoized components
  const handleLocalAction = useCallback(() => {
    console.log('Local action');
  }, []); // Unnecessary if not passed to children

  // ✅ Good - callback with stable dependencies
  const memoizedHandler = useCallback((value: string) => {
    // This callback is stable as long as 'processor' is stable
    return processor.transform(value);
  }, [processor]);

  return (
    <div>
      {items.map(item => (
        <MemoizedItem
          key={item.id}
          item={item}
          onClick={handleItemClick} // Stable reference prevents re-render
          filter={handleItemFilter} // Stable reference
        />
      ))}
    </div>
  );
};

// Memoized child component that benefits from stable callbacks
const MemoizedItem = React.memo(({ item, onClick, filter }: ItemProps) => {
  return (
    <div onClick={() => onClick(item.id)}>
      {item.name}
    </div>
  );
});
```

:p When is useCallback necessary and how does it relate to React.memo optimization?
??x
**useCallback Necessity:**

1. **Required When**:
   - Passing callbacks to memoized components
   - Callback is a dependency of useEffect/useMemo
   - Using callback in event listener setup/teardown
   - Preventing infinite re-render loops

2. **Not Required When**:
   - Callback not passed to children
   - Child components aren't memoized
   - Callback dependencies change frequently
   - Performance impact is negligible

**Relationship with React.memo**:
```typescript
// Without useCallback - child always re-renders
const Parent = () => {
  const [count, setCount] = useState(0);
  
  const handleClick = () => { // New function every render
    console.log('clicked');
  };
  
  return <MemoizedChild onClick={handleClick} />;
};

// With useCallback - child only re-renders when needed
const Parent = () => {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => { // Stable reference
    console.log('clicked');
  }, []);
  
  return <MemoizedChild onClick={handleClick} />;
};

const MemoizedChild = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
});
```

**Common Patterns**:
```typescript
// Event handlers with dependencies
const useItemActions = (itemId: string) => {
  const updateItem = useCallback((updates) => {
    api.updateItem(itemId, updates);
  }, [itemId]);
  
  const deleteItem = useCallback(() => {
    api.deleteItem(itemId);
  }, [itemId]);
  
  return { updateItem, deleteItem };
};

// Debounced callbacks
const useDebouncedCallback = (callback, delay, deps) => {
  return useCallback(
    debounce(callback, delay),
    deps
  );
};
```
x??

---

#### Virtual Scrolling for Large Lists
Virtual scrolling renders only visible items to handle large datasets efficiently:

```typescript
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items, height = 400 }: Props) => {
  // Memoize item renderer to prevent unnecessary re-renders
  const ItemRenderer = useCallback(({ index, style }: ListChildComponentProps) => {
    const item = items[index];
    
    return (
      <div style={style} className="list-item">
        <ItemComponent item={item} />
      </div>
    );
  }, [items]);

  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={60} // Fixed height per item
      overscanCount={5} // Render 5 extra items outside viewport
    >
      {ItemRenderer}
    </List>
  );
};

// Custom virtual scrolling implementation
const CustomVirtualList = ({ items, itemHeight = 60, containerHeight = 400 }: Props) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );
    
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, items.length]);

  // Render only visible items
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex);
  }, [items, visibleRange]);

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div
              key={visibleRange.startIndex + index}
              style={{ height: itemHeight }}
            >
              <ItemComponent item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

:p How does virtual scrolling work and what are the trade-offs compared to rendering all items?
??x
**Virtual Scrolling Principles:**

1. **Viewport Calculation**: Only render items visible in the scroll container
2. **Dynamic Positioning**: Use transforms to position visible items correctly
3. **Scroll Handling**: Update visible range based on scroll position
4. **Overscan**: Render extra items outside viewport for smooth scrolling

**Benefits**:
- **Performance**: Constant rendering time regardless of list size
- **Memory**: Only visible DOM nodes exist
- **Scroll Performance**: Smooth scrolling even with millions of items
- **Initial Load**: Fast initial render

**Trade-offs**:
- **Complexity**: More complex implementation and debugging
- **Fixed Heights**: Often requires fixed item heights
- **Search/Filter**: Browser find (Ctrl+F) doesn't work across all items
- **Accessibility**: Screen readers may not work properly
- **SEO**: Hidden content not indexed

**When to Use**:
```typescript
// ✅ Good candidates for virtualization
const candidates = {
  largeDatasets: items.length > 1000,
  frequentUpdates: true,
  heavyItemRendering: true,
  performanceIssues: renderTime > 100, // ms
};

// ❌ Avoid virtualization when
const avoid = {
  smallLists: items.length < 100,
  variableHeights: !fixedItemHeight,
  complexInteractions: hasNestedScrolling,
  accessibility: screenReaderRequired,
};

// Implementation considerations
const considerations = {
  // Use libraries like react-window or react-virtualized
  useLibrary: true,
  
  // Measure performance impact
  profileFirst: true,
  
  // Consider alternative solutions
  alternatives: ['pagination', 'infinite scrolling', 'filtering'],
};
```

**Advanced Patterns**:
```typescript
// Variable height virtualization
const VariableList = () => {
  const getItemSize = useCallback((index) => {
    return itemHeights[index] || 60; // fallback height
  }, [itemHeights]);
  
  return (
    <VariableSizeList
      height={400}
      itemCount={items.length}
      itemSize={getItemSize}
    >
      {ItemRenderer}
    </VariableSizeList>
  );
};
```
x??

---

#### Profiling and Performance Monitoring
Identifying and measuring performance bottlenecks using React DevTools and custom monitoring:

```typescript
// Custom performance monitoring hook
const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Log slow renders
      if (renderTime > 16) { // > 1 frame at 60fps
        console.warn(`Slow render: ${componentName} took ${renderTime.toFixed(2)}ms`);
        
        // Send to analytics
        analytics.track('slow_render', {
          component: componentName,
          renderTime,
          timestamp: Date.now(),
        });
      }
    };
  });
};

// Render tracking for optimization
const MonitoredComponent = ({ data, filters }: Props) => {
  usePerformanceMonitor('MonitoredComponent');
  
  // Track renders with reasons
  useWhyDidYouUpdate('MonitoredComponent', { data, filters });
  
  const processedData = useMemo(() => {
    const start = performance.now();
    const result = processData(data, filters);
    const end = performance.now();
    
    console.log(`Data processing took ${end - start}ms`);
    return result;
  }, [data, filters]);

  return <div>{/* render */}</div>;
};

// Custom hook to track prop changes
const useWhyDidYouUpdate = (name: string, props: Record<string, any>) => {
  const previous = useRef<Record<string, any>>();
  
  useEffect(() => {
    if (previous.current) {
      const allKeys = Object.keys({ ...previous.current, ...props });
      const changedProps: Record<string, any> = {};
      
      allKeys.forEach(key => {
        if (previous.current![key] !== props[key]) {
          changedProps[key] = {
            from: previous.current![key],
            to: props[key],
          };
        }
      });
      
      if (Object.keys(changedProps).length) {
        console.log('[why-did-you-update]', name, changedProps);
      }
    }
    
    previous.current = props;
  });
};

// Bundle analysis and code splitting monitoring
const useCodeSplitMonitoring = () => {
  useEffect(() => {
    // Monitor chunk load times
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes('chunk')) {
          console.log(`Chunk loaded: ${entry.name} in ${entry.duration}ms`);
        }
      }
    });
    
    observer.observe({ entryTypes: ['navigation', 'resource'] });
    
    return () => observer.disconnect();
  }, []);
};
```

:p What tools and techniques should you use to identify React performance bottlenecks and validate optimization efforts?
??x
**Performance Profiling Tools:**

1. **React DevTools Profiler**:
   - Record component render times
   - Identify unnecessary re-renders
   - Visualize component update causes
   - Compare before/after optimizations

2. **Browser DevTools**:
   - Performance tab for runtime analysis
   - Memory tab for memory leaks
   - Network tab for bundle analysis
   - Lighthouse for overall performance

3. **Custom Monitoring**:
   - Performance API for precise measurements
   - User timing marks for custom events
   - Analytics integration for real-world data
   - Error boundary integration

**Performance Metrics to Track**:
```typescript
const performanceMetrics = {
  // Rendering metrics
  renderTime: 'Time to complete render',
  rerenderCount: 'Number of unnecessary re-renders',
  componentCount: 'Number of components in tree',
  
  // User experience metrics
  firstContentfulPaint: 'When first content appears',
  largestContentfulPaint: 'When main content loads',
  cumulativeLayoutShift: 'Visual stability measure',
  
  // Runtime metrics
  memoryUsage: 'Heap size and allocations',
  bundleSize: 'JavaScript bundle sizes',
  chunkLoadTime: 'Code splitting effectiveness',
};

// Automated performance testing
const performanceTest = {
  setup: 'Create consistent test environment',
  baseline: 'Measure performance before changes',
  optimize: 'Apply performance improvements',
  verify: 'Measure performance after changes',
  
  criteria: {
    renderTime: '< 16ms for 60fps',
    bundleSize: '< 200kb initial bundle',
    memoryLeaks: 'No memory growth over time',
  },
};
```

**Optimization Workflow**:
1. **Measure First**: Establish baseline metrics
2. **Identify Bottlenecks**: Use profiling tools to find slow components
3. **Hypothesize**: Form theories about performance issues
4. **Optimize**: Apply targeted optimizations
5. **Validate**: Measure improvements and ensure no regressions
6. **Monitor**: Track performance in production
x??