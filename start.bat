@echo off
chcp 65001 >nul
title Tu Vi Dau So - Dang Khoi Dong

echo ========================================================
echo          HE THONG TU VI DAU SO - KHOI DONG
echo ========================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [LOI] May tinh chua cai dat Node.js!
    echo Vui long tai va cai dat Node.js tai https://nodejs.org
    echo.
    pause
    exit /b 1
)

if not exist node_modules (
    echo [THONG BAO] Dang cai dat thu vien, vui long cho...
    call npm.cmd install
    if %errorlevel% neq 0 (
        echo [LOI] Cai dat thu vien that bai!
        echo.
        pause
        exit /b 1
    )
)

echo [OK] Dang khoi chay he thong tai dia chi: http://localhost:3000
echo Nhan Ctrl + C de dung may chu.
echo ========================================================
echo.

start "" http://localhost:3000

call npm.cmd run dev

pause