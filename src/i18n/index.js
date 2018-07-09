import i18n from 'i18next';
import BrowserLanguageDetector from 'i18next-browser-languagedetector';
import { LanguageDetector } from 'i18next-express-middleware';

import { isServer } from '../store/utils';

import * as blockChain from './blockChain';
import * as price from './price';
import * as about from './about';
import * as layout from './layout';
import * as status from './status';
import * as dictionary from './dictionary';
import * as bp from './bp';
import * as mappingChecker from '../components/MappingChecking/i18n';

export default i18n.use(isServer ? LanguageDetector : BrowserLanguageDetector).init({
  preload: ['en', 'zh-CN'],
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  fallbackNS: ['translation'],
  resources: {
    'zh-CN': {
      block: blockChain.zh.block,
      transaction: blockChain.zh.transaction,
      account: blockChain.zh.account,
      action: blockChain.zh.action,
      token: blockChain.zh.token,
      bp: bp.zh,
      translation: {
        locale: 'zh',
        ...price.zh,
        ...about.zh,
        ...layout.zh,
        ...status.zh,
        ...dictionary.zh,
        ...mappingChecker.zh,
      },
    },
    en: {
      block: blockChain.en.block,
      transaction: blockChain.en.transaction,
      account: blockChain.en.account,
      action: blockChain.en.action,
      token: blockChain.en.token,
      bp: bp.en,
      translation: {
        locale: 'en',
        ...price.en,
        ...about.en,
        ...layout.en,
        ...status.en,
        ...dictionary.en,
        ...mappingChecker.en,
      },
    },
  },
  react: { wait: true },
});
