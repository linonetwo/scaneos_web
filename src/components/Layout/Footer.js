// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Layout, Modal } from 'antd';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import breakpoint from 'styled-components-breakpoint';

import 微信公众号 from './微信公众号.jpg';
import 运营个人微信号 from './运营个人微信号.jpg';
import 知识星球 from './知识星球.png';

const FooterContainer = styled.div`
.ant-layout-footer {
  background-color: #333;
  color: white;
  ${breakpoint('desktop')`
    display: flex;
  `};
}
`;
const FooterItem = styled(Flex)`
margin-bottom: 20px;
${breakpoint('desktop')`
width: 300px;
margin-right: 20px;
`};
`;
const Introduction = styled(Flex)``;
const ContactLinks = styled(Flex)`
& div {
  margin-top: 15px;
  margin-bottom: 5px;
  & span {
    color: #3498db;
    cursor: pointer;
  }
}
`;
const ContactImage = styled.img`
width: 100%;
object-fit: contain;
object-position: center;
font-family: 'object-fit: contain; object-position: center;';
`;

const FooterTitle = styled.h3`
color: white;
border-bottom: 1px dotted white;
`;
const TitleDecorator = styled(Flex)`
width: 100%;
border-bottom: 1px solid #3498db;
margin-bottom: -1px;
width: fit-content;
`;
const FriendLinks = styled(Flex)`
height: unset;
${breakpoint('desktop')`
  height: 130px;
  width: 300px;
`};
`;
const FriendLink = styled.a`
color: white;
margin: 5px 0;
`;
const friendLinks = [
{ name: 'EOSStore', homepage: 'http://www.eos.store/' },
{ name: 'EOS Asia', homepage: 'https://www.eosasia.one/' },
{ name: 'Huobi Pool', homepage: 'http://www.eoshuobipool.com/' },
{ name: 'EOS CANNON', homepage: 'https://eoscannon.io' },
{ name: 'EOS Gravity', homepage: 'http://eosfans.one/' },
{
  name: 'EOS Argentina ',
  homepage: 'https://www.eosargentina.io/',
},
{ name: 'eosONO', homepage: 'https://www.ono.chat/eos/' },
{ name: 'EOS Canada', homepage: 'https://www.eoscanada.com/' },
{ name: 'EOSBeijing', homepage: 'http://www.eosbeijing.one/' },
{ name: 'EOS UK', homepage: 'https://eosuk.io/' },
{ name: 'EOSeoul', homepage: 'http://eoseoul.io/' },
{ name: 'EOS TEA', homepage: 'https://node.eosfans.io/' },
];

class Footer extends Component<{ t: Function }, *> {
  state = {
    knowledgePlanetModelOpen: false,
    weixinModelOpen: false,
  };
  render() {
    return (
      <FooterContainer>
        <Modal
          title="知识星球"
          visible={this.state.knowledgePlanetModelOpen}
          onOk={() => this.setState({ knowledgePlanetModelOpen: false })}
          onCancel={() => this.setState({ knowledgePlanetModelOpen: false })}
        >
          <ContactImage src={知识星球} alt="scanEOS社区的知识星球" />
        </Modal>
        <Modal
          title="微信"
          visible={this.state.weixinModelOpen}
          onOk={() => this.setState({ weixinModelOpen: false })}
          onCancel={() => this.setState({ weixinModelOpen: false })}
        >
          <h4>微信公众号</h4>
          <ContactImage src={微信公众号} alt="scaneos社区的微信公众号" />
          <h4>运营个人微信号</h4>
          <ContactImage src={运营个人微信号} alt="scaneos社区的运营个人微信号" />
        </Modal>
        <Layout.Footer>
          <FooterItem column>
            <FooterTitle>
              <TitleDecorator>{this.props.t('introduction')}</TitleDecorator>
            </FooterTitle>
            <Introduction>{this.props.t('webSiteIntroduction')}</Introduction>
            <Link to="/about/">{this.props.t('moreAboutScanEOS')}</Link>
          </FooterItem>
          <FooterItem column>
            <FooterTitle>
              <TitleDecorator>{this.props.t('contactUs')}</TitleDecorator>
            </FooterTitle>
            {this.props.t('locale') === 'zh' ? (
              <ContactLinks column>
                <div>
                  知识星球:{' '}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={() => this.setState({ knowledgePlanetModelOpen: true })}
                    onKeyDown={() => this.setState({ knowledgePlanetModelOpen: true })}
                  >
                    scanEOS社区
                  </span>
                </div>
                <div>
                  微信:{' '}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={() => this.setState({ weixinModelOpen: true })}
                    onKeyDown={() => this.setState({ weixinModelOpen: true })}
                  >
                    scaneos社区
                  </span>
                </div>
                <div>
                  Telegram:{' '}
                  <a href="https://t.me/scaneos" target="_black" rel="noopener noreferrer">
                    scanEOS
                  </a>
                </div>
                <div>邮箱: support@scaneos.io</div>
              </ContactLinks>
            ) : (
              <ContactLinks column>
                <div>
                  Telegram:{' '}
                  <a href="https://t.me/scaneos" target="_black" rel="noopener noreferrer">
                    scanEOS
                  </a>
                </div>
                <div>
                  Twitter:{' '}
                  <a href="https://twitter.com/scan_eos" target="_black" rel="noopener noreferrer">
                    scanEOS
                  </a>
                </div>
                <div>
                  Facebook:{' '}
                  <a href="https://www.facebook.com/eos.scan.397" target="_black" rel="noopener noreferrer">
                    ScanEos
                  </a>
                </div>
                <div>Steemit: scanEOS</div>
                <div>email: support@scaneos.io</div>
              </ContactLinks>
            )}
          </FooterItem>
          <FooterItem column>
            <FooterTitle>
              <TitleDecorator>{this.props.t('FriendLinks')}</TitleDecorator>
            </FooterTitle>
            <FriendLinks column wrap="true">
              {friendLinks.map(({ name, homepage }) => (
                <FriendLink key={name} href={homepage} target="_black" rel="noopener noreferrer">
                  {name}
                </FriendLink>
              ))}
            </FriendLinks>
          </FooterItem>
        </Layout.Footer>
      </FooterContainer>
    );
  }
}
export default translate()(Footer);
