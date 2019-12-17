import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import { roles } from '../../../../modules/auth';
import dictionary from '../../../../dictionary';
import Navbar from '../../navbar/Navbar';
import {
  Wrapper,
  Content,
} from './styles';

const PageLayout = inject('AppStore')(observer(({
  url,
  children,
  AppStore: {
    AuthStore: {
      user: {
        profile: {
          role,
        },
      },
    },
  },
}) => {
  let links = [];

  if (role === roles.admin || role === roles.analyst || role === roles.supplier) {
    links = links.concat([
      {
        label: dictionary.t('header.orders'),
        url: ['/', '/pedidos'],
      },
      {
        label: dictionary.t('header.deliveries'),
        url: '/entregas',
      },
    ]);
  }

  if (role === roles.admin || role === roles.analyst || role === roles.warehouse) {
    links = links.concat([
      {
        label: 'Ocupação do CD',
        url: '/ocupacao',
      },
    ]);
  }

  if (role === roles.admin) {
    links = links.concat([
      {
        label: 'Administração',
        url: '/admin',
      },
    ]);
  }

  return (
    <Wrapper>
      <Navbar url={url} links={links} />
      <Content>
        {children}
      </Content>
    </Wrapper>
  );
}));

PageLayout.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

PageLayout.defaultProps = {
  children: undefined,
};

export default PageLayout;
