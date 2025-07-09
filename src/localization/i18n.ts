// src/localization/i18n.js
import I18n from 'react-native-i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en';
import de from './locales/de';

I18n.fallbacks = true;
I18n.translations = {
  en,
  de,
};

// Default fallback
I18n.locale = 'en';

// Load saved language from AsyncStorage
export const loadAppLanguage = async () => {
  try {
    const savedLang = await AsyncStorage.getItem('appLanguage');
    if (savedLang) {
      I18n.locale = savedLang;
    }
  } catch (err) {
    console.error('Failed to load saved language', err);
  }
};

export const changeAppLanguage = async lang => {
  try {
    await AsyncStorage.setItem('appLanguage', lang);
    I18n.locale = lang;
  } catch (err) {
    console.error('Failed to change language', err);
  }
};

export const getAppLang = async () => {
  try {
    const savedLang = await AsyncStorage.getItem('appLanguage');

    return savedLang;
  } catch (err) {
    console.error('Failed to load saved language', err);
  }
};

export default I18n;
