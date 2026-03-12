# Linux Log Practice for Frappe/ERPNext Flashcards

#### Prepopulate SQL + Log Practice Fixtures
Seed practice data before doing grep and report exercises:

```bash
cd /home/newang/frappe-bench-custom-test
./scripts/seed_full_erpnext_test_data.sh
```

This also generates dedicated practice log files:
- `logs/lab_practice_web.log`
- `logs/lab_practice_worker.log`
- `logs/lab_practice_scheduler.log`

Use them for deterministic grep drills, e.g.:

```bash
rg -n "ERROR|Traceback|timeout|failed" logs/lab_practice_*.log
```

---

#### Fast Login and Bench Context Check
Before reading logs, always confirm you are in the correct server/user/site context.

```bash
# SSH into server
ssh user@your-server

# Go to bench folder
cd /home/frappe/frappe-bench

# Confirm bench and active site
pwd
ls sites
bench version
```

:p What is the first thing to verify before debugging ERPNext logs on Linux?
??x
Verify context:
1. Correct server
2. Correct bench directory
3. Correct site/environment

Most log mistakes come from reading the wrong machine or wrong bench.
x??

---

#### Where Frappe/ERPNext Logs Are Located
Most runtime logs are in bench `logs/`:

```bash
cd /home/frappe/frappe-bench
ls logs
```

Common files:
- `web.log`
- `worker.log`
- `scheduler.log`
- `bench.log`
- `redis_cache.log`
- `redis_queue.log`

Site-specific logs may also appear in:
- `sites/<site_name>/logs/`

:p What are the main Frappe bench log locations and common files?
??x
Main location:
- `/home/frappe/frappe-bench/logs/`

Common files:
- `web.log`, `worker.log`, `scheduler.log`, `bench.log`
- Redis logs like `redis_cache.log`, `redis_queue.log`

Optional site-specific:
- `sites/<site>/logs/`
x??

---

#### Live Tail During Reproduction
Reproduce bug while watching logs in real time:

```bash
tail -f logs/web.log
tail -f logs/worker.log
tail -f logs/scheduler.log
```

Tip: open multiple terminals, one per log stream.

:p Why use `tail -f` when debugging ERPNext issues?
??x
`tail -f` gives live log output while reproducing the bug, letting you correlate user action with backend events immediately.
x??

---

#### Quick Error Scan Using `grep`
Find traceback/errors fast:

```bash
grep -i "traceback" logs/web.log
grep -i "error" logs/worker.log
grep -i "exception" logs/scheduler.log
```

With line numbers:

```bash
grep -in "traceback\|error\|exception" logs/web.log
```

:p What are the first patterns to search when scanning Frappe logs?
??x
Search for:
- `traceback`
- `error`
- `exception`

These catch most failure signatures quickly.
x??

---

#### Prefer `rg` for Faster Multi-File Search
Use ripgrep across all logs:

```bash
rg -n "Traceback|ERROR|Exception" logs/
```

Filter by keyword:

```bash
rg -n "Sales Invoice|Stock Entry|Payment Entry" logs/
```

:p Why is `rg` often better than `grep` for bench-wide log scanning?
??x
`rg` is typically faster, easier for multi-file search, and better for iterative filtering across many logs.
x??

---

#### Time-Based Filtering Pattern
Logs can be noisy; filter around incident time.

```bash
# Example if timestamp includes date/time text
grep "2026-03-11" logs/web.log | grep "14:"
```

Or use `rg`:

```bash
rg -n "2026-03-11.*14:" logs/web.log
```

:p How do you narrow logs to the incident window quickly?
??x
Filter by date and hour/minute pattern so you inspect only the relevant time slice around the issue.
x??

---

#### Follow Multiple Logs Together
Useful when issue crosses web + worker + scheduler.

```bash
tail -f logs/web.log logs/worker.log logs/scheduler.log
```

:p When should you tail multiple logs at once?
??x
When request path spans web requests, background jobs, and scheduler tasks. Multi-tail reveals cross-process flow and handoff issues.
x??

---

#### Find Failed Background Jobs
Worker logs often contain queue failures:

```bash
rg -n "failed|Traceback|Exception|Job" logs/worker.log
```

Also inspect scheduler:

```bash
rg -n "scheduler|Traceback|ERROR|failed" logs/scheduler.log
```

:p Which logs are key for async/background failures in Frappe?
??x
Primary async logs:
- `logs/worker.log`
- `logs/scheduler.log`

Web log alone is not enough for queue job failures.
x??

---

#### Check Bench Command History and Failures
Bench-level command runs and failures:

```bash
rg -n "ERROR|Traceback|executed with exit code" logs/bench.log
```

:p What log helps when bench commands fail (migrate/update/install-app)?
??x
`logs/bench.log` is the first place to inspect command-level failures and exit codes.
x??

---

#### Database Connectivity Errors Pattern
Common signatures:
- connection refused
- access denied
- timeout

```bash
rg -n "Access denied|connection refused|OperationalError|timeout|Can't connect" logs/
```

:p How do you quickly identify DB connection issues from logs?
??x
Search for connection/auth keywords across all logs:
`Access denied`, `OperationalError`, `Can't connect`, `timeout`, `connection refused`.
x??

---

#### Redis/Queue Health Clues
Queue issues may appear in Redis logs:

```bash
rg -n "error|fail|OOM|connection" logs/redis_cache.log logs/redis_queue.log
```

:p Which logs can reveal queue/cache infrastructure issues?
??x
Redis logs:
- `logs/redis_cache.log`
- `logs/redis_queue.log`

These reveal infra-side issues affecting jobs and cache.
x??

---

#### Permission and Auth Failure Patterns
Spot permission denials:

```bash
rg -n "PermissionError|Not Permitted|403|AuthenticationError|Invalid login" logs/
```

:p What patterns indicate auth/permission problems in ERPNext logs?
??x
Look for:
- `PermissionError`
- `Not Permitted`
- `403`
- `AuthenticationError`
- `Invalid login`
x??

---

#### Practical Drill: Find Why Sales Invoice Failed
Step-by-step drill:

```bash
cd /home/frappe/frappe-bench

# 1) scan all logs for invoice keywords
rg -n "Sales Invoice|SINV|Traceback|ERROR" logs/

# 2) inspect nearest traceback context in web + worker
rg -n -C 5 "Sales Invoice|Traceback|ERROR" logs/web.log logs/worker.log

# 3) if async involved, check scheduler/bench too
rg -n "Sales Invoice|ERROR|Traceback" logs/scheduler.log logs/bench.log
```

:p What is a good 3-step workflow for document-specific failure debugging?
??x
1. Global scan by document keyword + error terms
2. Context search (`-C`) in likely logs
3. Expand to scheduler/bench logs if async or command-triggered
x??

---

#### Practical Drill: Slow System Investigation
Start broad, then narrow:

```bash
# Check active load clues
rg -n "slow|timeout|502|504|worker timeout|killed" logs/

# Long-running requests/jobs traces
rg -n "request took|seconds|timeout|long query" logs/web.log logs/worker.log
```

Correlate with SQL checks in your SQL labs.

:p How do logs and SQL monitoring work together for performance diagnosis?
??x
Logs show symptoms and request/job timing, SQL tools show DB bottlenecks. Use both to confirm root cause.
x??

---

#### Log Hygiene and Rotation Awareness
Avoid missing old incidents:

```bash
ls logs
ls sites/dev_site_a/logs
```

Look for rotated files (`.1`, `.2`, `.gz`) if current file lacks older events.

:p Why can important errors be “missing” from current log files?
??x
Because logs rotate. Older entries may be in rotated files (`.1`, `.2`, `.gz`) or site-specific logs.
x??

---

#### Daily 7-Minute Frappe Log Routine
Practice this routine:

```bash
cd /home/frappe/frappe-bench

# 1) top errors now
rg -n "Traceback|ERROR|Exception" logs/ | head -n 50

# 2) background health
rg -n "failed|Traceback|Exception" logs/worker.log logs/scheduler.log

# 3) bench command failures
rg -n "exit code|ERROR|Traceback" logs/bench.log
```

:p What is a compact daily routine to stay familiar with Frappe logs?
??x
Daily:
1. Global error scan
2. Worker/scheduler failure scan
3. Bench command failure scan

This builds fast incident intuition over time.
x??
