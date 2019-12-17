import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper,
  Header,
  Content,
  CollapseButton,
} from './styles';

const Section = ({ title, collapsable, children }) => {
  const [collapsed, collapse] = useState(false);

  return (
    <Wrapper>
      <Header>
        {collapsable && (
          <CollapseButton
            collapsed={collapsed}
            onClick={() => collapse(!collapsed)}
            type="button"
          />
        )}
        {title}
      </Header>
      <Content collapsed={collapsed}>
        {children}
      </Content>
    </Wrapper>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  collapsable: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Section.defaultProps = {
  title: undefined,
  collapsable: true,
};

export default Section;
