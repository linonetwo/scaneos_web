// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Table } from 'antd';
import AutoLinkText from 'react-autolink-text2';
import queryString from 'query-string';
import { Link, withRouter } from 'react-router-dom';

import blockProducersList from './blockProducersList';
import { ProducerListContainer } from '../../components/Table';
import { locationBelongsToArea } from '../../store/utils';

const Container = styled(Flex)`
  min-height: calc(100vh - 64px);
  width: 100%;
  background-color: rgb(250, 250, 250);
`;

type Props = {
  t: Function,
  location: Object,
};
type Store = {};
type Dispatch = {
  updateURI: (queryOverride?: Object) => void,
};

class BlockProducers extends PureComponent<Props & Store & Dispatch, *> {
  render() {
    return (
      <Container column>
        <ProducerListContainer>
          <Table
            size="small"
            dataSource={blockProducersList}
            pagination={{ position: 'both', pageSize: 10, current: Number(queryString.parse(this.props.location.search).page) }}
            scroll={{ x: 800 }}
            onChange={pagination => {
              this.props.updateURI({ page: pagination.current });
            }}
          >
            <Table.Column fixed="left" width={90} title={this.props.t('name')} dataIndex="name" key="name" />
            <Table.Column
              width={70}
              title={this.props.t('account')}
              dataIndex="account"
              key="account"
              render={account => <Link to={`/account/${account}`}>{account}</Link>}
            />
            <Table.Column
              width={100}
              title={this.props.t('location')}
              dataIndex="location"
              filters={[
                {
                  text: this.props.t('China'),
                  value: 'China',
                },
                {
                  text: this.props.t('Asia'),
                  value: 'Asia',
                },
                {
                  text: this.props.t('America'),
                  value: 'America',
                },
                {
                  text: this.props.t('Europe'),
                  value: 'Europe',
                },
                {
                  text: this.props.t('Oceania'),
                  value: 'Oceania',
                },
                {
                  text: this.props.t('Africa'),
                  value: 'Africa',
                },
              ]}
              onFilter={(area, record) =>
                record.location.indexOf(area) !== -1 || locationBelongsToArea(record.location, area)
              }
            />
            <Table.Column width={50} title={this.props.t('prerequisites')} dataIndex="prerequisites" />
            <Table.Column title={this.props.t('nodeLocation')} dataIndex="nodeLocation" />
          </Table>
        </ProducerListContainer>
      </Container>
    );
  }
}

const mapDispatch = ({ history: { updateURI } }): Dispatch => ({ updateURI });
export default withRouter(
  translate()(
    connect(
      undefined,
      mapDispatch,
    )(BlockProducers),
  ),
);
