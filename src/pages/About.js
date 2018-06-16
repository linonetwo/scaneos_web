// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { translate, Trans } from 'react-i18next';

const Container = styled.div`
  overflow-x: hidden;
  color: #333;
`;
const Content = styled(Flex)`
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 10px 0 rgba(7, 17, 27, 0.05);
  width: 90vw;
`;
const ContentTitle = styled.h2`
  text-align: center;
`;

class About extends Component<{ t: Function }, *> {
  state = {};
  render() {
    const { t } = this.props;
    return (
      <Container>
        <Content column>
          <ContentTitle>{t('thisSite')}</ContentTitle>
          <Trans i18nKey="aboutThisSite">
            <p>Scan EOS 是一个区块链浏览器，也是一个关于 EOS 的数据分析平台。</p>
            <p>
              区块链浏览器是浏览区块链信息的主要窗口，例如 Scan EOS 就可以浏览 EOS
              每一个区块内包含的信息，也能直接搜索与自己有关的交易和账户。这些数据对于工作、投资与 EOS
              相关的人，非常关键。
            </p>
            <p>
              除了基本的区块数据、交易数据以外，Scan EOS 还将允许你查看更多种类的聚合数据，通过图表洞察 EOS
              社区的动向，从而能为 EOS 相关的产品设计、价值投资收集第一手的参考数据。
            </p>
          </Trans>
        </Content>
        <Content column>
          <ContentTitle>{t('EOS')}</ContentTitle>
          <Trans i18nKey="aboutEOS">
          <p>我们所关注的 EOS 是一个先进的分布式智能合约平台。</p>
          <p>
            EOS (Enterprise Operation System)
            是由Block.one公司主导开发的一种全新的基于区块链智能合约平台，旨在为高性能分布式应用提供底层区块链平台服务。EOS
            项目由 Daniel Larimer（人称BM）主导，继承了 BitShares 和 Steemit 的成功经验，因此 EOS
            在效率和安全性中找到了很好的平衡，可以高效运行多样化的去中心化应用（DAPP）。
          </p>
          </Trans>
        </Content>
      </Container>
    );
  }
}
export default translate()(About);
