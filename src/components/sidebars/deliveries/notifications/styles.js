import styled from 'styled-components';

import colors from '../../../../colors';

const Container = styled.div`
  display: flex;
  min-width: 250px;
  flex-direction: column;
`;

const ChartContainer = styled.div``;

const NotificationsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  height: 0;
`;

const StyledNotification = styled.div`
  display: flex;
  flex: 0 0 100%;
  width: 100%;
  flex-flow: column;
  margin: 10px 0;
`;

const Time = styled.div`
  font-size: 11px;
  color: ${colors.grayB};
  margin: 0px 0px 10px;
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${colors.grayA};
  margin: 0px 0px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${colors.blueC}
`;

const DeliveryId = styled.span`
  display: inline-flex;
  font-size: 14px;
  color: ${colors.blueF};
`;

export {
  Container,
  ChartContainer,
  NotificationsContainer,
  StyledNotification,
  Time,
  Description,
  DeliveryId,
};
