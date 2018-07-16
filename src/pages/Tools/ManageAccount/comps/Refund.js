// @flow
import React, { Component } from 'react';
import { Form, Input, Button, Modal } from 'antd';
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

export default class Refund extends Component<Props, *> {
  refund = ({ eosClient, eosAccount, eosAuth, form: { owner } }) =>
    eosClient.transaction(tr => {
      tr.refund(
        {
          owner,
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
          await this.refund(params);
          Modal.info({ title: t('manageAccount.refundSucceed') });
        } catch (error) {
          Modal.error({ title: t('manageAccount.refundFailed'), content: JSON.stringify(error) });
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
        <FormItem label={t('createAccount.creatorLabel')} {...FormItemLayout}>
          {getFieldDecorator('owner', formItemFieldConfig(name))(
            <Input placeholder={t('createAccount.creatorPlaceholder')} id="owner" />,
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Refund
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
