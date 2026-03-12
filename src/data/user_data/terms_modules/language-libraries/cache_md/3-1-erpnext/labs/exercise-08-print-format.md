# Exercise 8: Custom Print Formats with Jinja2

## Objective

Learn how to build a fully branded, data-rich custom print format for ERPNext documents using Jinja2 templates — covering layout, conditional rendering, child table iteration, number formatting, QR codes, and multilingual support. You will create a **POS Receipt** print format for Sales Invoices.

## Difficulty Level

Intermediate (45-60 minutes)

## What You'll Learn

- How Frappe's print format system works (Jinja2 templates + CSS)
- How to access document fields and child table rows in a template
- How to use Frappe's built-in Jinja filters (`frappe_currency`, `frappe_date`, `fmt_money`)
- How to write conditional blocks for optional fields (discount, tax, shipping)
- How to embed a QR code using frappe's built-in utilities
- How to create a print format via the UI and export it as a fixture
- How to use print format CSS to create a narrow thermal receipt layout

## Prerequisites

- Familiarity with HTML and CSS (basic)
- Understanding of Jinja2 template syntax (`{{ }}`, `{% %}`)
- Understanding of ERPNext Sales Invoice fields and structure

## Exercise Description

You will create a **"POS Receipt"** print format for Sales Invoice. It will print as a narrow thermal receipt (80mm wide) with:

1. **Header** — store name, logo, address, receipt number
2. **Item table** — item name, quantity, rate, and line total
3. **Subtotal section** — taxes, discount, grand total
4. **Payment section** — payment method, amount tendered, change
5. **Footer** — thank you message, return policy text, QR code linking to the invoice URL

---

## Step-by-Step Instructions

### Step 1: Understand the Print Format System

Frappe supports three types of print formats:

| Type             | How to build                | Use case                            |
|------------------|-----------------------------|-------------------------------------|
| Standard         | Auto-generated from schema  | Quick default printing              |
| Custom HTML      | Jinja2 + CSS in the UI      | Branded invoices, receipts, labels  |
| Server-side JS   | JavaScript template         | Complex dynamic layouts             |

For this exercise you will use **Custom HTML** (the most common and powerful type).

The Jinja2 context includes:
- `doc` — the full document object with all fields
- `doc.items` — child table rows (list of objects)
- `doc.taxes` — taxes table
- `frappe` — the frappe module (utility functions)
- Filters: `frappe_currency`, `frappe_date`, `fmt_money`

---

### Step 2: Create the Print Format via the UI

1. Go to **Settings > Print Format > New Print Format**

Fill in:

| Field              | Value                    |
|--------------------|--------------------------|
| Print Format Name  | POS Receipt              |
| Document Type      | Sales Invoice            |
| Custom Format      | ✅ (checked)             |
| Print Format Type  | Jinja                    |
| Default Print Language | English             |
| Disabled           | ☐                        |

Click **Save** — the HTML and CSS editors will appear.

---

### Step 3: Write the CSS (Thermal Receipt Layout)

Paste into the **CSS** section:

```css
/* POS Receipt — 80mm thermal paper layout */

body, .print-format {
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    max-width: 300px;
    margin: 0 auto;
    padding: 8px;
    color: #000;
}

.receipt-header {
    text-align: center;
    border-bottom: 1px dashed #000;
    padding-bottom: 8px;
    margin-bottom: 8px;
}

.receipt-header .store-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 2px;
}

.receipt-header .receipt-meta {
    font-size: 10px;
    color: #555;
}

.items-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 6px;
}

.items-table th {
    text-align: left;
    border-bottom: 1px solid #000;
    font-size: 10px;
    padding: 2px 0;
    text-transform: uppercase;
}

.items-table td {
    padding: 3px 0;
    vertical-align: top;
}

.items-table .amount {
    text-align: right;
}

.totals-section {
    border-top: 1px dashed #000;
    margin-top: 6px;
    padding-top: 6px;
}

.totals-section .row-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2px;
    font-size: 11px;
}

.totals-section .grand-total {
    font-size: 14px;
    font-weight: bold;
    border-top: 1px solid #000;
    border-bottom: 1px double #000;
    padding: 4px 0;
    margin-top: 4px;
}

.payment-section {
    margin-top: 8px;
    font-size: 11px;
}

.receipt-footer {
    border-top: 1px dashed #000;
    margin-top: 10px;
    padding-top: 6px;
    text-align: center;
    font-size: 10px;
    color: #555;
}

.receipt-footer .qr-code img {
    width: 80px;
    height: 80px;
    margin: 6px auto;
    display: block;
}

@media print {
    body { margin: 0; }
    .print-format { max-width: 100%; }
}
```

---

### Step 4: Write the Jinja2 HTML Template

Paste into the **HTML** section:

```html
{%- set company_address = frappe.get_doc("Address", frappe.db.get_value(
        "Dynamic Link",
        {"link_doctype": "Company", "link_name": doc.company, "parenttype": "Address"},
        "parent"
    )) if frappe.db.get_value(
        "Dynamic Link",
        {"link_doctype": "Company", "link_name": doc.company, "parenttype": "Address"},
        "parent"
    ) else None -%}

<!-- ═══════════════════════════════════════════ HEADER ══ -->
<div class="receipt-header">
    {% if doc.company_logo %}
        <img src="{{ doc.company_logo }}" alt="Logo" style="max-height:40px; margin-bottom:4px;" />
    {% endif %}

    <div class="store-name">{{ doc.company }}</div>

    {% if company_address %}
        <div class="receipt-meta">
            {{ company_address.address_line1 }}<br/>
            {% if company_address.address_line2 %}{{ company_address.address_line2 }}<br/>{% endif %}
            {{ company_address.city }}{% if company_address.state %}, {{ company_address.state }}{% endif %}
        </div>
    {% endif %}

    <div class="receipt-meta" style="margin-top:6px;">
        <strong>Receipt:</strong> {{ doc.name }}<br/>
        <strong>Date:</strong> {{ doc.posting_date | frappe_date }}<br/>
        <strong>Time:</strong> {{ doc.posting_time or '' }}<br/>
        {% if doc.custom_cashier_id %}
            <strong>Cashier:</strong> {{ doc.custom_cashier_id }}<br/>
        {% endif %}
        {% if doc.customer and doc.customer != 'Guest' %}
            <strong>Customer:</strong> {{ doc.customer_name or doc.customer }}
        {% endif %}
    </div>
</div>

<!-- ═══════════════════════════════════════════ ITEMS ══ -->
<table class="items-table">
    <thead>
        <tr>
            <th style="width:50%">Item</th>
            <th style="width:15%; text-align:right">Qty</th>
            <th style="width:15%; text-align:right">Rate</th>
            <th style="width:20%; text-align:right">Amt</th>
        </tr>
    </thead>
    <tbody>
        {% for item in doc.items %}
        <tr>
            <td>
                {{ item.item_name }}
                {% if item.description and item.description != item.item_name %}
                    <br/><small style="color:#777;">{{ item.description[:40] }}</small>
                {% endif %}
            </td>
            <td class="amount">{{ item.qty | int }}</td>
            <td class="amount">{{ item.rate | fmt_money(currency=doc.currency) }}</td>
            <td class="amount">{{ item.amount | fmt_money(currency=doc.currency) }}</td>
        </tr>
        {% endfor %}
    </tbody>
</table>

<!-- ═══════════════════════════════════════════ TOTALS ══ -->
<div class="totals-section">
    <div class="row-line">
        <span>Subtotal</span>
        <span>{{ doc.net_total | fmt_money(currency=doc.currency) }}</span>
    </div>

    {% for tax in doc.taxes %}
        {% if tax.tax_amount and tax.tax_amount != 0 %}
        <div class="row-line">
            <span>{{ tax.description or tax.account_head }}</span>
            <span>{{ tax.tax_amount | fmt_money(currency=doc.currency) }}</span>
        </div>
        {% endif %}
    {% endfor %}

    {% if doc.discount_amount and doc.discount_amount > 0 %}
    <div class="row-line" style="color: green;">
        <span>Discount</span>
        <span>-{{ doc.discount_amount | fmt_money(currency=doc.currency) }}</span>
    </div>
    {% endif %}

    <div class="row-line grand-total">
        <span>TOTAL</span>
        <span>{{ doc.grand_total | fmt_money(currency=doc.currency) }}</span>
    </div>
</div>

<!-- ═══════════════════════════════════════════ PAYMENT ══ -->
<div class="payment-section">
    {% if doc.payments %}
        {% for payment in doc.payments %}
        <div style="display:flex; justify-content:space-between;">
            <span>{{ payment.mode_of_payment }}</span>
            <span>{{ payment.amount | fmt_money(currency=doc.currency) }}</span>
        </div>
        {% endfor %}

        {% set total_paid = doc.payments | map(attribute='amount') | sum %}
        {% set change = total_paid - doc.grand_total %}
        {% if change > 0 %}
        <div style="display:flex; justify-content:space-between; margin-top:4px; font-weight:bold;">
            <span>Change</span>
            <span>{{ change | fmt_money(currency=doc.currency) }}</span>
        </div>
        {% endif %}
    {% else %}
        <div style="display:flex; justify-content:space-between;">
            <span>{{ doc.mode_of_payment or 'Cash' }}</span>
            <span>{{ doc.grand_total | fmt_money(currency=doc.currency) }}</span>
        </div>
    {% endif %}
</div>

<!-- ═══════════════════════════════════════════ FOOTER ══ -->
<div class="receipt-footer">
    <p style="margin:4px 0; font-weight:bold;">Thank you for your purchase!</p>
    <p style="margin:4px 0;">Returns accepted within 7 days with receipt.</p>
    <p style="margin:4px 0;">For support: support@yourstore.com</p>

    {% set invoice_url = frappe.utils.get_url() + '/app/sales-invoice/' + doc.name %}
    <div class="qr-code">
        <img src="{{ frappe.utils.get_qr_code(invoice_url) }}" alt="QR Code" />
        <div style="font-size:9px;">Scan to verify</div>
    </div>

    <p style="margin:6px 0; font-size:9px;">
        {{ doc.name }} | {{ doc.posting_date | frappe_date }}
    </p>
</div>
```

---

### Step 5: Use Jinja Filters — Reference Guide

These filters are available in all Frappe print format templates:

```jinja2
{# Format a number as currency with the document's currency symbol #}
{{ doc.grand_total | fmt_money(currency=doc.currency) }}

{# Format a date field into a readable string (uses system date format) #}
{{ doc.posting_date | frappe_date }}

{# Format a datetime field #}
{{ doc.creation | frappe_datetime }}

{# Format currency with explicit precision #}
{{ doc.grand_total | frappe_currency(doc.currency) }}

{# Conditional rendering #}
{% if doc.discount_amount > 0 %}
    <p>Discount applied: {{ doc.discount_amount }}</p>
{% endif %}

{# Looping over a child table #}
{% for item in doc.items %}
    <tr>
        <td>{{ item.item_name }}</td>
        <td>{{ item.qty }}</td>
    </tr>
{% endfor %}

{# Calling frappe utility functions #}
{{ frappe.utils.get_url() }}
{{ frappe.utils.get_qr_code("https://example.com") }}
{{ frappe.format_value(doc.grand_total, {"fieldtype": "Currency"}) }}

{# Fetching a related document #}
{% set supplier = frappe.get_doc("Supplier", doc.supplier) %}
{{ supplier.supplier_name }}
```

---

### Step 6: Set as Default Print Format

1. Go to **Settings > Print Format**
2. Find "POS Receipt"
3. Click **Set as Default** (for Sales Invoice)

Or set it programmatically in the console:

```bash
bench --site your-site-name console
```

```python
import frappe

# Set as default for Sales Invoice
frappe.db.set_value(
    "Property Setter",
    None,
    {
        "doctype_or_field": "DocType",
        "doc_type": "Sales Invoice",
        "property": "default_print_format",
        "value": "POS Receipt",
    }
)
# Or create the property setter
ps = frappe.get_doc({
    "doctype": "Property Setter",
    "doctype_or_field": "DocType",
    "doc_type": "Sales Invoice",
    "property": "default_print_format",
    "value": "POS Receipt",
    "property_type": "Data",
})
ps.insert()
frappe.db.commit()
```

---

### Step 7: Export as a Fixture

To version-control your print format with the codebase:

```bash
bench --site your-site-name export-fixtures
```

Or export manually:

```bash
bench --site your-site-name console
```

```python
import frappe, json

pf = frappe.get_doc("Print Format", "POS Receipt")
with open("erpnext/fixtures/POS Receipt.json", "w") as f:
    json.dump(pf.as_dict(), f, indent=2, default=str)
print("Exported.")
```

Add to `hooks.py`:

```python
fixtures = [
    {"dt": "Print Format", "filters": [["name", "=", "POS Receipt"]]},
]
```

---

### Step 8: Test the Print Format

1. Open any submitted Sales Invoice in ERPNext
2. Click **Print** in the toolbar
3. Select **"POS Receipt"** from the Print Format dropdown
4. Verify:
   - Items table renders correctly
   - Taxes appear if present
   - Discount shows only if non-zero
   - QR code image renders (requires internet for Google Charts or local QR library)
   - Page is narrow (300px max width)
5. Click **Print** → check the browser print preview (should look like a thermal receipt)

---

### Step 9: Add a Translated String (Multilingual)

To support multiple languages, wrap text strings with `_()`:

```jinja2
{# The _() function returns the translated string based on user language #}
<p>{{ _("Thank you for your purchase!") }}</p>
<p>{{ _("Returns accepted within {0} days").format(7) }}</p>
```

Then add translations in **Translations** (`Settings > Translation`):
- Source Text: `Thank you for your purchase!`
- Language: `fr`
- Translated Text: `Merci pour votre achat !`

---

## Expected Results

1. ✅ "POS Receipt" appears in the Print Format list
2. ✅ Opening the print format on a Sales Invoice shows the narrow receipt layout
3. ✅ All items from the invoice appear in the items table
4. ✅ Taxes appear only when present
5. ✅ Discount row appears only when `discount_amount > 0`
6. ✅ Payment section shows mode of payment and change amount
7. ✅ QR code renders in the footer
8. ✅ Print preview shows correct thermal receipt width
9. ✅ Fixture export creates a JSON file

---

## Common Issues & Troubleshooting

### Issue 1: Jinja Error — `UndefinedError`

Cause: Accessing a field that doesn't exist on the document.

```jinja2
{# Safe: use `or` fallback #}
{{ doc.custom_cashier_id or 'N/A' }}

{# Safe: check before accessing #}
{% if doc.discount_amount %}
    {{ doc.discount_amount }}
{% endif %}
```

### Issue 2: QR Code Not Rendering

`frappe.utils.get_qr_code()` generates a base64 encoded PNG in Frappe v14+. In older versions it may return a URL to Google Charts API (requires internet).

```python
# Check in console what it returns:
import frappe
print(frappe.utils.get_qr_code("https://example.com")[:80])
```

### Issue 3: Taxes Loop Empty

Check that the Sales Invoice has taxes in the `taxes` child table:

```python
doc = frappe.get_doc("Sales Invoice", "SINV-2024-00001")
print(doc.taxes)  # Should be a list of dicts
```

### Issue 4: Font Not Monospaced on Printed Output

Some browsers override monospace fonts. Force it explicitly:

```css
* { font-family: 'Courier New', Courier, monospace !important; }
```

---

## Verification Checklist

- [ ] Print Format created with Custom HTML type
- [ ] CSS sets max-width: 300px for thermal receipt layout
- [ ] Items table iterates `doc.items` correctly
- [ ] Taxes section iterates `doc.taxes` with conditional
- [ ] Discount row only shows when `discount_amount > 0`
- [ ] Payment section shows mode and amount
- [ ] Change calculation renders when tendered > total
- [ ] QR code renders in footer
- [ ] Print Format set as default for Sales Invoice
- [ ] Fixture exported and listed in `hooks.py`

---

## Next Steps

1. **Letter head**: Create a Letter Head doctype and reference it in the print format for full-page layouts
2. **Barcode**: Use `frappe.utils.get_barcode()` to add a barcode for the invoice number
3. **Multi-currency**: Show both original and converted amounts using `doc.base_grand_total`
4. **Conditional format**: Create separate "A4 Invoice" and "Receipt" formats and switch based on channel

---

## Key Concepts Learned

- ✅ Frappe print format types: Standard, Custom HTML, Jinja
- ✅ Jinja2 syntax: variables `{{ }}`, control flow `{% %}`, filters `|`
- ✅ `doc` object in templates — accessing all fields and child tables
- ✅ `doc.items`, `doc.taxes`, `doc.payments` — iterating child tables with `for`
- ✅ Frappe Jinja filters: `fmt_money`, `frappe_date`, `frappe_datetime`, `frappe_currency`
- ✅ `frappe.utils.get_qr_code()` — embedded QR codes
- ✅ Calling `frappe.get_doc()` inside a Jinja template for related data
- ✅ CSS layout for thermal receipt (narrow, monospace, dashed separators)
- ✅ Conditional blocks to hide optional sections (discount, taxes)
- ✅ Fixture export for version-controlled print formats
