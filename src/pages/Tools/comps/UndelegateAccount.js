// @flow
import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import getEosClient from '../../../components/Scatter/eosClient';
import { formItemFieldConfig } from '../constants';

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

export default class UndelegateAccount extends Component<Props> {
  handelSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
    } = this.props;

    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const {
          store: { dispatch },
        } = await import('../../../store');
        const {
          eosAccount: { name: eosAccount, authority: eosAuth },
        } = this.props;
        try {
          const EosClient = getEosClient();
          await EosClient.transaction(tr => {
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
      eosAccount: { name },
    } = this.props;

    return (
      <Form onSubmit={this.handelSubmit}>
        <p>Unstaking takes three days. Unstaking lowers your vote weight immediately</p>
        <FormItem label="Stake Holder" {...FormItemLayout}>
          {getFieldDecorator('name', formItemFieldConfig())(
            <Input placeholder="Who currently holds the stake" id="name" />,
          )}
        </FormItem>
        <FormItem label="Stake Owner" {...FormItemLayout}>
          {getFieldDecorator('creator', formItemFieldConfig(name))(
            <Input placeholder="Scatter account" id="creator" />,
          )}
        </FormItem>
        <FormItem label="Net Unstake (in EOS)" {...FormItemLayout}>
          {getFieldDecorator('net', formItemFieldConfig())(
            <Input placeholder="How much EOS to unstake" id="net" type="number" />,
          )}
        </FormItem>
        <FormItem label="CPU Unstake (in EOS)" {...FormItemLayout}>
          {getFieldDecorator('cpu', formItemFieldConfig())(
            <Input placeholder="How much EOS to unstake" id="cpu" type="number" />,
          )}
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
