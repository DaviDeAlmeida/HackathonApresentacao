import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut, Chart } from 'react-chartjs-2';

import Scrollable from '../../../common/scrollable/Scrollable';
import { getTextByStatus, getColorByStatus } from '../../../../helpers/DeliveriesStatus';

import {
  Container,
  ChartContainer,
  NotificationsContainer,
  StyledNotification,
  Time,
  Description,
  DeliveryId,
} from './styles';

Chart.pluginService.register({
  beforeDraw: function beforeDraw(chart) {
    if (chart.config.options.elements.center) {
      const {
        chart: {
          ctx,
          config: {
            options: {
              elements: {
                center: {
                  fontStyle,
                  text,
                  color,
                  // sidePadding,
                },
              },
            },
          },
        },
      } = chart;

      // Get options from the center object in options
      // var centerConfig = chart.config.options.elements.center;
      // var fontStyle = centerConfig.fontStyle || 'Arial';
      // var txt = centerConfig.text;
      // var color = centerConfig.color || '#000';
      // var sidePadding = centerConfig.sidePadding || 20;
      // const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
      // Start with a base font of 30px
      ctx.font = `26px ${fontStyle || '\'Roboto-Medium\', \'Roboto\''}`;

      // Get the width of the string and also the width of the element
      // minus 10 to give it 5px side padding
      // const stringWidth = ctx.measureText(text).width;
      // const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      // const widthRatio = elementWidth / stringWidth;
      // const newFontSize = Math.floor(30 * widthRatio);
      // const elementHeight = (chart.innerRadius * 2);

      // Pick a new font size so it will not be larger than the height of label.
      // const fontSizeToUse = Math.min(newFontSize, elementHeight);

      // Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      // ctx.font = fontSizeToUse+"px " + fontStyle;
      ctx.fillStyle = color;

      // Draw text in center
      ctx.fillText(text, centerX, centerY);
    }
  },
});

const Notifications = ({ totalDeliveriesByStatus }) => {

  const data = {
    labels: totalDeliveriesByStatus.map((item) => getTextByStatus(item.status)),
    datasets: [
      {
        data: totalDeliveriesByStatus.map((item) => item.count),
        backgroundColor: totalDeliveriesByStatus.map((item) => getColorByStatus(item.status)),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutoutPercentage: 60,
    elements: {
      arc: {
        borderWidth: 0,
      },
      center: {
        text: totalDeliveriesByStatus.reduce((total, item) => total + item.count, 0),
        sidePadding: 15,
      },
    },
    legend: {
      display: false,
    },
  };

  return (
    <Container>
      <ChartContainer>
        <Doughnut data={data} options={options} height={165} />
      </ChartContainer>
      <NotificationsContainer>
        {/* <Scrollable>
          <StyledNotification>
            <Time>Há 15 minutos</Time>
            <Description>
              Entrega <DeliveryId>ENTR02542</DeliveryId> confirmada para 30/06. Farmácias São João – CD Osaco/SP
            </Description>
          </StyledNotification>
        </Scrollable> */}
      </NotificationsContainer>
    </Container>
  );
};

Notifications.propTypes = {
  totalDeliveriesByStatus: PropTypes.instanceOf(Array).isRequired,
};

export default Notifications;