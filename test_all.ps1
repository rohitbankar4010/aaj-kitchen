$res = Invoke-WebRequest -Uri "http://localhost:3000/aaj-preview.html" -UseBasicParsing
Write-Host "HTTP Status:" $res.StatusCode
Write-Host "HTTP Length:" $res.RawContentLength

$appJs = Invoke-WebRequest -Uri "http://localhost:3000/src/app.js" -UseBasicParsing
Write-Host "app.js Status:" $appJs.StatusCode
Write-Host "app.js Length:" $appJs.RawContentLength

$scenes = Invoke-WebRequest -Uri "http://localhost:3000/src/components/CookingScenes.js" -UseBasicParsing
Write-Host "CookingScenes.js Status:" $scenes.StatusCode
Write-Host "CookingScenes.js Length:" $scenes.RawContentLength

$journey = Invoke-WebRequest -Uri "http://localhost:3000/src/components/CookingJourney.js" -UseBasicParsing
Write-Host "CookingJourney.js Status:" $journey.StatusCode
Write-Host "CookingJourney.js Length:" $journey.RawContentLength

$pantry = Invoke-WebRequest -Uri "http://localhost:3000/src/components/GroceriesDrawer.js" -UseBasicParsing
Write-Host "GroceriesDrawer.js Status:" $pantry.StatusCode
Write-Host "GroceriesDrawer.js Length:" $pantry.RawContentLength
