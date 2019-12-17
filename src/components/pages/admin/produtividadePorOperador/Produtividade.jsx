import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import axios from 'axios';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'react-chartjs-2';
import history from '../../../../history';
import Scrollable from '../../../common/scrollable/Scrollable';
import AppLoader from '../../../common/appLoader/AppLoader';

import {
  Wrapper,
} from './styles';

class Produtividade extends Component {

  constructor() {
    super();
    this.input = React.createRef();
    this.state = {
      name: '',
      uv: 0,
    };
  }

  receiveFile = async (e) => {

    debugger;

    const file = e.target.files[0];

    const formData = new FormData();

    formData.append('file', file);

    const res = await axios.post('https://localhost:44339/api/planilha/uploadplanilha', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    debugger;

    const dados = Object.keys(res.data.produtividade).map((key) => ({
      name: key,
      uv: res.data.produtividade[key],
    }));

    this.setState({ lista: dados });

    debugger;

  }

  render() {

    return (
      <div>
        {/* <LineChart
          width={500}
          height={300}
          data={this.state.lista && this.state.lista}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart> */}

        <input
          ref={(ref) => this.input = ref}
          type="file"
          onChange={(e) => this.receiveFile(e)}
        />
      </div>
    );
  }
}

export default Produtividade;
