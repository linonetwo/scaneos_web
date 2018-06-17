/* eslint-disable no-control-regex */
// @flow
import { find } from 'lodash';
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { translate } from 'react-i18next';
import { Input } from 'antd';
import abi from 'ethereumjs-abi';
import web3 from 'web3';
import { Link } from 'react-router-dom';

import { postEOS } from '../../API.config';
import type { AccountData } from '../../store/account';

const InputGroup = styled(Flex)`
  height: 80px;
  width: 100%;
  margin: auto;
`;
const Result = styled(Flex)`
  width: 100%;
  overflow: hidden;
  & span {
    white-space: pre;
    font-family: 'Courier New', Courier, monospace;
  }
`;

async function getEOSAddressByETHAddress(ethAddress: string) {
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
  const EOSAddress = web3.utils.toAscii(rpcResult[0].result).replace(/[\u0000\u00005\s]/gu, '');
  return EOSAddress;
}
async function getEOSOwnerAddressByEOSAccount(account: string) {
  const data: AccountData = await postEOS('/chain/get_account', { account_name: account });
  return find(data.permissions, { permName: 'owner' })?.requiredAuth?.keys?.[0]?.key;
}

class ABIQueryInputs extends Component<{ t: Function }, *> {
  state = {
    ethAddress: '',
    eosAddress: '',
    eosAccount: '',
    accountOwnerAddress: '',
  };

  checkEOSAddressHasAccount = (ethAddress: string) => {
    if (ethAddress) {
      getEOSAddressByETHAddress(ethAddress).then(eosAddress => this.setState({ eosAddress }));
    }
    if (this.state.eosAccount) {
      getEOSOwnerAddressByEOSAccount(this.state.eosAccount).then(accountOwnerAddress =>
        this.setState({ accountOwnerAddress }),
      );
    }
  };

  render() {
    return (
      <Fragment>
        <InputGroup column justifyBetween>
          <Input
            value={this.state.eosAccount}
            placeholder={`EOS ${this.props.t('account')}`}
            onChange={(event: SyntheticInputEvent<*>) => {
              const eosAccount = event.target.value;
              this.setState({ eosAccount });
            }}
          />
          <Input.Search
            size="large"
            placeholder={this.props.t('ethaddress')}
            value={this.state.ethAddress}
            onChange={(event: SyntheticInputEvent<*>) => {
              const ethAddress = event.target.value;
              this.setState({ ethAddress });
            }}
            enterButton
            onSearch={this.checkEOSAddressHasAccount}
          />
        </InputGroup>
        <Result column>
          <span>
            {this.state.eosAddress && `${this.props.t('eosaddress')}: `}
            <Link to={`/address/${this.state.eosAddress}`}>{this.state.eosAddress}</Link>
          </span>
          <span>
            {this.state.accountOwnerAddress && `${this.props.t('owner')}: `}
            <Link to={`/address/${this.state.accountOwnerAddress}`}>{this.state.accountOwnerAddress}</Link>
          </span>
          <span>
            {this.state.accountOwnerAddress &&
              this.state.accountOwnerAddress === this.state.eosAddress &&
              `${this.props.t('mappingCheckingPassed')}: `}
            {this.state.accountOwnerAddress &&
              this.state.accountOwnerAddress === this.state.eosAddress && (
                <Link to={`/account/${this.state.eosAccount}`}>{this.state.eosAccount}</Link>
              )}
          </span>
        </Result>
      </Fragment>
    );
  }
}

export default translate(['translations', 'mappingChecking'])(ABIQueryInputs);
