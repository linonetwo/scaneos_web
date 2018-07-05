// @flow
import React, { Component } from 'react';
import { Form, Input, Button, Menu, Switch } from 'antd';
import { translate } from 'react-i18next';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { postEOS } from '../../API.config';

const FormItem = Form.Item;

type Props = {
  t: Function,
  eosAccount: Object,
};

const FormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const BlockPage = styled(Flex)`
  min-height: calc(70vh - 64px);
  background-color: #fff;
  margin-top: -16px;
`;

const BlockMenu = styled(Menu)`
  width: 256px;
`;

const BlockLayout = styled.div`
  padding: 10px;
`;

class DelegateAccount extends Component<{ form: Object }> {
  handelSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
    } = this.props;

    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const {
          store: { dispatch },
        } = await import('../../store');
        const {
          eosAccount: { name: eosAccount, authority: eosAuth },
        } = this.props;
        try {
          const res = await window.eosClient.transaction(tr => {
            tr.delegatebw(
              {
                from: eosAccount,
                receiver: values.name,
                stake_net_quantity: `${Number(values.net)
                  .toFixed(4)
                  .toString()} EOS`,
                stake_cpu_quantity: `${Number(values.cpu)
                  .toFixed(4)
                  .toString()} EOS`,
                transfer: values.transfer ? 1 : 0,
              },
              { authorization: [{ actor: eosAccount, permission: eosAuth }] },
            );
          });
          dispatch.info.displayNotification('创建成功');
        } catch (error) {
          dispatch.info.displayNotification(JSON.stringify(error));
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handelSubmit}>
        <FormItem label="Recepient" {...FormItemLayout}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="The account that receives the EOS" id="name" />)}
        </FormItem>
        <FormItem label="Sender" {...FormItemLayout}>
          {getFieldDecorator('creator', {
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="Attach an Account" id="creator" />)}
        </FormItem>
        <FormItem label="Net Stake (in EOS)" {...FormItemLayout}>
          {getFieldDecorator('net', {
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="How much EOS to stake" id="net" type="number" />)}
        </FormItem>
        <FormItem label="CPU Stake (in EOS)" {...FormItemLayout}>
          {getFieldDecorator('cpu', {
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="How much EOS to stake" id="cpu" type="number" />)}
        </FormItem>
        <FormItem label="Transfer" {...FormItemLayout}>
          {getFieldDecorator('transfer')(<Switch id="transfer" />)}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <p>
            By executing this action you are agreeing to the EOS constitution and this actions associated ricardian
            contract.
          </p>
        </FormItem>
      </Form>
    );
  }
}

class UndelegateAccount extends Component<{ form: Object }> {
  handelSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
    } = this.props;

    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const {
          store: { dispatch },
        } = await import('../../store');
        const {
          eosAccount: { name: eosAccount, authority: eosAuth },
        } = this.props;
        try {
          const res = await window.eosClient.transaction(tr => {
            tr.undelegatebw(
              {
                from: eosAccount,
                receiver: values.name,
                unstake_net_quantity: `${Number(values.net)
                  .toFixed(4)
                  .toString()} EOS`,
                unstake_cpu_quantity: `${Number(values.cpu)
                  .toFixed(4)
                  .toString()} EOS`,
              },
              { authorization: [{ actor: eosAccount, permission: eosAuth }] },
            );
          });
          dispatch.info.displayNotification('创建成功');
        } catch (error) {
          dispatch.info.displayNotification(JSON.stringify(error));
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handelSubmit}>
        <p>Unstaking takes three days. Unstaking lowers your vote weight immediately</p>
        <FormItem label="Stake Holder" {...FormItemLayout}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="Who currently holds the stake" id="name" />)}
        </FormItem>
        <FormItem label="Stake Owner" {...FormItemLayout}>
          {getFieldDecorator('creator', {
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="Scatter account" id="creator" />)}
        </FormItem>
        <FormItem label="Net Unstake (in EOS)" {...FormItemLayout}>
          {getFieldDecorator('net', {
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="How much EOS to unstake" id="net" type="number" />)}
        </FormItem>
        <FormItem label="CPU Unstake (in EOS)" {...FormItemLayout}>
          {getFieldDecorator('cpu', {
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="How much EOS to unstake" id="cpu" type="number" />)}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <p>
            By executing this action you are agreeing to the EOS constitution and this actions associated ricardian
            contract.
          </p>
        </FormItem>
      </Form>
    );
  }
}

const Components = [Form.create()(DelegateAccount), Form.create()(UndelegateAccount)];
// const UndelegateAccountComponent = Form.create()(DelegateAccount);
// const BuyramComponent = Form.create()(DelegateAccount);
// const SellramComponent = Form.create()(DelegateAccount);
// const RefundComponent = Form.create()(DelegateAccount);
// const PermissionsComponent = Form.create()(DelegateAccount);

class BlockProducer extends Component<Props> {
  state = {
    componentsIndex: 0,
  };

  handleClick = event => {
    const { key } = event;
    this.setState({
      componentsIndex: key,
    });
  };

  render() {
    const { eosAccount } = this.props;
    const { componentsIndex } = this.state;
    const BlockComponent = Components[componentsIndex - 1] || Components[0];
    return (
      <BlockPage>
        <BlockMenu defaultSelectedKeys={['1']} mode="inline" onClick={this.handleClick}>
          <Menu.Item key="1">
            <span>Delegate Account(Stake)</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span>Undelegate Account(Unstake)</span>
          </Menu.Item>
        </BlockMenu>
        <BlockLayout>
          <BlockComponent eosAccount={eosAccount} />
        </BlockLayout>
      </BlockPage>
    );
  }
}

export default translate('tools')(BlockProducer);
