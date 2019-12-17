import styled from 'styled-components';

import colors from '../../../colors';

import off from './images/checkbox-off.svg';
import on from './images/checkbox-on.svg';

const Label = styled.label`
  font-size: 13px;
  color: ${colors.grayA};
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
`;

const CheckboxStyled = styled.input`
  width: 16px;
  height: 0;
  position: relative;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};

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
  CheckboxStyled,
};
