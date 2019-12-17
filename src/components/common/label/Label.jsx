import React from 'react';
import PropTypes from 'prop-types';

import {
  Label as StyledLabel,
} from './styles';

const Label = ({ text, status }) => (
  <StyledLabel status={status}>
    {text}
  </StyledLabel>
);

Label.propTypes = {
  text: PropTypes.string.isRequired,
  status: PropTypes.string,
};

Label.defaultProps = {
  status: undefined,
};

export default Label;
