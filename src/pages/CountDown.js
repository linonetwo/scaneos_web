import React from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import Countdown from 'react-countdown-now';
import { translate } from 'react-i18next';
import breakpoint from 'styled-components-breakpoint';

import BackgroundAnimation from '../components/BackgroundAnimation';

const Container = styled(Flex)`
  overflow-x: hidden;
  height: calc(100vh - 64px);
  width: 100%;
`;
const Intro = styled(Flex)`
  font-size: 20px;
`;
const CountDownContainer = styled.div`
  font-size: 30px;
  max-width: 100vw;
  overflow-wrap: break-word;
  word-break: normal;
  word-wrap: break-word;

  padding: 40px;
  margin-top: -100px;
  ${breakpoint('desktop')`
    padding: 0px;
    margin: 0;
  `};
`;

function CountDown(props) {
  return (
    <Container center>
      <BackgroundAnimation />
      <Countdown
        date={new Date('Sat Jun 02 2018 21:59:59 GMT+0000')}
        renderer={({ days, hours, minutes, seconds, completed }) => {
          if (completed) {
            // Render a complete state
            return <CountDownContainer>GO EOS!</CountDownContainer>;
          }
          // Render a countdown
          return (
            <CountDownContainer column>
              <Intro>{props.t('Until')}</Intro>
              {days} {props.t('Days')} {hours} {props.t('Hours')} {minutes} {props.t('Minutes')} {seconds}{' '}
              {props.t('Seconds')}
            </CountDownContainer>
          );
        }}
      />
    </Container>
  );
}
export default translate('countdown')(CountDown);
