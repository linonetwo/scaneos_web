// @flow
import React, { Component } from 'react';
import { Form, Input, Button, InputNumber, Modal } from 'antd';
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

export default class SellRam extends Component<Props, *> {
  sellRAM = ({ eosClient, eosAccount, eosAuth, form: { ram } }) =>
    eosClient.transaction(tr => {
      tr.sellram(
        {
          account: eosAccount,
          bytes: Number(ram),
        },
        { authorization: [{ actor: eosAccount, permission: eosAuth }] },
      );
    });

  handelSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
    } = this.props;

    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const {
          eosAccount: { name: eosAccount, authority: eosAuth },
          t,
        } = this.props;
        try {
          const EosClient = getEosClient();
          const params = {
            eosClient: EosClient,
            eosAccount,
            eosAuth,
            form: values,
          };
          await this.sellRAM(params);
          Modal.info({ title: t('manageAccount.sellRamSucceed') });
        } catch (error) {
          Modal.error({ title: t('manageAccount.sellRamFailed'), content: JSON.stringify(error) });
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
        <FormItem label="Seller" {...FormItemLayout}>
          {getFieldDecorator('creator', formItemFieldConfig(name))(
            <Input placeholder="Scatter account" id="creator" />,
          )}
        </FormItem>
        <FormItem label="Ram to Sell (in bytes)" {...FormItemLayout}>
          {getFieldDecorator('ram', {
            rules: [
              {
                required: true,
                type: 'number',
                whitespace: true,
              },
            ],
            initialValue: 8192,
          })(<InputNumber placeholder="How many bytes to sell" id="ram" />)}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Sell
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
