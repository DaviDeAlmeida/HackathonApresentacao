import React from 'react';
import PropTypes from 'prop-types';

import {
  Content,
  Title,
  Info,
} from './styles';

const TableContent = ({
  title,
  secondaryContent,
  pushTo,
  big,
  bold,
}) => (
  <Content
    pushTo={pushTo}
  >
    <Title
      big={big}
      bold={bold}
    >
      {title}
    </Title>
    {secondaryContent && (
      <Info>{secondaryContent.join(' / ')}</Info>
    )}
  </Content>
);

TableContent.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  secondaryContent: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  pushTo: PropTypes.string,
  bold: PropTypes.bool,
  big: PropTypes.bool,
};

TableContent.defaultProps = {
  secondaryContent: undefined,
  pushTo: undefined,
  bold: false,
  big: false,
};

export default TableContent;
