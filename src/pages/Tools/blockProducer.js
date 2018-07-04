// @flow
import React, { Component } from 'react';
import { Form, Input, Button, Menu, Icon } from 'antd';
import { translate } from 'react-i18next';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { postEOS } from '../../API.config';

const FormItem = Form.Item;

type Props = {
  t: Function,
};

const FormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const BlockPage = styled(Flex)`
  min-height: calc(70vh - 64px);
  background-color: #fff;
  margin-top: -16px;
`;

const BlockMenu = styled(Menu)`
  width: 256px;
`;

const BlockLayout = styled.div`
  padding: 10px;
`;

class DelegateAccount extends Component<{ form: Object }> {
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

const Components = [Form.create()(DelegateAccount)];
// const UndelegateAccountComponent = Form.create()(DelegateAccount);
// const BuyramComponent = Form.create()(DelegateAccount);
// const SellramComponent = Form.create()(DelegateAccount);
// const RefundComponent = Form.create()(DelegateAccount);
// const PermissionsComponent = Form.create()(DelegateAccount);

class BlockProducer extends Component<Props> {
  state = {
    componentsIndex: 0,
  };

  handleClick = event => {
    const { key } = event;
    this.setState({
      componentsIndex: key,
    });
  };

  render() {
    const { componentsIndex } = this.state;
    const BlockComponent = Components[componentsIndex] || Components[0];
    return (
      <BlockPage>
        <BlockMenu defaultSelectedKeys={['1']} mode="inline" onClick={this.handleClick}>
          <Menu.Item key="1">
            <span>Delegate Account</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span>Option 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <span>Option 3</span>
          </Menu.Item>
        </BlockMenu>
        <BlockLayout>
          <BlockComponent />
        </BlockLayout>
      </BlockPage>
    );
  }
}

export default translate('tools')(BlockProducer);
