import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import history from '../../../../history';
import Scrollable from '../../../common/scrollable/Scrollable';
import AppLoader from '../../../common/appLoader/AppLoader';
import Card from '../../../common/card/Card';

import {
  Wrapper,
} from './styles';

@inject('AppStore')
@observer
class Produtividade extends Component {

  constructor() {
    super();
    this.input = React.createRef();
    this.state = {
      name: '',
      uv: 0,
      title: '01/09/2019 à 15/12/2019',
    };
  }


  render() {

    const { AppStore: { UserStore: { lista } } } = this.props;

    return (
      <div>
        {lista && (
          <div>
            <Card title="Produtividade x Operador - 01/09/2019 à 15/12/2019">
              <LineChart
                width={500}
                height={300}
                data={lista}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="quantidade" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </Card>
          </div>
        )}

      </div>
    );
  }
}

export default Produtividade;
