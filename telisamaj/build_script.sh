#!/bin/bash

# Exit immediately on error
set -e

# Load shell config first to ensure nvm and other paths are available
if [ -f ~/.zshrc ]; then
    source ~/.zshrc
elif [ -f ~/.bashrc ]; then
    source ~/.bashrc
elif [ -f ~/.bash_profile ]; then
    source ~/.bash_profile
fi

# Set JAVA_HOME - use the exact path from `brew info openjdk@21`
export JAVA_HOME=$(brew --prefix openjdk@21)
export PATH="$JAVA_HOME/bin:$PATH"

# Validate JAVA_HOME
if [ ! -d "$JAVA_HOME" ]; then
  echo "❌ ERROR: JAVA_HOME is set to an invalid directory: $JAVA_HOME"
  echo "Please install openjdk@21 using: brew install openjdk@21"
  exit 1
fi

# Show Java version
echo "✅ JAVA_HOME is set to: $JAVA_HOME"
java -version

# Switch to Node.js version 20
echo "🔄 Switching to Node.js version 20..."
nvm use 20

# Change directory to android
echo "📂 Entering android directory..."
cd android

# Clean Gradle build
echo "🧹 Cleaning gradle build..."
./gradlew clean

# Build release APK
echo "🚀 Building release APK..."
./gradlew assembleRelease --stacktrace --info

# Return to project root to run Capacitor sync
cd ..

# Sync with Capacitor
echo "🔄 Syncing Capacitor with Android..."
npx cap sync android

echo ""
echo "✅ Build and sync completed successfully!"
echo "📁 Release APK should be available in: android/app/build/outputs/apk/release/"