import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Storyline from '../../../../common/storyline/Storyline';

@inject('AppStore')
@observer
class History extends Component {

  render() {
    const {
      AppStore: {
        DeliveryDetailsStore: {
          delivery: {
            history,
          },
        },
      },
    } = this.props;

    return (
      <Storyline history={history} />
    );
  }
}

History.propTypes = {
  AppStore: PropTypes.shape({ // eslint-disable-line react/require-default-props
    DeliveryDetailsStore: PropTypes.shape(),
  }),
};

export default History;
