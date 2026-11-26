$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$url = "http://localhost:3000/aaj-preview.html"
$tempDir = "C:\Users\rohit\.gemini\antigravity\scratch\aaj-kitchen\.chrome_temp"

$dom = & $chrome --headless=new --disable-gpu --virtual-time-budget=4000 --dump-dom $url --user-data-dir=$tempDir 2>$null

Write-Host "DOM length: $($dom.Length)"

# Homepage checks
if ($dom -match "What.s cooking tonight") { Write-Host "[PASS] Homepage headline found" } else { Write-Host "[FAIL] Homepage headline MISSING" }
if ($dom -match "My kitchen") { Write-Host "[PASS] 'My kitchen' nav button found" } else { Write-Host "[FAIL] 'My kitchen' nav button MISSING" }
if ($dom -match "btnGroceriesEntry") { Write-Host "[PASS] Grocery entry button ID found" } else { Write-Host "[FAIL] Grocery entry button ID MISSING" }

# Check the new GroceriesDrawer was loaded (it inlines its CSS)
if ($dom -match "pm-overlay|pm-card|pm-headline") { Write-Host "[PASS] New Pantry Hub CSS injected" } else { Write-Host "[INFO] CSS injected on click (expected - it's deferred)" }

# Check the script tag loads GroceriesDrawer
if ($dom -match "GroceriesDrawer") { Write-Host "[PASS] GroceriesDrawer.js referenced" } else { Write-Host "[FAIL] GroceriesDrawer.js NOT referenced" }

# Check aaj-pm-styles not yet in DOM (injected on open)
if ($dom -match "aaj-pm-styles") { Write-Host "[INFO] PM styles already injected at load" } else { Write-Host "[INFO] PM styles loaded on demand (correct)" }

Write-Host "--- Checking for JS errors in page ---"
if ($dom -match "SyntaxError|TypeError|ReferenceError") { Write-Host "[FAIL] JS error detected in DOM" } else { Write-Host "[PASS] No visible JS errors in DOM" }
