import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut as DoughnutChart, Chart } from 'react-chartjs-2';

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

const Doughnut = ({
  data,
  options,
  height,
}) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    cutoutPercentage: 60,
    elements: {
      arc: {
        borderWidth: 0,
      },
      ...options.elements,
    },
    legend: {
      display: false,
    },
  };

  return (
    <DoughnutChart data={data} options={chartOptions} height={height} />
  );
};

Doughnut.propTypes = {
  data: PropTypes.shape().isRequired,
  options: PropTypes.shape({
    elements: PropTypes.shape({
      center: PropTypes.shape({
        text: PropTypes.node.isRequired,
      }),
    }),
  }),
  height: PropTypes.number,
};

Doughnut.defaultProps = {
  height: 165,
  options: {},
};

export default Doughnut;
