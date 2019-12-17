import React from 'react';
import PropTypes from 'prop-types';

import {
  Tr,
  Td,
} from './styles';

const TableRow = ({ status, columns, columnsToLeft }) => (
  <Tr
    status={status}
    columnsToLeft={columnsToLeft}
  >
    {columns.map((column, i) => (
      <Td
        key={column.id || i}
        alignTo={column.alignTo}
        maxWidth={column.maxWidth}
      >
        {column.content}
      </Td>
    ))}
  </Tr>
);

TableRow.propTypes = {
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    alignTo: PropTypes.string,
    maxWidth: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  })).isRequired,
  columnsToLeft: PropTypes.number,
};

TableRow.defaultProps = {
  status: undefined,
  columnsToLeft: 2,
};

export default TableRow;
