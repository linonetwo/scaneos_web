// @flow
import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { translate } from 'react-i18next';
import { postEOS } from '../../API.config';

const FormItem = Form.Item;

type Props = {
  t: Function,
  form: Object,
};

const FormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

class DelegateAccount extends Component<Props> {
  handelSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
    } = this.props;

    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        await postEOS('/', values);
        const {
          store: { dispatch },
        } = await import('../../store');
        dispatch.info.displayNotification('创建成功');
      }
    });
  };

  render() {
    const {
      t,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handelSubmit}>
        <FormItem label="Recepient" {...FormItemLayout}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="The account that receives the EOS" id="recepient" />)}
        </FormItem>
        <FormItem label="Sender" {...FormItemLayout}>
          {getFieldDecorator('Sender', {
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="Attach an Account" id="sender" />)}
        </FormItem>
        <FormItem label="Quantity (in EOS)" {...FormItemLayout}>
          {getFieldDecorator('quantity', {
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="How much EOS to send" id="quantity" />)}
        </FormItem>
        <FormItem label="Memo" {...FormItemLayout}>
          {getFieldDecorator('memo', {
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="A memo to attach to transfer" id="memo" />)}
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

const DelegateAccountComponent = Form.create()(DelegateAccount);
const UndelegateAccountComponent = Form.create()(DelegateAccount);
const BuyramComponent = Form.create()(DelegateAccount);
const SellramComponent = Form.create()(DelegateAccount);
const RefundComponent = Form.create()(DelegateAccount);
const PermissionsComponent = Form.create()(DelegateAccount);

export default translate('tools')();
