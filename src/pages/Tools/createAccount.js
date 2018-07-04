// @flow
import React, { Component } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import { translate } from 'react-i18next';
import { postEOS } from '../../API.config';

const FormItem = Form.Item;

type Props = {
  t: Function,
  form: Object,
};

const FormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

class CreateAccount extends Component<Props> {
  handelSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
    } = this.props;

    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const {
          eosAccount: { name: eosAccount, authority: eosAuth },
        } = this.props;
        console.log(values);
        window.eosClient.transaction(tr => {
          tr.newaccount(
            {
              creator: eosAccount,
              name: values.name,
              owner: values.ownerKey,
              active: values.activeKey,
            },
            { authorization: [{ actor: eosAccount, permission: eosAuth }] },
          );
          tr.buyrambytes(
            {
              payer: eosAccount,
              receiver: values.name,
              bytes: Number(values.ram),
            },
            { authorization: [{ actor: eosAccount, permission: eosAuth }] },
          );
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
      }
    });
  };

  render() {
    const {
      t,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handelSubmit}>
        <FormItem label={t('accountLabel')} {...FormItemLayout}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Please input your account',
              },
              {
                min: 12,
                message: 'Invalid account name',
              },
              {
                pattern: /^[a-z0-9]+$/,
                message: t('accountPlaceholder'),
              },
            ],
          })(<Input placeholder={t('accountPlaceholder')} id="name" />)}
        </FormItem>
        <FormItem label="Creator" {...FormItemLayout}>
          {getFieldDecorator('creator', {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Creator name is required',
              },
            ],
          })(<Input placeholder="Scatter account" id="creator" />)}
        </FormItem>
        <FormItem label="Owner Public Key" {...FormItemLayout}>
          {getFieldDecorator('ownerKey', {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Owner Public Key is required',
              },
            ],
          })(<Input placeholder="Enter public key" id="ownerKey" />)}
        </FormItem>
        <FormItem label="Active Public Key" {...FormItemLayout}>
          {getFieldDecorator('activeKey', {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Active Public Key is required',
              },
            ],
          })(<Input placeholder="Enter public key" id="activeKey" />)}
        </FormItem>
        <FormItem label="Net State(in EOS)" {...FormItemLayout}>
          {getFieldDecorator('net', {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Net State is required',
              },
            ],
          })(<Input placeholder="Required to use network" id="net" type="number" />)}
        </FormItem>
        <FormItem label="CPU State(in EOS)" {...FormItemLayout}>
          {getFieldDecorator('cpu', {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Required to process transactions',
              },
            ],
          })(<Input placeholder="Required to process transactions" id="cpu" type="number" />)}
        </FormItem>
        <FormItem label="Ram Purchase (in bytes)" {...FormItemLayout}>
          {getFieldDecorator('ram', {
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="Required to store account" id="ram" type="number" />)}
        </FormItem>
        <FormItem label="Transfer" {...FormItemLayout}>
          {getFieldDecorator('transfer')(<Switch id="transfer" />)}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 4 }}>
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

export default translate('tools')(Form.create()(CreateAccount));
