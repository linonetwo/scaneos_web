// @flow
import React, { Component } from 'react';
import { Form, Input, Button, Radio, InputNumber, Modal } from 'antd';
import getEosClient from '../../../../components/Scatter/eosClient';
import { formItemFieldConfig } from '../../constants';

const RadioGroup = Radio.Group;
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

const purchaseType = ['Eos', 'bytes'];

const purchaseInitValue = [1, 8192];

export default class BuyRam extends Component<Props, *> {
  state = {
    purchase: 0,
  };

  buyRAM = ({ eosClient, eosAccount, eosAuth, form: { name, quantity } }) =>
    eosClient.transaction(tr => {
      tr.buyram(
        {
          payer: eosAccount,
          receiver: name,
          quant: `${Number(quantity)
            .toFixed(4)
            .toString()} EOS`,
        },
        { authorization: [{ actor: eosAccount, permission: eosAuth }] },
      );
    });

  buyRAMBytes = ({ eosClient, eosAccount, eosAuth, form: { name, quantity } }) =>
    eosClient.transaction(tr => {
      tr.buyrambytes(
        {
          payer: eosAccount,
          receiver: name,
          bytes: Number(quantity),
        },
        { authorization: [{ actor: eosAccount, permission: eosAuth }] },
      );
    });

  handelSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
    } = this.props;

    const { purchase } = this.state;

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
          if (Number(purchase) === 0) {
            await this.buyRAM(params);
          } else {
            await this.buyRAMBytes(params);
          }
          Modal.info({ title: t('manageAccount.buyRamSucceed') });
        } catch (error) {
          Modal.error({ title: t('manageAccount.buyRamFailed'), content: JSON.stringify(error) });
        }
      }
    });
  };

  onChoosePurchase = event => {
    this.setState({
      purchase: event.target.value,
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      eosAccount: { name },
    } = this.props;

    const { purchase } = this.state;

    return (
      <Form onSubmit={this.handelSubmit}>
        <FormItem label="Receiver Account Name" {...FormItemLayout}>
          {getFieldDecorator('name', formItemFieldConfig())(
            <Input placeholder="The account that receives the RAM" id="name" />,
          )}
        </FormItem>
        <FormItem label="Payer" {...FormItemLayout}>
          {getFieldDecorator('creator', formItemFieldConfig(name))(
            <Input placeholder="Scatter account" id="creator" />,
          )}
        </FormItem>
        <FormItem label="Purchase unit:" {...FormItemLayout}>
          {getFieldDecorator('Purchase', {
            initialValue: 0,
          })(
            <RadioGroup onChange={this.onChoosePurchase}>
              <Radio value={0}>EOS</Radio>
              <Radio value={1}>bytes</Radio>
            </RadioGroup>,
          )}
        </FormItem>
        <FormItem label={`Ram purchase (in ${purchaseType[purchase]})`} {...FormItemLayout}>
          {getFieldDecorator('quantity', {
            rules: [
              {
                required: true,
                type: 'number',
                whitespace: true,
              },
            ],
            initialValue: purchaseInitValue[purchase],
          })(<InputNumber id="quantity" />)}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Purchase
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
