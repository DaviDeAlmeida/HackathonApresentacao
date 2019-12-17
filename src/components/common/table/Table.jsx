import React, { useState } from 'react';
import PropTypes from 'prop-types';

import EmptyList from '../emptyList/EmptyList';
import TableHeader from './tableHeader/tableHeader';
import TableRow from './tableRow/TableRow';
import {
  Container,
  TBody,
  THead,
  CollapseButton,
} from './styles';

const Table = ({ header, rows, collapsable }) => {
  const [collapsed, collapse] = useState(false);

  return (
    <Container>
      {header && (
        <THead>
          {collapsable && (
            <CollapseButton
              collapsed={collapsed}
              onClick={() => collapse(!collapsed)}
            />
          )}
          <TableHeader
            columns={header.columns}
          />
        </THead>
      )}
      <TBody collapsed={collapsed}>
        {rows.map((row) => (
          <TableRow
            key={row.id}
            status={row.status}
            columns={row.columns}
            columnsToLeft={row.columnsToLeft}
          />
        ))}
        {rows.length < 1 && <EmptyList />}
      </TBody>
    </Container>
  );
};

Table.propTypes = {
  header: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      maxWidth: PropTypes.string,
      content: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
      ]).isRequired,
    })),
  }),
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string,
    columnsToLeft: PropTypes.number,
    columns: PropTypes.arrayOf(PropTypes.shape({
      maxWidth: PropTypes.string,
      content: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
      ]),
    })),
  })).isRequired,
  collapsable: PropTypes.bool,
};

Table.defaultProps = {
  header: undefined,
  collapsable: false,
};

export default Table;
