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
        OrderDetailsStore: {
          order: {
            history,
          },
        },
      },
    } = this.props;

    return (
      <Storyline history={history.slice()} />
    );
  }
}

History.propTypes = {
  AppStore: PropTypes.shape({ // eslint-disable-line react/require-default-props
    OrderDetailsStore: PropTypes.shape(),
  }),
};

export default History;
