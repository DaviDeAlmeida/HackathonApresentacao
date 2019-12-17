import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Tab from './tab/Tab';
import {
  Wrapper,
  Content,
  Navbar,
} from './styles';

const Tabs = ({ tabs }) => {
  const [selected, setSelected] = useState(tabs[0].label);

  return (
    <Wrapper>
      <Navbar>
        {tabs.map((tab) => (
          <Tab
            key={tab.label}
            label={tab.label}
            active={tab.label === selected}
            onClick={setSelected}
          />
        ))}
      </Navbar>
      <Content>
        {tabs.find((tab) => tab.label === selected).content}
      </Content>
    </Wrapper>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  })).isRequired,
};

export default Tabs;
