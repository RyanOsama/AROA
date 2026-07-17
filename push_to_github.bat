@echo off
echo =========================================
echo AROA Github Auto-Push Script
echo =========================================
echo.

cd /d "d:\AROA\store"

echo Step 1: Adding files to Git...
git add .

echo Step 2: Committing changes...
git commit -m "Initial commit: AROA Store Setup"

echo Step 3: Setting branch to main...
git branch -M main

echo Step 4: Adding remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/RyanOsama/AROA.git

echo Step 5: Pushing to Github...
git push -u origin main

echo.
echo =========================================
echo Done! Please close this window.
echo =========================================
pause
