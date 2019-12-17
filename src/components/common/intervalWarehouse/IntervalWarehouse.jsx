import React, { Component } from 'react';
import Button from '../button/Button';

import Input from '../input/text';

class IntervalWarehouse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleInterval: false,
      intervalos: [],

      errors: [],

      inicio: '',
      fim: '',
    };

  }


  _handleNewInterval = (e) => {
    e.preventDefault();

    const errors = [];
    debugger;

    if (!this.state.inicio) {
      const msg = 'Insira o inicio.';
      errors.push(msg);
    }

    if (!this.state.fim) {
      const msg = 'Insira o fim.';
      errors.push(msg);
    }

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    const data = {
      dia: this.props.value,
      inicio: this.state.inicio,
      fim: this.state.fim,
    };

    this.setState({ intervalos: [...this.state.intervalos, data], toggleInterval: !this.state.toggleInterval });
  }

  _toggleNewInterval = () => {

    this.setState({ toggleInterval: !this.state.toggleInterval, inicio: '', fim: '', errors: [], });
  }

  render() {
    console.log(this.state);

    const { value } = this.props;
    const {
      toggleInterval, inicio, fim, errors,
    } = this.state;

    return (
      <div style={{ width: '150px' }}>
        <h5>{value}</h5>
        {
          toggleInterval
            ? (
              <div>
                {
                  errors.length > 0
                  && (
                  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
                    {errors.map((e) => <span style={{ color: 'red' }}>{e}</span>)}
                  </div>
                  )
                }
                <Input
                  mandatory
                  width="120px"
                  label="Início"
                  value={inicio}
                  onChange={(e) => this.setState({ inicio: e.target.value })}
                  name="inicio"
                />
                <Input
                  mandatory
                  width="120px"
                  label="Fim"
                  value={fim}
                  onChange={(e) => this.setState({ fim: e.target.value })}
                  name="fim"
                />
                <div>
                  <Button type="button" text="Incluir" onClick={(e) => this._handleNewInterval(e)} />
                  <Button type="button" text="Cancelar" onClick={() => this._toggleNewInterval()} />
                </div>
              </div>
            )
            : (
              <div>
                {this.state.intervalos.length > 0
                  && (
                  <div style={{marginBottom: '10px', display: 'flex', flexDirection: 'column'}}>
                    <span>Intervalos</span>
                    {this.state.intervalos.map((e) => <span>{e.inicio} - {e.fim}</span>)}
                  </div>
                  )}
                <Button type="button" text="Novo" onClick={() => this._toggleNewInterval()} />
              </div>
            )
        }
      </div>
    );
  }


}

export default IntervalWarehouse;
