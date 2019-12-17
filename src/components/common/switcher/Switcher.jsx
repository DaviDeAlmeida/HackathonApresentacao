import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button/Button';
import {
  Wrapper,
} from './styles';

import next from './images/ico-next-on.svg';
import prev from './images/ico-previous-on.svg';
import nextOff from './images/ico-next-off.svg';
import prevOff from './images/ico-previous-off.svg';

const Switcher = ({
  onNextClick,
  onPrevclick,
}) => (
  <Wrapper>
    <Button
      image={onPrevclick ? prev : prevOff}
      width={25}
      height={25}
      onClick={onPrevclick}
    />
    <Button
      image={onNextClick ? next : nextOff}
      width={25}
      height={25}
      onClick={onNextClick}
    />
  </Wrapper>
);

Switcher.propTypes = {
  onNextClick: PropTypes.func,
  onPrevclick: PropTypes.func,
};

Switcher.defaultProps = {
  onNextClick: undefined,
  onPrevclick: undefined,
};

export default Switcher;
