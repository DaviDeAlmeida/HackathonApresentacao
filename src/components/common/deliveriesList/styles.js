import styled from 'styled-components';
import colors from '../../../colors';

const Info = styled.div`
  color: ${colors.grayB};
`;

const StrongInfo = styled.div`
  font-family: 'Roboto-Bold', 'Roboto';
  font-weight: 700;
  color: ${colors.grayA};
  width: 125px;
  text-align: right;
`;

export {
  Info,
  StrongInfo,
};
