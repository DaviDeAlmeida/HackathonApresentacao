import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;

  ${({ image, width, height }) => `
    background: url(${image});

    ${width && `width: ${width};`}
    ${height && `height: ${height};`}
  `}
`;

export { StyledButton }; // eslint-disable-line import/prefer-default-export
