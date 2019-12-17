import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './styles';

const ImageButton = ({
  image,
  width,
  height,
  onClick,
}) => (
  <StyledButton
    image={image}
    width={typeof width === 'number' ? `${width}px` : width}
    height={typeof height === 'number' ? `${height}px` : height}
    onClick={onClick}
  />
);

ImageButton.propTypes = {
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

ImageButton.defaultProps = {
  width: undefined,
  height: undefined,
  onClick: undefined,
};

export default ImageButton;
