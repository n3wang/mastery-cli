# ERPNext Developer Documentation

Welcome to the ERPNext developer learning materials! This documentation will help you understand the ERPNext architecture and get hands-on experience with common development tasks.

## Documentation Overview

This folder contains comprehensive materials for learning ERPNext development:

### 📚 Architecture Documentation

**[architecture.md](architecture.md)** - Complete architectural overview covering:
- Core architecture patterns (MVC, module-based organization)
- Directory structure and key files
- DocType components (JSON, Python, JavaScript)
- Controller hierarchy and inheritance
- Frontend architecture
- Integration with Frappe Framework
- Data flow examples
- Best practices

**Recommended for**: Everyone starting with ERPNext development

**Time to read**: 30-45 minutes

---

### 🎯 Practice Exercises

#### Exercise 1: Adding Custom Fields

**[exercise-01-custom-field.md](exercise-01-custom-field.md)** - Learn DocType customization

**What you'll build**: Add a "Customer Priority" field to Sales Order with validation

**Topics covered**:
- Modifying DocType JSON schemas
- Adding server-side validation (Python)
- Implementing client-side behavior (JavaScript)
- Testing your changes

**Difficulty**: Beginner
**Time**: 30-45 minutes
**Prerequisites**: Basic Python and JavaScript knowledge

---

#### Exercise 2: Creating Custom Reports

**[exercise-02-custom-report.md](exercise-02-custom-report.md)** - Build a sales analytics report

**What you'll build**: "Customer Sales Summary" report with filters and charts

**Topics covered**:
- Creating report directory structure
- Writing SQL queries for reports
- Adding dynamic filters
- Formatting report columns
- Creating chart visualizations
- Custom formatters and highlighting

**Difficulty**: Beginner
**Time**: 45-60 minutes
**Prerequisites**: Basic SQL knowledge, completed Exercise 1 (recommended)

---

#### Exercise 3: Creating a Custom DocType from Scratch

**[exercise-03-custom-doctype.md](exercise-03-custom-doctype.md)** - Build a complete new DocType with child table

**What you'll build**: "Maintenance Request" DocType with child task table, lifecycle hooks, and a custom action button

**Topics covered**:
- Designing DocType JSON schemas
- Child table DocTypes (`istable: 1`) and `Table` fieldtype
- Autoname patterns and `is_submittable`
- Python controller: `validate`, `on_submit`, `on_cancel`, `db_set()`
- `@frappe.whitelist()` to expose Python methods to JS
- Custom form buttons and `frappe.call()` from JavaScript
- Field visibility toggling and status indicators
- Writing FrappeTestCase unit tests

**Difficulty**: Intermediate
**Time**: 60-90 minutes
**Prerequisites**: Exercise 1 and 2 (recommended)

---

#### Exercise 4: Building a Custom REST API

**[exercise-04-custom-api.md](exercise-04-custom-api.md)** - Expose Python functions as authenticated HTTP endpoints

**What you'll build**: "Inventory Query API" with four endpoints — public stock lookup, item search, stock reservation, and order status

**Topics covered**:
- `@frappe.whitelist()` and `allow_guest=True`
- URL pattern for whitelisted methods
- Input validation and `frappe.throw()` with exception types
- `frappe.has_permission()` for access control
- `frappe.get_all()` with filters, or_filters, and pagination
- Frappe's response envelope `{"message": ...}`
- API key/secret authentication with `Authorization: token` header
- Testing with `curl` and the Frappe console
- Server Scripts as a no-code alternative

**Difficulty**: Intermediate
**Time**: 60-90 minutes
**Prerequisites**: Exercise 1, basic HTTP/JSON knowledge

---

#### Exercise 5: Building a Custom Desk Page

**[exercise-05-custom-page.md](exercise-05-custom-page.md)** - Create a live operations dashboard page

**What you'll build**: "Operations Dashboard" — a custom Frappe page with summary cards, a stacked bar chart, and a low-stock alert table

**Topics covered**:
- Frappe page structure (JSON metadata + Python backend + JS controller)
- `frappe.ui.make_app_page()` and page toolbar actions
- Batching API calls into a single endpoint for performance
- `frappe.Chart` — built-in chart library
- Dynamic HTML construction and DOM manipulation
- Linking from page widgets to DocType forms and list views
- Module config registration for navigation

**Difficulty**: Intermediate
**Time**: 75-90 minutes
**Prerequisites**: Exercise 4 (API methods)

---

#### Exercise 6: Hooks, Document Events, and Scheduled Tasks

**[exercise-06-hooks-and-scheduler.md](exercise-06-hooks-and-scheduler.md)** - React to document events and run background jobs

**What you'll build**: Invoice audit log (fires on every Sales Invoice submit/cancel) + daily low-stock alert email scheduler task

**Topics covered**:
- `hooks.py` as the app integration manifest
- `doc_events` — subscribing to any DocType lifecycle event
- Hook function signature: `def handler(doc, method)`
- `try/except` pattern — never let hooks crash the main transaction
- `frappe.log_error()` for silent failure logging
- `scheduler_events` — daily/hourly/weekly/cron background jobs
- `frappe.enqueue()` — deferring heavy work to background workers
- `frappe.sendmail()` — queue emails from Python
- `bench execute` — manual task triggering for testing
- Server Scripts as a no-code alternative for hooks

**Difficulty**: Intermediate
**Time**: 60-90 minutes
**Prerequisites**: Exercise 1 and 3 (DocTypes)

---

#### Exercise 7: Building a Document Approval Workflow

**[exercise-07-workflow.md](exercise-07-workflow.md)** - Multi-step approval process with roles and notifications

**What you'll build**: "Purchase Order Approval" workflow with buyer → manager approval gate, threshold-based bypass, rejection dialog, and email notifications

**Topics covered**:
- Frappe Workflow: States, Transitions, Allowed Roles, Conditions
- Doc Status alignment with workflow states
- Condition expressions on transitions (Python eval)
- Frappe Notifications triggered on field value change with Jinja2 templates
- `frappe.model.workflow.apply_workflow()` — programmatic control
- `frappe.ui.Dialog` — custom dialog forms in JavaScript
- `frm.dashboard.add_comment()` — contextual form messages
- Fixture export/import for versioning workflows as code

**Difficulty**: Intermediate
**Time**: 60-75 minutes
**Prerequisites**: Exercise 1 (forms and roles)

---

#### Exercise 8: Custom Print Formats with Jinja2

**[exercise-08-print-format.md](exercise-08-print-format.md)** - Build a branded thermal receipt print format

**What you'll build**: "POS Receipt" print format for Sales Invoice — narrow thermal layout with item table, tax breakdown, payment info, and QR code

**Topics covered**:
- Frappe print format types (Standard, Custom HTML, Jinja)
- Jinja2 syntax in print templates
- `doc` object: fields, child tables (`doc.items`, `doc.taxes`, `doc.payments`)
- Frappe Jinja filters: `fmt_money`, `frappe_date`, `frappe_currency`
- `frappe.utils.get_qr_code()` — embedded QR codes
- Conditional blocks for optional sections (discount, taxes, change)
- CSS layout for 80mm thermal paper
- Fixture export for version-controlled print formats
- Multilingual support with `_()`

**Difficulty**: Intermediate
**Time**: 45-60 minutes
**Prerequisites**: Familiarity with HTML/CSS and Jinja2 basics

---

## Getting Started

### Recommended Learning Path

**Track A — Core Fundamentals (Beginners)**

1. **Read the Architecture Documentation** (architecture.md) — 30-45 min
2. **Exercise 1** — Custom fields and form validation
3. **Exercise 2** — Custom SQL reports with charts

**Track B — Full-Stack Features (Intermediate)**

4. **Exercise 3** — Build a complete DocType from scratch (child tables, lifecycle hooks, custom buttons)
5. **Exercise 4** — Expose REST API endpoints with authentication
6. **Exercise 5** — Build a custom Desk dashboard page
7. **Exercise 6** — Hooks, document event reactions, and scheduled email tasks

**Track C — Advanced Patterns (Intermediate)**

8. **Exercise 7** — Multi-step approval workflows with role-based transitions
9. **Exercise 8** — Branded print formats with Jinja2 (thermal receipt)

You can do Tracks B and C in any order after completing Track A.

### Prerequisites

Before starting the exercises, ensure you have:

- ✅ ERPNext development environment set up
- ✅ Access to a development site
- ✅ Basic understanding of Python
- ✅ Basic understanding of JavaScript
- ✅ Familiarity with SQL (for Exercise 2)
- ✅ Text editor or IDE configured

### Setting Up Your Environment

If you haven't set up ERPNext yet:

```bash
# Install bench
pip install frappe-bench

# Create a new bench
bench init frappe-bench --frappe-branch version-15

# Create a new site
cd frappe-bench
bench new-site your-site-name

# Get ERPNext
bench get-app erpnext --branch version-15

# Install ERPNext on your site
bench --site your-site-name install-app erpnext

# Start development server
bench start
```

---

## Quick Reference

### Common Commands

```bash
# Clear cache after making changes
bench clear-cache

# Migrate database after schema changes
bench --site your-site-name migrate

# Build JavaScript/CSS assets
bench build

# Run tests for a specific doctype
bench --site your-site-name run-tests --module erpnext.selling.doctype.sales_order

# Open Python console
bench --site your-site-name console

# Watch and rebuild on file changes (for development)
bench watch
```

### Important File Locations

```
erpnext/
├── {module}/
│   ├── doctype/
│   │   └── {doctype_name}/
│   │       ├── {doctype_name}.json      # Schema
│   │       ├── {doctype_name}.py        # Backend logic
│   │       ├── {doctype_name}.js        # Frontend logic
│   │       └── test_{doctype_name}.py   # Tests
│   ├── report/
│   │   └── {report_name}/
│   │       ├── {report_name}.json       # Report config
│   │       ├── {report_name}.py         # Report logic
│   │       └── {report_name}.js         # Report UI
│   └── config.py                        # Module navigation
├── controllers/                          # Base controllers
├── public/js/                           # Frontend code
├── public/css/                          # Stylesheets
└── hooks.py                             # App registration
```

### Key Concepts

**DocType**: ERPNext's fundamental building block - a document type with schema, logic, and UI

**Controller**: Python class containing business logic for a doctype

**Hooks**: Integration points for extending functionality (defined in hooks.py)

**Frappe Framework**: The underlying framework that provides ORM, UI, permissions, etc.

**Bench**: Command-line tool for managing Frappe/ERPNext installations

---

## Tips for Success

### Development Best Practices

1. **Always clear cache** after making changes to Python or JSON files
2. **Use bench watch** during active development to auto-rebuild assets
3. **Write tests** for your business logic
4. **Follow naming conventions**: snake_case for Python, camelCase for JavaScript
5. **Extend base controllers** instead of writing logic from scratch
6. **Use git branches** for new features
7. **Document your code** with docstrings and comments

### Debugging Tips

1. **Enable Developer Mode**:
   ```bash
   bench --site your-site-name set-config developer_mode 1
   ```

2. **Check error logs**:
   ```bash
   # View logs
   tail -f sites/your-site-name/logs/error.log
   ```

3. **Use print debugging** in Python (shows in console output)

4. **Use browser DevTools** for JavaScript debugging

5. **Check database directly** if needed:
   ```bash
   bench --site your-site-name mariadb
   ```

### When You Get Stuck

1. Check the [Frappe Framework docs](https://frappeframework.com/docs)
2. Search the [ERPNext forums](https://discuss.erpnext.com)
3. Look at similar existing doctypes/reports in the codebase
4. Review the exercise troubleshooting sections
5. Ask questions on the community forum

---

## Additional Resources

### Official Documentation

- [ERPNext User Manual](https://docs.erpnext.com)
- [Frappe Framework Documentation](https://frappeframework.com/docs)
- [Frappe School](https://frappe.school) - Video tutorials

### Community

- [ERPNext Forum](https://discuss.erpnext.com)
- [ERPNext GitHub](https://github.com/frappe/erpnext)
- [Frappe GitHub](https://github.com/frappe/frappe)

### Advanced Topics

After completing the exercises, explore these advanced topics:

- **Custom DocTypes**: Create entirely new document types
- **Workflows**: Implement approval processes
- **Server Scripts**: Add Python logic without modifying code
- **Client Scripts**: Add JavaScript behavior via UI
- **Print Formats**: Customize document printing
- **Web Forms**: Create public-facing forms
- **Hooks**: Extend document lifecycle events
- **Background Jobs**: Implement scheduled tasks
- **REST API**: Build integrations
- **Custom Apps**: Create your own Frappe apps

---

## Contributing

Found an issue or have suggestions for improving these exercises?

1. Check existing issues in the ERPNext repository
2. Create a new issue with details
3. Submit a pull request with improvements

---

## Exercise Solutions

Need help? Here are some tips:

- **Exercise 1**: Focus on understanding the three-file pattern (JSON, Python, JS)
- **Exercise 2**: Start simple with the SQL query, then add features incrementally

Remember: The best way to learn is by doing. Don't be afraid to experiment and break things in your development environment!

---

## Next Steps After Completion

Once you've completed all exercises:

1. ✅ Try the variation challenges at the end of each exercise guide
2. ✅ Study existing ERPNext modules for patterns (accounts, stock, buying)
3. ✅ Build a custom app with `bench new-app` that packages your DocTypes, APIs, and print formats
4. ✅ Combine Exercise 3 + 4 + 5 into a full feature: DocType → API → Dashboard
5. ✅ Combine Exercise 6 + 7: use hooks to auto-advance a workflow based on business rules
6. ✅ Contribute to the ERPNext project on GitHub
7. ✅ Share your learning with the community

**Capstone Project idea**: Build a full "Workshop Management" mini-app that uses:
- Exercise 3 pattern (custom DocType: Work Order)
- Exercise 4 pattern (API for a mobile app or scanner)
- Exercise 5 pattern (Workshop Dashboard page)
- Exercise 6 pattern (daily summary email to supervisors)
- Exercise 7 pattern (approval workflow for high-cost work orders)
- Exercise 8 pattern (work order print format for technicians)

Happy coding! 🚀
