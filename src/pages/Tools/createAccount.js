// @flow
import React, { Component } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import { translate } from 'react-i18next';
import getEosClient from '../../components/Scatter/eosClient';
import { formItemFieldConfig } from './constants';

const FormItem = Form.Item;

type Props = {
  t: Function,
  form: Object,
  eosAccount: Object,
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
        const {
          store: { dispatch },
        } = await import('../../store');
        try {
          const EosClient = getEosClient();
          EosClient.transaction(tr => {
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
        } catch (error) {
          dispatch.info.displayNotification(JSON.stringify(error));
        }
      }
    });
  };

  render() {
    const {
      t,
      form: { getFieldDecorator },
      eosAccount: { name },
    } = this.props;

    return (
      <Form onSubmit={this.handelSubmit}>
        <FormItem label={t('createAccount.accountLabel')} {...FormItemLayout}>
          {getFieldDecorator('name', {
            ...formItemFieldConfig(),
            rules: [
              {
                required: true,
                whitespace: true,
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
          })(<Input placeholder={t('createAccount.accountPlaceholder')} id="name" />)}
        </FormItem>
        <FormItem label={t('createAccount.creatorLabel')} {...FormItemLayout}>
          {getFieldDecorator('creator', formItemFieldConfig(name))(
            <Input placeholder={t('createAccount.creatorPlaceholder')} id="creator" />,
          )}
        </FormItem>
        <FormItem label={t('createAccount.ownerLabel')} {...FormItemLayout}>
          {getFieldDecorator('ownerKey', formItemFieldConfig())(
            <Input placeholder={t('createAccount.ownerPlaceholder')} id="ownerKey" />,
          )}
        </FormItem>
        <FormItem label={t('createAccount.activeLabel')} {...FormItemLayout}>
          {getFieldDecorator('activeKey', formItemFieldConfig())(
            <Input placeholder={t('createAccount.activePlaceholder')} id="activeKey" />,
          )}
        </FormItem>
        <FormItem label="Net State(in EOS)" {...FormItemLayout}>
          {getFieldDecorator('net', {
            ...formItemFieldConfig(),
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
            ...formItemFieldConfig(),
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
          {getFieldDecorator('ram', formItemFieldConfig())(
            <Input placeholder="Required to store account" id="ram" type="number" />,
          )}
        </FormItem>
        <FormItem label={t('delegateAccount.transferLabel')} {...FormItemLayout}>
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

export default translate()(Form.create()(CreateAccount));
