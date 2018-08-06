// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import styled from 'styled-components';
import { List, Avatar } from 'antd';

import { Container as ContainerBase } from '../../components/Containers';

const getList = t => [
  {
    title: t('Ram'),
    icon: 'area-chart',
    route: 'ram',
  },
];

const Container = styled(ContainerBase)`
  .ant-list-split .ant-list-item {
    cursor: pointer;
    &:last-child {
      border-bottom: 1px solid #e8e8e8;
    }
  }

  padding-bottom: 0px;
`;

class ChartList extends PureComponent<*> {
  render() {
    const {
      t,
      match: { url },
      history,
    } = this.props;
    return (
      <Container>
        <List
          style={{ width: '100%' }}
          size="large"
          bordered
          dataSource={getList(t)}
          renderItem={item => (
            <List.Item onClick={() => history.push(`${url}${item.route}`)}>
              <List.Item.Meta avatar={<Avatar icon={item.icon} />} title={item.title} />
            </List.Item>
          )}
        />
      </Container>
    );
  }
}
export default translate(['bp'])(ChartList);
