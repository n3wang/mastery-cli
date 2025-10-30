# Troubleshooting "Failed to fetch" Error

## The Issue
You're getting: `Failed to register: ClientException: Failed to fetch, uri=http://localhost:5292/api/guest/register`

## Possible Causes & Solutions

### 1. **Application Not Running**
**Check**: Is the application actually running?
```bash
# Start the app
dotnet run

# In another terminal, test:
curl http://localhost:5292/health
```

**Expected response:** `{"status":"healthy","timestamp":"..."}`

### 2. **CORS Issue (Most Likely)**
If you're calling from a web browser/JavaScript, you need CORS enabled.

**✅ FIXED**: I've already added CORS support to your `Program.cs`

### 3. **Wrong Port**
**Check**: Are you using the correct port?
- Your app runs on **port 5292**
- URL should be: `http://localhost:5292/api/guest/register`

### 4. **Request Format Issues**
**Check**: Your request format

**✅ Correct format:**
```json
POST /api/guest/register
Content-Type: application/json

{
  "displayName": "TestPlayer",
  "deviceId": "optional-device-id"
}
```

### 5. **Network/Firewall Issue**
**Check**: Windows Firewall or antivirus blocking localhost connections

### 6. **Test from Different Clients**

**Option A: PowerShell (Windows)**
```powershell
$body = @{
    displayName = "TestPlayer"
    deviceId = "test-device-123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5292/api/guest/register" -Method POST -Body $body -ContentType "application/json"
```

**Option B: Swagger UI**
1. Go to http://localhost:5292
2. Find "Guest" section
3. Try POST /api/guest/register
4. Use test data:
```json
{
  "displayName": "TestPlayer",
  "deviceId": "test-device-123"
}
```

**Option C: Browser Console (if CORS is working)**
```javascript
fetch('http://localhost:5292/api/guest/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        displayName: 'TestPlayer',
        deviceId: 'browser-test'
    })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

## Quick Diagnostic Steps

1. **Verify app is running:**
```bash
netstat -an | findstr 5292
```

2. **Test health endpoint first:**
```bash
curl http://localhost:5292/health
```

3. **Check Swagger UI:**
   - Open browser: http://localhost:5292
   - Look for Guest controller endpoints

4. **Test with simple GET first:**
```bash
curl http://localhost:5292/api/guest/check/TEST123
```

## Most Likely Solutions

### If using from JavaScript/Browser:
- **CORS is now enabled** - restart your app after my changes
- Try the Swagger UI first to verify endpoints work

### If using from Postman/curl:
- Verify the exact URL: `http://localhost:5292/api/guest/register`
- Ensure proper JSON headers
- Check app is actually running (not shutting down)

### If app keeps shutting down:
- Run: `dotnet run --no-build`
- Check for unhandled exceptions in startup
- Try: `dotnet run --verbosity detailed`

Let me know which test method you're using and what specific error you get!