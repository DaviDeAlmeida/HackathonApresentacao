import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { nextTick } from '../../../../../utils';
import { pageView } from '../../../../../analytics';
import Input from '../../../../common/input/text';
import Toolbar from '../../../../common/toolbar/Toolbar';
import ToolbarButton from '../../../../common/toolbar/button/ToolbarButton';
import history from '../../../../../history';
import Select from '../../../../common/input/select/Select';
import Layout from '../../../../common/layout/Layout';
import Card from '../../../../common/card/Card';
import Details from '../../../../common/details/Details';
import Dropdown from '../../../../common/dropdown/Dropdown';
import AppLoader from '../../../../common/appLoader/AppLoader';

import {
  Container,
  Content,
  Header,
  Errors,
  Sort,
  Options,
  Wrapper,
} from './styles';

@inject('AppStore')
@observer
class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      role: '',
      externalId: '',
      ownerId: '',
    };
  }

  UNSAFE_componentWillMount() { // eslint-disable-line camelcase
    nextTick(pageView);
  }

  componentDidMount() {
    const {
      AppStore: {
        UsersStore: {
          loadOwners,
        },
      },
    } = this.props;

    loadOwners();
  }

  componentWillUnmount() {
    const {
      AppStore: {
        UsersStore: {
          reset,
        },
      },
    } = this.props;

    reset();
  }

  render() {

    const {
      AppStore: {
        UsersStore: {
          register,
          registerErros,
          isLoading,
        },
      },
    } = this.props;

    const roleOptions = [
      {
        id: 'AccuScheduler_Administrator',
        content: 'Administrador',
      },
      {
        id: 'AccuScheduler_Analyst',
        content: 'Analista',
      },
      {
        id: 'AccuScheduler_Supplier',
        content: 'Fornecedor',
      },
      {
        id: 'AccuScheduler_Warehouse',
        content: 'CD',
      },
    ];

    return (
      <Layout>
        {isLoading && (
          <AppLoader />
        )}
        <Details
          header={(
            <Fragment>
              <div>Cadastrar usuário</div>
            </Fragment>
          )}
        >
          <Content>
            <Input
              width="20%"
              label="E-mail"
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
              mandatory
            />
            <Input
              width="20%"
              label="ID externo"
              value={this.state.externalId}
              onChange={(event) => this.setState({ externalId: event.target.value })}
            />
            <Sort>
                Perfil:
              <Options>
                <Dropdown
                  value={this.state.role}
                  onSelect={(e, { id }) => this.setState({ role: id })}
                  items={roleOptions}
                />
              </Options>
            </Sort>
            {registerErros && (
            <Errors>
              {registerErros.map((error) => (
                <li>
                  {error}
                </li>
              ))}
            </Errors>
            )}
          </Content>
        </Details>
        <Toolbar>
          <ToolbarButton
            primary
            text="Cadastrar"
            onClick={() => register(this.state)}
          />
          <ToolbarButton
            text="Cancelar"
            onClick={() => history.push('/admin')}
          />
        </Toolbar>
      </Layout>
    );
  }
}

RegisterUser.propTypes = {
  AppStore: PropTypes.shape(), // eslint-disable-line react/require-default-props
};

export default RegisterUser;
