// @flow
import { debounce } from 'lodash';
import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import breakpoint from 'styled-components-breakpoint';
import { translate } from 'react-i18next';
import is from 'styled-is';

const SearchContainer = styled.div`
  width: 200px;
  transition: width 0.3s;

  margin: auto;
  width: 90vw;
  ${breakpoint('desktop')`
    margin: 0 30px;
    max-width: 420px;
  `};
  ${is('affixed')`
    width: calc(90vw - 48px);
  `};

  .ant-input-suffix > button {
    line-height: 1 !important;
  }
  input {
    font-size: 12px;
  }
  .ant-input {
    border-bottom: 1px solid #eeeeee;
  }
`;

type Store = {
  keyWord: string,
  loading: boolean,
};
type Props = {
  t: Function,
  affixed?: boolean,
};
type Dispatch = {
  changeKeyWord: (keyWord: string) => void,
  search: () => void,
};
type State = {
  keyWord: string,
};

class SearchBar extends Component<Props & Store & Dispatch, State> {
  static getDerivedStateFromProps(nextProps: Store, prevState: State) {
    if (nextProps.keyWord !== prevState.keyWord) {
      return { keyWord: nextProps.keyWord };
    }
    return null;
  }

  static defaultProps = {
    affixed: false,
  };

  state = {
    keyWord: '',
  };

  onSearchInputChange = (event: SyntheticInputEvent<*>) => {
    const keyWord = event.target.value;
    this.setState({ keyWord });
    this.props.changeKeyWord(keyWord);
  };

  render() {
    return (
      <SearchContainer active={this.state.keyWord} affixed={this.props.affixed}>
        <Input.Search
          size="middle"
          enterButton={this.props.loading ? <Icon type="loading" /> : <Icon type="search" />}
          placeholder={this.props.t('cansearch')}
          value={this.state.keyWord}
          onChange={this.onSearchInputChange}
          onSearch={keyWord => {
            if (!keyWord) return;
            this.props.changeKeyWord(keyWord);
            this.props.search();
          }}
        />
      </SearchContainer>
    );
  }
}

const mapState = ({ search: { keyWord, loading } }): Store => ({
  keyWord,
  loading,
});
const mapDispatch = ({ search: { changeKeyWord, search } }): Dispatch => ({
  changeKeyWord,
  search: debounce(search, 100),
});
export default translate()(
  connect(
    mapState,
    mapDispatch,
  )(SearchBar),
);
