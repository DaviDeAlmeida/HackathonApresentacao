import React from 'react';
import PropTypes from 'prop-types';

import Day from './day/Day';
import StatusTag from '../../../common/statusTag/StatusTag';
import Scrollable from '../../../common/scrollable/Scrollable';
import history from '../../../../history';
import calendar, { WEEK_DAYS_NAMES, isSameDay } from '../../../../modules/calendar';
import { Container, Weekday } from './styles';

const getCalendarDays = (month, year) => calendar(month, year).map((day) => new Date(day.join('-')));

const buildDays = (month, year, deliveries) => (
  getCalendarDays(month, year).map((day) => ({
    day,
    deliveries: deliveries.filter((delivery) => isSameDay(delivery.deliveryDate, day)),
  }))
);

const Calendar = ({ month, year, deliveries }) => (
  <Scrollable>
    <Container>
      {Object.keys(WEEK_DAYS_NAMES).map((key) => (
        <Weekday key={key}>{WEEK_DAYS_NAMES[key].substring(0, 3)}</Weekday>
      ))}
      {buildDays(month, year, deliveries).map((data) => (
        <Day
          key={data.day}
          day={data.day.getDate()}
        >
          {data.deliveries.map((delivery) => (
            <StatusTag
              key={delivery.id}
              text={delivery.label}
              status={delivery.status}
              onClick={() => history.push(delivery.url)}
            />
          ))}
        </Day>
      ))}
    </Container>
  </Scrollable>
);

Calendar.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  deliveries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    deliveryDate: PropTypes.instanceOf(Date).isRequired,
  })),
};

Calendar.defaultProps = {
  deliveries: [],
};

export default Calendar;
