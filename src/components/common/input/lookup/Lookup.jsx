import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CancelToken } from 'axios';

import Input from '../text';
import Dropdown from '../../dropdown/Dropdown';
import {
  Wrapper,
} from './styles';

const Lookup = ({
  value,
  onChange,
}) => {
  const [query, setQuery] = useState('');

  return (
    <Wrapper>
      <Dropdown
        customSelect={(
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        )}
        value={value}
        onSelect={onChange}
      />
    </Wrapper>
  );
};

Lookup.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Lookup.defaultProps = {
  value: undefined,
  onChange: undefined,
};

export default Lookup;
