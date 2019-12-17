import styled from 'styled-components';

import colors from '../../../colors';

const Button = styled.button`
  cursor: pointer;
`;

const ButtonStyled = styled(Button)`
  padding: 10px 20px;
  color: ${colors.white};
  background-color: ${({ primary, disabled }) => (primary && !disabled ? colors.blueF : colors.blueA)};
  border: 1px solid ${colors.white};
  border-radius: 2px;
  user-select: none;

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

const ImageButton = styled(Button)`
  ${({
    image,
    count,
    width,
    height,
  }) => `
    position: relative;

    width: ${width}px;
    height: ${height}px;
    background: url(${image});

    ${count && `
      ::after {
        position: absolute;
        top: -10px;
        right: -10px;

        display: flex;
        align-items: center;
        justify-content: center;

        content: '${count}';
        width: 20px;
        height: 20px;
        border-radius: 100%;

        font-family: 'Roboto-Bold', 'Roboto';
        font-weight: 700;
        font-size: 12px;

        color: ${colors.white};
        background-color: ${colors.orangeA};
      }
    `}
  `}
`;

export {
  ButtonStyled,
  ImageButton,
};
