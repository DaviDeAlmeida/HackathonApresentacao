import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

import { getStatus } from '../../../helpers/OrdersStatus';
import split from './images/status-split.svg';

import {
  LeadTimeContainer,
  TimeRange,
  FirstDate,
  LastDate,
  Text,
} from './styles';

const dateDiff = (a, b) => {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
};

const getLeadTimeData = (date) => {
  const now = new Date();
  const diff = dateDiff(now, date);
  const daysToLeadtime = diff < 0 ? 0 : diff;

  return {
    today: `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`,
    final: `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`,
    text: `${daysToLeadtime} dia(s) para o leadtime`,
  };
};

const LeadTimeIndicator = ({
  leadTime,
  status,
}) => {
  const {
    today,
    final,
    text,
  } = getLeadTimeData(leadTime);

  return (
    <LeadTimeContainer>
      <TimeRange>
        <FirstDate>{today}</FirstDate>
        <Image src={split} />
        <LastDate status={getStatus(status)}>{final}</LastDate>
      </TimeRange>
      <Text>{text}</Text>
    </LeadTimeContainer>
  );
};

LeadTimeIndicator.propTypes = {
  leadTime: PropTypes.instanceOf(Date).isRequired,
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default LeadTimeIndicator;
