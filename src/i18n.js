import i18n from 'i18next';
import BrowserLanguageDetector from 'i18next-browser-languagedetector';
import { LanguageDetector } from 'i18next-express-middleware';
import { reactI18nextModule } from 'react-i18next';

import { isServer } from './store/utils';
import logoIconEn from './logoIcon-en.png';
import logoIconZh from './logoIcon-zh.png';

export default i18n
  .use(isServer ? LanguageDetector : BrowserLanguageDetector)
  .use(reactI18nextModule)
  .init({
    preload: ['en', 'zh-CN'],
    fallbackLng: 'en',
    ns: ['translations', 'mappingChecking'],
    defaultNS: 'translations',
    debug: false,
    resources: {
      en: {
        translations: {
          locale: 'en',
          Locale: 'Language',
          webSiteIntroduction:
            "ScanEOS is the world's first professional blockchain explorer and data analysis platform that focuses on EOS ecosystem. We firmly believe that EOS technology will change the world. Bearing that in mind, we are striving to contribute to the growth of EOS ecosystem.",
          Id: 'ID',
          type: 'Type',
          timestamp: 'Timestamp',
          expiration: 'Expiration',
          handlerAccountName: 'Handler',
          account: 'Account',
          producerAccountId: 'Producer',
          name: 'Name',
          accountName: 'Name',
          messageId: 'MsgID',
          transactionId: 'TxnID',
          blockId: 'BlockID',
          prevBlockId: 'PrevBlockID',
          transactionNum: 'Transactions',
          accountNum: 'Accounts',
          messageNum: 'Messages',
          blocksNum: 'Blocks',
          blockNum: 'Block#',
          refBlockNum: 'RefBlock#',
          refBlockPrefix: 'Ref Block Prefix',
          createdAt: 'Created',
          updatedAt: 'Updated',
          ViewAll: 'View All',
          logoIcon: logoIconEn,
          underDev: 'Under development...',
          PendingTransactions: 'Pending Transactions',
          ContractInternalTransactions: 'Contract Internal Transactions',
          VerifiedContracts: 'Verified Contracts',
          messages: 'Messages',
          BlockProducers: 'Block Producers',
          tokenBalance: 'Balance',
          stakedBalance: 'Staked',
          unstakingBalance: 'Unstaking',
          transactionMerkleRoot: 'Transaction Merkle Root',
          permission: 'Permission',
          authorization: 'Authorization',
          data: 'Data',
          sequenceNum: 'Sequence#',
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
          PriceHistory: 'Price History',
          MappingChecker: 'Verify EOS registration',
          ethaddress: 'ETH address',
          eosaddress: 'regist Address',
          owner: 'owners Address',
          FriendLinks: 'Links',
          mappingCheckingPassed: 'EOS registration verification passed',
          thisSite: 'About This Site',
          moreAboutScanEOS: 'More About Scan EOS',
          webSiteTitle:
            'EOS BlockChain Browser | A Globally Professional EOS data viewing and analysing platform - Scan EOS',
          VotingProgress: 'EOS Voting Progress',
          EOSVotes: 'EOS Votes',
          MinimumVotesRequired: 'Minimum Votes Required',
          contactUs: 'Contact US',
          EOSVotesIntroduction:
            'Each staking of 1 EOS can cast votes of about 373757, This value will change over time.',
          aboutThisSite: `<0>ScanEOS is the world's first professional blockchain explorer and data analysis platform that focuses on EOS ecosystem.</0>
            <1>
              Blockchain browser is one of the most import window to view information inside blockchain's blocks.
              Scan EOS read data from EOS' blocks for you. So you can search transactions, accounts and more data that is related to you.
              These data may be very important to investigator and worker that works in blockchain industry.
            </1>
            <2>
              Besides basic blocks data and transaction data, Scan EOS enables you to view even more kinds of aggregated information, getting your own insight from charts that describe the movement of EOS community. These information can be your first hand reference for product design and value investigation.
            </2>`,
          aboutEOS: `<0>EOS is an advanced distributed smart contract platform.</0>
          <1>
            EOS (Enterprise Operation System) is a software developed by Block.one and EOS community. It aims to provide a brand new smart contract platform, making developing high performance distributed application even more easier.
            EOS's development is leaded by Daniel Larimer（BM), who had his huge successes in BitShares and Steemit. So EOS will find its balance in performance and security, finally supporting various of DAPP running efficiently.
          </1>`,
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
            'ScanEOS 是全球首个专注于 EOS 生态的专业区块链浏览器和数据分析平台。我们坚信 EOS 将会改变这个世界。ScanEOS 希望能为 EOS 生态的壮大贡献自己的一份力量。',
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
          accountName: '账户名',
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
          BlockChain: '区块链',
          Tokens: '通证',
          Token: '通证',
          TokenTransfers: '通证转移',
          Resources: '资源',
          Misc: '其他',
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
          BlockProducer: '超级节点',
          tokenBalance: '余额',
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
          prerequisites: '条件',
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
          PriceHistory: '价格走势',
          MappingChecker: '主网映射验证',
          ethaddress: '输入您的以太坊地址',
          FriendLinks: '友情链接',
          eosaddress: '映射到地址',
          owner: '拥有者地址',
          mappingCheckingPassed: 'EOS 映射校验通过',
          Overview: '概览',
          Raw: '原始信息',
          Activities: '近期动态',
          About: '关于我们',
          moreAboutScanEOS: '更多关于 Scan EOS 的介绍',
          thisSite: '关于本站',
          webSiteTitle: 'EOS 区块链浏览器 | 全球专业的EOS数据查看分析平台 - Scan EOS',
          LoadingModule: '模块加载中',
          status: '状态',
          pending: '等待',
          voterInfo: '投票质押信息',
          proxy: '代理',
          lastVoteWeight: '剩余的投票权',
          proxiedVoteWeight: '已代理的投票权',
          isProxy: '是否为代理',
          deferredTrxId: '延后的交易 ID',
          lastUnstakeTime: '最近的解除质押时间',
          staked: '已质押的余额',
          producers: '已投票的超级节点',
          unstaking: '未质押的余额',
          selfDelegatedBandwidth: '自我代理的带宽',
          ramBytes: '内存大小(Byte)',
          netWeight: '带宽权重',
          cpuWeight: 'CPU权重',
          totalResources: '拥有的资源总量',
          VotingProgress: 'EOS投票进度',
          EOSVotes: 'EOS投票量',
          MinimumVotesRequired: '主网启动所需最小投票量',
          ToVote: '仅剩',
          contactUs: '加入社群',
          country: '国家',
          rank: '排名',
          EOSVotesIntroduction: '每质押 1 EOS 可投出约 373757 票，此数值会随时间变化。',
          aboutThisSite: `<0>Scan EOS 是一个区块链浏览器，也是一个关于 EOS 的数据分析平台。</0>
          <1>
            区块链浏览器是浏览区块链信息的主要窗口，例如 Scan EOS 就可以浏览 EOS
            每一个区块内包含的信息，也能直接搜索与自己有关的交易和账户。这些数据对于工作、投资与 EOS
            相关的人，非常关键。
          </1>
          <2>
            除了基本的区块数据、交易数据以外，Scan EOS 还将允许你查看更多种类的聚合数据，通过图表洞察 EOS
            社区的动向，从而能为 EOS 相关的产品设计、价值投资收集第一手的参考数据。
          </2>`,
          aboutEOS: `<0>我们所关注的 EOS 是一个先进的分布式智能合约平台。</0>
          <1>
            EOS (Enterprise Operation System)
            是由Block.one公司主导开发的一种全新的基于区块链智能合约平台，旨在为高性能分布式应用提供底层区块链平台服务。EOS
            项目由 Daniel Larimer（人称BM）主导，继承了 BitShares 和 Steemit 的成功经验，因此 EOS
            在效率和安全性中找到了很好的平衡，可以高效运行多样化的去中心化应用（DAPP）。
          </1>`,
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
