import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Card from '../../../common/card/Card';

const data = [
  {
    name: '02/12/2019', D0: 5, D1: 1, amt: 2400,
  },
  {
    name: '03/12/2019', D0: 3, D1: 0, amt: 2210,
  },
  {
    name: '04/12/2019', D0: 6, D1: 0, amt: 2290,
  },
  {
    name: '05/12/2019', D0: 2, D1: 0, amt: 2000,
  },
  {
    name: '06/12/2019', D0: 4, D1: 0, amt: 2181,
  },
  {
    name: '07/12/2019', D0: 7, D1: 0, amt: 2500,
  },
  {
    name: '08/12/2019', D0: 3, D1: 1, amt: 2500,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    return (

      <Card title="Aberura x Fechamento - 02/12/2019 à 15/12/2019">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="D0" fill="#8884d8" />
          <Bar dataKey="D1" fill="#82ca9d" />
        </BarChart>
      </Card>
    );
  }
}
