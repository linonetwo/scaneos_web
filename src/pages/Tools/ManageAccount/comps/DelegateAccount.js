// @flow
import React, { Component } from 'react';
import { Form, Input, Button, Switch, Modal } from 'antd';
import getEosClient from '../../../../components/Scatter/eosClient';
import { formItemFieldConfig } from '../../constants';

const FormItem = Form.Item;

const FormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

type Props = {
  t: Function,
  form: Object,
  eosAccount: Object,
};

export default class DelegateAccount extends Component<Props> {
  handelSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
    } = this.props;

    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const {
          eosAccount: { name: eosAccount, authority: eosAuth },
          t
        } = this.props;
        try {
          const EosClient = getEosClient();
          await EosClient.transaction(tr => {
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
          Modal.info({ title: t('manageAccount.delegateSucceed') });
        } catch (error) {
          Modal.error({ title: t('manageAccount.delegateFailed'), content: JSON.stringify(error) });
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      eosAccount: { name },
    } = this.props;

    return (
      <Form onSubmit={this.handelSubmit}>
        <FormItem label="Recepient" {...FormItemLayout}>
          {getFieldDecorator('name', formItemFieldConfig())(
            <Input placeholder="The account that receives the EOS" id="name" />,
          )}
        </FormItem>
        <FormItem label="Sender" {...FormItemLayout}>
          {getFieldDecorator('creator', formItemFieldConfig(name))(
            <Input placeholder="Attach an Account" id="creator" />,
          )}
        </FormItem>
        <FormItem label="Net Stake (in EOS)" {...FormItemLayout}>
          {getFieldDecorator('net', formItemFieldConfig())(
            <Input placeholder="How much EOS to stake" id="net" type="number" />,
          )}
        </FormItem>
        <FormItem label="CPU Stake (in EOS)" {...FormItemLayout}>
          {getFieldDecorator('cpu', formItemFieldConfig())(
            <Input placeholder="How much EOS to stake" id="cpu" type="number" />,
          )}
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
