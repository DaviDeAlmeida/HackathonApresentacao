import styled from 'styled-components';
import colors from '../../../colors';

const Badge = styled.span`
  border-radius: 3px;
  background-color: ${({ color }) => color};
  color: ${colors.white};
  min-width: 112px;
  height: 24px;
  display: flex;
  flex: 0 1 240px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
`;


export { Badge };
