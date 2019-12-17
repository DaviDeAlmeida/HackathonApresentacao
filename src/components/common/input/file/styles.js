import styled from 'styled-components';
import colors from '../../../../colors';

const Input = styled.input`
  width: 0;
`;

const Label = styled.label`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;

  cursor: pointer;
  user-select: none;

  min-width: 140px;
  max-width: 200px;
  padding: 7px 20px;
  color: ${colors.white};
  background-color: ${({ primary, disabled }) => (primary && !disabled ? colors.blueF : colors.blueA)};
  border: 1px solid ${colors.white};
  border-radius: 2px;

  ${({ disabled }) => (disabled
    ? `
      color: ${colors.grayD};
      border-color: ${colors.grayD};
      cursor: auto;
    `
    : `
      &:hover {
        background-color: ${colors.blueJ};
      }
    `)}
`;

export {
  Input,
  Label,
};
