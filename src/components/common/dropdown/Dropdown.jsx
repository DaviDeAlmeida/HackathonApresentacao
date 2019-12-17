import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import useOutsideClick from '../../hooks/useOutsideClick';

import {
  Wrapper,
  Select,
  Content,
  Item,
} from './styles';

const Dropdown = ({
  value,
  items,
  content,
  onSelect,
  customSelect,
}) => {
  const [expanded, expand] = useState(false);
  const [minWidth, setMinWidth] = useState(undefined);

  const wrapper = useRef(null);

  const toggleExpanded = () => expand(!expanded);

  useOutsideClick(
    wrapper,
    expanded,
    toggleExpanded,
  );

  useEffect(() => {
    setMinWidth(wrapper.current.offsetWidth);
  }, []);

  const selected = items.find((item) => item.id === value);

  return (
    <Wrapper ref={wrapper}>
      {customSelect === undefined && (
        <Select
          onClick={toggleExpanded}
        >
          {selected && selected.content}
        </Select>
      )}
      {customSelect && (
        React.cloneElement(customSelect, { onClick: toggleExpanded })
      )}
      {expanded && (
        <Content minWidth={minWidth}>
          {content}
          {content === undefined && items && items.map((item) => (
            <Item
              key={item.id}
              selected={item.id === value}
              onClick={() => {
                if (item.id !== value) onSelect(item.id);
                toggleExpanded();
              }}
            >
              {item.content}
            </Item>
          ))}
        </Content>
      )}
    </Wrapper>
  );
};

Dropdown.propTypes = {
  value: PropTypes.string,
  onSelect: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
  })),
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  customSelect: PropTypes.node,
};

Dropdown.defaultProps = {
  value: undefined,
  items: [],
  content: undefined,
  onSelect: () => {},
  customSelect: undefined,
};

export default Dropdown;
