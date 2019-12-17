import styled from 'styled-components';
import colors from '../../../../colors';
import { statusColor } from '../../../../helpers/OrdersStatus';

const Span = styled.span`
  border-radius: 3px;
  background-color: ${(props) => statusColor[props.status]};
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

export { Span }; // eslint-disable-line
