import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import qs from 'querystring';

import { nextTick } from '../../../utils';
import { pageView } from '../../../analytics';
import AppLoader from '../../common/appLoader/AppLoader';
import Scheduler from '../../wizards/scheduler/Scheduler';

import {
  Container,
} from './styles';

@inject('AppStore')
@observer
class Scheduling extends Component {
  UNSAFE_componentWillMount() { // eslint-disable-line camelcase
    nextTick(pageView);
  }

  componentDidMount() {
    const {
      AppStore: {
        SchedulerStore: {
          loadSchedule,
        },
      },
      location: {
        search,
      },
    } = this.props;

    const {
      ids,
      supplierId,
      warehouseId,
    } = qs.parse(search.substring(1));

    loadSchedule(ids, supplierId, warehouseId);
  }

  render() {
    const {
      AppStore: {
        SchedulerStore: {
          isLoading,
          schedule,
        },
      },
    } = this.props;

    return (
      <Container>
        {isLoading && <AppLoader />}
        <Scheduler onFinish={schedule} />
      </Container>
    );
  }
}

Scheduling.propTypes = {
  AppStore: PropTypes.shape(), // eslint-disable-line react/require-default-props
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default Scheduling;
