# EMeelanReactNative

Added Basic Structure to ReactNative App

p/app
├── index.js                    # Main entry point with AppWithAuth component
├── App.js                      # Routes configuration only
├── /contexts
│   └── AuthContext.js          # Authentication context and provider(Use Dummy Data)
├── /screens
│   ├── SplashScreen.jsx        # Loading screen
│   ├── /public
│   │   └── LoginScreen.js      # Public login screen
│   └── /private
│       └── HomeScreen.js       # Protected home screen


# React Native Authentication Flow

A React Native application built with Expo that demonstrates a complete authentication flow with public and private routing.

## Features

- Public and private route handling
- Authentication with dummy user data

## Project Structure

```
/app
  │
  ├── /contexts
  │   └── AuthContext.js          # Authentication context and provider
  ├── /screens
  │   ├── SplashScreen.jsx        # Loading screen
  │   ├── /public
  │   │   └── LoginScreen.js      # Public login screen
  │   └── /private
  │       └── HomeScreen.js       # Protected home screen
  │ 
  │ 
  ├── index.js                    # Main entry point with AppWithAuth component
  ├── App.js                      # Routes configuration only
```

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI

## Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Install Expo CLI globally if you haven't already:
   ```bash
   npm install -g expo-cli
   # or
   yarn global add expo-cli
   ```

## Required Dependencies

Make sure to install these packages:

```bash
npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context react-native-gesture-handler @react-native-async-storage/async-storage
# or
yarn add @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context react-native-gesture-handler @react-native-async-storage/async-storage
```

## Running the App

1. Start the Expo development server:
   ```bash
   expo start
   # or
   npm start
   # or
   yarn start
   ```

2. Run on a simulator or device:
   - For iOS simulator: Press `i` in the terminal or click "Run on iOS simulator" in the Expo DevTools
   - For Android emulator: Press `a` in the terminal or click "Run on Android device/emulator" in the Expo DevTools
   - For a physical device: Scan the QR code with the Expo Go app (available on [iOS App Store](https://apps.apple.com/app/apple-store/id982107779) and [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent))

## Testing the Authentication

Use the following credentials to log in:

- Email: `user@hph.com`
- Password: `welcome123`

Or:

- Email: `admin@hph.com`
- Password: `admin123`

## Development Commands

- `expo start`: Start the development server
- `expo start --android`: Start the development server and open Android emulator
- `expo start --ios`: Start the development server and open iOS simulator
- `expo start --web`: Start the development server and open in web browser
- `expo eject`: Eject from Expo managed workflow to bare workflow

## Building for Production

To create a production build:

```bash
expo build:android  # For Android APK or bundle
expo build:ios      # For iOS IPA
expo build:web      # For web deployment
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.