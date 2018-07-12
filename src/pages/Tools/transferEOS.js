// @flow
import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
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
          store: { dispatch },
        } = await import('../../store');
        const {
          eosAccount: { name: eosAccount, authority: eosAuth },
        } = this.props;
        try {
          const EosClient = getEosClient();
          await EosClient.transfer(
            {
              account: 'eosio.token',
              from: eosAccount,
              to: values.name,
              quantity: `${Number(values.quantity)
                .toFixed(4)
                .toString()} EOS`,
              memo: values.memo,
            },
            { authorization: [{ actor: eosAccount, permission: eosAuth }] },
          );

          dispatch.info.displayNotification('Transfer Successd');
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
        <FormItem label="Quantity (in EOS)" {...FormItemLayout}>
          {getFieldDecorator('quantity', formItemFieldConfig())(
            <Input placeholder="How much EOS to send" id="quantity" />,
          )}
        </FormItem>
        <FormItem label="Memo" {...FormItemLayout}>
          {getFieldDecorator('memo', formItemFieldConfig())(
            <Input placeholder="A memo to attach to transfer" id="memo" />,
          )}
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
