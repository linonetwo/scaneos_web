// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { translate } from 'react-i18next';
import { Input, Icon } from 'antd';
import abi from 'ethereumjs-abi';
import web3 from 'web3';
import { Link } from 'react-router-dom';

import { Title as ATitle } from './OverviewList/styles';

const Container = styled(Flex)`
  height: 250px;
  padding: 20px;

  width: 90vw;
  margin: 30px auto 0;
  ${breakpoint('desktop')`
    width: 500px;
    margin: 30px 0 0;
  `};

  background-color: white;

  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.05);
`;
const Title = styled(ATitle)``;
const Result = styled.div`
  width: 100%;
  overflow: hidden;
`;

async function checkEOSRegister(ethAddress: string) {
  const encoded: Buffer = abi.simpleEncode('keys(address):(string)', ethAddress);
  const rpcResult = await fetch('https://api.myetherapi.com/eth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      {
        id: 'fd0be04dab48395cc0051f6b32629331',
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [
          {
            to: '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf',
            data: `0x${encoded.toString('hex')}`,
          },
          'pending',
        ],
      },
    ]),
  }).then(res => res.json());
  if (rpcResult.length < 1 || !rpcResult[0].result) throw new Error('No Data.');
  const EOSAddress = web3.utils.toAscii(rpcResult[0].result).replace(/[^0-9a-zA-Z]/g, '');
  return EOSAddress;
}

class MappingChecking extends Component<{ t: Function }, *> {
  state = {
    ethAddress: '0x5af33b044fc0b24758552a2b3efb8b27bb06b038',
    eosAddress: '',
  };

  onInputChange = (event: SyntheticInputEvent<*>) => {
    const ethAddress = event.target.value;
    this.setState({ ethAddress });
  };

  render() {
    return (
      <Container column alignCenter justifyBetween>
        <Title justifyBetween alignCenter>
          <span>
            <Icon type="check-square-o" /> {this.props.t('MappingChecker')}
          </span>
        </Title>
        <Input.Search
          size="large"
          placeholder={this.props.t('ethaddress')}
          value={this.state.ethAddress}
          onChange={this.onInputChange}
          enterButton
          onSearch={async ethAddress => {
            if (!ethAddress) return;
            const eosAddress = await checkEOSRegister(ethAddress);
            this.setState({ eosAddress });
          }}
        />
        <Result>
          {this.state.eosAddress && `EOS ${this.props.t('address')}: `}
          <Link to={`/address/${this.state.eosAddress}`}>{this.state.eosAddress}</Link>
        </Result>
      </Container>
    );
  }
}

export default translate()(MappingChecking);
