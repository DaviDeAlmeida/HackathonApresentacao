import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import qs from 'querystring';
import { Helmet } from 'react-helmet';

import { nextTick } from '../../../../../utils';
import { pageView } from '../../../../../analytics';
import { roles, getRoleName } from '../../../../../modules/auth';
import Details from '../../../../common/details/Details';
import AppLoader from '../../../../common/appLoader/AppLoader';
import Section from '../../../../common/section/Section';
import Input from '../../../../common/input/text';
import Select from '../../../../common/input/select/Select';
import {
  Wrapper,
  Content,
} from './styles';

@inject('AppStore')
@observer
class UserDetails extends Component {
  UNSAFE_componentWillMount() { // eslint-disable-line camelcase

    nextTick(pageView);

    const {
      location: {
        search,
      },
      AppStore: {
        UserStore: {
          load,
        },
      },
    } = this.props;

    const { id } = qs.parse(search.substring(1));

    load(id);
  }

  render() {
    const {
      AppStore: {
        UserStore: {
          isLoading,
          user,
          setPropValue,
        },
      },
    } = this.props;

    if (isLoading) return <AppLoader />;

    return (
      <Wrapper>
        <Helmet>
          <title>{user.email} | AccuScheduler</title>
        </Helmet>
        <Details header={user.email}>
          <Content>
            <Section title="Dados gerais">
              <Input
                mandatory
                label="Email"
                value={user.email}
              />
              <Input
                readOnly
                label="ID externo"
                value={user.externalId}
              />
              <Select
                mandatory
                label="Perfil"
                value={getRoleName(user.role)}
                options={Object.keys(roles).map((key) => ({
                  value: roles[key],
                  text: getRoleName(roles[key]),
                }))}
                onChange={(value) => setPropValue('role', value)}
              />
            </Section>
          </Content>
        </Details>
      </Wrapper>
    );
  }
}

UserDetails.propTypes = {
  AppStore: PropTypes.shape(), // eslint-disable-line react/require-default-props
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserDetails;
