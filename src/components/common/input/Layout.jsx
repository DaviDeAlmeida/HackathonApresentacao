import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  InputContainer,
  Label,
} from './styles';

const Layout = ({
  label,
  width,
  mandatory,
  children,
}) => (
  <Container width={width}>
    {label && (
      <Label
        mandatory={mandatory}
      >
        {label}
      </Label>
    )}
    <InputContainer>
      {children}
    </InputContainer>
  </Container>
);

Layout.propTypes = {
  label: PropTypes.string,
  width: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  mandatory: PropTypes.bool,
};

Layout.defaultProps = {
  label: undefined,
  mandatory: false,
};

export default Layout;
