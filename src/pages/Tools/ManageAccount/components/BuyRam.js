// @flow
import React, { Component } from 'react';
import { Form, Input, Button, Radio, InputNumber, Modal } from 'antd';
import getEosClient from '../../../../components/Scatter/eosClient';
import { formItemFieldConfig } from '../../constants';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const FormItemLayout = {
  labelCol: { span: 8 },
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
      t,
      form: { getFieldDecorator },
      eosAccount: { name },
    } = this.props;

    const { purchase } = this.state;

    return (
      <Form onSubmit={this.handelSubmit}>
        <FormItem label={t('buyRam.receivesLabel')} {...FormItemLayout}>
          {getFieldDecorator('name', formItemFieldConfig(name))(
            <Input placeholder={t('buyRam.receivesPlaceholder')} id="name" />,
          )}
        </FormItem>
        <FormItem label={t('buyRam.payerLabel')} {...FormItemLayout}>
          {getFieldDecorator('creator', formItemFieldConfig(name))(
            <Input placeholder={t('buyRam.payerPlaceholder')} id="creator" />,
          )}
        </FormItem>
        <FormItem label={t('buyRam.purchaseLabel')} {...FormItemLayout}>
          {getFieldDecorator('Purchase', {
            initialValue: 0,
          })(
            <RadioGroup onChange={this.onChoosePurchase}>
              <Radio value={0}>EOS</Radio>
              <Radio value={1}>bytes</Radio>
            </RadioGroup>,
          )}
        </FormItem>
        <FormItem label={`${t('buyRam.quantityLabel')} (${purchaseType[purchase]})`} {...FormItemLayout}>
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
        <FormItem wrapperCol={{ span: 12, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            {t('Purchase')}
          </Button>
          <p>{t('scatter.execut')}</p>
        </FormItem>
      </Form>
    );
  }
}
