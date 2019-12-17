import styled from 'styled-components';
import colors from '../../../../colors';

const Wrapper = styled.li`
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  text-transform: uppercase;

  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;
  font-size: 12px;
  color: ${colors.grayA};

  padding: 0 20px 4px 20px;

  ${({ active }) => active && `
    cursor: auto;
    border-bottom: 4px solid ${colors.blueB};
  `}
`;

export { Wrapper };
