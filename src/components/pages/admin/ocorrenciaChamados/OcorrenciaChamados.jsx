import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import axios from 'axios';

import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';

import history from '../../../../history';
import Scrollable from '../../../common/scrollable/Scrollable';
import AppLoader from '../../../common/appLoader/AppLoader';
import Card from '../../../common/card/Card';

// import {
//   Wrapper,
// } from './styles';

class OcorrenciaChamados extends PureComponent {
  constructor() {
    super();
  }

  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

  state = {
    activeIndex: 0,
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {

    const data = [
      { name: 'Erro sistema', value: 148 },
      { name: 'Erro de operação', value: 107 },
      { name: 'Adm. Servidor', value: 83 },
      { name: 'Duvida', value: 77 },
      { name: 'Não Identificado', value: 53 },
      { name: "Reports e Bi's", value: 18 },

    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#DD8042', '#CC8042'];

    const renderActiveShape = (props) => {
      const RADIAN = Math.PI / 180;
      const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
      } = props;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      const sx = cx + (outerRadius + 10) * cos;
      const sy = cy + (outerRadius + 10) * sin;
      const mx = cx + (outerRadius + 30) * cos;
      const my = cy + (outerRadius + 30) * sin;
      const ex = mx + (cos >= 0 ? 1 : -1) * 22;
      const ey = my;
      const textAnchor = cos >= 0 ? 'start' : 'end';


      return (
        <g>
          <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
          />
          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Quantidade ${value}`}</text>
          <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
            {`(Rate ${(percent * 100).toFixed(2)}%)`}
          </text>
        </g>
      );
    };

    return (
      <div>
        <h3>Chamados x Ocorrência - 01/09/2019 à 15/12/2019</h3>
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>
      </div>


    );
  }
}

export default OcorrenciaChamados;
