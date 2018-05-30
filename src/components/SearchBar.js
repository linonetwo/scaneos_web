// @flow
import { debounce } from 'lodash';
import React, { Component } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';

const SearchContainer = styled.div`
  margin: 0 9px;
  width: 200px;
  max-width: calc(100% - 50px * 2 - 140px - 420px);
`;

type Store = {
  keyWord: string,
};
type Props = {
  size: 'large' | 'small' | void,
  button: boolean | void,
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
      <SearchContainer>
        <Input.Search
          value={this.state.keyWord}
          onChange={this.onSearchInputChange}
          enterButton={this.props.button && 'Search'}
          size={this.props.size}
          onSearch={keyWord => {
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
export default connect(mapState, mapDispatch)(SearchBar);
