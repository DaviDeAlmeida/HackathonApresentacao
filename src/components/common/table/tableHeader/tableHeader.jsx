import React from 'react';
import PropTypes from 'prop-types';

import {
  THead,
  Th,
} from './styles';


const TableHeader = ({ columns }) => (
  <THead>
    {columns.map((column) => (
      <Th
        key={column.id}
        alignTo={column.alignTo}
        maxWidth={column.maxWidth}
      >
        {column.content}
      </Th>
    ))}
  </THead>
);

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    alignTo: PropTypes.string,
    maxWidth: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  })).isRequired,
};

export default TableHeader;
