import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import React, { PureComponent } from 'react';
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

class OcorrenciaChamados extends Component {

  // constructor() {
  //   super();
  //   this.input = React.createRef();
  //   this.state = {
  //     name: '',
  //     uv: 0,
  //   };
  // }

  // receiveFile = async (e) => {

  //   debugger;

  //   const file = e.target.files[0];

  //   const formData = new FormData();

  //   formData.append('file', file);

  //   const res = await axios.post('https://localhost:44339/api/planilha/uploadplanilha', formData, {
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   });

  //   debugger;

  //   const dados = Object.keys(res.data.produtividade).map((key) => ({
  //     name: key,
  //     uv: res.data.produtividade[key],
  //   }));

  //   this.setState({ lista: dados });

  //   debugger;

  // }

  render() {

    const data = [
      { name: 'Erro sistema', value: 148 },
      { name: 'Erro de operação', value: 107 },
      { name: 'Adm. Servidor', value: 83 },
      { name: 'Duvida', value: 77 },
      { name: 'Não Identificado', value: 53 },
      { name: "Report Bi's/ Relatorios", value: 18 },

    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#DD8042', '#CC8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
       const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    return (
      <div>
        {this.state.lista && (
          <Card title="Chamados x Ocorrência - 01/09/2019 à 15/12/2019">
            <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
          </Card>

        )}
        <input
          ref={(ref) => this.input = ref}
          type="file"
          onChange={(e) => this.receiveFile(e)}
        />
      </div>
    );
  }
}

export default OcorrenciaChamados;
