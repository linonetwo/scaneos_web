// @flow
import React, { Component } from 'react';
import { Form, Input, Button, Modal } from 'antd';
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
      t,
      form: { validateFieldsAndScroll },
    } = this.props;

    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
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

          Modal.info({ title: t('manageAccount.transferEOSSucceed') });
        } catch (error) {
          Modal.error({ title: t('manageAccount.transferEOSFailed'), content: JSON.stringify(error) });
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
        <FormItem label={t('transferEOS.nameLabel')} {...FormItemLayout}>
          {getFieldDecorator('name', formItemFieldConfig())(
            <Input placeholder={t('transferEOS.namePlaceholder')} id="name" />,
          )}
        </FormItem>
        <FormItem label={t('transferEOS.creatorLabel')} {...FormItemLayout}>
          {getFieldDecorator('creator', formItemFieldConfig(name))(
            <Input placeholder={t('delegateAccount.creatorPlaceholder')} id="creator" />,
          )}
        </FormItem>
        <FormItem label={t('transferEOS.quantityLabel')} {...FormItemLayout}>
          {getFieldDecorator('quantity', formItemFieldConfig())(
            <Input placeholder={t('transferEOS.quantityPlaceholder')} id="quantity" />,
          )}
        </FormItem>
        <FormItem label={t('transferEOS.memoLabel')} {...FormItemLayout}>
          {getFieldDecorator('memo', formItemFieldConfig())(
            <Input placeholder={t('transferEOS.memoPlaceholder')} id="memo" />,
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            {t('scatter.submit')}
          </Button>
          <p>{t('scatter.execut')}</p>
        </FormItem>
      </Form>
    );
  }
}

export default translate()(Form.create()(CreateAccount));
