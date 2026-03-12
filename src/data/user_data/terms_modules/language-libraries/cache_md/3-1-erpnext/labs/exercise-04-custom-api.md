# Exercise 4: Building a Custom REST API with Whitelisted Methods

## Objective

Learn how to expose Python functions as HTTP endpoints using Frappe's `@frappe.whitelist()` decorator — covering authentication, input validation, structured JSON responses, and error handling. You will build a small **Inventory Query API** that external systems or your frontend can call.

## Difficulty Level

Intermediate (60-90 minutes)

## What You'll Learn

- How `@frappe.whitelist()` works and how to control guest vs. authenticated access
- How to write clean, validated API methods that return structured JSON
- How to handle errors gracefully with proper HTTP semantics
- How to group related endpoints into a dedicated API module
- How to test your API with `curl` and in the Frappe console
- How to write a Frappe Server Script as an alternative no-code API approach

## Prerequisites

- ERPNext development environment set up
- Understanding of Python functions and decorators
- Basic familiarity with HTTP (GET/POST, status codes, JSON)
- Completed Exercise 1 (recommended)

## Exercise Description

You will create a dedicated API file at `erpnext/erpnext_integrations/inventory_api/api.py` that exposes four endpoints:

| Endpoint          | Method | Auth?    | Purpose                               |
|-------------------|--------|----------|---------------------------------------|
| `get_item_stock`  | GET    | No       | Return current stock for a given item |
| `search_items`    | GET    | No       | Search items by name/group            |
| `reserve_stock`   | POST   | Yes      | Reserve (soft-lock) stock for an order|
| `get_order_status`| GET    | Yes      | Return order sync status              |

---

## Step-by-Step Instructions

### Step 1: Understand How Whitelisted Methods Work

When you add `@frappe.whitelist()` to a Python function, Frappe exposes it at:

```
POST/GET https://yoursite.com/api/method/<module.path.function_name>
```

**Authentication modes**:

```python
# Anyone (including guests) can call this
@frappe.whitelist(allow_guest=True)
def public_endpoint():
    ...

# Only logged-in users (session cookie or API key:secret header)
@frappe.whitelist()
def authenticated_endpoint():
    ...
```

**How the caller passes arguments**:
- GET: query string `?item_code=ITEM-001`
- POST: JSON body `{"item_code": "ITEM-001"}` or form-encoded body
- Frappe deserializes both automatically into Python function kwargs

---

### Step 2: Create the API Module

```bash
# Create directory structure
mkdir -p erpnext/erpnext_integrations/inventory_api

# Create files
touch erpnext/erpnext_integrations/inventory_api/__init__.py
touch erpnext/erpnext_integrations/inventory_api/api.py
```

---

### Step 3: Write the API File

Add to `erpnext/erpnext_integrations/inventory_api/api.py`:

```python
"""
Inventory Query API
Exposes stock and item lookup endpoints for external integrations and frontends.
"""

import frappe
from frappe import _
from frappe.utils import flt, now


# ──────────────────────────────────────────────────────────────────────────────
# PUBLIC ENDPOINTS (allow_guest=True)
# ──────────────────────────────────────────────────────────────────────────────


@frappe.whitelist(allow_guest=True)
def get_item_stock(item_code, warehouse=None):
    """
    Return current stock quantity for a given item.

    Args:
        item_code (str): The item code to look up.
        warehouse (str, optional): Filter to a specific warehouse.

    Returns:
        dict: { item_code, item_name, warehouse, actual_qty, reserved_qty, available_qty }

    Example:
        GET /api/method/erpnext.erpnext_integrations.inventory_api.api.get_item_stock
            ?item_code=ITEM-001&warehouse=Main+Warehouse
    """
    if not item_code:
        frappe.throw(_("item_code is required"), frappe.MandatoryError)

    # Validate item exists
    if not frappe.db.exists("Item", item_code):
        frappe.throw(_("Item '{0}' not found").format(item_code), frappe.DoesNotExistError)

    conditions = {"item_code": item_code}
    if warehouse:
        conditions["warehouse"] = warehouse

    bins = frappe.get_all(
        "Bin",
        filters=conditions,
        fields=["warehouse", "actual_qty", "reserved_qty", "projected_qty"],
    )

    item_name = frappe.db.get_value("Item", item_code, "item_name")

    return {
        "item_code": item_code,
        "item_name": item_name,
        "stock": [
            {
                "warehouse": b.warehouse,
                "actual_qty": flt(b.actual_qty),
                "reserved_qty": flt(b.reserved_qty),
                "available_qty": flt(b.actual_qty) - flt(b.reserved_qty),
            }
            for b in bins
        ],
        "as_of": now(),
    }


@frappe.whitelist(allow_guest=True)
def search_items(search_term="", item_group=None, page_length=20, start=0):
    """
    Search items by name, code, or description.

    Args:
        search_term (str): Text to search for (partial match).
        item_group (str, optional): Filter to a specific item group.
        page_length (int): Number of results per page. Max 100.
        start (int): Pagination offset.

    Returns:
        dict: { items: [...], total_count, has_more }

    Example:
        GET /api/method/...search_items?search_term=bolt&item_group=Hardware
    """
    # Clamp page_length to prevent expensive queries
    page_length = min(int(page_length), 100)
    start = max(int(start), 0)

    filters = {
        "disabled": 0,
        "is_sales_item": 1,
    }

    if item_group:
        filters["item_group"] = item_group

    # Build OR search across multiple fields
    or_filters = []
    if search_term:
        or_filters = [
            ["item_code", "like", f"%{search_term}%"],
            ["item_name", "like", f"%{search_term}%"],
            ["description", "like", f"%{search_term}%"],
        ]

    items = frappe.get_all(
        "Item",
        filters=filters,
        or_filters=or_filters if or_filters else None,
        fields=["name as item_code", "item_name", "item_group", "description", "stock_uom"],
        limit_start=start,
        limit_page_length=page_length + 1,  # fetch one extra to detect has_more
        order_by="item_name asc",
    )

    has_more = len(items) > page_length
    if has_more:
        items = items[:page_length]

    return {
        "items": items,
        "page_length": page_length,
        "start": start,
        "has_more": has_more,
    }


# ──────────────────────────────────────────────────────────────────────────────
# AUTHENTICATED ENDPOINTS
# ──────────────────────────────────────────────────────────────────────────────


@frappe.whitelist()
def reserve_stock(item_code, warehouse, qty, reference_doctype=None, reference_name=None):
    """
    Soft-reserve stock for an order (write to a custom reservation table).
    Requires authentication.

    Args:
        item_code (str): Item to reserve.
        warehouse (str): Warehouse to reserve from.
        qty (float): Quantity to reserve (must be > 0).
        reference_doctype (str, optional): Source document type (e.g. "Sales Order").
        reference_name (str, optional): Source document name.

    Returns:
        dict: { success, reservation_id, reserved_qty, remaining_available }

    Raises:
        frappe.ValidationError: If insufficient stock is available.
    """
    qty = flt(qty)
    if qty <= 0:
        frappe.throw(_("Quantity to reserve must be greater than zero."))

    # Check available stock in Bin
    available = flt(
        frappe.db.get_value(
            "Bin",
            {"item_code": item_code, "warehouse": warehouse},
            "actual_qty",
        )
        or 0
    )

    already_reserved = flt(
        frappe.db.get_value(
            "Bin",
            {"item_code": item_code, "warehouse": warehouse},
            "reserved_qty",
        )
        or 0
    )

    net_available = available - already_reserved

    if qty > net_available:
        frappe.throw(
            _(
                "Cannot reserve {0} units of {1} in {2}. "
                "Only {3} units are available after existing reservations."
            ).format(qty, item_code, warehouse, net_available),
            frappe.ValidationError,
        )

    # Log the reservation in a custom doctype (Maintenance Stock Reservation)
    # For this exercise, we store it as a simple frappe document.
    # In production you would build a proper Stock Reservation Entry doctype.
    reservation = frappe.get_doc(
        {
            "doctype": "Stock Reservation Entry",
            "item_code": item_code,
            "warehouse": warehouse,
            "reserved_qty": qty,
            "reference_doctype": reference_doctype,
            "reference_name": reference_name,
            "status": "Reserved",
            "reserved_by": frappe.session.user,
        }
    )
    reservation.insert(ignore_permissions=True)

    return {
        "success": True,
        "reservation_id": reservation.name,
        "reserved_qty": qty,
        "remaining_available": net_available - qty,
    }


@frappe.whitelist()
def get_order_status(order_name):
    """
    Return the current status and sync state of a Sales Order.
    Requires authentication and permission to read Sales Order.

    Args:
        order_name (str): The Sales Order name (e.g. "SAL-ORD-2024-00001").

    Returns:
        dict: { name, status, grand_total, delivery_date, items_count, ... }
    """
    if not frappe.has_permission("Sales Order", "read", order_name):
        frappe.throw(_("Not permitted to view order {0}").format(order_name), frappe.PermissionError)

    doc = frappe.get_doc("Sales Order", order_name)

    return {
        "name": doc.name,
        "customer": doc.customer,
        "status": doc.status,
        "grand_total": flt(doc.grand_total),
        "currency": doc.currency,
        "transaction_date": str(doc.transaction_date),
        "delivery_date": str(doc.delivery_date),
        "items_count": len(doc.items),
        "per_delivered": flt(doc.per_delivered),
        "per_billed": flt(doc.per_billed),
    }
```

---

### Step 4: Test with `curl`

**Public endpoint — no auth needed:**

```bash
# Get stock for an item
curl -s "http://localhost:8000/api/method/erpnext.erpnext_integrations.inventory_api.api.get_item_stock?item_code=_Test+Item" \
  | python3 -m json.tool

# Search items
curl -s "http://localhost:8000/api/method/erpnext.erpnext_integrations.inventory_api.api.search_items?search_term=bolt" \
  | python3 -m json.tool
```

**Authenticated endpoint — API key/secret:**

```bash
# First, generate an API key for a user in ERPNext:
# Go to Settings > Users > Your User > API Access > Generate Keys

export API_KEY="your_api_key"
export API_SECRET="your_api_secret"

curl -s \
  -H "Authorization: token $API_KEY:$API_SECRET" \
  "http://localhost:8000/api/method/erpnext.erpnext_integrations.inventory_api.api.get_order_status?order_name=SAL-ORD-2024-00001" \
  | python3 -m json.tool
```

**POST endpoint:**

```bash
curl -s \
  -X POST \
  -H "Authorization: token $API_KEY:$API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"item_code": "_Test Item", "warehouse": "Stores - _TC", "qty": 5}' \
  "http://localhost:8000/api/method/erpnext.erpnext_integrations.inventory_api.api.reserve_stock" \
  | python3 -m json.tool
```

---

### Step 5: Test in the Frappe Console

```bash
bench --site your-site-name console
```

```python
# Simulate calling the API function directly
import frappe
frappe.set_user("Administrator")

from erpnext.erpnext_integrations.inventory_api.api import (
    get_item_stock,
    search_items,
    get_order_status,
)

# Test stock lookup
result = get_item_stock("_Test Item")
print(result)

# Test search
result = search_items(search_term="test", page_length=5)
print(f"Found {len(result['items'])} items, has_more={result['has_more']}")

# Test order status
result = get_order_status("SAL-ORD-2024-00001")
print(result)
```

---

### Step 6: Understand the Response Envelope

Frappe wraps every API response in a standard envelope:

```json
{
    "message": { "...your return value..." }
}
```

So when your function returns `{"item_code": "X", "actual_qty": 10}`, the HTTP response body is:

```json
{
    "message": {
        "item_code": "X",
        "actual_qty": 10
    }
}
```

When an error is thrown via `frappe.throw()`, Frappe returns HTTP 417 with:

```json
{
    "exc_type": "ValidationError",
    "exception": "...",
    "_error_message": "Your error message here"
}
```

Your callers must read `response.message` for the actual data.

---

### Step 7: Explore Server Scripts (No-Code Alternative)

For simple use cases, you can create an API endpoint without touching Python files — using Frappe's **Server Script** feature:

1. Go to **Settings > Server Script > New**
2. Set **Script Type** to `API`
3. Set **API Method** to `my_custom_endpoint`
4. Write the Python script body (no function definition needed):

```python
# The script runs in a sandboxed context
# `frappe` is available, and `frappe.response["message"]` is the return value

item_code = frappe.form_dict.get("item_code")
if not item_code:
    frappe.throw("item_code is required")

stock = frappe.db.get_value(
    "Bin",
    {"item_code": item_code},
    ["actual_qty", "warehouse"],
    as_dict=True
)

frappe.response["message"] = stock
```

5. Enable **Allow Guest** if needed
6. The endpoint becomes: `/api/method/my_custom_endpoint`

**Advantage**: No deploy needed — changes are instant from the UI.
**Limitation**: No version control, harder to test, runs in a restricted sandbox.

---

### Step 8: Write API Tests

Create `erpnext/erpnext_integrations/inventory_api/test_api.py`:

```python
import frappe
from frappe.tests.utils import FrappeTestCase

from erpnext.erpnext_integrations.inventory_api.api import (
    get_item_stock,
    search_items,
)


class TestInventoryAPI(FrappeTestCase):

    def setUp(self):
        frappe.set_user("Administrator")

    def test_get_item_stock_missing_item_code(self):
        """Should raise MandatoryError when item_code is blank."""
        self.assertRaises(frappe.MandatoryError, get_item_stock, "")

    def test_get_item_stock_nonexistent_item(self):
        """Should raise DoesNotExistError for unknown item."""
        self.assertRaises(
            frappe.DoesNotExistError,
            get_item_stock,
            "NONEXISTENT-ITEM-XYZ",
        )

    def test_search_items_returns_dict(self):
        """Should return a dict with items, has_more, page_length."""
        result = search_items(page_length=5)
        self.assertIn("items", result)
        self.assertIn("has_more", result)
        self.assertIsInstance(result["items"], list)

    def test_search_page_length_clamped(self):
        """page_length above 100 should be clamped to 100."""
        result = search_items(page_length=9999)
        self.assertLessEqual(result["page_length"], 100)
```

---

## Expected Results

1. ✅ `get_item_stock` returns JSON with warehouse-level stock breakdown
2. ✅ `search_items` returns paginated results with `has_more` flag
3. ✅ Calling `get_item_stock` with unknown item returns a clear error response
4. ✅ Authenticated endpoints return 403 without a valid token
5. ✅ `curl` calls return valid JSON wrapped in `{"message": ...}`
6. ✅ All test cases pass

---

## Common Issues & Troubleshooting

### Issue 1: 404 — Method Not Found

Cause: The Python module path in the URL doesn't match the actual file path.

```bash
# Double-check the actual path:
find . -name "api.py" | grep inventory
# Result should be: ./erpnext/erpnext_integrations/inventory_api/api.py
# URL path: erpnext.erpnext_integrations.inventory_api.api.function_name
```

### Issue 2: 403 Forbidden on Public Endpoint

Cause: Missing `allow_guest=True` on the decorator.

```python
# Wrong — requires login:
@frappe.whitelist()
def my_endpoint(): ...

# Correct — allows guests:
@frappe.whitelist(allow_guest=True)
def my_endpoint(): ...
```

### Issue 3: Arguments Not Received

Cause: Function parameter names must exactly match the query string or JSON body keys.

```python
# Function signature:
def get_item_stock(item_code, warehouse=None): ...

# Correct curl: ?item_code=X    ✅
# Wrong curl:   ?itemCode=X     ❌ (Python receives None)
```

### Issue 4: Changes Not Taking Effect

```bash
bench clear-cache
# No migration needed for Python-only files
```

---

## Verification Checklist

- [ ] Module directory created with `__init__.py`
- [ ] `get_item_stock` works with `curl` — no auth required
- [ ] `get_item_stock` returns proper error for missing item
- [ ] `search_items` paginates correctly with `has_more`
- [ ] `get_order_status` returns 403 without auth header
- [ ] `get_order_status` returns order data with valid auth
- [ ] Server Script alternative tested in the UI
- [ ] All unit tests pass

---

## Next Steps

1. **Rate limiting**: Add rate limit checks using `frappe.cache()` to prevent API abuse
2. **Versioning**: Prefix your API path with `v1` by putting functions in `api_v1.py`
3. **Webhook outbound**: Use `frappe.enqueue()` to post data to external services asynchronously
4. **OpenAPI spec**: Document your endpoints with docstrings that match OpenAPI format

---

## Key Concepts Learned

- ✅ `@frappe.whitelist()` and `allow_guest=True` — when to use each
- ✅ URL pattern for whitelisted methods: `/api/method/<module.path.function>`
- ✅ GET vs POST — how Frappe passes arguments to your function
- ✅ `frappe.throw()` — validation errors with proper exception types
- ✅ `frappe.has_permission()` — checking user permissions in API code
- ✅ `frappe.get_all()` with filters, or_filters, limit, and field selection
- ✅ Frappe's response envelope: `{"message": ...}`
- ✅ API key/secret authentication with the `Authorization: token` header
- ✅ Server Scripts as a no-code alternative for simple endpoints
- ✅ Testing API methods directly in the Frappe console and with unit tests
