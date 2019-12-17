import React from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper,
  Main,
  Header,
  Title,
  Close,
  Content,
  ToolbarContent,
} from './styles';

const Modal = ({
  title,
  closed,
  onClose,
  children,
  toolbar,
}) => (
  <Wrapper closed={closed}>
    <Main>
      <Header>
        {title && <Title>{title}</Title>}
        <Close
          onClick={(e) => {
            e.stopPropagation();
            onClose(e);
          }}
        />
      </Header>
      <Content>
        {children}
      </Content>
      {toolbar && (
        <ToolbarContent>
          {toolbar}
        </ToolbarContent>
      )}
    </Main>
  </Wrapper>
);

Modal.propTypes = {
  closed: PropTypes.bool,
  toolbar: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
};

Modal.defaultProps = {
  title: undefined,
  closed: true,
  toolbar: undefined,
};

export default Modal;
