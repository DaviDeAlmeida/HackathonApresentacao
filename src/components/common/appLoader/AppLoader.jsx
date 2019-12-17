import React from 'react';
import { Loader } from 'semantic-ui-react';

import {
  LoaderContainer,
  Dimmer,
} from './styles';

const AppLoader = () => (
  <LoaderContainer>
    <Dimmer inverted active>
      <Loader>Carregando</Loader>
    </Dimmer>
  </LoaderContainer>
);

export default AppLoader;
