import styled from 'styled-components';

import colors from '../../../colors';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 30px;

  &:focus-within {
    label {
      color: ${colors.blueF};
    }
  }

  ${({ width }) => `
    width: ${width};
  `}
`;

const InputContainer = styled.div`
  position: relative;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    color: ${colors.grayA};
  }
`;

const Label = styled.label`
  font-family: 'Roboto-Bold', 'Roboto';
  font-weight: 700;
  font-size: 11px;
  color: ${colors.grayA};
  position: relative;

  ${({ mandatory }) => mandatory && `
    &:after {
      content: '';
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: ${colors.orangeB};
      top: 50%;
      transform: translateY(-50%);
      margin-left: 5px;
    }
  `}
`;

const InputStyled = styled.input`
  background: transparent;
  outline: 0;
  border: 0;
  padding: 2px 0px;
  border-bottom: 1px solid ${colors.blueD};
  font-family: 'Roboto-Regular', 'Roboto';
  font-size: 12px;
  color: ${colors.grayA};
  padding-right: ${({ hasIcon }) => (hasIcon ? '14px' : '0px')} !important;
  display: flex;
  flex: 1 0 auto;
  width: 100%;

  &:focus {
    border-color: ${colors.blueF};
    caret-color: ${colors.blueF};
  }
`;

const Icon = styled.i`
  width: 0;
  &:before {
    content: ${({ icon }) => icon};
    width: 30px;
    height: 30px;
  }
`;

export {
  Container,
  InputContainer,
  Label,
  InputStyled,
  Icon,
};
