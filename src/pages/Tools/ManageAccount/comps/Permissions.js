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

export default class Permissions extends Component<Props> {
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
            if (values.activeKey) {
              tr.updateauth(
                {
                  account: eosAccount,
                  permission: 'active',
                  parent: 'owner',
                  auth: values.activeKey,
                },
                { authorization: [{ actor: eosAccount, permission: eosAuth }] },
              ); //
            }
            if (values.ownerKey) {
              tr.updateauth(
                {
                  account: eosAccount,
                  permission: 'owner',
                  parent: '',
                  auth: values.ownerKey,
                },
                { authorization: [{ actor: eosAccount, permission: 'owner' }] },
              );
            }
          });
          Modal.info({ title: t('manageAccount.updatePermissionsSucceed') });
        } catch (error) {
          Modal.error({ title: t('manageAccount.updatePermissionsFailed'), content: JSON.stringify(error) });
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
        <FormItem label={t('permissions.creatorLabel')} {...FormItemLayout}>
          {getFieldDecorator('creator', formItemFieldConfig(name))(
            <Input placeholder={t('permissions.creatorPlaceholder')} id="creator" />,
          )}
        </FormItem>
        <FormItem label={t('permissions.activeLabel')} {...FormItemLayout}>
          {getFieldDecorator('activeKey', formItemFieldConfig())(
            <Input placeholder={t('permissions.activePlaceholder')} id="activeKey" />,
          )}
        </FormItem>
        <FormItem label={t('permissions.ownerLabel')} {...FormItemLayout}>
          {getFieldDecorator('ownerKey', formItemFieldConfig())(
            <Input placeholder={t('permissions.ownerPlaceholder')} id="ownerKey" />,
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Update
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
