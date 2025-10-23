# Pandas Architecture Flashcards

## Core Data Structures

#### NDFrame Base Class
NDFrame is the abstract base class for all n-dimensional labeled pandas objects. It lives in `pandas/core/generic.py` (13,135 lines). The class provides shared functionality for Series (1D) and DataFrame (2D), including the internal block manager (`_mgr`), index handling, and common operations like merge, join, and apply.

**Inheritance hierarchy:**
```python
PandasObject (base)
    └── NDFrame
        ├── Series (1D labeled array)
        └── DataFrame (2D labeled table)
```

The NDFrame manages data through a BlockManager which optimizes storage by grouping columns of the same dtype together.

:p What is NDFrame in pandas and what is its role in the architecture?
??x
NDFrame is the abstract base class for Series and DataFrame. It provides:
- Internal block manager (`_mgr`) for data storage
- Index and axis handling
- Shared operations (merge, join, reshape, apply)
- Common attributes (index, columns, dtypes)

Located in `pandas/core/generic.py`.

Inheritance: PandasObject → NDFrame → {Series, DataFrame}
x??

---

#### Series Data Structure
Series is a 1D labeled array that can hold any data type (integers, strings, floats, Python objects, etc.). Defined in `pandas/core/series.py` (7,352 lines), it inherits from NDFrame and uses a SingleBlockManager internally. Each Series has an index for labels and is backed by either a NumPy array or an ExtensionArray.

**Example:**
```python
import pandas as pd
s = pd.Series([1, 2, 3], index=['a', 'b', 'c'])
# Internal structure:
# s._mgr = SingleBlockManager(data=[1,2,3])
# s.index = Index(['a', 'b', 'c'])
```

:p What is a pandas Series and how is it structured internally?
??x
Series is a 1D labeled array that:
- Holds homogeneous data (single dtype)
- Has an index for row labels
- Uses SingleBlockManager for internal storage
- Backed by NumPy array or ExtensionArray

Defined in `pandas/core/series.py` (7,352 lines).

Example:
```python
s = pd.Series([1, 2, 3], index=['a', 'b', 'c'])
s['a']  # Access by label → 1
```
x??

---

#### DataFrame Data Structure
DataFrame is a 2D labeled data structure with columns of potentially different types. It's like a spreadsheet or SQL table. Defined in `pandas/core/frame.py` (14,402 lines, largest core file at 495 KB), it has two axes: index (rows) and columns. Internally managed by BlockManager which groups columns by dtype for efficiency.

**Example:**
```python
df = pd.DataFrame({
    'A': [1, 2, 3],      # int64
    'B': [1.0, 2.0, 3.0], # float64
    'C': ['x', 'y', 'z']  # object
})
# Internal: 3 blocks (int64, float64, object)
# df._mgr manages these blocks efficiently
```

:p What is a pandas DataFrame and how does it organize data internally?
??x
DataFrame is a 2D labeled structure with:
- Two axes: index (rows) and columns
- Columns can have different dtypes
- Internally uses BlockManager
- Each column behaves like a Series

Defined in `pandas/core/frame.py` (14,402 lines).

BlockManager groups columns by dtype:
```python
# df with int cols A,D; float col B; object col C
# → 3 blocks: [A,D], [B], [C]
```
x??

---

#### Index Objects
Index is an immutable array used for axis labels and indexing operations. Located in `pandas/core/indexes/`, there are specialized index types for different use cases. Indices are immutable (hashable) and optimized for fast lookups using hash tables. They support set operations like union, intersection, and difference.

**Index types:**
- `Index` - Generic (base.py)
- `RangeIndex` - Memory-efficient integer range
- `DatetimeIndex` - Datetime labels
- `MultiIndex` - Hierarchical index (multi.py, 153 KB+)
- `CategoricalIndex` - Categorical labels

**Example:**
```python
idx = pd.Index(['a', 'b', 'c'])
idx.get_loc('b')  # → 1 (fast hash lookup)
```

:p What is a pandas Index and what are its key characteristics?
??x
Index is an immutable array for axis labels with:
- Immutability (hashable for dict keys)
- Fast lookups via hash tables
- Set operations (union, intersection, difference)
- Specialized types (DatetimeIndex, MultiIndex, etc.)

Located in `pandas/core/indexes/`.

Types: Index, RangeIndex, DatetimeIndex, TimedeltaIndex, PeriodIndex, MultiIndex, CategoricalIndex, IntervalIndex

Example:
```python
idx = pd.Index(['a', 'b', 'c'])
idx.get_loc('b')  # Fast O(1) lookup → 1
```
x??

---

## Block Manager System

#### BlockManager Architecture
The Block Manager is pandas' internal data storage system that optimizes memory and performance by grouping columns of the same dtype into contiguous memory blocks. Located in `pandas/core/internals/managers.py` (86 KB), it coordinates multiple Block objects and maps them to DataFrame columns. This design enables vectorized operations on entire blocks and efficient reshaping without copying data.

**Architecture:**
```python
DataFrame
    └── BlockManager
        └── List[Block]
            ├── Block(dtype=int64)    # cols: 0, 3, 5
            ├── Block(dtype=float64)  # cols: 1, 2
            └── Block(dtype=object)   # col: 4

# Each Block = contiguous memory + dtype + placement
```

**Benefits:**
- Memory efficiency (type-homogeneous storage)
- Fast operations (vectorize across blocks)
- Efficient reshaping (move blocks, don't copy)

:p What is the BlockManager in pandas and why is it used?
??x
BlockManager is the internal storage system that:
- Groups columns by dtype into Blocks
- Each Block = contiguous memory of same type
- Maps blocks to DataFrame columns
- Enables efficient operations and memory usage

Located in `pandas/core/internals/managers.py`.

Example:
```python
df = pd.DataFrame({'A': [1,2], 'B': [1.0,2.0], 'C': [3,4]})
# Internal: 2 blocks
# Block1: cols A,C (int64)
# Block2: col B (float64)
```

Benefits: vectorization, memory efficiency, fast reshaping
x??

---

#### Block Objects
A Block represents a contiguous chunk of memory storing one or more columns with the same dtype. Defined in `pandas/core/internals/blocks.py` (80 KB), each Block contains the actual data (NumPy array or ExtensionArray), dtype information, and BlockPlacement (mapping to column positions). Operations on a block are vectorized across all columns in that block.

**Block structure:**
```python
class Block:
    values: np.ndarray | ExtensionArray  # The data
    placement: BlockPlacement            # Column indices
    ndim: int                            # Dimensions

# Example:
# Block with values=array([1,2,3,4,5,6]).reshape(3,2)
# placement=[0, 3]  → columns 0 and 3
# Both columns stored together, same dtype
```

:p What is a Block in pandas' BlockManager system?
??x
Block is a contiguous memory chunk that stores:
- One or more columns of the same dtype
- Data as NumPy array or ExtensionArray
- BlockPlacement (which columns it represents)

Located in `pandas/core/internals/blocks.py` (80 KB).

Structure:
```python
Block:
  values = [[1,4],    # 2 columns,
            [2,5],    # 3 rows,
            [3,6]]    # same dtype
  placement = [0, 3]  # maps to cols 0 and 3
```

Operations applied to entire block (vectorized).
x??

---

#### Copy-on-Write (CoW)
Copy-on-Write is a memory management strategy that defers copying data until a mutation is detected. When enabled via `pd.options.mode.copy_on_write = True`, operations like slicing or assignment create shallow copies that share memory with the original. Only when one copy is modified does pandas create a true copy of the data. This reduces memory usage and improves performance for read-heavy workflows.

**Example:**
```python
pd.options.mode.copy_on_write = True

df1 = pd.DataFrame({'A': [1, 2, 3]})
df2 = df1  # Shallow copy, shares memory

# No copy yet, df1 and df2 share data
print(df1._mgr is df2._mgr)  # Different managers

df2['A'] = 100  # Now triggers copy
# df1 unchanged, df2 has own data
```

:p What is Copy-on-Write (CoW) in pandas and how does it work?
??x
Copy-on-Write defers copying until mutation:
- Operations create shallow copies (share memory)
- First modification triggers actual copy
- Reduces memory usage and improves performance
- Enable: `pd.options.mode.copy_on_write = True`

Example:
```python
pd.options.mode.copy_on_write = True
df2 = df1           # Shares memory
df2['A'] = 100      # Triggers copy now
# df1 unchanged, df2 has own copy
```

Benefit: Avoid unnecessary copies for read operations.
x??

---

## Extension System

#### ExtensionDtype Base Class
ExtensionDtype is the abstract base class for custom data types in pandas. Located in `pandas/core/dtypes/base.py`, it defines the interface for creating custom dtypes that integrate with pandas. Subclasses must implement properties like `type` (scalar type), `name` (string representation), and `construct_array_type()` (associated array class). Registration with `@pd.api.extensions.register_extension_dtype` enables automatic dtype inference.

**Interface:**
```python
class ExtensionDtype:
    @property
    def type(self):
        """Scalar type for the array"""
        pass

    @property
    def name(self):
        """String identifier: 'int64', 'category', etc."""
        pass

    @classmethod
    def construct_array_type(cls):
        """Return associated ExtensionArray class"""
        pass
```

:p What is ExtensionDtype and what is its purpose in pandas?
??x
ExtensionDtype is the abstract base class for custom dtypes:
- Defines interface for custom data types
- Must implement: type, name, construct_array_type()
- Register with `@register_extension_dtype` decorator
- Enables integration with pandas operations

Located in `pandas/core/dtypes/base.py`.

Example:
```python
@pd.api.extensions.register_extension_dtype
class MyDtype(ExtensionDtype):
    name = "mydtype"
    type = MyScalar

    @classmethod
    def construct_array_type(cls):
        return MyArray
```
x??

---

#### ExtensionArray Base Class
ExtensionArray is the abstract base class for custom array implementations in pandas. Located in `pandas/core/arrays/base.py`, it defines the interface for custom array storage and operations. Subclasses must implement approximately 30+ methods including `__getitem__`, `__len__`, `dtype`, `isna()`, `take()`, `copy()`, and many others. ExtensionArrays power pandas' flexible type system, enabling custom data types with specialized storage and behavior.

**Required methods:**
```python
class ExtensionArray:
    # Core interface (~30+ methods)
    def __getitem__(self, item): ...
    def __len__(self): ...

    @property
    def dtype(self): ...

    def isna(self): ...           # Return bool array
    def take(self, indices): ...  # Fancy indexing
    def copy(self): ...           # Deep copy
    def _concat_same_type(cls, to_concat): ...
    def _from_sequence(cls, scalars): ...
    # ... and ~20+ more
```

:p What is ExtensionArray and what must be implemented?
??x
ExtensionArray is the abstract base for custom array types:
- Must implement ~30+ abstract methods
- Core methods: `__getitem__`, `__len__`, `dtype`, `isna()`, `take()`, `copy()`
- Enables custom storage and behavior
- Integrates with Series/DataFrame

Located in `pandas/core/arrays/base.py`.

Example implementations:
- `pandas/core/arrays/integer.py` - Nullable integers
- `pandas/core/arrays/categorical.py` - Categories
- `pandas/core/arrays/string_.py` - String dtype

Interface handles indexing, missing values, concatenation, factorization, etc.
x??

---

#### Extension Registration
Pandas provides registration functions to integrate custom types into the pandas ecosystem. Located in `pandas/api/extensions/`, these functions enable automatic dtype inference and add custom accessors to Series, DataFrame, or Index objects. Registration makes custom types first-class citizens that work seamlessly with pandas operations.

**Registration functions:**
```python
# Register custom dtype
@pd.api.extensions.register_extension_dtype
class MyDtype(ExtensionDtype):
    pass

# Register Series accessor
@pd.api.extensions.register_series_accessor("custom")
class CustomAccessor:
    def __init__(self, pandas_obj):
        self._obj = pandas_obj

    def custom_method(self):
        return self._obj * 2

# Usage: series.custom.custom_method()
```

Similar decorators exist for `register_dataframe_accessor` and `register_index_accessor`.

:p How do you register custom types and accessors in pandas?
??x
Use pandas extension registration functions:

1. **Register dtype:**
```python
@pd.api.extensions.register_extension_dtype
class MyDtype(ExtensionDtype): ...
```

2. **Register Series accessor:**
```python
@pd.api.extensions.register_series_accessor("name")
class MyAccessor:
    def __init__(self, obj):
        self._obj = obj
    def method(self): ...

# Usage: series.name.method()
```

Similar: `register_dataframe_accessor`, `register_index_accessor`

Located in `pandas/api/extensions/`.
x??

---

#### Built-in Extension Arrays
Pandas includes many built-in extension arrays in `pandas/core/arrays/` that demonstrate the extension system. These provide specialized storage and functionality for different data types. Masked arrays (IntegerArray, FloatingArray, BooleanArray) support nullable numeric types using a separate boolean mask. Categorical provides memory-efficient storage for repeated values. DateTime types (DatetimeArray, TimedeltaArray, PeriodArray) optimize temporal data.

**Built-in extensions:**
- **Masked numeric:** `integer.py`, `floating.py`, `boolean.py` - Nullable Int64, Float64, boolean
- **Categorical:** `categorical.py` - Categories with codes
- **DateTime:** `datetimes.py`, `timedeltas.py`, `period.py` - Temporal types
- **Strings:** `string_.py`, `string_arrow.py` - Dedicated string dtype
- **Intervals:** `interval.py` - Interval data [0, 1), [1, 2)
- **Sparse:** `sparse/` - Memory-efficient sparse data
- **Arrow:** `arrow/` - PyArrow-backed arrays

:p What are some built-in ExtensionArrays in pandas?
??x
Built-in extension arrays (in `pandas/core/arrays/`):

1. **Masked numeric:** IntegerArray, FloatingArray, BooleanArray
   - Support NA values with boolean mask

2. **Categorical:** CategoricalArray
   - Efficient storage for repeated values

3. **DateTime:** DatetimeArray, TimedeltaArray, PeriodArray
   - Optimized temporal data

4. **Strings:** StringArray, ArrowStringArray
   - Dedicated string dtype

5. **Intervals:** IntervalArray ([0,1), [1,2))

6. **Sparse:** SparseArray (memory-efficient for mostly-null)

7. **Arrow:** ArrowExtensionArray (PyArrow-backed)

Each demonstrates different extension patterns.
x??

---

## Type System

#### Dtype System Overview
Pandas has a sophisticated dtype system defined in `pandas/core/dtypes/`. It extends NumPy's dtype system with custom types like categorical, datetime with timezone, period, interval, and more. The system includes type inference (`inference.py`), type casting (`cast.py`), type checking utilities (`common.py`), and missing value handling (`missing.py`). All custom dtypes inherit from ExtensionDtype.

**Key files:**
- `dtypes.py` (80 KB) - Custom dtype definitions
- `base.py` - ExtensionDtype abstract base
- `cast.py` (59 KB) - Type casting logic
- `common.py` (55 KB) - Type checking utilities (is_integer_dtype, etc.)
- `inference.py` - Infer dtype from data
- `missing.py` - Missing value handling per dtype

:p What is pandas' dtype system and where is it located?
??x
Pandas dtype system extends NumPy dtypes with custom types.

Located in `pandas/core/dtypes/`:
- `dtypes.py` - Custom dtype definitions (DatetimeTZDtype, CategoricalDtype, etc.)
- `base.py` - ExtensionDtype base class
- `cast.py` - Type casting logic
- `common.py` - Type checking (is_integer_dtype, is_float_dtype, etc.)
- `inference.py` - Infer dtype from data
- `missing.py` - NA handling per dtype

All custom dtypes inherit from ExtensionDtype.

Example custom dtypes: DatetimeTZDtype, PeriodDtype, IntervalDtype, CategoricalDtype, SparseDtype
x??

---

#### Type Checking Utilities
Pandas provides comprehensive type checking utilities in `pandas/core/dtypes/common.py` (55 KB) and exposed via `pandas.api.types`. These functions enable checking if data has a specific dtype, supporting both NumPy and pandas extension types. They're used throughout pandas to dispatch operations based on dtype.

**Common utilities:**
```python
from pandas.api.types import (
    is_integer_dtype,      # Check for integer dtype
    is_float_dtype,        # Check for float dtype
    is_datetime64_dtype,   # Check for datetime
    is_categorical_dtype,  # Check for categorical
    is_object_dtype,       # Check for object (string-like)
    is_numeric_dtype,      # Check if numeric
    is_string_dtype,       # Check for string dtype
)

# Usage:
import pandas as pd
s = pd.Series([1, 2, 3])
is_integer_dtype(s)  # True
```

:p What type checking utilities does pandas provide?
??x
Pandas provides dtype checking functions in `pandas.api.types`:

```python
from pandas.api.types import (
    is_integer_dtype,
    is_float_dtype,
    is_datetime64_dtype,
    is_categorical_dtype,
    is_object_dtype,
    is_numeric_dtype,
    is_string_dtype,
    # ... many more
)

# Usage:
s = pd.Series([1, 2, 3])
is_integer_dtype(s)  # → True
```

Located in `pandas/core/dtypes/common.py` (55 KB).

These handle both NumPy and pandas extension types.
Used internally for operation dispatch.
x??

---

#### Type Casting System
Type casting in pandas handles converting between dtypes safely and efficiently. Located in `pandas/core/dtypes/cast.py` (59 KB), it includes logic for finding common dtypes, safely converting types, and handling edge cases like NA values during conversion. The system respects nullable types and can infer the best dtype for mixed data.

**Key operations:**
```python
# Internal casting functions (not user-facing)
# From pandas/core/dtypes/cast.py

def find_common_type(types):
    """Find common dtype for list of dtypes"""
    # int64 + float64 → float64
    # int64 + object → object
    pass

def astype_array(values, dtype):
    """Safely cast array to dtype"""
    # Handles NA, errors, ExtensionArrays
    pass

def maybe_convert_objects(values):
    """Infer better dtype for object array"""
    # ['1', '2', '3'] → int64 if possible
    pass
```

:p What is pandas' type casting system and where is it located?
??x
Type casting system handles dtype conversions safely.

Located in `pandas/core/dtypes/cast.py` (59 KB).

Key responsibilities:
- Find common dtype for multiple types
- Safe type conversions with NA handling
- Infer better dtypes from object arrays
- Handle ExtensionArray conversions

Example operations:
```python
# Finding common type
int64 + float64 → float64
int64 + object → object

# Safe casting
astype_array(values, dtype)
# Handles NA, errors, ExtensionArrays
```

Used internally for concat, merge, and astype operations.
x??

---

## I/O System

#### I/O Architecture Pattern
Pandas I/O modules follow a consistent reader/writer class pattern. Located in `pandas/io/`, each format has a Reader class for parsing and a Writer class for serialization. This pattern provides clean separation of concerns and consistent API across formats. The public API functions (like `read_csv()`, `to_csv()`) are thin wrappers around these classes.

**Standard pattern:**
```python
# General structure for pandas I/O modules

class FormatReader:
    def __init__(self, filepath_or_buffer, **options):
        self.filepath = filepath_or_buffer
        self.options = options

    def read(self):
        # Parse file → return DataFrame
        pass

class FormatWriter:
    def __init__(self, df, filepath_or_buffer, **options):
        self.df = df
        self.filepath = filepath_or_buffer
        self.options = options

    def write(self):
        # Write DataFrame to file
        pass

# Public API
def read_format(filepath, **kwargs):
    reader = FormatReader(filepath, **kwargs)
    return reader.read()
```

:p What is the common architecture pattern for pandas I/O modules?
??x
Pandas I/O uses a Reader/Writer class pattern:

```python
# Reader class
class FormatReader:
    def __init__(self, filepath, **options):
        self.filepath = filepath
        self.options = options

    def read(self):
        # Parse → DataFrame
        pass

# Writer class
class FormatWriter:
    def __init__(self, df, filepath, **options):
        self.df = df

    def write(self):
        # Write DataFrame
        pass

# Public API (thin wrapper)
def read_format(path, **kwargs):
    return FormatReader(path, **kwargs).read()
```

Located in `pandas/io/`. Clean separation of concerns.
x??

---

#### CSV Parsing System
CSV parsing is one of the most complex I/O operations in pandas. Located in `pandas/io/parsers/`, it includes a Python interface and high-performance C/Cython implementation (`pandas/_libs/parsers.pyx`, 74 KB). The parser handles various dialects, encodings, missing values, type inference, chunking for large files, and error recovery. It's optimized for speed while remaining flexible.

**Key components:**
```python
# pandas/io/parsers/readers.py
def read_csv(filepath, sep=',', header='infer',
             dtype=None, chunksize=None, **kwargs):
    """
    Parse CSV → DataFrame

    Features:
    - Automatic type inference
    - Missing value handling (na_values)
    - Chunking for large files
    - Flexible separators and quoting
    - Date parsing
    - Compression support
    """
    parser = TextFileReader(filepath, **kwargs)
    return parser.read()

# C implementation in pandas/_libs/parsers.pyx (74 KB)
# for performance-critical tokenization
```

:p What makes pandas CSV parsing complex and where is it implemented?
??x
CSV parsing is complex due to:
- Various dialects and separators
- Encoding handling
- Type inference
- Missing value patterns
- Large file chunking
- Date parsing
- Error recovery

**Implementation:**
- Python: `pandas/io/parsers/readers.py`
- C/Cython: `pandas/_libs/parsers.pyx` (74 KB) for speed

**Key features:**
```python
read_csv(
    filepath,
    sep=',',           # Flexible separators
    dtype=None,        # Type inference or specify
    chunksize=None,    # Chunking for large files
    na_values=None,    # Custom NA values
    parse_dates=True,  # Date parsing
)
```
x??

---

#### HDF5 Storage Format
HDF5 is pandas' binary storage format for fast, compressed disk I/O. Implemented in `pandas/io/pytables.py` (184 KB, one of the largest I/O modules), it uses the PyTables library to store DataFrames in hierarchical HDF5 files. Supports both "fixed" format (fast) and "table" format (queryable). Enables partial reading, compression, and querying without loading entire datasets into memory.

**Usage:**
```python
# Write to HDF5
df.to_hdf('store.h5', key='data', mode='w')

# Read from HDF5
df = pd.read_hdf('store.h5', key='data')

# Advanced: HDFStore for multiple datasets
with pd.HDFStore('store.h5') as store:
    store['df1'] = df1  # Write
    store['df2'] = df2
    df1_back = store['df1']  # Read

    # Query without loading all
    store.select('df1', where='A > 5')
```

Formats: 'fixed' (fast, not queryable), 'table' (slower, queryable)

:p What is HDF5 storage in pandas and what are its features?
??x
HDF5 is pandas' binary storage format using PyTables.

Located in `pandas/io/pytables.py` (184 KB).

**Features:**
- Fast binary I/O with compression
- Store multiple DataFrames in one file
- Two formats: 'fixed' (fast) vs 'table' (queryable)
- Partial reading (don't load entire file)
- Query support with 'table' format

**Usage:**
```python
# Write
df.to_hdf('store.h5', key='data')

# Read
df = pd.read_hdf('store.h5', key='data')

# Query
with pd.HDFStore('store.h5') as store:
    store.select('data', where='col > 5')
```

Good for: Large datasets, archival, fast I/O
x??

---

#### Parquet Format Support
Parquet is a columnar storage format optimized for analytics workloads. Implemented in `pandas/io/parquet.py`, it provides integration with PyArrow or fastparquet engines. Parquet stores data in a columnar layout (values from same column stored together), enabling excellent compression ratios and fast column-wise operations. It preserves pandas metadata including index information and extension dtypes.

**Usage:**
```python
# Write to Parquet (requires pyarrow or fastparquet)
df.to_parquet('data.parquet', engine='pyarrow', compression='snappy')

# Read from Parquet
df = pd.read_parquet('data.parquet')

# Read specific columns only
df = pd.read_parquet('data.parquet', columns=['A', 'B'])

# Partition by columns
df.to_parquet('data_partitioned/', partition_cols=['year', 'month'])
```

**Benefits:** Columnar → excellent compression, fast column reads, preserves types

:p What is Parquet support in pandas and why use it?
??x
Parquet is a columnar storage format for analytics.

Located in `pandas/io/parquet.py`.

**Why columnar storage:**
- Values from same column stored together
- Excellent compression (similar values compress well)
- Fast column-wise reads (only read needed columns)
- Preserves pandas metadata and extension types

**Usage:**
```python
# Write
df.to_parquet('data.parquet', compression='snappy')

# Read (all or specific columns)
df = pd.read_parquet('data.parquet', columns=['A', 'B'])

# Partitioned datasets
df.to_parquet('data/', partition_cols=['year'])
```

Engines: PyArrow (recommended) or fastparquet
x??

---

## Performance & Cython

#### Cython Extensions Overview
Pandas uses Cython extensively for performance-critical code paths. Located in `pandas/_libs/`, Cython files (.pyx) are compiled to C extensions that run at near-C speed. This is essential for tight loops, array operations, and parsing where Python would be too slow. Cython enables static typing, direct NumPy array access, and C-level memory management while maintaining Python-like syntax.

**Key Cython modules:**
- `algos.pyx` (45 KB) - Sorting, searching, ranking algorithms
- `groupby.pyx` (71 KB) - Groupby aggregations
- `parsers.pyx` (74 KB) - CSV tokenization
- `hashtable.pyx` - Hash table operations (for indexing)
- `index.pyx` (42 KB) - Index operations
- `join.pyx` (27 KB) - Join/merge operations
- `lib.pyx` (96 KB) - General utilities

**Why Cython:** Python loops are slow; Cython compiles to C for 10-100x speedup on numeric operations.

:p Why does pandas use Cython and where are the extensions located?
??x
Pandas uses Cython for performance-critical code.

Located in `pandas/_libs/` (.pyx files).

**Why Cython:**
- 10-100x speedup over pure Python
- Static typing for speed
- Direct NumPy array access (no Python overhead)
- C-level memory management
- Python-like syntax

**Key modules:**
- `algos.pyx` - Algorithms (sort, search, rank)
- `groupby.pyx` - Groupby operations
- `parsers.pyx` - CSV parsing
- `hashtable.pyx` - Hash tables
- `join.pyx` - Join operations
- `lib.pyx` - Utilities

Cython compiles .pyx → C → shared library (.so/.pyd)
x??

---

#### Time Series Extensions (tslibs)
Time series operations require high performance due to frequent datetime manipulations. Located in `pandas/_libs/tslibs/`, these Cython modules implement efficient datetime operations including parsing, timezone conversion, offset calculations, and period handling. They work with NumPy's datetime64 and timedelta64 types but add pandas-specific functionality like business day offsets and timezone-aware timestamps.

**Key tslibs modules:**
- `timestamps.pyx` - Timestamp (pandas' datetime scalar)
- `timedeltas.pyx` - Timedelta operations
- `parsing.pyx` - Date/time string parsing
- `offsets.pyx` - Date offsets (MonthEnd, BusinessDay, etc.)
- `timezones.pyx` - Timezone handling
- `period.pyx` - Period (e.g., '2021-Q1') operations
- `conversion.pyx` - Type conversions between formats
- `fields.pyx` - Extract fields (year, month, day, etc.)

**Example optimization:** Parsing millions of date strings in Cython vs Python = 50x faster

:p What are tslibs in pandas and what do they provide?
??x
tslibs are Cython time series extensions for performance.

Located in `pandas/_libs/tslibs/`.

**Modules:**
- `timestamps.pyx` - Timestamp implementation
- `timedeltas.pyx` - Timedelta operations
- `parsing.pyx` - Fast date parsing
- `offsets.pyx` - Date offsets (MonthEnd, BusinessDay)
- `timezones.pyx` - Timezone handling
- `period.pyx` - Period operations
- `conversion.pyx` - Type conversions
- `fields.pyx` - Field extraction (year, month, day)

**Why needed:**
- Datetime operations are frequent in time series
- Python too slow for millions of datetime manipulations
- 50x+ speedup for parsing, conversions, arithmetic

Works with NumPy datetime64/timedelta64 + pandas extensions
x??

---

#### Hash Table Implementation
Hash tables are fundamental for fast lookups in indexing operations. Implemented in `pandas/_libs/hashtable.pyx`, pandas uses custom hash table implementations optimized for different dtypes (int64, float64, object, etc.). These enable O(1) average-case lookups for operations like `Series.loc[]`, `Index.get_loc()`, joins, and groupby. Much faster than Python dictionaries for numeric keys.

**Pseudocode logic:**
```python
# Simplified hashtable logic in Cython

class Int64HashTable:
    def __init__(self, size):
        self.table = malloc(size * sizeof(entry))  # C allocation
        self.size = size

    def get_item(self, key: int64):
        # Compute hash
        hash = key % self.size

        # Linear probing for collision resolution
        while self.table[hash].is_filled:
            if self.table[hash].key == key:
                return self.table[hash].value
            hash = (hash + 1) % self.size

        raise KeyError(key)

    # Specialized for int64, float64, object, etc.
```

**Usage:** `Index.get_loc('label')` uses hashtable for O(1) lookup

:p What is the hashtable implementation in pandas and why is it important?
??x
Hashtable provides fast O(1) lookups for indexing.

Located in `pandas/_libs/hashtable.pyx` (Cython).

**Features:**
- Custom implementations per dtype (int64, float64, object)
- O(1) average-case lookups
- Collision resolution with linear probing
- Much faster than Python dicts for numeric keys

**Used for:**
- `Index.get_loc()` - Find position of label
- `Series.loc[]` - Label-based indexing
- Joins and merges
- Groupby operations

**Logic:**
```c
hash = key % table_size
while table[hash].filled:
    if table[hash].key == key:
        return table[hash].value
    hash = (hash + 1) % size  // probe
```

Critical for performance of indexing operations.
x??

---

## Testing Infrastructure

#### Test Organization Structure
Pandas tests are organized in `pandas/tests/` with a structure that mirrors the source code. Each subdirectory corresponds to a module in `pandas/core/` or `pandas/io/`, making it easy to find tests for specific functionality. Tests use pytest and pandas' testing utilities from `pandas/_testing/`.

**Structure (34 subdirectories):**
```
pandas/tests/
├── frame/           # DataFrame tests
├── series/          # Series tests
├── indexes/         # Index tests
├── groupby/         # Groupby tests
├── reshape/         # Reshape operation tests
├── io/              # I/O tests
├── arrays/          # Extension array tests
├── dtypes/          # Dtype tests
├── extension/       # Extension system tests
├── indexing/        # Indexing tests (loc, iloc)
├── arithmetic/      # Arithmetic operation tests
└── ... (24 more)

# Test files mirror source:
# pandas/core/frame.py → pandas/tests/frame/test_*.py
```

:p How is the pandas test suite organized?
??x
Tests mirror source code structure in `pandas/tests/`.

**Organization:**
- `tests/frame/` → DataFrame tests
- `tests/series/` → Series tests
- `tests/indexes/` → Index tests
- `tests/groupby/` → Groupby tests
- `tests/io/` → I/O tests
- `tests/arrays/` → Extension arrays
- ... 34 subdirectories total

**Principle:** Test structure mirrors code structure
```
pandas/core/frame.py
  → pandas/tests/frame/test_*.py

pandas/io/parsers/
  → pandas/tests/io/parser/test_*.py
```

Uses pytest framework + pandas testing utilities.
x??

---

#### Testing Utilities and Assertions
Pandas provides comprehensive testing utilities in `pandas/_testing/` for comparing pandas objects. The assertion functions (`assert_*_equal`) handle floating-point precision, NA values, index alignment, and metadata. They're essential for writing robust tests that account for pandas' complexity.

**Key assertion functions:**
```python
import pandas._testing as tm

# Compare DataFrames (checks values, dtypes, index, columns)
tm.assert_frame_equal(df1, df2)

# Compare Series (checks values, dtype, index, name)
tm.assert_series_equal(s1, s2)

# Compare Indexes
tm.assert_index_equal(idx1, idx2)

# Compare ExtensionArrays
tm.assert_extension_array_equal(arr1, arr2)

# Compare NumPy arrays (with float tolerance)
tm.assert_numpy_array_equal(a1, a2)

# These handle:
# - Float precision (1.0 == 1.0000000001)
# - NA values (NaN == NaN, None == None)
# - Metadata (index names, column names)
# - dtypes
```

:p What testing utilities does pandas provide and what do they check?
??x
Pandas testing utilities in `pandas/_testing/`:

**Assertion functions:**
```python
import pandas._testing as tm

tm.assert_frame_equal(df1, df2)
# Checks: values, dtypes, index, columns, names

tm.assert_series_equal(s1, s2)
# Checks: values, dtype, index, name

tm.assert_index_equal(idx1, idx2)
# Checks: values, dtype, name

tm.assert_extension_array_equal(arr1, arr2)
# Checks: values, dtype, NA handling

tm.assert_numpy_array_equal(a1, a2)
# Checks: values with float tolerance
```

**Handles:**
- Float precision (1.0 ≈ 1.0000001)
- NA values (NaN, None, NA)
- Metadata (names, dtypes)
- Index alignment
x??

---

#### Pytest Fixtures in conftest.py
Pandas uses pytest fixtures extensively for test parameterization and reusability. The main configuration file `pandas/conftest.py` (52 KB) defines global fixtures available to all tests. These fixtures provide common test data, dtype variations, and configuration. Subdirectories have their own `conftest.py` files for module-specific fixtures.

**Common fixtures:**
```python
# From pandas/conftest.py

@pytest.fixture(params=[np.int64, np.float64, object, 'datetime64[ns]'])
def dtype(request):
    """Parametrize tests over all dtypes"""
    return request.param

@pytest.fixture
def datapath(request):
    """Path to test data files"""
    return Path(__file__).parent / 'io' / 'data'

# Usage in tests:
def test_something(dtype):
    # This test runs 4 times (once per dtype)
    s = pd.Series([1, 2, 3], dtype=dtype)
    assert len(s) == 3

# 20+ conftest.py files across test directories
```

:p What role does conftest.py play in pandas testing?
??x
`conftest.py` files define pytest fixtures for tests.

Main file: `pandas/conftest.py` (52 KB)
Plus 20+ subdirectory conftest files.

**Common fixtures:**
```python
@pytest.fixture(params=[...])
def dtype(request):
    """Parametrize over dtypes"""
    return request.param

@pytest.fixture
def datapath(request):
    """Path to test data"""
    return Path(...) / 'data'

# Usage:
def test_func(dtype):
    # Runs once per dtype param
    s = pd.Series([1,2], dtype=dtype)
    ...
```

**Benefits:**
- Reusable test data
- Automatic parameterization
- Shared configuration
- Available to all tests in subdirectory

20+ conftest.py files for module-specific fixtures
x??

---

## Design Patterns

#### Method Chaining Pattern
Pandas embraces method chaining by having methods return new objects (usually copies) rather than modifying in place (except when `inplace=True` is specified). This enables fluent, readable pipelines where multiple operations can be chained together. The pattern is consistent across Series, DataFrame, and GroupBy operations.

**Example:**
```python
# Method chaining - each method returns new object
result = (df
    .query('age > 18')           # Returns new DataFrame
    .groupby('city')             # Returns GroupBy object
    .agg({'salary': 'mean'})     # Returns new DataFrame
    .reset_index()               # Returns new DataFrame
    .sort_values('salary')       # Returns new DataFrame
    .head(10)                    # Returns new DataFrame
)

# Without chaining (less readable):
temp1 = df.query('age > 18')
temp2 = temp1.groupby('city')
temp3 = temp2.agg({'salary': 'mean'})
temp4 = temp3.reset_index()
temp5 = temp4.sort_values('salary')
result = temp5.head(10)
```

Most methods return new objects; few modify in place by default.

:p What is the method chaining pattern in pandas and why is it used?
??x
Method chaining: methods return new objects, enabling pipelines.

**Pattern:**
```python
result = (df
    .query('age > 18')      # → new DataFrame
    .groupby('city')        # → GroupBy
    .mean()                 # → new DataFrame
    .reset_index()          # → new DataFrame
    .sort_values('value')   # → new DataFrame
)
```

**Why:**
- Readable, declarative code
- Clear data flow
- Avoids temporary variables
- Functional programming style

**Implementation:** Methods return new objects (usually copies)
```python
def query(self, expr):
    result = self._apply_query(expr)
    return result  # New DataFrame, not self
```

Most operations don't modify in place (unless `inplace=True`)
x??

---

#### Accessor Pattern
The accessor pattern provides namespaced methods for specialized operations. Implemented via Python descriptors, accessors create dedicated namespaces (`.str`, `.dt`, `.cat`) that group related functionality. This keeps the main Series/DataFrame API clean while providing powerful specialized methods. Accessors are registered via `@register_series_accessor` decorator.

**Built-in accessors:**
```python
# String operations via .str accessor
s = pd.Series(['Hello', 'World'])
s.str.upper()          # ['HELLO', 'WORLD']
s.str.contains('ll')   # [True, False]
s.str.split(' ')       # [['Hello'], ['World']]

# DateTime operations via .dt accessor
s = pd.Series(['2021-01-01', '2021-02-01'], dtype='datetime64[ns]')
s.dt.year              # [2021, 2021]
s.dt.month             # [1, 2]
s.dt.day_name()        # ['Friday', 'Monday']

# Categorical operations via .cat accessor
s = pd.Series(['a', 'b', 'c'], dtype='category')
s.cat.categories       # Index(['a', 'b', 'c'])
s.cat.codes            # [0, 1, 2]
```

**Custom accessor:**
```python
@pd.api.extensions.register_series_accessor("custom")
class CustomAccessor:
    def __init__(self, obj):
        self._obj = obj

    def custom_method(self):
        return self._obj * 2

# Usage: series.custom.custom_method()
```

:p What is the accessor pattern in pandas and what are examples?
??x
Accessor pattern: namespaced methods for specialized operations.

**Built-in accessors:**
```python
# .str - String operations
s.str.upper()
s.str.contains('pattern')
s.str.split()

# .dt - DateTime operations
s.dt.year
s.dt.month
s.dt.day_name()

# .cat - Categorical operations
s.cat.categories
s.cat.codes
```

**Custom accessor:**
```python
@pd.api.extensions.register_series_accessor("name")
class MyAccessor:
    def __init__(self, obj):
        self._obj = obj

    def method(self):
        return self._obj.apply(...)

# Usage: series.name.method()
```

**Benefits:** Clean API, grouped functionality, extensible
x??

---

#### Indexing Abstraction
Pandas provides multiple indexing methods with clear semantics for different use cases. Located primarily in `pandas/core/indexing.py` (96 KB), the system uses Python's descriptor protocol to create indexing objects (`.loc`, `.iloc`, `.at`, `.iat`) that handle different indexing semantics. This abstraction handles alignment, broadcasting, and type checking.

**Indexing methods:**
```python
# Label-based indexing
df.loc['row_label', 'col_label']        # Single value
df.loc['row1':'row5', ['colA', 'colB']] # Slice/list
df.loc[df['A'] > 5, 'B']                # Boolean mask

# Position-based indexing
df.iloc[0, 1]           # Single value by position
df.iloc[0:5, [0, 2]]    # Slice/list by position
df.iloc[[1,3,5], :]     # List of positions

# Fast scalar access
df.at['row_label', 'col_label']    # Fast label-based
df.iat[0, 1]                       # Fast position-based

# Direct indexing (uses __getitem__)
df['col']               # Select column
df[df['A'] > 5]         # Boolean indexing
```

Each has specific semantics; `.loc` = labels, `.iloc` = positions

:p What are the different indexing methods in pandas and when to use each?
??x
Pandas provides multiple indexing methods with clear semantics:

**1. .loc - Label-based:**
```python
df.loc['row_label', 'col_label']
df.loc['row1':'row5', ['A', 'B']]
df.loc[df['A'] > 5, :]
```

**2. .iloc - Position-based:**
```python
df.iloc[0, 1]           # Row 0, col 1
df.iloc[0:5, [0, 2]]    # Slice + list
```

**3. .at - Fast scalar (label):**
```python
df.at['row', 'col']     # Fastest for single value
```

**4. .iat - Fast scalar (position):**
```python
df.iat[0, 1]            # Fastest for single position
```

**5. Direct __getitem__:**
```python
df['col']               # Column selection
df[df['A'] > 5]         # Boolean mask
```

Located in `pandas/core/indexing.py` (96 KB)
x??

---

## Advanced Concepts

#### Groupby Architecture
Groupby operations are among the most complex in pandas. Located in `pandas/core/groupby/` with main logic in `groupby.py` (183 KB), the system implements split-apply-combine pattern. The Grouper object creates groups, operations are applied to each group (possibly in Cython for speed), and results are combined. Supports hierarchical grouping, filtering, transformation, and aggregation.

**Split-Apply-Combine pattern:**
```python
# High-level usage
df.groupby('category').mean()

# Internal flow:
# 1. SPLIT - Create groups
grouper = Grouper(df, by='category')
groups = grouper.get_groups()  # {cat1: [0,3,5], cat2: [1,2,4]}

# 2. APPLY - Apply function to each group
results = []
for group_key, group_data in groups:
    result = group_data.mean()  # Apply to each
    results.append(result)

# 3. COMBINE - Combine results
final = concat(results)

# Optimized in Cython: pandas/_libs/groupby.pyx (71 KB)
```

Supports: `agg()`, `transform()`, `filter()`, `apply()`, multi-column grouping

:p How does pandas groupby work internally?
??x
Groupby implements split-apply-combine pattern.

Located in `pandas/core/groupby/groupby.py` (183 KB).

**Three phases:**
```python
# 1. SPLIT - Create groups
df.groupby('category')
# → groups = {cat1: [idx0,idx3], cat2: [idx1,idx2]}

# 2. APPLY - Apply function per group
for group_key, group_data in groups:
    result = func(group_data)  # mean(), sum(), etc.

# 3. COMBINE - Merge results
final_df = combine(results)
```

**Optimizations:**
- Cython implementations: `pandas/_libs/groupby.pyx` (71 KB)
- Hash-based grouping for speed
- Vectorized aggregations when possible

**Operations:** `agg()`, `transform()`, `filter()`, `apply()`

Supports multi-column grouping, hierarchical groups
x??

---

#### Reshape Operations
Reshape operations (pivot, melt, stack, unstack, merge) transform DataFrame structure. Located in `pandas/core/reshape/`, these operations handle data transformation from wide to long format and vice versa. The `merge.py` module (112 KB) implements SQL-like joins, while `pivot.py` handles pivot tables.

**Key operations:**
```python
# PIVOT - Long to wide
df = pd.DataFrame({
    'date': ['2021-01', '2021-01', '2021-02'],
    'city': ['NYC', 'LA', 'NYC'],
    'temp': [32, 75, 35]
})
pivoted = df.pivot(index='date', columns='city', values='temp')
#         city  LA   NYC
# date
# 2021-01     75.0  32.0
# 2021-02     NaN   35.0

# MELT - Wide to long
melted = pivoted.melt(ignore_index=False)

# MERGE - SQL-like joins
pd.merge(df1, df2, on='key', how='inner')  # inner/left/right/outer

# CONCAT - Stack DataFrames
pd.concat([df1, df2], axis=0)  # Vertical (rows)
pd.concat([df1, df2], axis=1)  # Horizontal (columns)
```

Located in `pandas/core/reshape/`

:p What are the main reshape operations in pandas?
??x
Reshape operations transform DataFrame structure.

Located in `pandas/core/reshape/`.

**Main operations:**

1. **Pivot (long → wide):**
```python
df.pivot(index='date', columns='city', values='temp')
```

2. **Melt (wide → long):**
```python
df.melt(id_vars=['date'], value_vars=['NYC', 'LA'])
```

3. **Merge (SQL joins):**
```python
pd.merge(df1, df2, on='key', how='inner')
# how: 'inner', 'left', 'right', 'outer'
```

4. **Concat (stack):**
```python
pd.concat([df1, df2], axis=0)  # Rows
pd.concat([df1, df2], axis=1)  # Columns
```

Key files: `merge.py` (112 KB), `pivot.py`, `concat.py`, `melt.py`
x??

---

#### Missing Value Handling
Pandas has sophisticated missing value handling across different dtypes. Located in `pandas/core/missing.py` (33 KB) and `pandas/core/dtypes/missing.py` (21 KB), the system handles multiple NA representations (NaN, None, NaT, pd.NA) depending on dtype. Operations like `isna()`, `fillna()`, `dropna()` work consistently across all types.

**NA representations by dtype:**
```python
# Float: NaN (IEEE 754 floating point NA)
s = pd.Series([1.0, np.nan, 3.0])
s.isna()  # [False, True, False]

# Integer (nullable): pd.NA
s = pd.Series([1, pd.NA, 3], dtype='Int64')
s.isna()  # [False, True, False]

# Object: None or NaN
s = pd.Series([1, None, 3], dtype=object)

# Datetime: NaT (Not a Time)
s = pd.Series(['2021-01-01', pd.NaT], dtype='datetime64[ns]')

# Boolean (nullable): pd.NA
s = pd.Series([True, pd.NA, False], dtype='boolean')

# Operations:
s.isna()        # Detect NA
s.fillna(0)     # Replace NA
s.dropna()      # Remove NA
```

Each dtype has appropriate NA representation; operations handle all consistently.

:p How does pandas handle missing values across different dtypes?
??x
Pandas uses different NA representations per dtype.

Located in `pandas/core/missing.py` and `pandas/core/dtypes/missing.py`.

**NA by dtype:**
```python
# Float → NaN
pd.Series([1.0, np.nan, 3.0])

# Nullable integer → pd.NA
pd.Series([1, pd.NA, 3], dtype='Int64')

# Object → None or NaN
pd.Series([1, None, 3], dtype=object)

# Datetime → NaT
pd.Series(['2021-01-01', pd.NaT], dtype='datetime64[ns]')

# Boolean → pd.NA
pd.Series([True, pd.NA], dtype='boolean')
```

**Operations (work across all types):**
- `isna()` - Detect NA
- `fillna(value)` - Replace NA
- `dropna()` - Remove NA

Each dtype has appropriate NA; ops handle consistently.
x??

---

#### Window Operations
Window operations apply functions over sliding/expanding/rolling windows of data. Located in `pandas/core/window/`, these are essential for time series analysis. Rolling windows slide across data, expanding windows grow from the start, and exponentially weighted windows apply decay. Implemented with Cython for performance.

**Window types:**
```python
s = pd.Series([1, 2, 3, 4, 5])

# ROLLING - Fixed-size sliding window
s.rolling(window=3).mean()
# 0    NaN    (only 1 value)
# 1    NaN    (only 2 values)
# 2    2.0    (mean of [1,2,3])
# 3    3.0    (mean of [2,3,4])
# 4    4.0    (mean of [3,4,5])

# EXPANDING - Growing window from start
s.expanding().mean()
# 0    1.0    (mean of [1])
# 1    1.5    (mean of [1,2])
# 2    2.0    (mean of [1,2,3])
# 3    2.5    (mean of [1,2,3,4])
# 4    3.0    (mean of [1,2,3,4,5])

# EWMA - Exponentially weighted
s.ewm(span=3).mean()  # Recent values weighted more

# Supports: mean, sum, std, var, min, max, etc.
```

:p What are window operations in pandas and what types exist?
??x
Window operations apply functions over data windows.

Located in `pandas/core/window/`.

**Types:**

1. **Rolling - Fixed sliding window:**
```python
s.rolling(window=3).mean()
# Slide window of size 3 across data
```

2. **Expanding - Growing from start:**
```python
s.expanding().mean()
# Window grows: [1], [1,2], [1,2,3], ...
```

3. **EWM - Exponentially weighted:**
```python
s.ewm(span=3).mean()
# Recent values weighted more
```

**Aggregations:** mean, sum, std, var, min, max, corr, cov

**Example:**
```python
s = [1, 2, 3, 4, 5]
s.rolling(3).mean()
# [NaN, NaN, 2.0, 3.0, 4.0]
```

Cython-optimized for performance. Common in time series.
x??
