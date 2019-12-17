import styled from 'styled-components';

import colors from '../../../colors';

import add from './images/item-add.svg';
import addOff from './images/item-add-off.svg';
import remove from './images/item-remove.svg';
import removeOff from './images/item-remove-off.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Selector = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  height: 25px;
  width: 25px;

  ${({ disabled }) => !disabled && `
    cursor: pointer;
  `}
`;

const AddButton = styled(Button)`
  &:before {
    content: url(${({ disabled }) => (disabled ? addOff : add)});
  }
`;

const RemoveButton = styled(Button)`
  &:before {
    content: url(${({ disabled }) => (disabled ? removeOff : remove)});
  }
`;

const Input = styled.input`
  width: 70px;
  margin: 0 5px;
  padding: 8px 0;
  text-align: center;
  border: none;
  border: 1px solid ${colors.grayC};
  border-radius: 3px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
`;

const Label = styled.label`
  margin-top: 5px;
  font-size: 12px;
  color: ${colors.grayB};
`;

export {
  Container,
  Selector,
  AddButton,
  RemoveButton,
  Input,
  Label,
};
