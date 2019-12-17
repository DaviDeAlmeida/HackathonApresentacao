import styled from 'styled-components';

import colors from '../../../colors';
import { statusColor } from '../../../helpers/OrdersStatus';

const LeadTimeContainer = styled.div`
  text-align: center;
  width: 145px;
  margin-left: auto;
`;

const TimeRange = styled.div`
  min-width: 142px;
  display: flex;
  justify-content: space-between;
`;

const FirstDate = styled.span`
  display: block;
  font-weight: 500;
  font-size: 12px;
  color: ${colors.grayA};
  position: relative;

  &:after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    content: '';
    width: 12px;
    height: 12px;
    border: 2px solid ${colors.blueD};
    border-radius: 50%;
    margin-left: 8px;
  }
`;
const LastDate = styled.span`
  display: block;
  font-weight: 500;
  font-size: 12px;
  color: ${colors.grayA};
  position: relative;

  &:before {
    position: absolute;
    top: 50%;
    left: -29px;
    transform: translateY(-50%);
    content: '';
    width: 12px;
    height: 12px;
    border: 2px solid ${(props) => statusColor[props.status]};
    border-radius: 50%;
    margin-left: 8px;
  }
`;

const Text = styled.span`
  display: block;
  font-size: 12px;
  color: ${colors.grayB};
  margin-top: 8px;
  text-align: right;
`;

export {
  LeadTimeContainer,
  TimeRange,
  FirstDate,
  LastDate,
  Text,
};
