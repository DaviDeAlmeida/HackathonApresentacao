import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import history from '../../../../history';
import Scrollable from '../../../common/scrollable/Scrollable';
import Table from '../../../common/table/Table';
import Toolbar from '../../../common/toolbar/Toolbar';
import ToolbarButton from '../../../common/toolbar/button/ToolbarButton';
import AppLoader from '../../../common/appLoader/AppLoader';
import Card from '../../../common/card/Card';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {
  Wrapper,
} from './styles';

@inject('AppStore')
@observer
class TempoMedioResolucao extends Component {
  componentDidMount() {}

  render() {

    const data = [
      { name: '02/12/2019', media: 2 },
      { name: '03/12/2019', media: 3 },
      { name: '04/12/2019', media: 4 },
      { name: '05/12/2019', media: 5 },
      { name: '06/12/2019', media: 1 },
      { name: '09/12/2019', media: 6 },
    ];

    return (
      <div>
        <Card title="Tempo médio de resolução - 02/12/2019 à 15/12/2019">
              <LineChart
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
                <Line type="monotone" dataKey="media" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </Card>
      </div>
    );
  }
}

export default TempoMedioResolucao;
