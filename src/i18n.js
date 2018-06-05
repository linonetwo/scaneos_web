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
    debug: false,
    resources: {
      en: {
        translations: {
          locale: 'en',
          Locale: 'Language',
          webSiteIntroduction:
            'Scan EOS is a Block Explorer and Analytics Platform for EOS, an advanced decentralized smart contracts platform.',
          Id: 'ID',
          type: 'Type',
          timestamp: 'Timestamp',
          expiration: 'Expiration',
          handlerAccountName: 'Handler',
          account: 'Account',
          producerAccountId: 'Producer Account',
          name: 'Name',
          messageId: 'Message ID',
          transactionId: 'Txn ID',
          blockId: 'Block ID',
          prevBlockId: 'Prev Block ID',
          transactionNum: 'Transactions',
          accountNum: 'Accounts',
          messageNum: 'Messages',
          blocksNum: 'Blocks',
          blockNum: 'Block Num',
          refBlockNum: 'Ref Block Num',
          refBlockPrefix: 'Ref Block Prefix',
          createdAt: 'CreatedAt',
          updatedAt: 'UpdatedAt',
          ViewAll: 'View All',
          logoIcon: logoIconEn,
          underDev: 'Under development...',
          PendingTransactions: 'Pending Transactions',
          ContractInternalTransactions: 'Contract Internal Transactions',
          VerifiedContracts: 'Verified Contracts',
          messages: 'Messages',
          BlockProducers: 'Block Producers',
          eosBalance: 'EOS',
          stakedBalance: 'Staked',
          unstakingBalance: 'Unstaking',
          transactionMerkleRoot: 'Transaction Merkle Root',
          permission: 'Permission',
          authorization: 'Authorization',
          data: 'Data',
          sequenceNum: 'Sequence Num',
          signatures: 'Signatures',
          scope: 'Scope',
          readScope: 'Read Scope',
          introduction: 'Intro',
          prerequisites: 'Checks',
          location: 'Location',
          nodeLocation: 'NodeLocation',
          server: 'Server',
          index: 'Index',
          homepage: 'Home',
          contact: 'Contact',
          bpcontactus: 'If you are the owner of this BP, please contact scaneos.io@gmail.com to update the info here.',
          cansearch: 'Search blockID, blockNum, account...',
          price: 'Price',
          marketCap: 'MarketCap',
          China: 'China',
          Asia: 'Asia',
          America: 'America',
          Europe: 'Europe',
          Oceania: 'Oceania',
          Africa: 'Africa',
        },
        countdown: {
          Until: 'Until the EOS.IO Launch',
        },
      },
      'zh-CN': {
        translations: {
          locale: 'zh',
          Locale: '语言',
          webSiteIntroduction:
            'Scan EOS 是一个区块链浏览器，也是一个关于 EOS 的数据分析平台。我们所关注的 EOS 是一个先进的分布式智能合约平台。',
          Id: 'ID',
          type: '类型',
          timestamp: '时间戳',
          expiration: '过期时间',
          field: '字段',
          value: '值',
          handlerAccountName: '见证人',
          account: '账户',
          producerAccountId: '超级节点',
          name: '账户名',
          messageId: '消息ID',
          transactionId: '交易ID',
          blockId: '区块ID',
          prevBlockId: '父区块ID',
          blockNum: '区块高度',
          refBlockNum: '引用区块高度',
          refBlockPrefix: '引用区块前缀',
          createdAt: '创建日期',
          updatedAt: '更新日期',
          ViewAll: '查看全部',
          logoIcon: logoIconZh,
          Home: '首页',
          Block: '区块',
          BlockChain: '区块',
          Tokens: '通证',
          Token: '通证',
          TokenTransfers: '通证转移',
          Resources: '资源',
          Misc: '工具',
          underDev: '开发中……',
          Transactions: '交易列表',
          transactions: '交易',
          Transaction: '交易',
          transactionNum: '总交易量',
          accountNum: '总账户量',
          messageNum: '总消息量',
          blocksNum: '总区块量',
          PendingTransactions: '待确认交易',
          ContractInternalTransactions: '合约内交易',
          Blocks: '区块列表',
          Uncles: '叔块',
          Accounts: '账户列表',
          Account: '账户',
          VerifiedContracts: '已确认合约',
          Messages: '消息列表',
          Message: '消息',
          messages: '消息',
          Charts: '图表',
          BlockProducers: '超级节点',
          eosBalance: 'EOS 余额',
          stakedBalance: '锁定的余额',
          unstakingBalance: '未锁定的余额',
          transactionMerkleRoot: '交易的 Merkle 根节点',
          permission: '权限',
          authorization: '授权',
          data: '数据',
          sequenceNum: '序列号',
          signatures: '签名',
          scope: 'scope',
          readScope: 'readScope',
          introduction: '介绍',
          prerequisites: '申请条件',
          location: '位置',
          nodeLocation: '节点位置',
          server: '服务器配置',
          index: '序号',
          homepage: '主页',
          contact: '联系方式',
          bpcontactus: '如果您是该BP的所有者，请联系 scaneos.io@gmail.com 更新关于该BP的信息。',
          cansearch: '搜索区块ID、区块高度、账户……',
          price: '价格',
          marketCap: '市值',
          China: '中国',
          Asia: '亚洲',
          America: '美洲',
          Europe: '欧洲',
          Oceania: '大洋洲',
          Africa: '非洲',
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
