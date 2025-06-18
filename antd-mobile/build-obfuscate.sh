#!/bin/bash
export KEYSTORE_PASSWORD="welcome"
export KEY_ALIAS="emeelanmast"
export KEY_PASSWORD="welcome"
echo "📦 Cleaning previous obfuscated build..."
rm -rf build-obfuscated

echo "📁 Starting obfuscated build..."


echo "🕵️ Obfuscating JavaScript files in build-obfuscated..."

find build-obfuscated/static/js -type f -name "*.js" | while read js_file; do
  temp_file="${js_file}.temp"
  npx javascript-obfuscator "$js_file" --output "$temp_file" --config obfuscator-config.json
  mv "$temp_file" "$js_file"
done
echo "📁 Copying original build to obfuscated build..."

cp -r build build-obfuscated
echo "🔄 Syncing Capacitor with updated assets..."
npx cap sync

echo "✅ Done! Obfuscated build is ready and synced."
