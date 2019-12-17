import styled from 'styled-components';
import colors from '../../../colors';
import { getColorByStatus } from '../../../helpers/DeliveriesStatus';

const StyledLabel = styled.div`
  font-family: 'Roboto-bold', 'Roboto';
  font-weight: 700;
  font-size: 12px;
  padding: 2px 10px;
  margin-bottom: 1px;
  border-radius: 3px;
  color: ${colors.white};

  ${({ pointer }) => pointer && `
    cursor: pointer;
  `}

  background-color: ${({ status }) => getColorByStatus(status)};
`;

export { StyledLabel }; // eslint-disable-line import/prefer-default-export
