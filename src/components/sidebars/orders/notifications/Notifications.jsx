import React from 'react';
import PropTypes from 'prop-types';

import Doughnut from '../../../common/charts/doughnut/Doughnut';
import Scrollable from '../../../common/scrollable/Scrollable';
import { getTextByStatus, getColorByStatus } from '../../../../helpers/OrdersStatus';

import {
  Container,
  ChartContainer,
  NotificationsContainer,
  StyledNotification,
  Time,
  Description,
  OrderId,
} from './styles';

const Notifications = ({ totalOrdersByStatus }) => {

  const data = {
    labels: totalOrdersByStatus.map((item) => getTextByStatus(item.status)),
    datasets: [
      {
        data: totalOrdersByStatus.map((item) => item.count),
        backgroundColor: totalOrdersByStatus.map((item) => getColorByStatus(item.status)),
      },
    ],
  };

  const options = {
    elements: {
      center: {
        text: totalOrdersByStatus.reduce((total, item) => total + item.count, 0),
      },
    },
  };

  return (
    <Container>
      <ChartContainer>
        <Doughnut data={data} options={options} />
      </ChartContainer>
      <NotificationsContainer>
        {/* <Scrollable>
          <StyledNotification>
            <Time>Há 15 minutos</Time>
            <Description>
              Pedido <OrderId>PED02542</OrderId> agendado para 30/06. Farmácias São João – CD Osaco/SP
            </Description>
          </StyledNotification>
        </Scrollable> */}
      </NotificationsContainer>
    </Container>
  );
};

Notifications.propTypes = {
  totalOrdersByStatus: PropTypes.instanceOf(Array).isRequired,
};

export default Notifications;
