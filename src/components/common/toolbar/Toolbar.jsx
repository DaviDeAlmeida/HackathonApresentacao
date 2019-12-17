import React from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

import {
  Container,
  Content,
  CloseButton,
  Text,
} from './styles';

const Toolbar = ({ onCloseClick, text, children }) => (
  <Container>
    <Content>

      {onCloseClick && (
        <CloseButton
          onClick={onCloseClick}
        >
          <MdClose size={18} />
        </CloseButton>
      )}

      <Text>{text}</Text>
    </Content>

    {children && (
      <Content reversed>
        {children}
      </Content>
    )}

  </Container>
);

Toolbar.propTypes = {
  onCloseClick: PropTypes.func,
  text: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.none),
    PropTypes.node,
  ]),
};

Toolbar.defaultProps = {
  onCloseClick: undefined,
  text: undefined,
  children: undefined,
};

export default Toolbar;
