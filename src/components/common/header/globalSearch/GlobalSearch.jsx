import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

import dictionary from '../../../../dictionary';
import {
  SearchContainer,
  SearchButton,
  Search,
} from './styles';

const initialState = {
  isLoading: false,
  results: {},
  value: '',
  timeout: 0,
};

@inject('AppStore')
@observer
class GlobalSearch extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  _handleSelect = (e, { result }) => {
    this.setState({ value: result.title });
  }

  _handleSearchChange = (e, { value }) => {
    // const {
    //   AppStore: {
    //     GlobalStore: {
    //       search,
    //     },
    //   },
    // } = this.props;

    // const {
    //   timeout,
    // } = this.state;

    // if (value < 1) {
    //   this.setState(initialState);
    //   return;
    // }

    // if (timeout) clearTimeout(timeout);

    this.setState({
      isLoading: true,
      value,
    });
  }

  render() {
    const {
      isLoading,
      results,
      value,
    } = this.state;

    return (
      <SearchContainer>
        <SearchButton type="button">
          <FiSearch />
        </SearchButton>
        <Search
          category
          loading={isLoading}
          value={value}
          results={results}
          onResultSelect={this._handleSelect}
          onSearchChange={this._handleSearchChange}
          placeholder={dictionary.t('header.searchFor')}
        />
      </SearchContainer>
    );
  }
}

GlobalSearch.propTypes = {
  // eslint-disable-next-line react/require-default-props
  AppStore: PropTypes.shape({
    GlobalStore: PropTypes.shape(),
  }),
};

export default GlobalSearch;
