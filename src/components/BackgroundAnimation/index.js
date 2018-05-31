// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import preval from 'preval.macro';

const animationSource = preval`
  const fs = require('fs');
  const path = require('path');
  module.exports = fs.readFileSync(path.resolve(__dirname, ('./Mitchell-Best-Candidate-II.html')), 'utf8');
`;

const IFrame = styled.iframe`
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 64px;
  border: none;

  opacity: 0.5;
`;

export default class BackgroundAnimation extends Component<*> {
  componentDidMount() {
    if (!this.iframe) return;
    const doc = this.iframe.contentWindow.document;
    doc.open();
    doc.write(animationSource);
    doc.close();
  }

  iframe = null;

  render() {
    return (
      <IFrame
        innerRef={elem => {
          this.iframe = elem;
        }}
      />
    );
  }
}
