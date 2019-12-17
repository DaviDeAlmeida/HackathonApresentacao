import styled from 'styled-components';

import colors from '../../../colors';

import off from './images/radio-off.svg';
import on from './images/radio-on.svg';

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;
  font-size: 13px;
  color: ${colors.grayA};
`;

const RadioButtonStyled = styled.input`
  width: 16px;
  height: 0;
  position: relative;
  cursor: pointer;

  ${({ hasLabel }) => hasLabel && `
    margin-right: 8px;
  `}

  &:before {
    position: absolute;
    content: url(${off});
    width: 16px;
    height: 16px;
    top: 50%;
    transform: translateY(-50%);
  }

  &:checked:before {
    content: url(${on});
  }
`;

export {
  Label,
  RadioButtonStyled,
};
