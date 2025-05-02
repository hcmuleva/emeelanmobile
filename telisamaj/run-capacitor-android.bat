@echo off
REM === SET ENVIRONMENT VARIABLES ===
set JAVA_HOME=C:\Program Files\Java\jdk-21
set ANDROID_HOME=%USERPROFILE%\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator;%JAVA_HOME%\bin

REM === STEP 1: BUILD REACT APP ===
echo Building React App...
call npm run build

REM === STEP 2: SYNC WITH CAPACITOR ===
echo Syncing Capacitor...
npx cap sync android

REM === STEP 3: START EMULATOR (OPTIONAL) ===
REM Replace 'Pixel_9_Pro' with your emulator name
echo Starting emulator...
start "" cmd /c "emulator -avd Pixel_9_Pro"
REM === WAIT FOR DEVICE TO BOOT ===
echo Waiting for emulator to boot...
:waitForDevice
timeout /t 5 > nul
adb shell getprop sys.boot_completed | findstr "1" > nul
if errorlevel 1 goto waitForDevice

REM === STEP 4: RUN APP ON ANDROID ===
echo Deploying app to Android emulator...
npx cap run android --target emulator
