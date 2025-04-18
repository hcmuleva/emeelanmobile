// src/locales/hi-IN.js
import enUS from 'antd-mobile/es/locales/en-US';

export default {
  ...enUS, // Fallback to English for untranslated components
  Dialog: {
    ok: 'ठीक है',
    cancel: 'रद्द करें',
  },
  Picker: {
    ok: 'ठीक है',
    cancel: 'रद्द करें',
  },
  // Your custom app translations
  app: {
    login: 'लॉग इन',
    register: 'रजिस्टर करें',
    welcome: 'स्वागत है',
  }
};