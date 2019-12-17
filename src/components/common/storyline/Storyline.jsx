import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getDateAndTime } from '../../../modules/calendar';
import Scrollable from '../scrollable/Scrollable';

import {
  Card,
  Image,
  Splitter,
  Content,
  Title,
  Text,
} from './styles';

const Storyline = ({ history }) => (
  <Scrollable>
    {history.map(({ date, content, statusColor }, i) => (
      <Fragment key={content}>
        {i !== 0 && <Splitter />}
        <Card
          statusColor={statusColor}
        >
          <Image />
          <Content>
            <Title>{getDateAndTime(new Date(date))}</Title>
            <Text dangerouslySetInnerHTML={{ __html: content }} />
          </Content>
        </Card>
      </Fragment>
    ))}
  </Scrollable>
);

Storyline.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    statusColor: PropTypes.string,
  })).isRequired,
};

export default Storyline;
