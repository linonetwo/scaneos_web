// @flow
import React, { Component } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import getEosClient from '../../../../components/Scatter/eosClient';
import { formItemFieldConfig } from '../../constants';

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

export default class UndelegateAccount extends Component<Props> {
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
          Modal.info({ title: t('manageAccount.undelegateSucceed') });
        } catch (error) {
          Modal.error({ title: t('manageAccount.undelegateFailed'), content: JSON.stringify(error) });
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
        <p>{t('delegateAccount.unStakingInformation')}</p>
        <FormItem label={t('undelegateAccount.nameLabel')} {...FormItemLayout}>
          {getFieldDecorator('name', formItemFieldConfig())(
            <Input placeholder={t('undelegateAccount.namePlaceholder')} id="name" />,
          )}
        </FormItem>
        <FormItem label={t('undelegateAccount.creatorLabel')} {...FormItemLayout}>
          {getFieldDecorator('creator', formItemFieldConfig(name))(
            <Input placeholder={t('undelegateAccount.creatorPlaceholder')} id="creator" />,
          )}
        </FormItem>
        <FormItem label={t('undelegateAccount.netLabel')} {...FormItemLayout}>
          {getFieldDecorator('net', formItemFieldConfig())(
            <Input placeholder={t('undelegateAccount.netPlaceholder')} id="net" type="number" />,
          )}
        </FormItem>
        <FormItem label={t('undelegateAccount.cpuLabel')} {...FormItemLayout}>
          {getFieldDecorator('cpu', formItemFieldConfig())(
            <Input placeholder={t('undelegateAccount.cpuPlaceholder')} id="cpu" type="number" />,
          )}
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
