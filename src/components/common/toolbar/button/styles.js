import styled from 'styled-components';
import colors from '../../../../colors';

const ButtonStyled = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  color: ${colors.white};
  background-color: ${({ primary, disabled }) => (primary && !disabled ? colors.blueF : colors.blueA)};
  border: 1px solid ${colors.white};
  border-radius: 2px;
  user-select: none;
  min-width: 140px;

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
  ButtonStyled, // eslint-disable-line import/prefer-default-export
};
