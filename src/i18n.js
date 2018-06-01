import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

import logoIconEn from './logoIcon-en.png';
import logoIconZh from './logoIcon-zh.png';

export default i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    ns: ['translations', 'layout'],
    defaultNS: 'translations',
    debug: true,
    resources: {
      en: {
        translations: {
          locale: 'en',
          handlerAccountName: 'Handler',
          account: 'Account',
          producerAccountId: 'Producer Account',
          name: 'Name',
          transactionId: 'Transaction ID',
          blockId: 'Block ID',
          blockNum: 'Block Number',
          createdAt: 'Created At',
          updatedAt: 'Updated At',
          ViewAll: 'View All',
          logoIcon: logoIconEn,
          underDev: 'Under development...',
          PendingTransactions: 'Pending Transactions',
          ContractInternalTransactions: 'Contract Internal Transactions',
          VerifiedContracts: 'Verified Contracts',
          BlockProducers: 'Block Producers',
        },
        countdown: {
          Until: 'Until the EOS.IO Launch',
        },
      },
      'zh-CN': {
        translations: {
          locale: 'zh',
          field: '字段',
          value: '值',
          handlerAccountName: '处理者账户',
          account: '账户',
          producerAccountId: '超级节点',
          name: '账户名',
          transactionId: '交易ID',
          blockId: '区块ID',
          blockNum: '区块高度',
          createdAt: '创建日期',
          updatedAt: '更新日期',
          ViewAll: '查看全部',
          logoIcon: logoIconZh,
          Home: '首页',
          BlockChain: '区块',
          Tokens: '通证',
          Token: '通证',
          TokenTransfers: '通证转移',
          Resources: '资源',
          Misc: '工具',
          underDev: '开发中……',
          Transactions: '交易',
          PendingTransactions: '待确认交易',
          ContractInternalTransactions: '合约内交易',
          Blocks: '区块',
          Uncles: '叔块',
          Accounts: '账户',
          VerifiedContracts: '已确认合约',
          Messages: '消息',
          Charts: '图表',
          BlockProducers: '超级节点',
        },
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
