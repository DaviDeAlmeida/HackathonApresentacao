import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import history from '../../../../history';
import Scrollable from '../../../common/scrollable/Scrollable';
import Table from '../../../common/table/Table';
import Toolbar from '../../../common/toolbar/Toolbar';
import ToolbarButton from '../../../common/toolbar/button/ToolbarButton';
import AppLoader from '../../../common/appLoader/AppLoader';
import {
  Wrapper,
} from './styles';

@inject('AppStore')
@observer
class TempoMedioResolucao extends Component {
  componentDidMount() {}

  render() {

    return (
      <div>Tempo medio de resolucao</div>
    );
  }
}

export default TempoMedioResolucao;
