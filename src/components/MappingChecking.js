// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { translate } from 'react-i18next';
import { Input, Icon } from 'antd';

const Container = styled(Flex)`
  height: 250px;
  padding: 20px;

  width: 90vw;
  margin: 30px auto 0;
  ${breakpoint('desktop')`
    width: 500px;
    margin: 30px 0 0;
  `};

  background-color: white;

  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.05);
`;
const Title = styled(Flex)`
  width: 100%;
  font-size: 20px;
  padding: 0;
  margin-bottom: 50px;
`;

class MappingChecking extends Component<{ t: Function }, *> {
  state = {
    keyWord: '',
  };

  onInputChange = (event: SyntheticInputEvent<*>) => {
    const keyWord = event.target.value;
    this.setState({ keyWord });
  };

  render() {
    return (
      <Container column alignCenter>
        <Title justifyBetween alignCenter>
          <span>
            <Icon type="check-square-o" /> {this.props.t('MappingChecker')}
          </span>
        </Title>
        <Input.Search
          size="large"
          placeholder={this.props.t('ethaddress')}
          value={this.state.keyWord}
          onChange={this.onInputChange}
          enterButton
          onSearch={keyWord => {
            if (!keyWord) return;
          }}
        />
      </Container>
    );
  }
}

export default translate()(MappingChecking);
