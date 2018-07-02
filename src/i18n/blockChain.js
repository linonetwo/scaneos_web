const zhShared = {
  Id: 'ID',
  id: 'ID',
  timestamp: '时间戳',
  field: '字段',
  value: '值',
  transactions: '交易',
  blockID: '区块ID',
  transactionID: '交易ID',
  actionID: '消息ID',
  account: '账户',
  pending: '等待',
  createdAt: '创建日期',
  updatedAt: '更新日期',
};
export const zh = {
  block: {
    ...zhShared,
    producerAccountID: '超级节点',
    prevBlockID: '父区块ID',
    blockNum: '区块高度',
    transactionMerkleRoot: '交易的Merkle根节点',
  },
  transaction: {
    ...zhShared,
    refBlockPrefix: '引用区块前缀',
    refBlockNum: '引用区块高度',
    expiration: '过期时间',
    PendingTransactions: '待确认的交易',
    ContractInternalTransactions: 'Contract Internal Transactions',
    actions: '消息',
    status: '状态',
    sequenceNum: '序列号',
    type: '类型',
  },
  account: {
    ...zhShared,
    name: '账户名',
    accountName: '账户名',
    eosBalance: '可用余额',
    eosStaked: '已质押的余额',
    eosTotal: '余额共计',
    ramAvailable: '可用内存',
    netAvailable: '可用带宽',
    cpuAvailable: '可用算力',
    ramMax: '总内存',
    netMax: '总带宽',
    cpuMax: '总算力',

    voterInfo: '投票质押信息',
    proxy: '代理',
    lastVoteWeight: '剩余的投票权',
    proxiedVoteWeight: '已代理的投票权',
    isProxy: '是否为代理',
    deferredTrxId: '延后的交易 ID',
    lastUnstakeTime: '最近的解除质押时间',
    staked: '已质押的余额',
    producers: '已投票的超级节点',
    selfDelegatedBandwidth: '自我代理的带宽',
    ramBytes: '内存大小(Byte)',
    netWeight: '带宽权重',
    cpuWeight: 'CPU权重',
    totalResources: '拥有的资源总量',

    tokenBalance: '余额',
    unstakingBalance: '未锁定的余额',
    transactionMerkleRoot: '交易的 Merkle 根节点',
    permission: '权限',
    sequenceNum: '序列号',
    signatures: '签名',
    scope: 'scope',
    readScope: 'readScope',

    Auction: '靓号竞拍',
    newName: '靓号',
    offerBid: '出价',
    highBidder: '最高出价者',
    highBid: '目前最高出价',
    lastBidTime: '出价时间',
    tryName: '搜索靓号是否正在竞拍',
    notInAuction: '此账户名尚未参与竞拍，',
    nearestResult: '为您展示最相似的一个靓号',
  },
  action: {
    ...zhShared,
    data: '数据',
    name: '操作类型',
    handlerAccountName: '处理本操作的账户',
    authorization: '授权',

    transfer: '转账',
    transferTo: '转账给',
  },
  token: {
    issuer: '发行方',
    maximumSupply: '发行量',
    createdAt: '发行时间',
  },
};

const enShared = {
  Id: 'ID',
  id: 'ID',
  blockID: 'BlockID',
  transactionID: 'TxnID',
  actionID: 'MsgID',
  timestamp: 'Timestamp',
  createdAt: 'Created',
  updatedAt: 'Updated',
};
export const en = {
  block: {
    ...enShared,
    account: 'Account',
    producerAccountID: 'Producer',
    blockID: 'BlockID',
    prevBlockID: 'PrevBlockID',
    blockNum: 'Block#',
  },
  transaction: {
    ...enShared,
    refBlockNum: 'RefBlock#',
    refBlockPrefix: 'Ref Block Prefix',
    expiration: 'Expiration',
    PendingTransactions: 'Pending Transactions',
    ContractInternalTransactions: 'Contract Internal Transactions',
    actions: 'Actions',
    type: 'Type',
  },
  account: {
    ...enShared,
    name: 'Name',
    accountName: 'Name',
    eosBalance: 'Balance',
    eosStaked: 'Staked',
    eosTotal: 'Total',
    ramAvailable: 'RAM Available',
    netAvailable: 'Net Available',
    cpuAvailable: 'CPU Available',
    ramMax: 'Max Ram',
    netMax: 'Max Net',
    cpuMax: 'Max CPU',

    unstakingBalance: 'Unstaking',
    transactionMerkleRoot: 'Transaction Merkle Root',
    permission: 'Permission',
    sequenceNum: 'Sequence#',
    signatures: 'Signatures',
    scope: 'Scope',
    readScope: 'Read Scope',

    newName: 'Name Auction',
    offerBid: 'offers',
    highBidder: 'HighestBidder',
    highBid: 'HighestBid',
    lastBidTime: 'LastBidTime',
    tryName: 'Search a name you want',
    notInAuction: 'Not in auction. ',
    nearestResult: 'Displaying a most similar result for you.',
  },
  action: {
    ...enShared,
    data: 'Data',
    handlerAccountName: 'Handler',
    name: 'ActionName',
    authorization: 'Authorization',

    transfer: 'Transfer',
    transferTo: 'TransferTo',
  },
  token: {
    issuer: 'Issuer',
    maximumSupply: 'MaximumSupply',
    createdAt: 'CreatedAt',
  },
};
