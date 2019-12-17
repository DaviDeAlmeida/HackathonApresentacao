import React from 'react';
import PropTypes from 'prop-types';

import {
  ButtonStyled,
  ImageButton,
} from './styles';

const Button = ({
  text,
  image,
  count,
  width,
  height,
  onClick,
  primary,
  disabled,
  type,
}) => {
  const handler = disabled ? undefined : onClick;

  if (image) {
    return (
      <ImageButton
        image={image}
        count={count}
        width={width}
        height={height}
        onClick={handler}
      />
    );
  }

  return (
    <ButtonStyled
      onClick={handler}
      primary={primary}
      disabled={disabled}
      type={type}
    >
      {text}
    </ButtonStyled>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  image: PropTypes.string,
  count: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  text: undefined,
  image: undefined,
  count: undefined,
  width: 25,
  height: 25,
  onClick: undefined,
  primary: false,
  disabled: false,
};

export default Button;
