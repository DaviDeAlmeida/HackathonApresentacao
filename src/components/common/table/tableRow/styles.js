import styled from 'styled-components';

import colors from '../../../../colors';
import { statusColor } from '../../../../helpers/OrdersStatus';

const Tr = styled.div`
  background-color: ${colors.white};

  display: flex;
  align-items: center;
  position: relative;

  width: 100%;
  padding: 15px 30px;
  margin-bottom: 2px;

  font-size: 12px;

  ${({ status }) => status && `
    &:before {
      content: '';
      position: absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      width: 10px;
      height: 100%;
      background-color: ${statusColor[status]};
    }
  `}
`;

const Td = styled.div`
  display: flex;
  flex: 0 1 ${({ maxWidth }) => maxWidth || '100%'};
  justify-content: center;
  padding-right: 8px;

  ${({ alignTo }) => alignTo && `
    justify-content: flex-${alignTo};
  `}
`;

export {
  Tr,
  Td,
};
