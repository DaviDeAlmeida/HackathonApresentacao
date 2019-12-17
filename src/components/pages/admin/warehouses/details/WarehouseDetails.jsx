import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import qs from 'querystring';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { WEEK_DAYS_NAMES } from '../../../../../modules/calendar';

import IntervalWarehouse from '../../../../common/intervalWarehouse/IntervalWarehouse';
import Button from '../../../../common/button/Button';
import Layout from '../../../../common/layout/Layout';
import Details from '../../../../common/details/Details';
import AppLoader from '../../../../common/appLoader/AppLoader';
import Section from '../../../../common/section/Section';
import Input from '../../../../common/input/text';
import InputNumber from '../../../../common/input/number';
import {
  Content,
  Column,
  Wrapper,
} from './styles';

@inject('AppStore')
@observer
class Warehouse extends Component {
  constructor() {
    super();

    this.state = {
      errors: [],
    };
  }

  componentDidMount() {
    const {
      location: {
        search,
      },
      AppStore: {
        WarehouseStore: {
          loadWarehouse,
        },
      },
    } = this.props;

    const { id } = qs.parse(search.substring(1));

    loadWarehouse(id);
  }

  _handleInputChange = (prop, { target: { value } }) => {
    const {
      AppStore: {
        WarehouseStore: {
          setWarehouseProp,
        },
      },
    } = this.props;

    setWarehouseProp(prop, value);

    const errorsFiltered = this.state.errors.filter((e) => e.prop != prop);
    this.setState({ errors: errorsFiltered });
    document.querySelector(`input[name="${prop}"]`).style.borderBottom = '1px solid #9bb1da';
  }

  _handleAddressChange = (prop, { target: { value } }) => {
    const {
      AppStore: {
        WarehouseStore: {
          setAddress,
        },
      },
    } = this.props;

    setAddress(prop, value);

    const errorsFiltered = this.state.errors.filter((e) => e.prop != prop);
    this.setState({ errors: errorsFiltered });
    document.querySelector(`input[name="${prop}"]`).style.borderBottom = '1px solid #9bb1da';
  }

  _handleNewInterval = (e) => {

  }

  _handleSubmit = (e) => {
    e.preventDefault();
    const {
      AppStore: {
        WarehouseStore: {
          warehouse,
        },
      },
    } = this.props;

    const errors = [];
    let erro = {};

    if (!warehouse.description) {
      erro = {
        prop: 'description',
        msg: 'Informe a descrição.',
      };
      errors.push(erro);
    }

    if (!warehouse.capacity) {
      erro = {
        prop: 'capacity',
        msg: 'Informe a capacidade.',
      };
      errors.push(erro);
    }

    if (!warehouse.totalReceivingDocks) {
      erro = {
        prop: 'totalReceivingDocks',
        msg: 'Informe as docas de recebimento.',
      };
      errors.push(erro);
    }

    if (!warehouse.address.country) {
      erro = {
        prop: 'country',
        msg: 'Informe o país.',
      };
      errors.push(erro);
    }

    if (!warehouse.address.state) {
      erro = {
        prop: 'state',
        msg: 'Informe o estado.',
      };
      errors.push(erro);
    }

    if (!warehouse.address.city) {
      erro = {
        prop: 'city',
        msg: 'Informe a cidade.',
      };
      errors.push(erro);
    }

    if (!warehouse.address.zipCode) {
      erro = {
        prop: 'zipCode',
        msg: 'Informe o CEP.',
      };
      errors.push(erro);
    }

    if (!warehouse.address.streetAddress) {
      erro = {
        prop: 'streetAddress',
        msg: 'Informe o endereço.',
      };
      errors.push(erro);
    }

    if (errors.length > 0) {
      this.setState({ errors });
      errors.map((e) => document.querySelector(`input[name="${e.prop}"]`).style.borderBottom = '1px solid #ff0000');

    }

    // chama a api

  }

  render() {
    console.log(this.state);

    const {
      AppStore: {
        WarehouseStore: {
          isLoading,
          warehouse,
          warehouse: {
            description,
            externalId,
            capacity,
            totalReceivingDocks,
            address,
          },
        },
      },
    } = this.props;

    if (isLoading) return <AppLoader />;

    // console.log('warehouse', warehouse);
    console.log(this.state);

    return (
      <Details
        header={description}
      >
        <Helmet>
          <title>{`${description} | AccuScheduler`}</title>
        </Helmet>
        <Content>
          <form id="formWarehouse" onSubmit={(e) => this._handleSubmit(e)}>

            <Section title="Dados gerais">

              {
                this.state.errors.length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    {this.state.errors.map((e) => (
                      <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0 10px 0' }}>
                        <span key={e.prop}>{e.msg}</span>
                      </div>
                    ))}
                  </div>
                )
              }

              <Wrapper>
                <Column>
                  <Input
                    mandatory
                    width="300px"
                    label="Descrição"
                    value={description}
                    onChange={(e) => this._handleInputChange('description', e)}
                    name="description"
                  />
                  <Input
                    readOnly
                    width="300px"
                    label="ID externo"
                    value={externalId}
                  />
                  <InputNumber
                    mandatory
                    width="300px"
                    label="Capacidade"
                    value={capacity}
                    onChange={(e) => this._handleInputChange('capacity', e)}
                    name="capacity"
                  />
                  <InputNumber
                    mandatory
                    width="300px"
                    label="Docas de recebimento"
                    value={totalReceivingDocks}
                    onChange={(e) => this._handleInputChange('totalReceivingDocks', e)}
                    name="totalReceivingDocks"
                  />
                </Column>
                {address && (
                <Column>
                  <Input
                    mandatory
                    width="300px"
                    label="País"
                    value={address.country}
                    onChange={(e) => this._handleAddressChange('country', e)}
                    name="country"
                  />
                  <Input
                    mandatory
                    width="300px"
                    label="Estado"
                    value={address.state}
                    onChange={(e) => this._handleAddressChange('state', e)}
                    name="state"
                  />
                  <Input
                    mandatory
                    width="300px"
                    label="Cidade"
                    value={address.city}
                    onChange={(e) => this._handleAddressChange('city', e)}
                    name="city"
                  />
                  <Input
                    mandatory
                    width="300px"
                    label="CEP"
                    value={address.zipCode}
                    onChange={(e) => this._handleAddressChange('zipCode', e)}
                    name="zipCode"
                  />
                  <Input
                    mandatory
                    width="300px"
                    label="Endereço"
                    value={address.streetAddress}
                    onChange={(e) => this._handleAddressChange('streetAddress', e)}
                    name="streetAddress"
                  />
                </Column>
                )}
              </Wrapper>
            </Section>


            <Section title="Horários de intervalo">
              <Wrapper>
                <Column>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    {Object.entries(WEEK_DAYS_NAMES).map(([key, value]) => (
                      <IntervalWarehouse key={key} value={value} />

                    ))}
                  </div>


                </Column>

              </Wrapper>
            </Section>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" text="Cadastrar" onClick={(e) => this._handleNewInterval(e)} />
            </div>

          </form>
        </Content>
      </Details>
    );
  }
}

Warehouse.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  AppStore: PropTypes.shape({ // eslint-disable-line react/require-default-props
    WarehouseStore: PropTypes.shape(),
  }),
};

export default Warehouse;
