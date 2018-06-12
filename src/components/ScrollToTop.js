// @flow
import { Component } from 'react';
import { withRouter } from 'react-router';
import { scrollTop } from '../store/utils'

class ScrollToTop extends Component<*> {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      scrollTop();
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
