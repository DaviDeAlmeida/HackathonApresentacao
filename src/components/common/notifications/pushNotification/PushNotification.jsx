import React from 'react';
import PropTypes from 'prop-types';

import colors from '../../../../colors';

import {
  Wrapper,
  Controls,
  Close,
  Content,
} from './styles';

const PushNotification = ({
  payload,
  color,
  onClose,
}) => (
  <Wrapper
    color={color}
  >
    <Content>
      {payload}
    </Content>
    {onClose && (
      <Controls>
        <Close onClick={onClose} />
      </Controls>
    )}
  </Wrapper>
);

PushNotification.propTypes = {
  payload: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  color: PropTypes.string,
  onClose: PropTypes.func,
};

PushNotification.defaultProps = {
  color: colors.success,
  onClose: undefined,
};

export default PushNotification;
