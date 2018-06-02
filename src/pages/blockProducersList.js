const blockProducersList = [
  {
    location: 'Beijing China',
    latitude: 39.90419989999999,
    longitude: 116.4073963,
    name: 'huobi global',
    homepage: 'http://www.eoshuobipool.com/',
    prerequisites: '8/8',
    nodeLocation: 'Japan',
    server:
      '用于主服务器的裸机，用于测试云。首先，我们将部署3台物理服务器，2台负载均衡服务器和1台备用服务器，内存：64GB，CPU：8个内核，存储磁盘空间：2TB。我们有1个服务器进行测试，内存：8GB，CPU：4核，存储磁盘空间：100GB。\r\n',
    introduction: '火币资产平台，致力于为用户提供方便安全的服务。',
    contact:
      'GitHub\r\nhttps://github.com/eoshuobipool\r\nTwitter\r\nhttps://twitter.com/EOS_huobipool\r\nTelegram\r\nhttps://t.me/eoshuobipool',
  },
  {
    location: 'Shanghai, China',
    latitude: 31.2303904,
    longitude: 121.4737021,
    name: 'EOS CANNON',
    homepage: 'https://eoscannon.io',
    prerequisites: '8/8',
    nodeLocation: 'China, Japan, Amercia and Singapore',
    server:
      '对于Testnet，我们使用2个EC2实例和AWS t2.xlarge（4个vCPU，16GB RAM，100GB磁盘）。对于EOS mainnet，我们将使用2个AWS x1.32xlarge（128 vCPU，2 TB RAM，4T SSD）的实例，我们希望使用相同的配置作为IDC裸机的备用区。',
    introduction:
      'EOS的发展将会为区块链以更好的方式改变着我们的生活，我们努力为EOS分散式生态系统做贡献！作为一个具有很高声望的社区，我们愿意连接并促进海外和中国EOS社区之间的共享。此外，我们很乐意带领大多数国内token持有者，参与全球EOS社区的增长。\r\n\r\nEOS Cannon将是一个可靠的区块生产者，致力为社区服务。此外，我们计划成为积极的EOS生态系统贡献者和项目孵化器，而不仅仅是一个EOS社区，我们将成为中国重要的EOS合作伙伴。',
    contact:
      'Twitter\r\nhttps://twitter.com/cannon_eos\r\nTelegram\r\nhttps://t.me/eos_cannon\r\nSteemit\r\nhttps://steemit.com/@eoscannon',
  },
  {
    location: 'Hong Kong ',
    latitude: 22.396428,
    longitude: 114.109497,
    name: 'EOS Asia',
    homepage: 'https://www.eosasia.one/',
    prerequisites: '8/8',
    nodeLocation: 'Seoul, Singapore, Tokyo',
    server:
      '主要和备用块生产者节点：\r\n网络10 Gbps（最高25 Gbps）\r\nAWS Shield（受管DDoS保护）\r\n英特尔至强8 vCPU / 256GB RAM / 1TB SSD\r\n公开完整节点：\r\n网络10 Gbps（最高25 Gbps）\r\nAWS Shield（受管DDoS保护）\r\n英特尔至强4 vCPU / 256GB RAM / 1TB SSD\r\nTestnet：\r\n网络1G高共享网络\r\nAWS Shield（受管DDoS保护）\r\n英特尔至强4 vCPU / 32GB RAM / 128GB SSD',
    introduction:
      '我们是BP候选人EOS Asia，拥有世界级技术团队和经验丰富的区块链Dapp开发人员。作为亚洲最具国际和技术性的Block Producer候选人，我们汇集了来自中国，韩国，日本，香港，东南亚等地的EOS超级粉丝。\r\n\r\nEOS亚洲团队，核心价值观，当前进展，未来发展以及对社区的贡献。我们也将分享我们对EOS生态系统未来的理解和信念。\r\n\r\nEOS Asia的亮点：\r\n\r\n世界级的技术团队（Y Combinator，阿里云MVP，在各种技术会议上演讲）、大部分国际团队（中国，欧洲，美国和韩国）、致力于创建主流EOS DApps。',
    contact: 'Twitter\r\nhttps://twitter.com/eosasia_one\r\nSteemit\r\nhttps://steemit.com/@eos-asia',
  },
  {
    location: 'Singapore',
    latitude: 1.352083,
    longitude: 103.819836,
    name: 'MEET.ONE',
    homepage: 'https://meet.one/',
    prerequisites: '8/8',
    nodeLocation: 'China, Japan, Singapore',
    server:
      'MEET.ONE超级节点配置。\r\n服务器集群的配置如下:\r\n1台AWS r4.2xlarge用于账户相关交易的签名服务。\r\n1台AWS r4.2xlarge用于负载均衡。\r\n4台AWS x1e.2xlarge用于实时同步EOS主网数据并对外提供REST API使用。\r\n1台AWS x1.32xlarge用于出块。\r\n1台Cloudflare用于抵抗潜在的DDoS等网络攻击。\r\n\r\nr4.2xlarge: 8 vCPU，61GB内存。\r\nx1e.2xlarge: 8 vCPU，244GB内存。\r\nx1.32xlarge: 128 vCPU，2TB内存，4TB SSD。\r\n具体上几个集群看实际需要。block.one有更好的推荐配置，我们会随时调整。',
    introduction:
      "MEET.ONE 是新加坡 EOS 全球节点竞选团队，致力于构建 EOS 生态入口。\r\n团队具有坚实的技术实力，核心成员均来自顶级互联网公司，拥有亿级用户开发和运营经验。MEET.ONE 积极为生态做贡献。\r\n2月，开发了首个微信小程序-EOS小助手，帮助用户学习映射并验证结果，保障资产安全，目前已有数十万用户。\r\n3月，参与组建了 Scholar Testnet，并首先完成 BIOS BOOT 测试。\r\n4月，为全球用户开发了Chrome 插件 EOS KIT，集合了 EOS 全球资讯精选、Twitter 账户速览、Dapp 列表和 BP 列表等功能。\r\n5月，APP 客户端已在内测，可进行 EOS 资产管理、节点投票、Dapp 入口和资讯速览等功能。\r\n未来，将发起 MEET.ONE 侧链，提供 EOS 开发环境孵化 Dapp。\r\nMEET.ONE 社区秉持共建、贡献、平等的价值观，目前已覆盖数十万用户。\r\n\r\nMEET.ONE is a Singapore EOS block producer candidate and is dedicated to building the EOS ecological portal.\r\nOur team has solid technical strength. The core members are all from top Internet companies and have billions of users of development and operational experience. MEET.ONE actively contributes to EOS ecology.\r\nIn February, the first WeChat mini program 'EOS TOOLS', was developed to help users complete the mapping, verification results and ensure asset security. The current total user's number of mini-program has reached hundreds of thousands;\r\nIn March, we participated in the formation of the Scholar Testnet and completed the BIOS BOOT first.\r\nIn April, Chrome plug-in 'EOS KIT' was developed for users around the world and features such as EOS Global News Highlights, Twitter Account Flip, Dapp and BP List.\r\nIn May, the MEET.ONE's app has been tested internally and can perform functions such as EOS asset management, node voting, Dapp entry, and news.\r\nIn the future, MEET.ONE side chain will be launched as Dapp incubator to provide the EOS development environment.\r\nThe MEET.ONE community upholds the values of co-construction, contribution, and equality, and currently cover several hundred thousands of users.",
    contact:
      'Twitter\r\nhttps://twitter.com/MeetDotOne\r\nTelegram\r\nhttps://t.me/MeetOneEnglish\r\n微信公众号\r\nEOSMeetOne\r\nSteemit\r\nhttps://steemit.com/@meetone',
  },
  {
    location: 'Singapore',
    latitude: 1.352083,
    longitude: 103.819836,
    name: 'Eosio.SG',
    homepage: 'http://eosio.sg/',
    prerequisites: '8/8',
    nodeLocation: 'Singapore',
    server: '使用云服务器并在其上运行两个节点，一个用于实时网络，另一个用于测试网络。\r\n',
    introduction:
      '团队介绍\r\neosio.sg来自新加坡，是EOS全球超级节点竞选团队，致力于区块链底层技术研发，发展和构建安全、健康、活跃的EOS生态平台与应用。\r\n团队成员均来自世界级名校和互联网、金融、科研等行业的顶级公司，拥有扎实的产品设计、开发和运营经验以及扎实的EOS底层代码研究能力。\r\n团队在2018年4月成立以来，在技术理解上获得了迅速的积累，并积极为EOS社区生态的活跃作出贡献。\r\n团队在成立第一周，发布了eosio.sg Testnet并率先实现了一键接入等功能；\r\n团队成立第二周，在尚未提交节点申请的情况下，提前获邀成为正式的超级节点候选人，并分配在Group1；\r\n团队成立第三周，开始凭借对底层代码的深刻理解建立了技术博客，并获得了Daniel Larimer、Thomas Cox等官方人物的关注与互动。\r\n目前，eosio.sg正与其他优秀的团队一起，积极探索和开发新的EOS功能与应用。',
    contact:
      'Twitter\r\nhttps://twitter.com/eosiosg\r\nFacebook\r\nhttps://www.facebook.com/eosiosg-168790343770\r\nTelegram\r\nhttps://t.me/eosiosg',
  },
  {
    location: 'The British Virgin Islands',
    latitude: 18.420695,
    longitude: -64.639968,
    name: 'TOP.ONE',
    homepage: 'https://top.one',
    prerequisites: '8/8',
    nodeLocation: 'China, Japan and Thailand',
    server:
      'CPU：BP服务器（1个livenet，1个备用）：16个内核\r\n内存：128 GB DDR3 RECC;\r\n存储：1个内部1 TB PCIe SSD，5个外部2.0 TB Intel P3700 PCIe\r\n网络：1 Gbpskup。',
    introduction: '我们是一家全语种孵化交换平台TOP.ONE，TOP. ONE很高兴你们来社区分享交流意见。',
    contact:
      'Twitter\r\nhttps://twitter.com/TOPONE_2017\r\nFacebook\r\nhttps://www.facebook.com/top.oneexchange2017\r\nTelegram\r\nhttps://t.me/topone_2017',
  },
  {
    location: 'Beijing ',
    latitude: 39.90419989999999,
    longitude: 116.4073963,
    name: 'EOSBeijing',
    homepage: 'http://www.eosbeijing.one/',
    prerequisites: '8/8',
    nodeLocation: 'Beijing',
    server:
      'Before June 3\r\n\r\nMaster server\r\nCPU: Intel Xeon 64 core\r\nRAM: 256 Gb\r\nDisk : 4000 Gb SSD\r\nNetwork: 200 Mbps Bgp multi-line\r\nDual-node backup\r\n\r\nBackup server\r\nCPU: Dual Intel Xeon 32 core\r\nRAM: 256 Gb\r\nDisk: 500Gb hard disk + 10 Tb 7200 hard disk (dynamic increase when needed)\r\nNetwork: 200 Mbps Bgp multi-line\r\n\r\nAfter June 3\r\n\r\nMaster server\r\nCPU: Intel Xeon 64 core\r\nRAM: 1024 Gb\r\nDisk: 4000 Gb SSD\r\nNetwork: 200 Mbps Bgp multi-line\r\nDual-node backup\r\n\r\nBackup server\r\nCPU: Dual Intel Xeon 32 core\r\nRAM: 1024 Gb\r\nDisk: 500Gb hard disk + 10 Tb 7200 hard disk (dynamic increase when needed)\r\nNetwork: 200 Mbps Bgp multi-line\r\n\r\nFull-node server\r\nCPU: Dual Intel Xeon 32 core\r\nRAM: 1024 Gb\r\nDisk: 512 Gb SSD\r\nNetwork: 200 Mbps Bgp multi-line',
    introduction:
      'EOS Beijing将与大学合作研究项目和各种区块链社区团体,支持EOS-related学术研究和促进EOS意识和采用。的支持与合作交流、账户、cryptocurrency媒体,和其他元素的生态系统,我们将能够对EOS的成功做出了重大贡献。\r\nIn recent years, the development of blockchain technology has advanced faster than its practical applications. The balance of EOS performance and decentralization has led us to see the possibility of bridging this gap. The EOS Beijing team is composed of experienced digital currency professionals and investors who are eager to participate in this new cutting-edge technology. EOS Beijing will collaborate with university research programs and various blockchain community groups, to support EOS-related academic research and promote EOS awareness and adoption. With the support and cooperation of cryptocurrency wallets, media, and other elements of the ecosystem, we will be capable of making significant contributions to the development and adoption of EOS.',
    contact:
      'Twitter\r\nhttps://twitter.com/eosbeijing\r\nTelegram\r\nhttp://t.me/eosbeijing\r\nSteemit\r\nhttps://steemit.com/@eosbeijing',
  },
  {
    location: 'China',
    latitude: 35.86166,
    longitude: 104.195397,
    name: 'OracleChain',
    homepage: 'https://oraclechain.io/',
    prerequisites: '8/8',
    nodeLocation: 'China, Hong Kong, Japan, Canada',
    server:
      '2018年6月3日后，我们将采用与实际有效负载相符的云机，典型的扩展方案为（1主机，1备用）：\r\nx1.32xlarge / 128核/ 1952GiB Meory / 50TBSSD（我们以AWS云服务器为例，实际上也可以使用其他云主机服务或IDC服务器。）\r\n我们还准备了一台物理机（IDC）计划，就像（1个主机，1个备用）一样：\r\n4 * Intel Xeon处理器E7-4820 v4 2.00 GHz / 10C / 25M / 115W处理器;\r\n8 * 12 DIMM内存板;\r\n64 * 32GB / DDR4 / 2400MHz / ECC / REG / 2RANK内存;\r\n24 * 3.5 SAS3.0 / SATA3.0驱动器背板;\r\n14 * Intel / SSD / DC / S4500系列（3.8TB，2.5英寸SATA 6Gb / s，3D Nand和TLC）;\r\n支持4 * X16 + 4 * X8;\r\n2 + 2 920W冗余电源;\r\n2 *标准千兆网络接口。',
    introduction:
      '作为世界上第一个建立在EOS生态圈上的应用程序，Oracle Chain基于EOS区块链技术，为区块链提供实际数据和交叉链数据。我们还在区块链上实现了数据服务提供商和数据使用者之间的有效连接。作为EOS Oracle机器和其他基础架构的构建者，同时我们也是节点竞选候选者之一。\r\n\r\n产品介绍：\r\n作为基于EOS的科技技术，OracleChain采用了自动PoRD机制，将实际数据带入区块链区域，并将其用作为其他区块链应用程序提供服务的基础架构。另外，我们还开发了当前在EOS网络上运行的全球首个相关资产应用程序PocketEOS。它将与EOS上众多的Dapp应用程序接口，允许用户直接进入区块链3.0时代。',
    contact: 'Twitter\r\nhttps://twitter.com/Oracle_Chain\r\nTelegram\r\nhttps://t.me/OracleChainChat',
  },
  {
    location: 'Shanghai',
    latitude: 31.2303904,
    longitude: 121.4737021,
    name: 'EOS.CYBEX',
    homepage: 'https://eos.cybex.io/index_en.html',
    prerequisites: '8/8',
    nodeLocation: 'Hong Kong',
    server:
      '我们计划在两个独立的服务提供商IBM Softlayer和Microsoft Azure上托管我们的服务，以确保提供商，云计算和互联网网络访问冗余。',
    introduction:
      'EOS.CYBEX是一支经验丰富的团队，致力于EOS项目孵化和社区发展。我们内部经过考虑和计划制定后，现在已经做好准备好运行EOS超级节点。EOS.CYBEX旨在为所有基于EOS平台的Dapp开发人员提供无数的一站式服务，包括开发人员随时可以访问的测试链以及复杂的测试工具和服务。',
    contact:
      'Twitter\r\nhttps://twitter.com/EOSCYBEX\r\nMedium\r\nhttps://medium.com/@eoscybex\r\nSteemit\r\nhttps://steemit.com/cybex/@eos.cybex/an-intro',
  },
  {
    location: 'Canada',
    latitude: 56.130366,
    longitude: -106.346771,
    name: 'EOS Nation',
    homepage: 'https://eosnation.io/',
    prerequisites: '8/8',
    nodeLocation: 'Canada',
    server:
      'BP“任命”：\r\n节点1x EC2（x1.32xlarge）\r\nvCPU 128内核\r\n内存2TB RAM\r\n存储（IPFS）2 x 1920GB（SSD）\r\n网络25千兆\r\n\r\nBP“当选”：\r\n节点2x EC2（x1.32xlarge）\r\nvCPU 128内核\r\n内存2TB RAM\r\n存储（ipfs）2 x 1920GB（SSD）\r\n网络25千兆',
    introduction:
      '我们是一群敬业，热情和雄心勃勃的团队，致力于为保护EOS平台及其社区作出积极贡献。\r\n\r\n我们是社区的成员，我们坚信这项技术及其对我们社会和我们每个人的有利影响。\r\n\r\n我们的目标是代表你们每个人，给你最高层的发言权。我们将成为您在社区中的声音，我们将把您的项目放在心上。',
    contact:
      'GitHub\r\nhttps://github.com/EOS-Nation\r\nTwitter\r\nhttps://eosnation.io/\r\nFacebook\r\nhttps://www.facebook.com/groups/EOSNation\r\nSteemit\r\nhttps://steemit.com/@daverex',
  },
  {
    location: 'America',
    latitude: 37.09024,
    longitude: -95.712891,
    name: 'EOS New York',
    homepage: 'https://www.eosnewyork.io/',
    prerequisites: '8/8',
    nodeLocation: 'North America',
    server:
      '产品规格\r\n操作系统：Linux DistrovCPU：8RAM：256-512存储：512G​​B SSD（块），1TB硬盘用于IPFSNetwork：1Gbps（并且将按需扩展）',
    introduction:
      'EOS New York，北美的主要制造商。我们是一个由经验丰富的专业人士组成的自费团队，完全与所有外部利益分离。我们的唯一目标是确保EOS网络的成功。',
    contact:
      'Twitter\r\nhttps://twitter.com/eosnewyork\r\nTelegram\r\nhttps://t.me/eosnewyorkchat\r\nMedium\r\nhttps://medium.com/@eosnewyork',
  },
  {
    location: 'BVI',
    latitude: 18.420695,
    longitude: -64.639968,
    name: 'Bitfinex',
    homepage: 'https://www.bitfinex.com/eos',
    prerequisites: '8/8',
    nodeLocation: 'Zurich, Switzerland',
    server:
      'HP DL360 Gen 10服务器\r\nx CPU Intel 8180M x 2处理器28个内核，每个CPU 56个线程（共56个内核和112个线程）\r\nx内存1.5tb DDR4-2666mhz\r\nx光盘8 x 800GB SAS 12GB，采用Raid 6配置\r\nx双电源800瓦\r\nx 10GB / 25GB PCI光纤网卡\r\nx 24-7 / 4小时HP 365护理包（3年）',
    introduction:
      'Bitfinex成立于2012年，是一家数字资产交易平台，为交易商和流动性提供商提供最先进的服务。\r\n自成立以来，我们一直致力于识别和提升协议级技术的能力，以满足基于区块链交易平台的大量法律和技术需求，并且我们相信我们可以为EOSIO贡献巨大的价值通过分享这个社区。\r\n我们的团队由100多位行业专家组成，其中包括高度灵活的开发团队，技术支持代理，法律专家和热情的行业倡导者。我们的基本目标是通过密集的社区发展，研究和协作，提高去中心化数字资产空间的开源性质。\r\n我们作为一个区块生产者的愿景是建立一个协作孵化器，将EOSIO的潜力与我们的经验相结合，将EOSIO的研究，开发和采用提升到另一个层次。我们的团队在此过程中获得了宝贵的行业经验，我们的目标是利用这一点丰富我们周围的团队-尽可能分享信息并提供指导。',
    contact:
      'Twitter\r\nhttps://twitter.com/bitfinex\r\nFacebook\r\nhttps://www.facebook.com/bitfinex1\r\nTelegram\r\nhttps://t.me/bitfinex',
  },
  {
    location: 'Canada',
    latitude: 56.130366,
    longitude: -106.346771,
    name: 'EOS Canada',
    homepage: 'https://www.eoscanada.com/',
    prerequisites: '8/8',
    nodeLocation: 'Montrea',
    server: 'Google云端平台',
    introduction:
      'EOS加拿大总部设在加拿大蒙特利尔，由知名加拿大金融企业支持。我们相信EOS.IO将资助系统，因此我们致力于为生态系统的发展做出贡献。\r\n\r\n\r\n我们一直积极参与运行和测试社区测试网络，创建BIOS BOOT序列，以及构建生态系统蓬勃发展所需的各种社区工具。我们的目标是成为公司，企业家和开发人员的中心，他们希望在EOS.IO之上构建基础架构和去中心化应用程序。由于我们深厚的技术背景和连接，我们希望利用我们的网络帮助为EOS.IO网络构建增值产品。',
    contact:
      'Twitter\r\nhttps://twitter.com/eos_canada\r\nTelegram\r\nhttps://t.me/eoscanada\r\nSteemit\r\nhttps://steemit.com/@eos-canada\r\nReddit\r\nhttps://www.reddit.com/user/EOSCanada/',
  },
  {
    location: 'China',
    latitude: 35.86166,
    longitude: 104.195397,
    name: 'EOS Galaxy',
    homepage: 'http://www.eosgalaxy.io/',
    prerequisites: '8/8',
    nodeLocation: 'Japan',
    server: 'China',
    introduction: '全球首家区块链媒体火星财经EOS Galaxy节点社区',
    contact:
      'GitHub\r\nhttps://github.com/EosGalaxy\r\nTwitter\r\nhttps://twitter.com/EOS_Galaxy\r\nSteemit\r\nhttps://steemit.com/@kevinxu/',
  },
  {
    location: 'Suzhou China',
    latitude: 31.298974,
    longitude: 120.585289,
    name: 'HelloEOS',
    homepage: 'https://www.helloeos.com.cn/en/',
    prerequisites: '8/8',
    nodeLocation: 'Beijing,Hong Kong, Japan,Singapore, etc. (multiple locations)',
    server:
      '在测试网和早期阶段，当区块链还较小且负载压力仍然较低时，我们采用基于云的服务器方式：·\r\nBP服务器(1台livenet，1台备用)：\r\n16芯；256 G RAM；1 TSSD硬盘驱动器。\r\n\r\nAPI服务器：\r\n16个核心；256gRAM；1T固态硬盘',
    introduction:
      'HelloEOS，在中国的区块生产者团队之一。具有开发和维护Graphene区块链的能力，以及拥有3万多个用户基础的社区，HelloEOS将会最大限度地帮助实现有效的社区治理，和一个充满活力、健康的EOS区块链生态系统。\r\n\r\nHelloEOS最早将EOS引入华语社区的群体，吸引了相当多的人，从而形成了最早的国内EOS社区。作为比特股的成员，HellEOS多年来一直是Bytemaster的坚定支持者。自从比特股1.0启动以来，我们就一直专注于操作和维护节点服务器并提供技术，而比特股区块链网络支持至少有3名活跃的独立操作者。\r\n\r\nHelloEOS团队在梓岑和Alex的带领下，创建和管理了几个社交媒体集团，不仅介绍了EOS，还翻译了许多技术和分析文章，帮助社区更好地理解了EOS。从初学者到高级用户，了解更多关于HelloEOS的信息，请访问我们的官方网站：www.helloeos.com.cn。',
    contact:
      'Twitter\r\nhttps://twitter.com/HelloEOS\r\nTelegram\r\nhttps://t.me/helloeos123\r\nSteemit\r\nhttps://steemit.com/@helloeos\r\nReddit\r\nhttps://www.reddit.com/user/helloeos/',
  },
  {
    location: 'China',
    latitude: 31.2303904,
    longitude: 121.4737021,
    name: 'EOS Gravity',
    homepage: 'http://eosfans.one/',
    prerequisites: '8/8',
    server:
      '主服务器：\r\nPowerEdge R730xd\r\n4个CPUIntelXeon\r\n128G * 2（2400 MHz）\r\n300G * 2（系统磁盘）7.2k rpm\r\n512G * 1（数据磁盘）SSD\r\n双电源\r\n\r\n从服务器：\r\nPowerEdge R730xd\r\n4个CPUIntelXeon\r\n128G * 2（2400 MHz）\r\n300G * 2（系统磁盘）7.2k rpm\r\n512G * 1（数据磁盘）SSD\r\n双电源\r\nSwitch：H3C S5130 48端口* 2',
    introduction:
      '总部位于中国上海的EOS Gravity是一个区块链生态社区，聚集了大量区块链和EOS追随者。该社区致力于为区块链技术感兴趣的人士提供帮助，并通过我们对区块链技术和EOS公共链的深入分析和明确指导鼓励更大规模的参与。\r\n\r\n此外，我们通过提供富有洞察力的评论，最新消息以及专业技术支持，为EOS生态系统的发展做出贡献。未来，EOS Gravity将致力于开发EOS社区，重点关注价值信息、技术讨论、离线研讨会、高峰论坛和生态系统的Dapp等各个方面，这些都为过渡到一个全新的世界。\r\n\r\n我们的价值观：安全，团结，高级和繁荣。\r\n我们的使命：为快速发展的EOS行业做出贡献。\r\n我们的未来前景：成为全球领先的EOS社区。',
    contact: 'Twitter\r\nhttps://twitter.com/EOSGravity\r\n微信公众号\r\nEOS引力区',
  },
  {
    location: 'Canada',
    latitude: 56.130366,
    longitude: -106.346771,
    name: 'EOS Café',
    homepage: 'https://eos.cafe/',
    prerequisites: '8/8',
    nodeLocation: 'Montréal, Canada and Oregon, USA',
    server:
      'Four nodes consisting of Intel Xeon E7-8880 2.3 GHz, 256GB Producing Nodea\r\n\r\n2018年6月3日前的技术规格：\r\n主/辅助节点CPU：2x Intel Xeon E7-8880 2.3 GHz核心：18 x 2 = 36个核心线程：36 x 2 = 72个线程RAM：256个GBStorage：1 TB SSD网络：1 Gbps\r\n\r\n2018年6月3日之后的硬件估算扩展计划：\r\n主要/次要节点：CPU：4x Intel Xeon E7-8880 2.3 GHz核心：18 x 4 = 72个核心线程：36 x 4 = 144个线程RAM：4个TBStorage：100 TB SSD网络：10 Gbps',
    introduction:
      'EOS Cafe Calgary是加拿大艾伯塔省卡尔加里市的节点竞选的候选团队。它与EOS Cafe DAC合作，推动DAC成员协作Dapp的加速发展，并建立黑客空间（实体咖啡厅），让志同道合的EOS支持者和应用程序开发人员能够在这里共同协作。除了支持EOS Cafe DAC任务之外，EOS Cafe Calgary将继续支持本地聚会（EOS Calgary）和举办黑客马拉松，并作为我们任务的一部分，以支持EOS平台上更受欢迎的Dapps。EOS Cafe Calgary funds the building of EOS Cafes and builds dApps to promote the adoption and use of EOS. We will continue adding value to the EOS ecosystem and improving the value of the EOS network. \r\n\r\nOur general mission is to help develop and maintain a decentralized system which can secure life, liberty and prosperity for all.\r\n\r\nSecure and high-availability BP infrastructure: We will continue to develop our infrastructure ecosystem to provide a secure and reliable EOS network. EOS Cafe Calgary will remain engaged and spearhead discussions related to the security of the network and the security of EOS token holders. We have also developed internal scaling plans for pre-launch, launch and post-launch to meet all demands of the EOS network.\r\n\r\ndApps development: EOS Cafe Calgary will continue to both invest in technology dApps aiming to improve the EOS ecosystem and advise projects, meetups, workshops and conferences at the local, national and international level.\r\n\r\nCommunity funding: EOS Cafe Calgary will continue to support EOS Cafe DAC’s vision of building an EOS Cafe in each city around the world. We believe this will bootstrap the use of EOS globally, as EOS Cafes will enable the general public to buy even the simplest of items, a cup of coffee, using EOS.\r\n\r\nEducation: EOS Cafe Calgary will continue to invest in technology meetups, workshops and conferences at the local, national and international level. For introductory sessions to EOS, we will develop and release educational materials to promote the positive uses of cryptocurrency and the specific advantages of EOS in the blockchain space.',
    contact:
      'GitHub\r\nhttps://github.com/eoscafe\r\nTwitter\r\nhttps://twitter.com/eoscafe\r\nTelegram\r\nhttps://t.me/eoscafe\r\nMedium\r\nhttps://medium.com/@eoscafe\r\nSteemit\r\nhttps://steemit.com/@eoscafe',
  },
  {
    location: 'Wyoming',
    latitude: 43.0759678,
    longitude: -107.2902839,
    name: 'EOS Tribe',
    homepage: 'https://eostribe.io/',
    prerequisites: '8/8',
    nodeLocation: 'Wyoming state',
    server:
      '主节点\r\n思科CISCO891-K9 891千兆以太网安全路由器\r\n英特尔至强融核3120A Heptapentaconta核心（57核心）1.10 GHz协处理器\r\n英特尔至强融核3120A Heptapentaconta核心（57核心）1.10 GHz协处理器\r\nRAM 448 GB在服务器之间平均分配。（升级到主内存）\r\n辅助节点\r\n此位置在企业戴尔PowerEdge R710 2.93GHz 8核服务器|上运行Ubuntu v16.04 64GB RAM |内部存储9TB。我们计划在启动后不久升级RAM，以匹配主备份节点RAM大小，并添加至少还有额外40 TB存储的文件服务器。',
    introduction:
      'EOS Tribe是一个专注于区块链基础设施和软件的杰出超级节点候选人。总部位于怀俄明州，在德克萨斯州达拉斯和犹他州盐湖城设有卫星办公室。\r\n\r\n我们的使命是为启动的EOS网络提供全球性的企业级基础设施，并且建立在共同的基础上，与我们在地球上的时间有目标的目标。\r\n\r\n我们深信分权制度的力量及其创造积极的社会和经济变革的潜力。我们是EOS节点竞选团队，希望赋予生态系统中为特定目标工作的使命Dapp和项目。',
    contact:
      'Twitter\r\nhttps://twitter.com/eostribe\r\nFacebook\r\nhttps://www.facebook.com/groups/eostribe\r\nTelegram\r\nhttps://t.me/EOSTribe\r\nMedium\r\nhttps://medium.com/eostribe\r\nSteemit\r\nhttps://steemit.com/@eostribe',
  },
  {
    location: 'Southern California',
    latitude: 34.9592083,
    longitude: -116.419389,
    name: 'EOS SOCAL',
    homepage: 'https://eosocal.io',
    prerequisites: '8/8',
    nodeLocation: 'California and U.S. West, California',
    server:
      '主要活动\r\n•地点：加州\r\n•CPU（32核，每个2.00 GHz）\r\n•1st：四核Intel Xeon E7-4820 v2\r\n•第2，第3，第4：Intel Xeon E7-4820 v2\r\n•RAM：2 TB RAM\r\n•第一块硬盘：10 TB SATA SED\r\n•上行链路端口速度：10 Gbps\r\n\r\n次要活动和备份\r\n地点：美国西部，加州\r\n计划：AWS x1e.16xlarge\r\nRAM：1.952TB\r\nvCPU：64\r\n硬盘：1.920 TB SSD\r\n上行链路端口速度：10 Gbps',
    introduction:
      'EOSoCal成立于2017年11月的团体，在南加州运营。主要支持和促进EOS.IO软件和社区的成功发布和可行性。\r\n我们的目标是为世界这个地区的EOS.IO分散式生态系统的整体成功做出贡献，帮助大众保护生命，自由和财产，建设一个更美好的世界。\r\n通过以下方式实现我们的目标：\r\n我们是超级节点竞选团队，为EOS区块链贡献可靠和可扩展的区块生产，并为社区贡献回报。现在正在做符合EOS项目的分配开发资源，包括支持，资金，设计和编程。EOS.IO的理念创造更美好的世界。\r\n通过提供的教育内容和计划的研讨会帮助教育社区，从初学者到高级用户使用EOS.IO开源软件。\r\n通过传播、支持社区和分发内容，帮助他人发现和采用EOS.IO平台。去中心化应用程序的开发者即将发布项目。我们希望能够改变十亿人的生活，正如布罗克皮尔斯所描述的那样，通过向EOS持有者提供“空投” token。独特价值主张：\r\n我们的设施开放，用于审计和实地考察。因为是一家自筹资金的机构，不需要向投资者汇报奖励。为援助权力下放提供独立贡献，目标是通过块生产者奖励和问责制来充分透明。\r\n\r\nEOSoCal is a group founded in Nov 2017 with a mission of supporting and promoting the successful launch and viability of the EOS.IO software and community, operating out of Southern California. \r\nOur goal is to contribute to the overall success of the EOS.IO decentralized ecosystem from this area of the world, helping masses preserve life, liberty and property for a better world.\r\nWe are a team experienced in node operations and software development with an existing facility in operation. \r\nWe plan to contribute back a percentage of our rewards towards funding educational workshops, tools, development and incubation of dApps and more.',
    contact:
      'Twitter\r\nhttps://twitter.com/eos_la\r\nTelegram\r\nhttps://t.me/eossocal\r\nSteemit\r\nhttps://steemit.com/@eos-socal',
  },
  {
    location: 'Detroit, MI',
    latitude: 42.331427,
    longitude: -83.0457538,
    name: 'EOS Detroit',
    homepage: 'https://eosdetroit.com/',
    prerequisites: '6/8',
    server:
      'We will pursue a hybrid cloud / bare-metal model. Our plan depends on procurement of the capital required to bootstrap our operation from ethically-aligned angel investors that we will be engaging over the coming weeks. Our infrastructure plan is continually being refined and we are meeting with local data centers to scope out the budget required to co-locate our primary and secondary block producer clusters in the Midwest United States. The goal is to deliver a minimum of 1 TB RAM on 10 Gbit/s network, per cluster. Storage provided for EOS.IO Storage will be determined as that functionality is closer to launch. Initial block rewards earned will be reinvested into future-proofing our operation by adding additional RAM and storage capacity, as well co-locating additional backup clusters around the Midwest.\r\nOur production operation will also host health monitoring applications in the cloud so we can quickly failover to backup co-located clusters in the event that our primary node is offline / missing blocks.\r\n\r\nWe are currently running block producer nodes on the superhero community testnet (BP: "hellboy") and eosnet.io testnet (BP: "nerva") using VPS providers. This has been a great experience meeting some other block producer candidates and working with them to learn and practice our coordination together!',
    introduction:
      'EOS Detroit是一家位于密歇根州底特律的基础设施公司，专注于为EOS网络提供资源，这是一种共享的公共数据库即服务。\r\n\r\n在EOS主网启动后，我们的团队与全球其他BP候选人参与超级节点的竞选。这代表了一个新互联网的曙光，一个高度可用，值得信赖，审查抵制和分散的互联网。\r\n\r\n我们的团队努力获得EOStoken持有者的支持，他们将通过批准投票共同决定我们是否适合作为节点团队被网络雇佣。\r\n\r\n在收到他们的支持后，我们的收入将通过EOS网络直接获得，作为区块奖励，并反过来将通过扩展我们的基础架构和团队来引导EOS网络。\r\n\r\n除了作为网络基础架构的基石之外，我们的愿景是资助EOS.IO分布式应用程序开发，并通过教育，宣传和推广来发展EOS社区。我们的目标是通过我们为EOS网络和共同利益而努力创造相互价值',
    contact: 'Twitter\r\nhttps://twitter.com/eosiodetroit\r\nFacebook\r\nhttps://www.facebook.com/eosiodetroit',
  },
  {
    location: 'Dominican Republic ',
    latitude: 18.735693,
    longitude: -70.162651,
    name: 'EOSDR.io',
    homepage: 'https://eosdr.io',
    prerequisites: '6/8',
    nodeLocation: 'Miami',
    server:
      '我们的初始基础设施如下：计算机节点的初始大小为：\r\nn1-highmem-32 -内存优化的计算节点\r\no 32个vCPU\r\n208GB vMEM\r\no 3x375GB SSD驱动器\r\n每个可用区域最初将有2个计算节点：\r\no EOS节点\r\no公共块生产商\r\n\r\n链接：HTTPS：//eosdr.io/technical-proposal',
    introduction:
      '商业模式：\r\n透明的商业模式：不应该每个企业和政府都这样操作吗？\r\n\r\n其他英国石油公司候选人评论道，我们同意：“节点团队有透明的商业模式，但也有收入和成本基础，能够长期支持EOS社区。” \r\n\r\n净收入（收入-直接成本）将分配如下：\r\n60％-保留资本（基础设施，研究/能力可扩展性）\r\n25％- EOS发展基金（或帮助创业公司和有前途的EOS发展项目的类似项目）\r\n15％-社区扩展和支持\r\n\r\n我们保留与其他BP合作的权利，如果他们同意，可以使用其他BP团队作为上述任何奖励分配的代理，例如资金开发项目或共享组织EOS社区活动的费用。\r\n\r\n我们保留接受任何直接发送的捐款以解决EOSDR.io主页中的链接的权利。这些捐赠将每年或每季度向社区披露，并按上述分配。\r\n\r\n我们保留随时更改分配百分比的权利，因为仍然有许多关于运行BP节点所需的适当基础设施或任何突然的扩展需求的未知数。',
    contact: 'Twitter\r\nhttps://twitter.com/info_eosdr\r\nSteemit\r\nhttps://steemit.com/@eosdr/',
  },
  {
    location: 'Shanghai ',
    latitude: 31.2303904,
    longitude: 121.4737021,
    name: 'EOSGeek',
    homepage: 'https://www.eosgeek.io',
    prerequisites: '6/8',
    introduction:
      'EOSGeek团队，总部设在上海。我们将参加超级节点候选竞选。\r\n\r\n我们团队成员大部分来自互联网金融行业，在金融行业拥有丰富的经验，尤其是在产品，技术，运营维护和推广方面。该团队参与了多个区块链平台的构建，特别是在比特股项目中。目前，资产网winex.pro和证人节点被维护。Winex网关已经在BitShares官方网站上完美运行。\r\n\r\n我们是一群技术爱好者，他们认为区块链技术可以改变世界。我们的目标是利用EOS分布式网络推动更多实际应用，为广大公众服务，并致力于丰富EOS的生态。同时，我们也希望利用更多的技术为更多的团队提供支持，帮助更多的团队参与，共同构建EOS的生态。',
    contact:
      'Twitter\r\nhttps://twitter.com/EosGeek\r\nTelegram\r\nhttps://t.me/EOSGeek\r\nSteemit\r\nhttps://steemit.com/@eosgeek',
  },
  {
    location: 'Singapore',
    latitude: 1.352083,
    longitude: 103.819836,
    name: 'EOSHCC',
    homepage: 'http://eos.hcc.top/',
    prerequisites: '7/8',
    nodeLocation: 'Singapore, China, Japan',
    server:
      '我们为Testnet使用AWS 16 Core，64 GB RAM和256GB + SSD，我们将运行两个节点，一个用于livenet，另一个用于保留/备份。',
    introduction:
      'EOS.HCC不仅是一个区块生产者，我们还将是EOS在亚太地区的重要合作伙伴，我们保持积极的EOS社区活动，是EOS的生态贡献者之一，我们相信EOS强大的技术指标和低成本用户具有非常大的应用空间，特别是在观众中，处理大量数据和数据存储;希望EOSHCC成为EOS生态的先驱，并从小众应用领域拓展更多的EOS生态可能性。相信EOS能可以更好地改变我们的生活方式。',
    contact: 'GitHub\r\nhttps://github.com/headthcarechain\r\nTelegram\r\nhttp://t.me/eos_hcc_node',
  },
  {
    location: 'Repubic of Korea',
    latitude: 35.907757,
    longitude: 127.766922,
    name: 'EOSYS',
    homepage: 'http://eosys.io',
    prerequisites: '8/8',
    nodeLocation: 'Seoul, Tokyo',
    server:
      'AWS m4.2xlargeCPU：2.3 GHz Intel Xeon E5-2686 v4或2.4 GHz Intel Xeon E5-2676 v3（Haswell），8个核心RAM：32GBSSD：512G​​B网络：1,000 Mbps',
    introduction: '激活EOS生态系统',
    contact:
      'Twitter\r\nhttps://twitter.com/@eosys_io\r\nTelegram\r\nhttps://t.me/eosysiokor（KOR）\r\nMedium\r\nhttps://medium.com/@eosys\r\nSteemit\r\nhttps://steemit.com/@eosys',
  },
  {
    location: 'Beijing China',
    latitude: 39.90419989999999,
    longitude: 116.4073963,
    name: 'eosONO',
    homepage: 'https://www.ono.chat/eos/',
    prerequisites: '8/8',
    nodeLocation: 'Beijing, Tokyo',
    server:
      '截至2018年6月3日的技术规格和资源总支出估算：\r\nAmazon EC2AWS m4.4xlargeCPU：16 CoreRAM：64GBSSD：512G​​B\r\n总费用：每月817美元\r\n2018年6月3日之后的硬件估算扩展计划：\r\nAmazon EC2AWS x1e.32xlargeCPU：128 CoreRAM：3904GSSD：2 x 1900GB（磁盘容量根据需要增加）网络：25 Gbps节点：共2个节点（1个livenet，1个备用）',
    introduction:
      '我们是EOS ONO，一个免费的，分散的社交网络Dapp，它保护和尊重人类社交互动的多样性和多样性，并且即将在EOS平台上推出。',
    contact:
      'Twitter\r\nhttps://twitter.com/onosocial\r\nFacebook\r\nhttps://www.facebook.com/ONOofficial\r\nTelegram\r\nhttps://t.me/ONOCN\r\n微信公众号\r\nonogogo\r\nMedium\r\nhttps://medium.com/@ONOsocial\r\nSteemit\r\nhttps://steemit.com/@onosocial',
  },
  {
    location: 'Beijing',
    latitude: 39.90419989999999,
    longitude: 116.4073963,
    name: 'EOSStore',
    homepage: 'http://www.eos.store/',
    prerequisites: '8/8',
    nodeLocation: 'Beijing, China',
    server:
      'we provide Master-Slave structure of node. There are two stages in total. We will step in the second stage once the workload reached the 70% of capacity.\r\n\r\nFirst Stage\r\n\r\nMaster(model: AWS x1e.16xlarge)\r\nSlave(model: AWS x1e.8xlarge)\r\n\r\nSecond Stage\r\n\r\nMaster(model: AWS x1e.32xlarge)\r\nSlave(model: AWS x1e.16xlarge)\r\n\r\nTest node\r\n\r\nvCPU: 16\r\nMemory: 128G\r\nBandwidth: 1Gb\r\nStorage: 10Tb, AWS EFS\r\nLocation: Hong Kong',
    introduction:
      'we provide Master-Slave structure of node. There are two stages in total. We will step in the second stage once the workload reached the 70% of capacity.\r\n\r\nFirst Stage\r\n\r\nMaster(model: AWS x1e.16xlarge)\r\nSlave(model: AWS x1e.8xlarge)\r\n\r\nSecond Stage\r\n\r\nMaster(model: AWS x1e.32xlarge)\r\nSlave(model: AWS x1e.16xlarge)\r\n\r\nTest node\r\n\r\nvCPU: 16\r\nMemory: 128G\r\nBandwidth: 1Gb\r\nStorage: 10Tb, AWS EFS\r\nLocation: Hong Kong',
    contact:
      'GitHub\r\nhttps://github.com/eosstore\r\nTwitter\r\nhttps://twitter.com/StoreEos\r\nFacebook\r\nhttps://www.facebook.com/profile.php?id=10002\r\n微信公众号\r\nEosStore\r\nMedium\r\nhttps://steemit.com/@eos.store\r\nSteemit\r\nhttps://steemit.com/@eos.store',
  },
  {
    location: 'Hong Kong ',
    latitude: 22.396428,
    longitude: 114.109497,
    name: 'Wancloud',
    homepage: 'http://www.wancloud.cloud',
    prerequisites: '8/8',
    nodeLocation: 'Hongkong, Singapore, Seoul,, New York and London.',
    server:
      'Step1:\r\nWe will provide an active-active server cluster for test network. We will also prepare additional servers standby.\r\nThe server configuration is:\r\n• DELL R930\r\n• CPU: 4x E7-4850 v4 2.1GHz\r\n• RAM: 256 GB\r\n• Storage: 5 x 800GB SSD\r\n• 100M bandwidth;\r\n• One Node Estimated Cost: $83,581\r\n\r\nStep2:\r\nWe will set up a global active server cluster for production network. The cluster is deployed at Hongkong, Seoul, Singapore, New York and London IDC. Meanwhile we will reserve our test network cluster for developers。\r\nThe server configuration is:\r\n• DELL R930\r\n• CPU: 4x E7-4850 v4 2.1GHz\r\n• RAM: 256 GB\r\n• Storage: 5 x 800GB SSD\r\n• 100M bandwidth;\r\n• One Node Estimated Cost: $83,581',
    introduction:
      'Wancloud is a neutral and innovative Blockchain-as-a-Service platform. We aim to leverage blockchain technology to effectively serve the needs of business and society. Combining blockchain with cloud computing, Wancloud provides community, enterprise users and developers with a suite of blockchain services. Featured by its convenient, flexible and professional service, Wancloud is committed to lowering the cost and threshold of blockchain applications, to the reduction of repetitive workload for clients and to the promotion of blockchain technology adoption.\r\n\r\n\r\n\r\nWe have helped enterprise clients to deploy a wide range of blockchain pilots, such as financial record processing.\r\n\r\n\r\n\r\nAs part of our globalization efforts, we have been deploying servers and nodes globally in regions like Hong Kong, the United States, Singapore, South Korea, and Japan. Each Node Center will be equipped with professional maintenance team to provide responsive and secure service to suit the needs of blockchain operations.\r\n\r\n\r\n\r\nWhile we aim to provide reliable technical service as a super node, it is also important to note that our connection and community building efforts could bring unique value to EOS eco-system. In the process of providing services and building communities, we have accumulated a rich pool of resources of community, enterprises, and developers, providing guarantee for the sustainable development of the platform in the future. If elected, we could accelerate the promotion of EOS with respect to its industrial and enterprise adoptions.',
    contact:
      'Twitter\r\nhttps://twitter.com/WancloudEOS\r\nFacebook\r\nhttps://www.facebook.com/wan.cloud.73\r\nTelegram\r\nhttps://t.me/Wancloud',
  },
  {
    location: 'Hong Kong ',
    latitude: 22.396428,
    longitude: 114.109497,
    name: 'EOS TEA',
    homepage: 'https://node.eosfans.io/',
    prerequisites: '8/8',
    nodeLocation: 'Hong Kong',
    server:
      '利用云计算高效而强大的伸缩及容灾能力,可满足节点的任何资源需求.提供稳定的节点服务,同时节约资源,节省成本.\r\n48核+ CPU / 480G+内存/ 200Mbps+高速网络/ 32768G+ SSD硬盘/ 2节点互为备份\r\n初期我们会选用云服务器上合理的配置来搭建节点,云服务器可以对配置进行快速伸缩,满足节点初期不确定性的需求.当节点对性能的需求趋于稳定,我们会选择和数据中心合作,购买拥有超高配置的物理服务器,租用数据中心带宽,安全防护等资源,自建集群.无论以什么样的方式部署节点,我们都会优先保证节点的稳定性.',
    introduction:
      '部署在香港\r\n节点将部署在香港,与大陆地区采用CN2网络高速连接,合理的避免了一些不可抗因素,使网络连通性和安全性达到一个接近完美的平衡.\r\n\r\n由社区驱动\r\n没有内幕,没有阴谋,代表社区成员存在的一个节点.后期将会逐步完善社区的生态治理.\r\n\r\n利益最大化\r\n首先我们会尊重且履行EOS.IO官方及国际社区推行的宪法内容,同时我们会使用合理的方式使参与的社区成员利益最大化(欢迎广大社区成员给我们提议).',
    contact: 'Telegram\r\nhttps://t.me/eosfanscn\r\n微信公众号\r\neosiochina',
  },
  {
    location: 'Warsaw, Poland',
    latitude: 52.2296756,
    longitude: 21.0122287,
    name: 'TOKENIKA',
    homepage: 'https://tokenika.io',
    prerequisites: '8/8',
    nodeLocation: 'Poland',
    server:
      '有3个主要服务器：耐克，瓦维尔和汉尼斯（双Xeon E5-2687W与512GB内存ECC DDR4）。再加上其他一些箱子为我们的基础设施提供动力。',
    introduction:
      'Tokenika是位于华沙的东欧区块链公司，专门从事区块链和分布式账本技术的智囊团。我们的成员来自IT、编码、人工智能、法律和监管环境领域所组成，致力于为最有前途的区块链相关技术打下基础。\r\n\r\n自2012年以来，我们的团队成员一直参与区块链和DLT技术，自推出Bit Shares的第一代BitShares X以来，我们一直坚定支持Dan Larimer（EOS的创建者）项目。\r\n\r\n目前，Tokenika成功部署EOS.io生态系统，这是区块链领域最耀眼的新星之一。作为节点竞选团队，我们非常清楚这项任务的规模和复杂性。\r\n\r\n我们的主要优势：\r\n我们的基础设施由GTG设立并进行了精心调整，而GTG是Steem表现最好的见证节点之一，所以Tokenika的服务器基础设施非常强大。\r\n我们使用Tier-3 +数据中心，具有故障恢复保护功能的行业级和能保证99.9％的正常运行时间。并在ROGUE的见证下，为EOS社区测试网制作块。\r\n\r\n我们领导一个积极的EOS社区，并在Steem平台上进行热烈的跟踪，在那里我们就有关EOS.io的技术和实践主题进行教育和提供建议。\r\n\r\n我们还在为EOS生态系统开发几种解决方案，例如EOSFACTORY、EOSPROJECTS，现有EOS工具和扩展的列表以及EOS块浏览器。\r\n\r\n就Dapp而言，我们正在构建一个EOS的数字身份识别系统叫SYGNET。此外，为了促进EOS的大规模采用，还与另一位MMO游戏开发人员进行对话，还不时向波兰政府的数字化部门提供有关区块链相关事宜的建议，并及早洞察波兰和欧盟的区块链监管环境。',
    contact:
      'GitHub\r\nhttps://github.com/tokenika\r\nTwitter\r\nhttps://twitter.com/tokenika_io\r\nFacebook\r\nhttps://www.facebook.com/groups/tokenika/\r\nSteemit\r\nhttps://steemit.com/@tokenika',
  },
  {
    location: 'Amsterdam, The Netherlans',
    latitude: 52.3702157,
    longitude: 4.895167900000001,
    name: 'EOS-NL',
    homepage: 'https://www.eos-nl.net',
    prerequisites: '6/8',
    nodeLocation: 'The Netherlands',
    server: '每个服务器启动设置：24个CPU，64GB RAM和200 GB SSD',
    introduction:
      'EOS-NL致力于阿姆斯特丹和全球，建立和支持蓬勃发展的EOS社区。我们计划如下执行此操作：\r\n1.技术\r\n在具有冗余的快速设施中运行最佳服务器EOS-NL的主要重点是通过阿姆斯特丹互联网交换（AMS-ix）主机托管尽可能提供CPU，内存和吞吐量方面的EOS网络，尽可能提高最大运行时间和最小延迟。\r\n\r\nEOS-NL目前拥有一台法兰克福AWS测试服务器，运行Dawn.3作为Jungle测试网中的Raven。在EOS社区测试网发布Dawn.3之后，EOS-NL将把测试环境转移到其带有24个CPU，64 GB RAM和200 GB SSD，1 GBps带宽和6ms延迟连接的裸机设备上。EOS-NL将很快发布进一步扩大计划。\r\n\r\n2.团队和组织\r\n作为BP，我们主要提供一个可靠的节点并促进社区的发展和参与。从这些主要目标来看非常简单组织结构出现。\r\n\r\n3.合作\r\nEOS -NL认为应该在BP团队之间分享知识，以便每个BP能够最有效地支持全球和当地的EOS社区。\r\n\r\n4.仁爱\r\nEOS -NL将为其运营的收入和成本提供充分的透明度。\r\n\r\n5.多样性\r\nEOS -NL努力代表荷兰参与全球EOS网络，并使用全球第二大互联网枢纽-阿姆斯特丹互联网交换中心，因为它是ISP。EOS -NL将设在阿姆斯特丹，这个以其多样性和创业友好环境而闻名的城市。\r\n\r\n6.政治观点\r\nEOS -NL完全支持EOS的愿景，节点生产者主要是为了整个EOS社区而受益。作为一名BP，EOS-NL认为它应该提供一个知识平台，并通过举办见面会和会议为讨论提供空间。最终决定应该始终在于社区。',
    contact:
      'EOS-NL致力于阿姆斯特丹和全球，建立和支持蓬勃发展的EOS社区。我们计划如下执行此操作：\r\n1.技术\r\n在具有冗余的快速设施中运行最佳服务器EOS-NL的主要重点是通过阿姆斯特丹互联网交换（AMS-ix）主机托管尽可能提供CPU，内存和吞吐量方面的EOS网络，尽可能提高最大运行时间和最小延迟。\r\n\r\nEOS-NL目前拥有一台法兰克福AWS测试服务器，运行Dawn.3作为Jungle测试网中的Raven。在EOS社区测试网发布Dawn.3之后，EOS-NL将把测试环境转移到其带有24个CPU，64 GB RAM和200 GB SSD，1 GBps带宽和6ms延迟连接的裸机设备上。EOS-NL将很快发布进一步扩大计划。\r\n\r\n2.团队和组织\r\n作为BP，我们主要提供一个可靠的节点并促进社区的发展和参与。从这些主要目标来看非常简单组织结构出现。\r\n\r\n3.合作\r\nEOS -NL认为应该在BP团队之间分享知识，以便每个BP能够最有效地支持全球和当地的EOS社区。\r\n\r\n4.仁爱\r\nEOS -NL将为其运营的收入和成本提供充分的透明度。\r\n\r\n5.多样性\r\nEOS -NL努力代表荷兰参与全球EOS网络，并使用全球第二大互联网枢纽-阿姆斯特丹互联网交换中心，因为它是ISP。EOS -NL将设在阿姆斯特丹，这个以其多样性和创业友好环境而闻名的城市。\r\n\r\n6.政治观点\r\nEOS -NL完全支持EOS的愿景，节点生产者主要是为了整个EOS社区而受益。作为一名BP，EOS-NL认为它应该提供一个知识平台，并通过举办见面会和会议为讨论提供空间。最终决定应该始终在于社区。',
  },
  {
    location: 'Nanjing, China',
    latitude: 32.060255,
    longitude: 118.796877,
    name: 'EOS WTZ',
    homepage: 'http://www.eoswtz.com/',
    prerequisites: '8/8',
    nodeLocation: 'America',
    server:
      '主服务器\r\nIntel Xeon E5-2696 v4 @ 2.20GHz\r\nCPU：22个vCPU内核\r\n32GB RAM\r\nSSD：本地PCIe 3.0\r\n网络：1000 Mbps\r\nSSD：2048GB\r\n\r\n备份服务器\r\nIntel Xeon Platinum 8173M @ 2.00GHz\r\nCPU：28个vCPU内核\r\n64GB RAM\r\nSSD：本地PCIe 3.0\r\n网络：1000 Mbps\r\nSSD：2048GB',
    introduction:
      'EOS WTZ于2017年11月成立。致力建立最有温度的区块链知识传播平台，通过普及区块链基础知识、输出原创内容、打造圈内互动社区、孵化区块链项目等形式，打造国内最有影响力、服务千万人的区块链社群。',
    contact:
      'Twitter\r\nhttps://twitter.com/eos_wtz\r\nFacebook\r\nhttps://www.facebook.com/eos.wtz.1\r\n微信公众号\r\nEOS WTZ\r\nReddit\r\nhttps://www.reddit.com/user/EOSWTZ',
  },
  {
    location: 'EU',
    latitude: 54.5259614,
    longitude: 15.2551187,
    name: 'EOS Green',
    homepage: 'http://eosgreen.io/',
    prerequisites: '6/8',
    nodeLocation: 'Eastern EU and Ukraine',
    server:
      '下面列出的硬件规格可能会根据Block.One和社区推荐进行更改：\r\nRAM：1-4 TB \r\nCPU内核：32+（但是在发布时需要一个1核CPU）\r\n存储磁盘空间20 TB + \r\n节点：2 + 2待机',
    introduction:
      'EOS Green是一家受区块链技术和可再生能源相结合启发的公司。\r\n我们提供适当的设备以参与EOS块的生产，所有需要的能源最终将来自太阳能电池板，水电和生物燃料等可再生资源。未来，我们计划不仅为我们而且为成千上万的潜在客户产生和储存足够的能量。预计未来十年内，美国国家可再生能源市场将继续强劲增长，这将为我们实现成功的商业做出承诺。我们所做的一切，我们都相信挑战我们如何使用该技术的现状。',
    contact:
      'GitHub\r\nhttps://github.com/eosgreen\r\nFacebook\r\nhttps://www.facebook.com/eosgreen.io\r\nSteemit\r\nhttps://steemit.com/@marcinsteem',
  },
  {
    location: 'Shanghai, China',
    latitude: 31.2303904,
    longitude: 121.4737021,
    name: '91EOS',
    homepage: 'http://www.91eos.io/',
    prerequisites: '6/8',
    nodeLocation: 'Beijing,Hong Kong, Japan,Singapore, etc.',
    server:
      'BP服务器（1个livenet，1个备用）：16个内核; 256G RAM; 1T SSD硬盘\r\nAPI服务器：16个核心; 256G RAM; 1T SSD硬盘',
    introduction:
      '91EOS是第一个接触块链技术的团队。我们的团队有很多关于石墨烯技术的经验，并且充满激情和强大的社区运营和节点维护。配备高效设施和危机管理的经验可以帮助我们给每个人更舒适的用户体验。\r\n我们的主要目标是传播EOS通过持续教育，知识和资源共享，社区参与以及项目创建带来的社会效益。我们将成为您在社区中的声音，我们将把您的项目放在心上。',
    contact: 'Twitter\r\nhttps://twitter.com/91EOS\r\nTelegram\r\nhttps://t.me/eos91',
  },
  {
    location: 'Seoul, South Korea',
    latitude: 37.566535,
    longitude: 126.9779692,
    name: 'EOS NodeOne',
    homepage: 'http://www.eosnodeone.io/',
    prerequisites: '6/8',
    nodeLocation: 'South Korea, Philippines',
    server:
      '截至2018年6月3日的技术规格和资源总支出估算。\r\n*类型：云（AWS）\r\n*地点：首尔AWS地区\r\n*机器：m4.2xlarge实例\r\n* 1号\r\n*内存：32GB \r\n* CPU：vCPU 8核心\r\n*存储：SSD 300GB \r\n预计2018年6月3日之后的硬件扩展计划。\r\nEOS NodeOne将采用与对应的实际有效载荷配置的云机和裸机，典型的扩展方案是（1主机，1备用）：\r\n*类型：裸机和云\r\n* 2号\r\n*内存：768GB \r\n* CPU：2x3.4GHz 6128 6核12线程处理器\r\n*存储：2x480GB STA SSD Intel S4',
    contact:
      'Twitter\r\nhttp://twitter.com/eosnodeone\r\nFacebook\r\nhttps://www.facebook.com/eosnodeone\r\nTelegram\r\nhttp://t.me/eosnodeone_en\r\nSteemit\r\nhttp://steemit.com/@eosnodeone',
  },
  {
    location: 'Seattle',
    latitude: 47.6062095,
    longitude: -122.3320708,
    name: 'Blockgenic',
    homepage: 'http://blockgenic.io/',
    prerequisites: '8/8',
    server:
      '目前使用8-16核心，16 GB + RAM，128GB + SSD用于私人Testnet和社区Testnet节点\r\n预计32 -64核心，256GB + RAM，512TB SSD用于启动节点，额外10 TB用于存储节点',
    introduction:
      'Blockgenic的总部位于西雅图，我们期待成为一个值得信赖和值得信赖的区块生产者。始终支持EOS生态系统，并为开发EOS做出贡献。我们非常重视安全性和透明度，并确保始终使我们的系统完成任务。我们还计划通过关于不同主题的各种聚会将EOS社区聚集在一起。',
    contact: 'Twitter\r\nhttps://twitter.com/blockgenic\r\nSteemit\r\nhttps://steemit.com/@block21',
  },
  {
    location: 'Taiwan, China',
    latitude: 23.69781,
    longitude: 120.960515,
    name: 'CIG EOS',
    homepage: 'http://www.cigeos.com',
    prerequisites: '6/8',
    nodeLocation: 'Taiwan China',
    server:
      '一个用于livenet，另一个用于备用。\r\n1.硬件标准：16核; 256G RAM; 1T SSD硬盘。6月3日以后1.具有更高性能的硬件：20核+ CPU，512GB + RAM等\r\n2.更稳定的架构：更多地址，负载均衡。\r\n3.更多的操作工程师：全职至少3名经验丰富的Devops。',
    introduction:
      'CIG EOS是台湾唯一的EOS节点竞选团队，团队致力于维护EOS网络稳定，促进EOS生态繁荣，孵化基于EOS项目。\r\nCIG EOS is the only node in Taiwan currently. The team is committed to maintaining EOS network stability, promting EOS ecological prosperity, and incubating EOS based projects.',
    contact:
      'Twitter\r\nhttps://twitter.com/CIGEOS\r\nFacebook\r\nhttps://www.facebook.com/cigeos\r\nTelegram\r\nhttps://t.me/cigeos\r\n微信公众号\r\nCoinsInGuideline\r\nSteemit\r\nhttps://steemit.com/eos/@cigeos/cigeos-block-',
  },
  {
    location: 'Shanghai, China',
    latitude: 31.2303904,
    longitude: 121.4737021,
    name: 'EOS eco',
    homepage: 'http://www.eoseco.com',
    prerequisites: '8/8',
    nodeLocation: 'China, HongKong China, Japan, Canada.',
    server:
      '截至2018年6月3日的技术规格和资源总支出估算\r\n硬件：\r\n1）BP主服务器：8个核心; 128G RAM; 512G SSD硬盘驱动器AWS\r\n2）BP从服务器：8个核心; 128G RAM; 512G SSD硬盘驱动器AWS\r\n3）API服务器＃1：4个核心; 64G RAM; 512G SSD硬盘驱动器AWS\r\n4）API服务器＃2：4个核心; 64G RAM; 512G SSD硬盘驱动器AWS\r\n5）监控服务器：2个核心; 4G RAM; 256G HDD硬盘驱动器AWS\r\n团队介绍\r\nEOS sec致力于孵化和社区发展，为所有基于EOS平台的Dapp开发者提供服务。\r\n我们正在启动EOS账户，EOS浏览器，EOS侧链等项目。我们还提供EOSeco基金来支持启动EOS项目。',
    introduction:
      'EOS sec致力于孵化和社区发展，为所有基于EOS平台的Dapp开发者提供服务。\r\n我们正在启动EOS账户，EOS浏览器，EOS侧链等项目。我们还提供EOSeco基金来支持启动EOS项目。',
    contact:
      'GitHub\r\nhttps://github.com/Eoseco\r\nTwitter\r\nhttps://twitter.com/Eoseco2018\r\nFacebook\r\nhttps://www.facebook.com/eoseco2018\r\nTelegram\r\nhttps://t.me/eoseco\r\nMedium\r\nhttp://medium.com/@eoseconet',
  },
  {
    location: 'Ukraine',
    latitude: 48.379433,
    longitude: 31.1655799,
    name: 'CryptoLions',
    homepage: 'http://cryptolions.io',
    prerequisites: '8/8',
    nodeLocation: 'Primary node: Tier 3 datacenter in Germany\\n\\nBackup node: Ukraine\\n\\n',
    server:
      '我们尚未决定硬件容量，包括RAM，存储，CPU规格和带宽。\r\n\r\n再次，这些是试探性的计划。我们将在5月的第一周公布我们的最终硬件规格，包括RAM，存储，CPU规格和连接性。',
    introduction:
      'CryptoLions当它们结合在一个良好平衡的个体中时，会产生其他品质，如节制，适度，谨慎，纯洁和自我控制。\r\n?尊重：EOS社区及其构成。\r\n?能力：满足EOS区块生产者的技术、组织和法律要求。\r\n?诚信：对他人和我们自己诚实，做我们说我们会做的事。',
    contact:
      'GitHub\r\nhttps://github.com/CryptoLions\r\nTelegram\r\nhttps://t.me/block_producer_candidate\r\nSteemit\r\nhttps://steemit.com/@cryptolions',
  },
  {
    location: 'Uncertain',
    latitude: 32.7120883,
    longitude: -94.1212965,
    name: 'EOS42.io',
    homepage: 'http://www.eos42.io/',
    prerequisites: '8/8',
    nodeLocation: 'London, UK',
    server: '预计2018年6月3日之后的硬件扩展计划。\r\n从云转移到数据中心基础架构。在确认准确设置之前等待block.one指导。',
    introduction:
      'EOS42作为英国伦敦的节点候选团队，我们的主要目标是通过高性能，可靠的网络支持服务和保护EOS网络，投资使其可扩展，保护珍贵的EOS token资源和价值，并赋予社区创建健康和可持续的生态系统的权利。\r\n\r\n我们将以诚实、正直和道德的态度，来做到这一点。同时保持政治和财务的全面独立，并提供高度的团队和财务透明。此外，我们将承诺一部分净利润用于区块链教育慈善事业。',
    contact:
      'Twitter\r\nhttps://twitter.com/eos42io\r\nTelegram\r\nhttps://t.me/eos42\r\nSteemit\r\nhttps://steemit.com/@eos42\r\nReddit\r\nhttps://www.reddit.com/user/GunnisonCap/',
  },
  {
    location: 'South Korea',
    latitude: 35.907757,
    longitude: 127.766922,
    name: 'EOSeoul',
    homepage: 'http://eoseoul.io/',
    prerequisites: '8/8',
    nodeLocation: 'Seoul , Tokyo and Singapore',
    server:
      '预计2018年6月3日之后的硬件扩展计划\r\n我们将在早期阶段使用云和数据中心。我们将密切关注增长情况并根据需要制定充足的规定。有关安全，扩展，网关，数据的更多细节将在适当的时候公布。\r\n*地点：首尔AWS地区\r\n*机器：m5.12xlarge（最大x1.32xlarge）\r\n* 1号\r\n*内存：192GB（最高2TB）\r\n* CPU：vCPU 48核心（最多128个核心）\r\n*存储：SSD 2TB * 2EA（NVME）+ EBS 16TB（预置IOPS 20000）\r\n*网络：10 Gbps（最高25 Gbps）\r\n*每月账单：2,800美元（最高19,361美元）\r\n*类型：云（AWS）',
    introduction:
      'EOSeoul，韩国的节点候选团队。由韩国领先的网络游戏公司NEOPLY和NEOWIZ组成，NEOPLY是韩国NEOWIZ在2008年成立的第一个启动加速器。\r\n我们一直在全球范围内开发和管理PC在线和手机游戏，并且在过去的20年中一直是韩国这一领域的领导者之一。\r\nNEOWIZ的业务多年来一直在转型和扩张，紧跟互联网和行业发展的历史，不断寻找在这个领域上升的机会。我们相信下一个重大事件就是区块链协议，它将为这个时代带来新的范式。\r\n互联网上的用户可以复制和拥有数据，而不会产生任何费用。这种开放性让互联网能够爆炸并扩大。但是，这意味着数据的创建者/所有者没有得到适当的奖励，因为他/她有权获得。\r\n区块链协议识别数据的所有权。所有权属于贡献或创建数据的用户，奖励给那些对生态系统有积极贡献的人，从而为他们继续这样做提供动力。\r\n但是，还有很多问题需要解决。整个区块链生态系统需要更广泛的公众参与，开发者需要为这个生态系统提供更多有用的服务，从而创造一个良性循环。与此同时，区块生产商需要提供可靠的网络基础设施。我们相信EOS软件可能是我们所面临问题的最接近的解决方案。因此，我们愿意参与EOS生态系统的创新。',
    contact:
      'GitHub\r\nhttp://github.com/eoseoul\r\nTwitter\r\nhttp://twitter.com/eoseoul_kor\r\nFacebook\r\nhttp://facebook.com/eoseoul.kr\r\nTelegram\r\nhttp://t.me/eoseoul_en\r\nSteemit\r\nhttp://steemit.com/@eoseoul',
  },
  {
    location: 'Hangzhou, China',
    latitude: 30.274084,
    longitude: 120.15507,
    name: 'ChainPool',
    homepage: 'https://chainpool.io/',
    prerequisites: '6/8',
    nodeLocation: 'China',
    server:
      '预计2018年6月3日之后的硬件扩展计划\r\n最初，我们计划将主要和备用机器作为主要生产单位，并正在寻找更有效的电源供应方式以减少损失。我们下面列出的硬件规格可能会根据Block.One和社区反馈进行更改：\r\n* CPU：Intel Xeon E7 8880 v3（18核心）* 4 = 72核心\r\n* RAM：1至4 TB \r\n*存储：100 + TB \r\n*网络：25 Gbps \r\n*节点：1个livenet和1个备用',
    introduction: 'ChainPool首个中国PoS矿业集团，旨在持续促进EOS生态系统的发展。',
    contact: 'Twitter\r\nhttps://twitter.com/chainpool_io\r\nTelegram\r\nhttps://t.me/chainpool',
  },
  {
    location: 'Beijing, China',
    latitude: 39.90419989999999,
    longitude: 116.4073963,
    name: 'EOSAntPool',
    homepage: 'https://eosantpool.com',
    prerequisites: '6/8',
    nodeLocation: 'HongKong',
    server:
      '（Main）实例大小：x1e.32xlarge，vCPU：128，内存：3904GB，SSD：2 * 1920GB，CPU：Intel Xeon E5-2686 v4，网络带宽：25Gbps，EBS带宽：14Gbps \r\n（备用）：x1e.32xlarge，vCPU：128，内存：3904GB，SSD：2 * 1920GB，CPU：Intel Xeon E5-2686 v4，网络带宽：25Gbps，EBS带宽：14Gbps',
    introduction:
      '自2014年8月上线以来，AntPool已经通过用户友好的界面，安全稳定的性能，高效和贴心的服务获得了大量用户的支持和信任。目前，在比特币，Litecoin和Dash等大型hashrates中，AntPool进行hashrates维护和社区建设。',
    contact: 'Telegram\r\nhttp://t.me/AntPoolEOSUS\r\nSteemit\r\nhttps://steemit.com/@antpool',
  },
  {
    location: 'Tokyo, Japan',
    latitude: 35.6894875,
    longitude: 139.6917064,
    name: 'EOSLaoMao',
    homepage: 'http://eoslaomao.com/en/',
    prerequisites: '8/8',
    nodeLocation: 'Primary Node: Tokyo, Japan\\nSecondary Node: Tokyo, Japan',
    server:
      '截至2018年6月3日的技术规格和资源总支出估算\r\n技术规格\r\n块生产者主要：\r\nGoogle Cloud：n1-standard-32,32个CPU核心，120GB RAM 128GB SSD 20 TB磁盘1G带宽。\r\n完整节点：\r\nGoogle Cloud：n1-standard-32,32个CPU核心，120GB RAM 128GB SSD 20 TB磁盘1G带宽。\r\n存储（ipfs）：\r\nGoogle Cloud：n1-standard-32,32个CPU核心，120GB RAM 128 GB SSD 100 TB磁盘1G带宽。\r\n块生产者备份：\r\nGoogle Cloud：n1-standard-32,32个CPU核心，120GB RAM 128GB SSD 20 TB磁盘1G带宽。\r\n完整节点备份：\r\nGoogle Cloud：n1-standard-32,32个CPU核心，120GB RAM 128GB SSD 20 TB磁盘1G带宽。\r\n存储（ipfs）备份：\r\nGoogle Cloud：n1-standard-32,32个CPU核心，120GB RAM 128 GB SSD 100 TB磁盘1G带宽。\r\n总共花费\r\n我们对这个项目有足够的预算，我们有过去的各种投资，包括老毛的个人投资。\r\n\r\n预计2018年6月3日之后的硬件扩展计划\r\n计划：\r\n1.更多的备份节点。\r\n2.配置更高的服务器，也就是更多的RAM。\r\n3.更高的带宽。',
    introduction:
      'EOSLaoMao，由着名区块链倡导者和INBlockchain合作伙伴老猫发起。目标是在EOS主网6月份上线时成为21个超级节点之一。我们唯一的目标是维护一个公平和稳定的Eos Block Producer节点，由于利润不在我们的考虑范围内，因此我们将用它来以多种方式推广EOS，我们位于东京，我们可以使用最好的云服务来运行稳定的节点。\r\n联系方式',
    contact: 'Telegram\r\nhttps://t.me/eoslaomao\r\nSteemit\r\nhttps://steemit.com/@eoslaomao',
  },
  {
    location: 'Asutralia',
    latitude: -25.274398,
    longitude: 133.775136,
    name: 'EOSphere',
    homepage: 'https://www.eosphere.io/',
    prerequisites: '8/8',
    nodeLocation: 'Sydney and Singapore',
    server:
      '我们将在我们的AWS VPC中使用X1e类实例，这些实例能够扩展到128个vCPU，3.9 TB RAM和3.8 TB SSD存储;我们将在我们的GCP VPC中使用n1-highmem-X或n1-megamem-X实例，这些实例可以扩展到96vCPU，1.4 TB RAM和3 TB SSD存储。',
    introduction:
      '专业诚信、透明度、承诺、合作和独立性，EOSphere拥有EOS所期望的所有特征。\r\n我们相信久经考验的经验，将激发对EOS利益相关方、Dapp开发商和EOS区块链业务的信心，为EOS.IO区块链的社区启动和持续运营以及治理提供支持，同时支持我们地区成为EOS社区的全球成员。虽然基于澳大利亚，我们的目标是服务于整个EOSphere！',
    contact: 'Twitter\r\nhttps://twitter.com/eosphere_io\r\nSteemit\r\nhttps://steemit.com/@eosphere',
  },
  {
    location: 'USA',
    latitude: 37.09024,
    longitude: -95.712891,
    name: 'EOS BlockSmith',
    homepage: 'http://eosblocksmith.io/',
    prerequisites: '8/8',
    nodeLocation: 'San Francisco, Tulsa Oklahoma.',
    server:
      '第一阶段:(完成并于5月1日生活）\r\n我们的第一个裸机节点。位于旧金山。\r\n数据中心提供商：Hurricane Electric\r\n惠普G8 16核心\r\n256 GB RAM\r\n1TB固态存储\r\n256 Mbps专用\r\n这个数据中心于5月1日上线。如果这是我们的主要启动节点，我们将在另一个城市提供备用节点，稍后将提供详细信息。如果第二阶段在发布前完成，则不需要备份。\r\n\r\n第二阶段：\r\n我们的第二个裸机节点位于俄克拉荷马州的塔尔萨。这旨在成为我们的主要节点之前或尽快启动后尽可能。此节点上线的那一刻，加利福尼亚州的第1阶段节点成为我们的备份。塔尔萨拥有大量的纤维，我们相信它相对于美国的其他BP集团来说具有非常好的主要地理位置，能够长期扩展到未来。\r\n数据中心提供商：TierPoint解决方案\r\n富士通RX2530 M4 56-120核心\r\n1+ TB DDR4\r\n6+ TB固态存储\r\n1+ Gbps专用\r\n我们可以在这个位置扩展到我们需要一段时间的尽可能多的内核，RAM，存储和带宽。',
    introduction:
      'EOS BlockSmith是第一家通过承诺不向任何EOS团队，投入任何投资来保证完全财务独立的节点生产者。消除了任何潜在的利益冲突，并确保我们永远不会激励任何人在财务上为我们投票。\r\n我们进一步保证，我们绝不会采取任何形式的外部投资或风险投资。我们100％自筹资金，并将继续如此。',
    contact:
      'Twitter\r\nhttps://twitter.com/eosBlockSmith\r\nMedium\r\nhttps://medium.com/@eosBlockSmith\r\nSteemit\r\nhttps://steemit.com/@eosblocksmith',
  },
  {
    location: 'Anguilla, West Indies',
    latitude: 18.220554,
    longitude: -63.06861499999999,
    name: 'eosDAC',
    homepage: 'https://eosdac.io/',
    prerequisites: '8/8',
    nodeLocation: 'the United Kingdom, Romania, Gibraltar and South Korea.',
    server:
      'eosDAC will be able to scale block producer nodes up to 2TB RAM, 10GB bandwidth and 50TB storage within hours of those requirements being identified. ',
    introduction:
      'eosDAC是一个通过区域链上的智能合约编码，分权自治的社区。通过EOS软件，使社区成为合作社的一种革命性方式成为可能。DAC由它的token持有者和董事会成员控制，他们投票运行它的运营。\r\nEOSD.IO的愿景是区块生产者，应该开放给每个人贡献和受益。为了实现这一愿景，eosDAC将成为一个不断发展的去中心化自治社区（DAC），致力于成为为全球EOS社区提供服务的领先EOS.IO Block Producer。\r\n在此过程中，eosDAC将创建所需的工具和智能合约。它将与EOS社区分享这些信息，以帮助其他DAC在EOS.IO区块链上蓬勃发展。\r\neosDAC将于2018年6月初在EOS区块链上作为DAC推出，直到eosDAC由其发射团队运行为止。发射团队的成员在过去6个月中，深入参与了EOS社区并在EOS社区测试网上开发了多个模块。目前，eosDAC token存在于 ETH 区块链中，一旦它运行，这些token就会转移到EOS区块链上。',
    contact:
      'Twitter\r\nhttps://twitter.com/eosdac\r\nFacebook\r\nhttps://www.facebook.com/eosdac/\r\nTelegram\r\nhttps://t.me/eosdacio\r\nSteemit\r\nhttps://steemit.com/@eosdac',
  },
  {
    location: 'Mexico',
    latitude: 23.634501,
    longitude: -102.552784,
    name: 'EOSMX',
    homepage: 'http://www.eosmx.com/',
    prerequisites: '8/8',
    nodeLocation: 'Mexico',
    introduction:
      '我们成立EOSMX只有一个目的——支持,加强和领导EOS社区在拉丁美洲,从墨西哥开始。\r\n作为一个EOS区块生产者，我们将为EOS社区提供：一个透明的治理。',
    contact: 'Facebook\r\nhttps://www.facebook.com/oficommx/\r\nTelegram\r\nhttps://t.me/eosmxlatam',
  },
  {
    location: 'Beijing, China',
    latitude: 39.90419989999999,
    longitude: 116.4073963,
    name: 'EOS JRR',
    homepage: 'http://www.jrrcrypto.io/',
    prerequisites: '8/8',
    nodeLocation: 'Hong Kong or Japan and suitable areas.',
    server: 'Cloud',
    introduction:
      'EOS JRR由JRR Crypto发起成立，致力于打造基于EOS的应用生态社区，并提供项目孵化、开发培训及社群运营等一系列服务。\r\n针对本次超级节点竞选，EOS JRR推出了Dapp专项孵化基金、孵化项目收益空投以及EOS大学等若干方案吸引EOS持有者投票。\r\nJRR Crypto是一家致力于打造全球首个区块链世界的“分布式投行”的机构，下设投资银行、基金、私人银行等业务板块，于2016年在瑞士注册，曾投资过币安。',
    contact:
      'Twitter\r\nhttps://twitter.com/eosjrr\r\nTelegram\r\nhttp://t.me/eosjrr\r\nSteemit\r\nhttps://steemit.com/@eosjrr',
  },
  {
    location: 'Sweden',
    latitude: 60.12816100000001,
    longitude: 18.643501,
    name: 'EOSSw Eden',
    homepage: 'http://eosio.se/',
    prerequisites: '8/8',
    nodeLocation: 'Sweden (3 different cities at launch)',
    server:
      '区块生产者：\r\n主要：Dual Xeon，128 Gb ram（可升级至2 Tb），512 Gb SSD \r\n备份＃1：<与上述相同> \r\n\r\n完整节点：\r\n主要：双Xeon，64 Gb ram（可升级至2 Tb），512 Gb SSD \r\n（未来这台机器可能需要保持与生产者相同的内存量，以确保他们能够及时验证所有块）。\r\n\r\n存储（ipfs）：\r\n主要：Dual Xeon，32 Gb RAM（可升级至1 Tb），突击500 Gb 10k rpm（缓存驱动器），10 Tb 7.2k rpm \r\n\r\n组合完整节点和存储：\r\n其次：Dual Xeon，32 Gb RAM（可升级至1 Tb），突击256 Gb 10k rpm（缓存驱动器），10 Tb 7.2k rpm \r\n第三级：<与上述相同>',
    introduction: '来自瑞典的超级节点候选团队，具有高度的诚信和对科技的很好的理解。',
    contact: 'Twitter\r\nhttps://www.twitter.com/eossweden\r\nSteemit\r\nhttps://steemit.com/@xebb',
  },
  {
    location: 'Hong Kong ',
    latitude: 22.396428,
    longitude: 114.109497,
    name: 'EOS.Hedging',
    homepage: 'https://www.hedging.network',
    prerequisites: '6/8',
    nodeLocation: 'China, Hong Kong, Singapore, United States',
    server:
      '预计2018年6月3日之后的硬件扩展计划\r\nA）主服务器\r\n56核CPU，480G内存，32T存储，200M带宽，5,368美元/月\r\nB）备用服务器\r\n32核CPU，256G内存，32T存储，200M带宽，4,770美元/月\r\nC）防守体系\r\n1000G + DDoS清理能力可以完美抵御SYN Flood，ACK Flood，ICMP Flood，UDP Flood，NTP Flood，SSDP Flood，DNS Flood，HTTP Flood和CC攻击',
    introduction:
      'EOS.Hedging，位于香港，是一个拥有工程、研究和金融背景的团队。目标是创建世界上第一个去中心化数字衍生品交易网络。除此之外，EOS.Hedging通过提供套期保值生态基金，建立孵化器、保值开发者社区、媒体联盟等多种服务，试图建立一个全球经济的生态系统。',
    contact:
      'Twitter\r\nhttps://twitter.com/EosHedging\r\nFacebook\r\nhttps://www.facebook.com/eos.hedging/\r\nTelegram\r\nhttps://t.me/eoshedging\r\n微信公众号\r\nEosHedging',
  },
  {
    location: 'Kyiv Ukraine',
    latitude: 50.4501,
    longitude: 30.5234,
    name: 'Attic Lab',
    homepage: 'http://atticlab.net/',
    prerequisites: '6/8',
    nodeLocation: 'Germany, Finland',
    server:
      '我们将使用带有英特尔酷睿i7-6700四核处理器和32 GB DDR4 RAM的3台EX41-SSD服务器以及两台500 GB 6Gb / s SSD。其中2个将位于德国，另一个位于芬兰。',
    introduction:
      'Attic Lab成立于2016年。最初，我们与Ambisafe、Alliance Bank和Humaniq合作，现在我们多元化和经验丰富的团队让我们专注于构建自己的区块链应用程序，并且支持开发区块链举措，通过举办讲座和研讨会与区块链社区分享我们的专业知识。',
    contact:
      'GitHub\r\nhttps://github.com/atticlab/\r\nTwitter\r\nhttps://twitter.com/atticlab_it\r\nFacebook\r\nhttps://www.facebook.com/atticlab\r\nTelegram\r\nhttps://t.me/joinchat/CFEEkxHa_iJNv0AYOJ1VEw\r\nSteemit\r\nhttps://steemit.com/@attic-lab',
  },
  {
    location: 'Iceland',
    latitude: 64.963051,
    longitude: -19.020835,
    name: 'EOSMetal',
    homepage: 'https://eosmetal.io/',
    prerequisites: '8/8',
    nodeLocation: 'Iceland, Panama',
    server:
      '两个位于冰岛的物理服务器和一个位于巴拿马的服务器用于额外的故障转移和api查询，并传递BP块。每个服务器将由以下最低硬件组成：\r\n\r\n双氙气处理器\r\n64 GB的Ram（可扩展至1TB）\r\n2 x 480 GB SSD（可扩展）',
    introduction:
      'EOSMetal建立在尽可能去中心化和独立的前提下，同时仍然提供强大的基础设施。我们通过“裸机”物理服务器设计来实现这一目标，并通过将我们的基础设施定位于多个地缘、政治边界，而进一步分散。\r\n\r\n我们完全自给自足，永远不会从Dapp，销售token或交换中获得任何收入。绝不会通过股息或任何其他会损害我们作为无偏见块的制作者的方法购买选票。\r\n\r\n我们都是EOS投资者，其次是区块生产者，我们尊重这个角色的需求，因为它直接影响我们作为EOS项目的投资者和支持者。',
    contact:
      'Twitter\r\nhttps://twitter.com/EOSMetal\r\nTelegram\r\nhttps://t.me/EOSMetal\r\nSteemit\r\nhttps://steemit.com/eos/@eosmetal/introducing',
  },
  {
    location: 'China',
    latitude: 22.543096,
    longitude: 114.057865,
    name: 'EOS Shenzhen',
    homepage: 'https://eoshenzhen.io',
    prerequisites: '6/8',
    nodeLocation:
      'Primary: Shenzhen, China\\nSecondary: Dongguan and other major city in Zhujiang Delta and Southern China',
    server:
      '截至2018年6月3日的技术规格和资源总支出估算\r\n技术规格\r\n我们计划升级硬件和带宽\r\n1、主要位置\r\n区块生产者主要：\r\n双Xeon，128 Gb RAM，512 Gb SSD\r\n完整节点：\r\n双至强64 Gb RAM，512 Gb SSD\r\n存储（ipfs）：\r\n双至强，64 Gb RAM，128 Gb SSD，40T硬盘，7.2k rpm\r\n\r\n\r\n2、次要位置\r\n区块生产者备份\r\n1：双Xeon，128 Gb RAM，512 Gb SSD全节点和存储\r\n（ipfs）备份\r\n1：双Xeon，64 Gb ram，128 Gb SSD，40T硬盘，7.2k rpm\r\n\r\n\r\n预计2018年6月3日之后的硬件扩展计划\r\n计划使用：\r\n1，最安全的互联网数据中心，至少有三个地址\r\n2，配置更高的硬件，例如2TB RAM\r\n3，足够的带宽支持，最大的是10gps',
    introduction:
      'EOShenzhen作为EOS.io作为第一批来自深圳的节点候选人,我们将以英文和中文的形式与大家沟通。\r\n我们将继续努力，建立一个健康的EOSIO生态系统和中国社区。\r\nEOS将深刻的改变我们的现在的生活方式，EOShenzhen将全力以赴到该项事业中。\r\n\r\nEOShenzhen为一个稳定的区块链BP的同时，未来将打造利于社区发展的基金及孵化器，致力于将会成为中国最具影响力的BP，也会加强与全球的节点沟通合作。\r\n我们致力于稳扎稳打的作风、严格高效的技术团队及良性发展的社区运营工作，维护EOSIO稳定运行，维护社区发展，共同打造网络空间新的运作模式。',
    contact:
      'Twitter\r\nhttps://twitter.com/eostechlover\r\nTelegram\r\nhttps://t.me/eoshenzhen\r\n微信公众号\r\nhttps://mp.weixin.qq.com/mp/profile_ext?actio\r\nSteemit\r\nhttps://steemit.com/@eoshenzhen',
  },
  {
    location: 'Canada',
    latitude: 56.130366,
    longitude: -106.346771,
    name: 'EOS Land',
    homepage: 'http://www.eosland.ca/',
    prerequisites: '8/8',
    nodeLocation: 'Canada, USA',
    server:
      '2个服务器\r\n\r\nCPU：256 \r\n\r\nRAM：3TB \r\n\r\nSSD：3TB \r\n\r\n网络：25 Gbps \r\n\r\n（B）TOK IPFS存储\r\n\r\nSSD：100 TB',
    introduction:
      'EOS Land（eosland.ca）是一个标志性社区，对于那些认为更美好的世界包括区块链和分散的生态系统的人来说。\r\n\r\n我们的总部位于美丽的温哥华，不列颠哥伦比亚省，加拿大，这座城市受区块链应用程序启发，如Kittycat。我们得到了加拿大主要大学IT学术界教授的支持，并得到当地DevOps专家的认可，EOS Land是在加拿大根据“不列颠哥伦比亚省合作法”运营的注册合法公司。\r\n\r\n我们在EOS Land的愿景是为现实世界的人们找到新的机会，我们相信我们正在通过引入区块链技术进入一个崭新的世界，就像克里斯托弗·哥伦布用他的发现改变了世界。我们的使命是以更低的成本建立更好的透明和负责任的标记化区块链社区生态系统，为所有人提供服务。',
    contact:
      'GitHub\r\nhttps://github.com/eosland2018\r\nTwitter\r\nhttps://twitter.com/eosland1\r\nFacebook\r\nhttps://www.facebook.com/eosland.eos.3\r\nTelegram\r\nhttps://t.me/joinchat/Gl6KDg4bKD1itwmBwH7o7w\r\nSteemit\r\nhttps://steemit.com/@eosland',
  },
  {
    location: 'Ireland',
    latitude: 53.1423672,
    longitude: -7.692053599999999,
    name: 'EOS Dublin',
    homepage: 'https://www.eosdublin.com/',
    prerequisites: '8/8',
    nodeLocation: 'Ireland',
    server:
      '我们选择领先的独立爱尔兰数据中心与该项目合作。分布在爱尔兰的两个地点，拥有领先的技术，带宽和服务。\r\n\r\n我们拥有足够的能力和灵活性，并可扩展运营以支持EOS社区。\r\n\r\n我们将在未来几周宣布更多关于我们的堆栈和设置，并且也将在未来几周和几个月内加入其他BP测试网。',
    introduction:
      'EOS Dublin是位于爱尔兰都柏林的超级节点候选人。\r\n我们徽标上的四个绿点代表了我们的核心价值观：独立，诚信，诚信和教育。我们相信EOS.IO代表了一个向更好的数字世界迈进的全球范式转变。\r\nEOS.IO不仅仅是一项技术进步，而是关于我们融合技术，社区和个人承诺时变得可能的事情。\r\n对我们来说，EOS块的生产者就像在美国宇航局扫地的看门人一样。我们在改变世界的风险中扮演一小部分角色。作为区块生产者，我们正在设计未来的基础。我们迫不及待想要了解基金会完成后的未来。',
    contact:
      'Twitter\r\nhttps://twitter.com/@eosdublin\r\nTelegram\r\nhttps://t.me/eosdb\r\nMedium\r\nhttps://medium/@eosdublin\r\nSteemit\r\nhttps://steemit.com/@eosdublin',
  },
  {
    location: 'Singapore',
    latitude: 1.352083,
    longitude: 103.819836,
    name: 'EOS.MediShares',
    homepage: 'http://eos.medishares.org/',
    prerequisites: '8/8',
    nodeLocation: 'Singapore',
    server:
      'Testnet服务器（6月3日前）\r\n1个云节点（Microsoft Azure D13 V2）\r\nCPU：8个vCPU内核\r\n内存：56GB \r\n网络：1000Mbps \r\n存储：本地SSD 400GB，托管OS磁盘1TB \r\n\r\nMainnet Server（6月3日以后）\r\n1个云节点（Microsoft Azure E64 V3）\r\nCPU：64个vCPU内核\r\n内存：432GB \r\n网络- 30Gbps \r\n存储：本地SSD 1.6TB，托管OS磁盘2TB \r\n\r\n备份服务器（6月3日以后）\r\n1个云节点（Microsoft Azure E64 V3）\r\nCPU：64个vCPU内核\r\n内存：432GB \r\n网络- 30Gbps \r\n存储：本地SSD 1.6TB，托管OS磁盘2TB',
    introduction:
      '我们致力于将EOS带给大众，实现广泛采用的最佳方式是通过有用的，有趣的和精心设计的产品来展示EOS平台的最佳功能。还可以与EOS开发人员社区共享我们的工具。',
    contact: 'Telegram\r\nhttps://t.me/eosmedishares\r\nSteemit\r\nhttps://steemit.com/@ericfish',
  },
  {
    location: 'Argentina',
    latitude: -38.416097,
    longitude: -63.61667199999999,
    name: 'EOS Argentina ',
    homepage: 'https://www.eosargentina.io/',
    prerequisites: '8/8',
    introduction:
      'EOS阿根廷，主要目标是通过在一个已经以“区块链友好”而闻名的国家推广使用EOS，并在南美其他地区效仿这一成功举措，推动区块链的采用，我们相信我们大陆迫切需要区块链透明度。',
    contact:
      'Twitter\r\nhttps://twitter.com/EosArgentina\r\nFacebook\r\nhttps://www.facebook.com/groups/6108327225889\r\nSteemit\r\nhttps://steemit.com/@eosargentina',
  },
  {
    location: 'Thailand',
    latitude: 15.870032,
    longitude: 100.992541,
    name: 'EOSBIXIN',
    homepage: 'http://www.eosbixin.com/',
    prerequisites: '8/8',
    nodeLocation: 'Shanghai and Dubai',
    server: '对于EOS Dawn 3.0 testnet，我们配备了8核Broadwell Intel CPU，16GB Mem，1TB存储的主服务器。',
    introduction:
      'EOSBIXIN小组隶属于币信，我们认识到区块链正从底层技术时代迈向产品时代，EOS作为高性能区块链，将承载人类全方位价值的自由发行和流通，所以我们打造EOSBIXIN超级节点和币信。EOS账户两大底层基础，为EOS提供强健的网络，同时让大家更方便使用EOS，实现EOS生态的繁荣发展。',
    contact:
      'GitHub\r\nhttps://github.com/EOSBIXIN\r\nTwitter\r\nhttps://twitter.com/eosbixin\r\nTelegram\r\nhttps://t.me/EosBixinChat\r\nSteemit\r\nhttps://steemit.com/@tuitui',
  },
  {
    location: 'Kenya',
    latitude: -0.023559,
    longitude: 37.906193,
    name: 'EOSNAIROBI',
    homepage: 'http://eosnairobi.io/',
    prerequisites: '6/8',
    nodeLocation: 'Nairobi, Kenya',
    server:
      '目前运行在私人测试网上\r\n在讨论中加入EOS SCHOLAR。\r\n16-32 GB RAM，6-8 CORES，512GB固态硬盘，1TB Internet传输，1GBps（本地），100MBps（国际）。\r\n预计2018年6月3日之后：\r\n256 GB + RAM，16-32 CORES，1-10GBps带宽，20TB +存储\r\n\r\n2018年6月3日之后估算的硬件扩展计划-发布到Steem区块链。\r\n基础设施位于三层数据中心，具有足够的空间和扩展设施，包括冷却系统，2台备用发电机，全服务变电站，UPS设施以保持基础设施正常运行。',
    introduction:
      'EOSNAIROBI个是一个强大和充满活力的社区，与不同背景的人认为区块链技术将推动未来。未来财富创造的工具是分散的，可以对许多人来说,透明度和问责制的未来，未来个人和团体可以参与一个鼓励平台上使世界变得更美好',
    contact: 'Telegram\r\nhttps://t.me/eosnairobi',
  },
  {
    location: 'Shenzhen, China',
    latitude: 22.543096,
    longitude: 114.057865,
    name: 'EOSCUBE柚子魔方·',
    homepage: 'http://eoscube.io',
    prerequisites: '8/8',
    nodeLocation: '中国，美国，新加坡',
    server:
      'Master:\r\nCPU:24 vCPU 48 GB Intel Xeon E5-2682v4 2.5 GHz\r\nRAM: 48GB\r\nSSD: EBS-only\r\nNetwork: 1,000 Mbps\r\nSSD: 1024GB\r\n\r\nSlave:\r\nCPU:16 vCPU Intel Xeon Platinum 8163 2.5 GHz\r\nRAM: 32GB\r\nSSD: EBS-only\r\nNetwork: 1,000 Mbps\r\nSSD: 1024GB',
    introduction:
      '我们是中国深圳柚子魔方eoscube团队，目前拥有核心成员共20余人，技术团队成员大部分来自于世界五百强通信公司华为，拥有多年的云服务器部署和研发经验。目前正在研究跨链技术和EOS侧链，开发EOS跨链账户、EOS区块链浏览器等基础设施。\r\n我们在节点部署和维护上拥有巨大的优势，技术团队都来自于华为云服务和运维的金牌团队，有服务全球75个国家120家运营商的经验和技术实力。我们是来自于中国“硅谷”深圳的超级节点，节点标识“eoscube”，或者“EOSCUBE”，请支持我们。',
    contact:
      'Twitter\r\nhttps://twitter.com/Eos_Cube\r\nTelegram\r\nhttp://t.me/eoscube\r\n微信公众号\r\neoscube\r\nSteemit\r\nhttps://steemit.com/@eoscube',
  },
  {
    location: 'Brazil',
    latitude: -14.235004,
    longitude: -51.92528,
    name: 'EOS Rio',
    homepage: 'http://eosrio.entropia.in/',
    prerequisites: '8/8',
    introduction:
      'EOS Rio致力于建立区块生产者基础设施，并在巴西和南美洲发展EOS社区。\r\nRede Entropia领导EOS Rio表示，Rede Entropia是一家人工智能和区块链实验室，Venture Builder和Startup Accelerator。其目的是与人员和企业合作，创造积极影响社会的创新解决方案。',
    contact:
      'GitHub\r\nhttps://github.com/eosrio\r\nTelegram\r\nhttps://t.me/eosrio\r\nSteemit\r\nhttps://steemit.com/@eosrio',
  },
  {
    location: 'Puerto Rico',
    latitude: 18.220833,
    longitude: -66.590149,
    name: 'EOS the World LLC',
    homepage: 'https://www.eostheworld.co/',
    prerequisites: '8/8',
    nodeLocation: 'America',
    server:
      '硬件和存储\r\n\r\n我们的服务器是全新的最先进的计算机，可以立即升级到每TB 3 TB的RAM。它们包括2.5“”SSD硬盘驱动器，4个Xeon E7-8880-2.2GHz-88核心- 176个处理线程。它们不会用于除EOS块生产之外的任何其他用途。我们将使用1 GBPS的专用冗余光纤线将它们连接到互联网，并立即通知可升级到最大（当前）10 GBPS。硬件将包括具有24个SFP端口和3层BGP对等冗余ISP的Arista 10 GB SFP +交换机。这将包括来自Arista交换机的增强型第3层路由许可证，冗余主动/主动统一威胁管理防火墙以及具有19 GBPS防火墙吞吐量的轮循负载均衡10GbE。互联网托管将是IPv4 / 24地址块（具有254个可用地址）。\r\n\r\n存储\r\n我们绝不会使用传统的互联网公司存储。我们将从44 x 8 TB SAS驱动器阵列开始- 12 Gb / s，一旦存储容量达到50％，就会增加。无论网络增长多快，需要多少存储空间，无论涉及多少费用，我们都将始终保持至少50％的可用空闲存储空间。',
    introduction:
      '我们是一个分散式的计算机科、商业、市场营销和慈善人员团队，对EOS平台非常感兴趣。完全是自筹资金的（并且将永久保留），没有任何外部利益冲突。',
    contact: 'Twitter\r\nhttps://twitter.com/EOStheWorld\r\nFacebook\r\nhttps://www.facebook.com/groups/1334038041609',
  },
  {
    location: 'Shanghai ',
    latitude: 31.2303904,
    longitude: 121.4737021,
    name: 'ONEROOT',
    homepage: 'https://www.oneroot.io/en',
    prerequisites: '8/8',
    nodeLocation: 'ShangHai',
    server:
      'ONEROOT将使用2台具有以下规格的服务器：\r\nEC2 \r\nAWS m4.2xlarge \r\nCPU：2.3 GHz Intel Xeon E5-2686 2.4 GHz Intel Xeon E5-2676 v3（Haswell），4核\r\n内存：8GB \r\nSSD：512GB \r\n网络：1,00 Mbps \r\n\r\nEBS存储\r\nSSD：512GB',
    introduction:
      'ONEROOT成立于2017年，在众多共同建设者的支持下实现了雄心壮志迈出的第一步。在未来的日子里，我们将尽力履行您的信任和期望，并尽我们所能建立一个全新的经济体系。\r\n\r\n我们作为一个超级节点候选人的愿景是合作孵化器，将EOS作为共同建设者的一部分。ONEROOT将有助于在上海的封锁之家进行研究和宣传。',
    contact:
      'Twitter\r\nhttps://twitter.com/OneRootNetwork\r\nTelegram\r\nhttps://t.me/OneRootProject\r\nMedium\r\nhttps://medium.com/@oneroot\r\nReddit\r\nhttps://www.reddit.com/r/OneRoot',
  },
  {
    location: 'Poland',
    latitude: 51.919438,
    longitude: 19.145136,
    name: 'EOS Emerge',
    homepage: 'http://eosemerge.io/',
    prerequisites: '8/8',
    nodeLocation: 'Poland',
    server:
      '虽然这不是最终的，并可能在接下来的几周内有所改变，但我们最初计划：\r\n\r\n英特尔XEON E5-2640 V4 10C / 20T2.4G赫兹25MB \r\n64 GB RAM \r\n512 GB固态硬盘',
    introduction:
      '作为EOS Emerge的成员，我们很荣幸能够成为这一革命性项目的一部分，并有机会作为基于EOS.io的区块链推出的创始块生产商候选人向EOS社区展示自己。\r\n\r\n在这里你可以找到我们的完整候选人- > https://steemit.com/eos/@eosemerge/eos-emerge-eos-block-producing-candidate-from-poland \r\n\r\n我们是一群来自波兰的强大的IT和区块链爱好者，他们拥有在私人公司（贵金属，共同基金，保险）的背景和IT经验，在金融市场有14年的历史，对大多数金融工具出现在过去的十年中，表明我们有能力适应不断变化的业务环境。\r\n\r\n因此，我们非常兴奋并准备好利用我们的财务背景，IT知识和创新技能来服务EOS项目。\r\n\r\n我们是EOS生态系统的大爱好者，我们相信其核心基础，这使我们希望成为其早期采用阶段的积极参与者。\r\n利用我们以前的IT和财务经验，我们渴望加入您的社区，为构建EOS的dApps做出贡献，我们认为这可能是一个真正的突破！',
    contact:
      'Twitter\r\nhttps://twitter.com/eos_emerge\r\nTelegram\r\nhttps://t.me/eosemerge\r\nSteemit\r\nhttps://steemit.com/@eosemerge\r\nReddit\r\nhttps://www.reddit.com/user/Eos_Emerge',
  },
  {
    location: 'Japan',
    latitude: 36.204824,
    longitude: 138.252924,
    name: 'JEDA',
    homepage: 'http://www.eosjapan.org/',
    prerequisites: '8/8',
    nodeLocation: 'Tokyo, Japan',
    server:
      '截至2018年6月3日的技术规格和资源总支出估算\r\n* AWS EC2 m4.4xlarge \r\n* 64GB RAM \r\n* 512GB SSD \r\n缩放计划：\r\n逐渐移动到裸机服务器。\r\n使用2-4 TB RAM和100G带宽支持升级至两台服务器。\r\n一个用于生产PB，一个用于备份。\r\n团队介绍\r\nJEDA是EOS开发者协会，支持日本EOS生态系统的开发。在EOS上建立一个生态系统，提出线上和线下活动，收集EOS开发者并开发有吸引力的DAPP，并开发基于EOS的多种服务。\r\n\r\n在EOS上建立一个生态系统，提出线上和线下活动，收集EOS开发者并开发有吸引力的DAPP，并开发基于EOS的多种服务。',
    introduction: 'Twitter\r\nhttps://twitter.com/eosjapan_jeda\r\nTelegram\r\nhttp://t.me/eosjapan',
  },
  {
    location: 'Singapore',
    latitude: 1.352083,
    longitude: 103.819836,
    name: 'EOSREAL',
    homepage: 'http://eosreal.com/',
    prerequisites: '8/8',
    nodeLocation: 'Islamabad, Pakistan and Melbourne, Australia, expanding to any location',
    server:
      '在测试期间，我们将AWS Mumbai m5.4xlarge与v16,64G Ram和1,000GB固态硬盘以及10GB宽带连接在一对测试网上。\r\n6月3日前的初步计划\r\n\r\n“服务器型号：PowerEdge R940服务器\r\nCPU：Xeon E5-2699A v4\r\n处理器核心：Docosa核心（22核心）\r\nRAM：256GB\r\nSSD：3.84TB（2x1.92TB SSD SATA读取密集型6Gpbs 512n 2.5英寸可插拔光盘，Hawk-M4R，1 DWPD，3504 TBW）\r\n带宽：1Gbps\r\n附加网卡：Broadcom 57414双端口25Gb，SFP28，PCIe适配器，全高\r\n“主机总线适配器：Emulex LPE 12002，双端口8GB光纤通道HBA\r\n预计缩放计划\r\n\r\n通过平衡的云服务器+不同功能的裸机服务器（生产者，备份，存储，应用服务器等），并且需要构建的方法来扩展硬件性能以及位置多样化。',
    introduction:
      'EOSREAL总部位于新加坡，拥有一支来自世界各地的3人团队，如新加坡和澳大利亚;从发达国家到巴基斯坦等新兴国家;法律，大陆法和穆斯林法。\r\n在最初阶段，我有能力在同一阶段成立和监管机构。我们计划在巴基斯坦的伊斯兰堡和澳大利亚的墨尔本设立我们自己的托管服务器和本地的云服务器。',
    contact:
      'Twitter\r\nhttps://twitter.com/EOSREAL_IO\r\nTelegram\r\nhttps://t.me/joinchat/G6-t7RKGUdGWu-Q8MA5IKg\r\nMedium\r\nhttps://medium.com/@EOSREAL_IO\r\nSteemit\r\nhttps://steemit.com/@eosreal-io',
  },
  {
    location: 'New Zealand',
    latitude: -40.900557,
    longitude: 174.885971,
    name: 'EOZNz',
    homepage: 'https://eosnewzealand.com/',
    prerequisites: '7/8',
    nodeLocation: 'New Zealand',
    server:
      '2018年6月3日前：\r\n\r\n实例类型：4 * AMD六核酷睿2.60GHz（24 CPU）（裸机）\r\nCPU：24核心\r\n内存：128G \r\n存储：4T \r\nLinux：ubuntu \r\nn / w带宽：10gps \r\n\r\n2018年6月3日之后的硬件估算扩展计划：\r\n实例类型：2 * Intel Xeon X5670（裸机）\r\nCPU：24核心\r\n内存：128G \r\n存储：4T \r\nLinux：ubuntu \r\nn / w带宽：10gps',
    introduction:
      'EOSNz通过社区的反馈不断完善基础设施，并且致力于开放和创建自由化途径，以便应用程序可以通过经济高效的方式在现实世界中蓬勃发展。',
    contact:
      'Telegram\r\nhttps://t.me/eosnz\r\nMedium\r\nhttps://medium.com/@info_13409\r\nSteemit\r\nhttps://steemit.com/@eosnz.com',
  },
  {
    location: 'India ',
    latitude: 20.593684,
    longitude: 78.96288,
    name: 'EOS India ',
    homepage: 'https://eosindia.io/',
    prerequisites: '8/8',
    nodeLocation: 'Mumbai, India',
    server:
      '如果EOS India成为BP，则在第一次选举期间，只有一个弹性计算云（EC2）实例将运行主要BP。\r\n\r\n节点1x EC2（x1.32xlarge）\r\n\r\nvCPU 128内核\r\n\r\n内存2TB RAM\r\n\r\n存储（IPFS）2 x 1920GB（SSD）\r\n\r\n网络25千兆\r\n\r\nBP“选举”：\r\n\r\n如果EOS印度被选为Block Producer，则两个Elastic Compute Cloud（EC2）实例将作为完整的EOS节点运行。在主要BP节点发生故障的情况下，辅助BP节点将充当备份并且将成为主节点。在全节点故障的情况下，最小停机时间应是主要优先事项。\r\n\r\n节点2x EC2（x1.32xlarge）\r\n\r\nvCPU 128内核\r\n\r\n内存2TB RAM\r\n\r\n存储（ipfs）2 x 1920GB（SSD）\r\n\r\n网络25千兆',
    introduction: 'EOS India我们的团队汇集了来自各领域领先组织的技术、战略和业务方向的专业知识。',
    contact:
      'Twitter\r\nhttps://twitter.com/indianeagle\r\nFacebook\r\nhttps://www.facebook.com/indianeaglellc/\r\nTelegram\r\nhttps://t.me/eosindiabp\r\nMedium\r\nhttps://medium.com/@venkatapedi\r\nSteemit\r\nhttps://steemit.com/@eosindia',
  },
  {
    location: 'Hong Kong, China',
    latitude: 22.396428,
    longitude: 114.109497,
    name: 'EOSRaychain',
    homepage: 'https://eosraychain.com/',
    prerequisites: '8/8',
    nodeLocation: 'Hong Kong, Singapore, New York',
    server:
      '截至2018年6月3日的技术规格和资源总支出估算：\r\n\r\n我们计划部署一个主服务器和至少两个备份服务器。我们列出的硬件规格是基于社区反馈的动态规模变化\r\n\r\n技术规格：\r\n主服务器：AWS云：32个CPU核心，100GB RAM 100 GB SSD和1G带宽。\r\n备份服务器：阿里云：ecs.sn2ne.large，32个CPU，120GB RAM，100GB固态硬盘，500MB带宽。\r\nAWS Cloud：32个CPU，100GB RAM，100GB固态硬盘，500MB带宽\r\n防御系统：我们有丰富的经验和资源来保护我们免受DDoS / CC黑客攻击。主服务器可以通过智能DNS和负载均衡自动切换到备份服务器节点。\r\n2018年6月3日之后的硬件估算扩展计划：\r\n我们将增加4台服务器到备份节点，并将主节点带宽增加到2G。',
    introduction: 'EOS印度团队汇集了来自各领域领先组织的技术，战略和业务方向的专业知识。',
    contact:
      'Twitter\r\nhttps://twitter.com/EosRaychain\r\nFacebook\r\nhttps://www.facebook.com/EosRaychain\r\nTelegram\r\nhttps://t.me/EosRaychain\r\nSteemit\r\nhttps://steemit.com/@eosraychain',
  },
  {
    location: 'Norway',
    latitude: 60.47202399999999,
    longitude: 8.468945999999999,
    name: 'BitSpace',
    homepage: 'https://bitspace.no/eos/',
    prerequisites: '8/8',
    nodeLocation: 'Norway',
    server:
      '高性能服务器（初步计划）\r\n类型型号\r\n服务器型号Supermicro 1123US-TR4\r\n处理器AMD Epyc 16C/32T 7351P 2.4GHz (2.9GHz) 64M\r\n内存256GB DDR4 2666MHz ECC\r\n硬盘Intel NVMe DC P4500 - 2TB\r\n带宽1Gbps\r\n网络2x1GB NIC\r\n通过扩展继续改善我们基础设施的技术、地理和管辖余量。在性能方面，我们不断进行基准测试，并将继续研究柚子操作系统的技术性能，以阐明区块生产者和子节点的要求。',
    introduction:
      '比特空间（BitSpace）是挪威领先的区块链技术公司，自2013年以来一直是丹尼尔·拉里默（Daniel Larimer，比特股创始人）愿景的有力支持者。在2017年纽约共识会议上，我们很荣幸地获邀参加柚子操作系统发布会，并从那时起就把重点放在了EOSIO上。\r\n\r\n2018年，我们举办了一系列活动、专题介绍、编程马拉松和视频来宣传柚子操作系统。此外，我们正在帮助多家公司过渡到柚子操作系统，积极建设社区并形成合作伙伴关系，以扩大国际规模。\r\n\r\n比特空间是一个成熟的区块链创新网络，在委托权益证明技术方面拥有丰富的知识和经验，通过咨询工作，拥有超过6个月的委托权益证明链，并成为比特股（BitShares）的区块生产商。我们还积极参与比特股和斯蒂姆（Steemit）社区，自2015年以来举办了比特股专题介绍以及2016年首次举办斯蒂姆编程马拉松。目前我们正在测试并运行节点名称为“比特空间”的柚子操作系统节点，我们将继续测试网络环境。\r\n\r\n我们对柚子操作系统实现主流去中心化应用的潜力感到非常兴奋，并且为柚子操作系统建立了比特空间区块生产者，以帮助确保比特空间建立在以下价值观和原则的基础上：个人主权和自主权，自愿联合以及财务和政治自由。',
    contact:
      'Twitter\r\nhttps://www.twitter.com/BitSpaceNetwork\r\nFacebook\r\nhttps://www.facebook.com/bitspace.no\r\nTelegram\r\nhttps://t.me/BitSpaceNetwork\r\nSteemit\r\nhttps://www.steemit.com/@bitspace',
  },
  {
    location: 'Shenzhen, China',
    latitude: 22.543096,
    longitude: 114.057865,
    name: 'eosbidu',
    homepage: 'http://www.esobidu.com/',
    prerequisites: '8/8',
    nodeLocation: 'America',
    server:
      '在6月3日之前，为了维护测试节点服务器的安全性和可靠性，我们将使用两个云服务器来进行块生产。\r\n\r\n主服务器\r\n英特尔Xeon e5-2696 v4@2.20 GHz\r\nCPU:22个vCPU核心\r\n32 GB RAM\r\nSSD:本地PCIe 3.0\r\n网络:1000 Mbps\r\n固态硬盘:2048 GB\r\n备份服务器\r\n英特尔Xeon Platinum 8173 M@2.00 GHz\r\nCPU:28个vCPU核心\r\n64 GB RAM\r\nSSD:本地PCIe 3.0\r\n网络:1000 Mbps\r\n固态硬盘:2048 GB\r\n2018年6月3日之后的计划：\r\n基于EOS未来发展的要求，在6月3日之后，我们将继续满足EOS日益增长的需求，并与知名的区块链解决方案提供商合作，打造一个强大且高度可扩展的裸金属服务器。',
    introduction:
      'EOSbidu基于每日币读自媒体，为区块链项目提供信息、评级服务。我们致力于建立国内一流的区块链咨询评级媒体。通过普及区块链的基本知识，导出原创内容，创建互动社区，孵化区块链项目，我们将打造中国最具影响力和服务的区块链社区。\r\n自2017年4月成立以来，每日币读在微信公众号、微博上获得极高的人气和声誉，截至2018年4月20日，已经积累了超过10万名会员。',
    contact: 'Twitter\r\nhttps://twitter.com/Pink_FloydZAC',
  },
  {
    location: 'England',
    latitude: 52.3555177,
    longitude: -1.1743197,
    name: 'EOS UK',
    homepage: 'https://eosuk.io/',
    prerequisites: '8/8',
    nodeLocation: 'Space Data Centre - Nottingham',
    server:
      '节点生产者服务器\r\n2个HPE ProLiant DL380 Gen10（1个主要1个故障切换）\r\n\r\n建议的启动配置\r\n2个Intel Xeon Gold 6134M处理器3.2 GHz 8核\r\n128GB RAM \r\n512 GB SSD（RAID 1）\r\n\r\n全节点服务器\r\n2个HPE ProLiant DL380 Gen10（1个主要1个故障切换）\r\n\r\n建议的启动配置\r\n2个Intel Xeon Gold 6134M处理器3.2 GHz 8核\r\n64GB RAM \r\n512 GB SSD（RAID 1）',
    introduction:
      'EOS UK坐落于伦敦，创始人Roger John Davies，打算为我区块生成者提供EOS网络上最透明和可靠的节点。\r\n\r\n除了对所有员工的工资合理和标准的运营成本，所有的初始收入将漏斗放回我们的砌块生产基础设施，以确保在弹性极限和达到的性能。\r\n\r\n未来想建立EOS大学，重点开展“下一代”下一代”在计算机科学，政治和经济问题，以及这些学科通过使用Blockchain技术和断词被从根本上改变。\r\n\r\nEOS UK将作为候选团队和区块生产者的一起推动EOS理念，通过聚会，信息发布和协作与商业和学术机构利用网络来造福英国。',
    contact:
      'Twitter\r\nhttps://twitter.com/eosukbp\r\nFacebook\r\nhttps://www.facebook.com/advantaproductions/\r\nSteemit\r\nhttps://steemit.com/@bodget',
  },
  {
    location: 'Singapore',
    latitude: 1.352083,
    longitude: 103.819836,
    name: 'webvr',
    homepage: 'http://www.webvr.pro/',
    prerequisites: '6/8',
    nodeLocation: 'Singapore, China and Japan',
    server:
      '我们使用带有64 GB RAM和128 GB + SSD的AWS 16 Core作为Testnet，我们将运行两个节点：一个用于livenet，另一个用于保留/备份。',
    introduction:
      '这是壹个基于区块链的互动式设计分发WebVR开放社区，人们可以在这里通过WebVR引擎建立自己的去中心化设计工作室及信用体系，比如工业设计，建筑设计，游戏动漫设计，广告设计，网页设计等领域打赏.WebVr团队还将开发和孵化以此模式下的多个“设计网红”，“设计主播”和专心为她们提供流量和运营服务的“经济公司”。\r\n同时设计版权还可进行版权存储，解决版权数字资产的价值交换，IP版权追溯等服务功能。基于Web VR引擎和VR版权库的未来规划，团队可以帮助社区参与者产生更多的VR内容，从而盘活全世界的VR底层数据。\r\n未来，团队将会研发VR链从而满足不同的区块链VR相关DAPP团队和其他VR机构，整个VR链会以POW + POS机制对云渲染，存储和传输进行规划。',
    contact:
      'Twitter\r\nhttps://twitter.com/WebVR_Engine\r\nTelegram\r\nhttps://t.me/WebVREngine\r\nSteemit\r\nhttps://steemit.com/webvr/@webvr/webvr-eos-io',
  },
  {
    location: 'America',
    latitude: 37.09024,
    longitude: -95.712891,
    name: 'SaltBlock',
    homepage: 'https://www.saltblock.io/',
    prerequisites: '8/8',
    nodeLocation: 'Salt Lake City，USA',
    server:
      '测试网当前硬件规格\r\n群集节点- 2x Intel Xeon@2.93Ghz 192GB RAM \r\n共享存储-为每个设备提供12 TB SAS存储（可升级至每个120 TB）\r\n防火墙-吞吐量7.4 Gbps ',
    introduction:
      '大家好，我们是位于美国犹他州盐湖城的盐区块生产者SaltBlock，我们对即将到来的EOS的推出感到非常兴奋，我们想介绍自己并告诉你我们应该如何计划被选为超级节点。\r\n\r\n我们相信EOS将会把区块链和去中心化技术带入主流，不仅因为EOSIO软件是由Block.One创建的，而且还因为我们很幸运能成为其中一部分的令人惊叹的社区。\r\n\r\n我们的使命是将我们的知识和技能转化为积极和可靠的平台，同时通过深思熟虑的行动帮助EOS社区实现伟大的事业。',
    contact:
      'Twitter\r\nhttps://twitter.com/saltblockBP\r\nTelegram\r\nhttps://t.me/EOSPros\r\nSteemit\r\nhttps://steemit.com/@saltblock',
  },
  {
    location: 'Asia, Europe and North America',
    latitude: 45.1888777,
    longitude: -93.8538858,
    name: 'BlockPro.One',
    homepage: 'http://blockpro.one/',
    prerequisites: '8/8',
    nodeLocation: 'India/Singapore/US',
    server:
      '区块链和块生产\r\n在BlockPro.One，我们通过构建区块链的到来感到非常兴奋，并且正在构建新的未来。让全世界成为更安全的玩家。\r\n\r\nDApps和智能合约\r\n我们构建智能应用程序，照顾未来的需求新一代并支持去中心化自治组织，它们构建了社区需要的东西。\r\n\r\n运营管理\r\n高度冗余的处理器架构，存储阵列和高速/高带宽连接，并具有防篡改保护构成我们数据中心架构的核心。',
    introduction: 'Steemit\r\nhttps://steemit.com/@blockpro',
  },
  {
    location: 'Wenzhou, China',
    latitude: 27.993828,
    longitude: 120.699361,
    name: 'EOSWenzhou',
    homepage: 'http://www.eoswz.com',
    prerequisites: '8/8',
    nodeLocation: 'China , Hong Kong , United States, Japan , Singapore',
    server:
      '主服务器\r\nCPU：24个vCPU 48 GB Intel Xeon E5-2682v4 2.5 GHz\r\n内存：96GB\r\nSSD：仅限EBS\r\n网络：1,000 Mbps\r\nSSD：4096GB\r\n备份服务器\r\nCPU：16个vCPU Intel Xeon Platinum 8163 2.5 GHz\r\n内存：32GB\r\nSSD：仅限EBS\r\n网络：1,000 Mbps\r\nSSD：1024GB\r\n（A）群集节点\r\nCPU：Intel Xeon（Skylake）Platinum 8163 96内核\r\nRAM：4TB\r\nSSD：4TB\r\n网络：10 Gbps\r\n防火墙-吞吐量7.4Gbps\r\n共享存储EBS存储\r\nEBS IOPS\r\n32,000 IOPS\r\n预计每月成本：7000美元\r\n（B）共享存储EBS存储\r\nSSD：500 TB\r\nEBS IOPS\r\n32,000 IOPSCPU：24个vCPU 48 GB Intel Xeon E5-2682v4 2.5 GHz\r\n内存：48GB\r\nSSD：仅限EBS\r\n网络：1,000 Mbps\r\nSSD：1024GB\r\n备用服务器\r\nCPU：16个vCPU Intel Xeon Platinum 8163 2.5 GHz\r\n内存：32GB\r\nSSD：仅限EBS\r\n网络：1,000 Mbps\r\nSSD：1024GB',
    introduction:
      'EOS温州是一个成立于2017年10月份的社区，我们是最早接触区块链技术及EOS.IO技术团队和爱好者，目前拥有核心团队10人，运营团队15人。\r\n\r\n我们的愿景\r\n\r\n温州人具有艰苦奋斗的创业精神，闯荡天下、四海为家的开拓精神，善于创新的创造精神。当前约有300万温州商人分布在全世界，我们将支持和促进EOS.IO分布式生态系统软件成功，同时依托及沟通全世界温商，利用我们在温商当中的极大影响力优势，将金融,跨境汇款,借贷,债券,轻工业,制造业,物流,电商,物联网等产业,进行区块链升级，以利用区块链为实体经济服务为宗旨，建设一个更美好的区块链3.0的未来。\r\n\r\n社区的优势\r\n\r\n1.EOS温州拥有多名多年经验的网络安全,系统安全，网络结构专家，系统运维,区块链开发工程师，在区块链领域，开发过相关应用的底层架构设计、技术整合以及系统优化等研发方面的工作，具有丰富丰富的经验。\r\n\r\n2.为EOS区块链贡献可靠和可扩展的高配置服务器,双机热备，自动预警，全天候值守等设施，确保最高性能以及最安全的络条件，最稳定的运营维护，以及灾备方案。\r\n\r\n3.可迅速整合社区，联合账户产品、区块链咨询平台、DAPP开发团队等服务完善EOS社区，并向业内外推广EOS社区，扩大社区影响力，让更多人了解区块链及EOS.IO项目的现状以及发展方向。\r\n\r\n4.重视诚信、开明、透明化和多元化，我们定期公布运营情况及相关技术报告，组织开放日活动，并努力与EOS其他超级节点、现有/未来的加密货币投资者，DAPP开发商以及对EOS感兴趣的组织/公司积极沟通。',
    contact:
      'Twitter\r\nhttps://twitter.com/eoswenzhou\r\nTelegram\r\nhttps://t.me/EOSwenzhouofficial\r\n微信公众号\r\nEOSWENZHOU\r\nSteemit\r\nhttps://steemit.com/@eos.wenzhou',
  },
  {
    location: 'USA',
    latitude: 37.09024,
    longitude: -95.712891,
    name: 'BitcoinGod',
    homepage: 'https://eos.bitcoingod.org/',
    prerequisites: '6/8',
    nodeLocation: 'Western United States (Northern California)',
    server:
      '服务器类型：\r\nCPU：Intel Xeon 2.5G 8核心\r\n内存：24G DDR4 \r\n存储：384G SSD \r\n由于EOS正在数字化优化，我们将继续跟进EOS的最新调整，以优化我们的服务器配置。',
    introduction:
      '我们要创建一个安全，稳定和高效的EOS民主节点。\r\n\r\n我们是一个热心公益事业的技术小组，致力于建立一个基于EOS的民主，开放和透明的公益社区我们相信并投资于我们的激情，我们相信并投资于激情。\r\n\r\n知识和信念，让我们为EOS平台及其社区做出积极贡献，并且相信EOS社区将成为公益事业的典范。',
    contact: 'Twitter\r\nhttps://twitter.com/BitcoinGodOrg\r\nSteemit\r\nhttps://steemit.com/@bitcoingod2018',
  },
  {
    location: 'Guangzhou, Guangdong, China',
    latitude: 23.12911,
    longitude: 113.264385,
    name: 'SuperONE',
    homepage: 'https://superone.io/',
    prerequisites: '8/8',
    nodeLocation: 'China, Hong Kong, Japan, Korea, Canada, etc.',
    server:
      '169/5000\r\n区块节点：64个核心256G内存1T SSD硬盘* 2组，在Hot-Warm状态下，能够快速切换\r\nAPI节点：64核心256G内存1T SSD硬盘* 1套',
    introduction:
      'SuperONE项目发起人（社区ID：crazybit）是区块链领域的高级参与者，侧重于区块链领域的管理流程和审美流程，重点关注区块链评估和bistShares社区，并对石墨烯的内核进行了深入研究，作为社区领先的开发团队，SuperONE（superone.io）账户的开发旨在满足商业应用的实用性和便利性需求，为用户提供更安全，更多透明，分散的上链式交易和数字资产管理平台。',
    contact:
      'GitHub\r\nhttps://github.com/superoneio\r\nTwitter\r\nhttps://twitter.com/superoneio\r\nFacebook\r\nhttps://www.facebook.com/superoneio\r\nMedium\r\nhttps://medium.com/@superoneio\r\nSteemit\r\nhttps://steemit.com/@superoneio',
  },
  {
    location: 'the Netherlands',
    latitude: 52.132633,
    longitude: 5.291265999999999,
    name: 'EOSVibes',
    homepage: 'https://www.eosvibes.io/',
    prerequisites: '8/8',
    nodeLocation: 'Amsterdam, Frankfurt, Dublin, Ireland.',
    server:
      '我们主要的服务器：\r\n1个Intel四核至强E5-1620v4 \r\n\r\n惠普DL120G9 \r\n\r\n1个4核心\r\n\r\n32GB DDR4内存\r\n\r\n4x2TB SATA2 \r\n\r\n无限流量，保证带宽\r\n\r\n我们的法兰克福备用专用服务器\r\nHP DL180G6 \r\n\r\n2x 4核心\r\n\r\n32GB DDR3内存\r\n\r\n8x2TB SATA2',
    introduction:
      "大家好！\r\n我们是EOSVibes - ''Dapp发展''EOS Block制片人候选人。\r\n\r\n我们是谁生活在一个不同的世界各地的地方有才华，上进和创意blockchain爱好者的多元化团队。EOSVibes是一种荣誉和名誉为基础的组织，我们已经创建了我们宪法的初稿，并使其开源社区输入在GitHub上。\r\n我们的使命是为EOS社区创造持续的价值。\r\n\r\nEOSVibes承诺：\r\n以最佳方式保护EOS区块链，同时保护在EOS.IO之上创建和部署具有真实世界用例的新Dapp我们的第一个Dapp团队通过免费的Airdrop向所有EOS token持有者发布（在EOS区块链启动后的90天内）;\r\n\r\n通过EOS Vibes创建的所有未来Dapps将遵循类似的模式空投，这将给整个EOS社区建设EOS供电 token 的投资组合的机会。\r\n\r\nEOSVibes还将公布来自EOS社区的新Dapp创意，让每个人都有机会将他们梦想到Dapp上发展。",
    contact:
      'Twitter\r\nhttps://twitter.com/eosvibes_bp\r\nTelegram\r\nhttps://t.me/EOSVibes\r\nSteemit\r\nhttps://steemit.com/@eosvibes',
  },
  {
    location: 'the Netherlands',
    latitude: 52.132633,
    longitude: 5.291265999999999,
    name: 'EOS Amsterdam',
    homepage: 'http://www.eosamsterdam.net/',
    prerequisites: '8/8',
    nodeLocation: 'Amsterdam',
    server:
      '作为EOS阿姆斯特丹，我们的目标是通过在第二阶段不使用任何流行的云托管平台来避免集中化。在第一阶段，当软件仅使用一个CPU内核时，我们将使用Google Cloud Platform来确定未来的大小。\r\n\r\nAM3阿姆斯特丹IBX数据中心：\r\nEquinix IBX AM3承载Equinix Cloud Exchange和NL-IX的AMS-IX。它与Vancis和NIKHEF连接，提供对数百个网络的访问。AM3还通过Metro Connect与阿姆斯特丹东南校区和AM6，AM8相连。它位于阿姆斯特丹科学园阿姆斯特丹史基浦机场19公里处。\r\n\r\nAM7阿姆斯特丹IBX数据中心：\r\nAM7将客户与Equinix不断扩大的云服务提供商，网络运营商，金融服务机构和企业客户的生态系统相互连接，提供新的业务前景和机会。AM7提供卓越的能源效率，减少对环境的影响并提高运营效率。',
    introduction: 'EOS Amsterdam我们位于阿姆斯特丹，一个拥有受过良好教育，拥有自由和国际化的人口的繁荣城市。',
    contact:
      'Twitter\r\nhttps://twitter.com/eosamsterdam\r\nTelegram\r\nhttps://t.me/eosamsterdam\r\nSteemit\r\nhttps://steemit.com/@eosamsterdam',
  },
  {
    location: 'the Netherlands',
    latitude: 52.132633,
    longitude: 5.291265999999999,
    name: 'RoelandP',
    homepage: 'https://roelandp.nl/eos',
    prerequisites: '6/8',
    nodeLocation: 'USA, Canada, France, Germany and The Netherlands.',
    server:
      '主节点-专用框：\r\n64 GB RAM、500 GB SSD、12个核心、地理位置1 \r\n备份节点-专用框：\r\n64 GB RAM、500 GB SSD、12个核心、地理位置2 \r\n种子节点-专用盒子：\r\n64 GB RAM、2 TB硬盘、8个核心、地理位置3 \r\n监控交换密钥和管理任务的节点：\r\n大多数时候VPS（轻客户端）地理位置4 ',
    introduction:
      '我们将为EOS运行一个区块生产者服务器，并因此要竞选EOS的超级节点。自从我3年前接触石墨烯/区块链以来，我对软件和开发者社区的易用性感到沉迷。\r\n现在住在阿姆斯特丹，是一个狂热的风筝冲浪者，组织活动是一个维嘉的父亲和在风车上出生并长大，在这里了解更多关于我个人生活的信息。',
    contact:
      'GitHub\r\nhttps://github.com/roelandp\r\nTwitter\r\nhttps://twitter.com/roelandp\r\nSteemit\r\nhttps://steemit.com/@roelandp',
  },
  {
    location: 'Hong Kong, China',
    latitude: 22.396428,
    longitude: 114.109497,
    name: 'BlockCC',
    homepage: 'https://eos.block.cc/',
    prerequisites: '8/8',
    nodeLocation: 'Hong Kong',
    server:
      'CPU：Intel Xeon 3.2G 4核\r\n\r\n内存：32克DDR4\r\n\r\n存储：120G SSD\r\n\r\n配置将根据最新的EOS更新进行动态修改。',
    introduction:
      'Block.CC是一个致力于开发区块链服务的团队，使用户能够更轻松，更可靠地在各个领域使用区块链技术。我们提供与区块链相关的技术和数据服务，我们致力于挖掘用户需求，解决用户的痛点，通过区块链技术全面提升用户体验。我们建立了区块链数据社区，希望社区的所有参与者都能体验区块链技术的透明性，开放性和安全性。',
    contact: 'Twitter\r\nhttps://twitter.com/block_cc\r\nSteemit\r\nhttps://steemit.com/@blockcc',
  },
  {
    location: 'America',
    latitude: 37.09024,
    longitude: -95.712891,
    name: 'EOS Silicon Valley',
    homepage: 'http://www.eossv.io/',
    prerequisites: '8/8',
    nodeLocation: 'Oregon, USA\\nVirginia, USA',
    server:
      '我们的每个m5.4xlarge实例的规格如下所示：\r\n*高达10GB的网络带宽\r\n* 16个vCPU\r\n* 64G RAM\r\n* 512G SSD存储\r\n\r\n在主网启动之前，我们将扩大我们的基础设施，以充分准备好生产。我们现在还没有准确的预测结果，但我们将继续与EOS社区合作来弄清楚。但是，我们计划对基础架构进行压力测试，至少可以在不到半小时的时间内扩展到500 m5.4xlarge的实例（或等同物）。总的来说，这相当于：\r\n* 8,000个vCPU\r\n* 32T RAM\r\n* 256T SSD存储\r\n* 8,000个vCPU\r\n* 32T RAM\r\n* 256T SSD存储',
    introduction:
      'EOS Silicon Valley，是位于硅谷的EOS爱好者团队，在技术，产品，营销和运营方面拥有丰富的专业知识。\r\n\r\n凭借我们在技术人才以及社区资源和影响力方面的出色表现，我们希望成为21个区块生产商之一，协助在main net中启动EOS，并使分散式应用程序更易于使用和实用！',
    contact:
      'Twitter\r\nhttps://twitter.com/EOS_SV\r\nTelegram\r\nhttps://t.me/eossv\r\nMedium\r\nhttps://medium.com/@eossiliconvalley\r\nSteemit\r\nhttps://twitter.com/EOS_SV',
  },
  {
    location: 'US and India ',
    latitude: 28.5975663,
    longitude: 77.1880475,
    name: 'EOSLove',
    homepage: 'http://eoslove.io/',
    prerequisites: '8/8',
    nodeLocation: 'Singapore and US',
    server:
      'Active Block Producer：m5.4xlarge，16核CPU，64GB RAM和300GB HD（美国东部）\r\nStandby Block Producer：m5.4xlarge，16核cpu，64GB RAM和300GB HD（东南亚）\r\n\r\n我们估计在发布期间至少需要64核心CPU升级和1 TB RAM以及4 TB硬盘。\r\n\r\n我们在6月3日以后，扩展计划包括将我们的新加坡和美国西海岸的数据处理中心，迁移到我们的配置设施中，配备128个核心CPU，2 TB内存，8 TB硬盘和10 GB带宽配置的高端服务器。',
    introduction:
      'EOSLOVE决定致力于改善社会，让我们看到不平等和不公正持续存在的各行各业。在过着合理的生活，达到了我们的职业生涯高峰期后，我们满意地回报社会，为改善人民群众做好技术工作，这是我们工作满意度在我们生活的这一点上所取得的成就。\r\n\r\nEOS基于生命，自由和财产价值以及技术背后的原则构建的原则呼吁我们作为将我们的使命推进主流的合适工具。对于我们需要在我们的社会效益努力中展示的透明度和敏捷性，区块链可能没有更好的机制。\r\n\r\n有了这个作为我们人生愿望的基础，我们正在通过以最有效和最具成本效益的方式提供真正需要的帮助，开始改变世界的旅程。我们的团队来自各种各样的背景和文化/国界，这将为我们提供一个独特的视角，看看如何解决各种文化和国家社会众多不同部门的各种问题。',
    contact: 'Twitter\r\nhttp://twitter.com/@eoslove_io\r\nSteemit\r\nhttps://steemit.com/@eoslove',
  },
  {
    location: 'Bangkok',
    latitude: 13.7563309,
    longitude: 100.5017651,
    name: 'eos.fish',
    homepage: 'https://eos.fish/',
    prerequisites: '8/8',
    nodeLocation: 'Bangkok, Beijing, Hong Kong, Los Angeles',
    server: '122core/128 GB RAM/ 600 MB SSD8 with RAID 6 + 1.2 GB*8 also\r\nRAID 6',
    introduction:
      'eos.fish团队来自泰国曼谷，是由一群经验丰富的加密货币拥护者和区块链信仰者组成，均为区块链行业内的专家。\r\neos.fish将高端硬件与下一代技术紧密结合,打造一个全球化和充满活力的社区，与EOS爱好者共建我们的未来！\r\neos.fish致力于在以下领域发展基于区块链的创新：财务，跨境社区，技术，物流，高级硬件。\r\n\r\nWe are eos.fish from Bangkok, Thailand, our founders comprise an experienced team of crypto advocates and blockchain believers, with an abundance of expertise.\r\neos.fish combines high-end hardware with next level technology. We are creating a global and fun community, together we will build our future!\r\nEos.fish aims to develop blockchain-based innovations in: Finance, Cross-border communities, Technologies, Logistics, Premium hardware.',
    contact:
      'Twitter\r\nhttps://twitter.com/eosfish\r\nTelegram\r\nhttps://t.me/eosfish_en\r\nSteemit\r\nhttps://steemit.com/eos/@hibitfish/eos-fish-e',
  },
];
export default blockProducersList;
