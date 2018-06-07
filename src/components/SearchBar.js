// @flow
import { debounce } from 'lodash';
import React, { Component } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import breakpoint from 'styled-components-breakpoint';
import { translate } from 'react-i18next';

const SearchContainer = styled.div`
  width: 200px;
  transition: width 0.3s;

  margin: 0;
  width: 90vw;
  ${breakpoint('desktop')`
    margin: 0 9px;
    max-width: calc(100vw - 50px * 2 - 150px - 650px);
    &:focus-within {
      width: calc(100vw - 50px * 2 - 150px - 650px);
    }
  `};
`;

type Store = {
  keyWord: string,
};
type Props = {
  t: Function,
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
      <SearchContainer active={this.state.keyWord}>
        <Input.Search
          size="large"
          placeholder={this.props.t('cansearch')}
          value={this.state.keyWord}
          onChange={this.onSearchInputChange}
          enterButton
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

const mapState = ({ search: { keyWord } }): Store => ({
  keyWord,
});
const mapDispatch = ({ search: { changeKeyWord, search } }): Dispatch => ({
  changeKeyWord: debounce(changeKeyWord, 100),
  search: debounce(search, 100),
});
export default translate()(connect(
  mapState,
  mapDispatch,
)(SearchBar));
