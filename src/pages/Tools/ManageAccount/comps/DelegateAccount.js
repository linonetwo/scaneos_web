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
          t,
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
      t,
      form: { getFieldDecorator },
      eosAccount: { name },
    } = this.props;

    return (
      <Form onSubmit={this.handelSubmit}>
        <FormItem label={t('delegateAccount.recepientLabel')} {...FormItemLayout}>
          {getFieldDecorator('name', formItemFieldConfig())(
            <Input placeholder={t('delegateAccount.recepientPlaceholder')} id="name" />,
          )}
        </FormItem>
        <FormItem label={t('delegateAccount.creatorLabel')} {...FormItemLayout}>
          {getFieldDecorator('creator', formItemFieldConfig(name))(
            <Input placeholder={t('delegateAccount.creatorPlaceholder')} id="creator" />,
          )}
        </FormItem>
        <FormItem label={t('delegateAccount.netLabel')} {...FormItemLayout}>
          {getFieldDecorator('net', formItemFieldConfig())(
            <Input placeholder={t('delegateAccount.netPlaceholder')} id="net" type="number" />,
          )}
        </FormItem>
        <FormItem label={t('delegateAccount.cpuLabel')} {...FormItemLayout}>
          {getFieldDecorator('cpu', formItemFieldConfig())(
            <Input placeholder={t('delegateAccount.cpuPlaceholder')} id="cpu" type="number" />,
          )}
        </FormItem>
        <FormItem label={t('delegateAccount.transferLabel')} {...FormItemLayout}>
          {getFieldDecorator('transfer')(<Switch id="transfer" />)}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            {t('scatter.submit')}
          </Button>
          <p>{t('scatter.execut')}</p>
        </FormItem>
      </Form>
    );
  }
}
