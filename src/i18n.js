import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

export default i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    debug: true,
    resources: {
      en: {
        countdown: {
          Until: 'Until the EOS.IO Launch',
        },
      },
      'zh-CN': {
        countdown: {
          Days: '天',
          Hours: '小时',
          Minutes: '分钟',
          Seconds: '秒',
          Until: '离 EOS.IO 启动',
        },
      },
    },
    react: { wait: true },
  });
