// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { translate } from 'react-i18next';
import breakpoint from 'styled-components-breakpoint';
import { Link } from 'react-router-dom';

import ramPriceChart from './ramPriceChart.png';
import eosPriceChart from './eosPriceChart.png';

const getList = t => [
  {
    title: t('RamPriceChart'),
    image: ramPriceChart,
    route: 'ram',
  },
  {
    title: t('PriceHistory'),
    image: eosPriceChart,
    route: 'eos',
  },
];

const Container = styled(Flex)`
  overflow-x: hidden;
  height: 100%;
  width: 100%;
`;
const ListItem = styled(Flex)`
  width: 90vw;
  margin: 24px auto 0;
  ${breakpoint('desktop')`
    width: calc((1200px - 24px * 2) / 3);
    margin: 24px 0 0;
  `};

  padding: 10px;
  height: min-content;

  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.02);
  background-color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  overflow: hidden;
`;
const ListTitle = styled.h3`
  text-align: center;
  z-index: 2;
`;
const ItemImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
  font-family: 'object-fit: cover; object-position: center;';
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.3);
  }
`;

class ChartList extends PureComponent<*> {
  render() {
    const {
      t,
      match: { url },
    } = this.props;
    return (
      <Container wrap="true" justifyAround>
        {getList(t).map(({ title, image, route }) => (
          <Link to={`${url}${route}`}>
            <ListItem column>
              <ListTitle>{title}</ListTitle>
              <ItemImage src={image} />
            </ListItem>
          </Link>
        ))}
      </Container>
    );
  }
}
export default translate()(ChartList);
