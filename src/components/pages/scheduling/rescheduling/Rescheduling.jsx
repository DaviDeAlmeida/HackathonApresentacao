import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import qs from 'querystring';

import { nextTick } from '../../../../utils';
import { pageView } from '../../../../analytics';
import AppLoader from '../../../common/appLoader/AppLoader';
import Scheduler from '../../../wizards/scheduler/Scheduler';

import {
  Container,
} from './styles';

@inject('AppStore')
@observer
class Rescheduling extends Component {
  UNSAFE_componentWillMount() { // eslint-disable-line camelcase
    nextTick(pageView);
  }

  componentDidMount() {
    const {
      AppStore: {
        SchedulerStore: {
          loadReschedule,
        },
      },
      location: {
        search,
      },
    } = this.props;

    const { id } = qs.parse(search.substring(1));

    loadReschedule(id);
  }

  render() {
    const {
      AppStore: {
        SchedulerStore: {
          isLoading,
          reschedule,
        },
      },
    } = this.props;

    return (
      <Container>
        {isLoading && <AppLoader />}
        <Scheduler onFinish={reschedule} />
      </Container>
    );
  }
}

Rescheduling.propTypes = {
  AppStore: PropTypes.shape(), // eslint-disable-line react/require-default-props
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default Rescheduling;
