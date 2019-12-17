import React from 'react';
import PropTypes from 'prop-types';

import calendar, {
  WEEK_DAYS,
  getDateISO,
  isSameDay,
  isSameMonth,
} from '../../../../modules/calendar';

import {
  Container,
  Day,
  DayOfWeek,
} from './styles';

const getCalendarDays = (month, year) => {
  const days = calendar(month, year)
    .map((day) => new Date(day.join('-')));

  days.forEach((day) => day.setHours(0, 0, 0, 0));

  return days;
};

const CalendarMonth = ({
  period: {
    month,
    year,
  },
  onPeriodChange,
  date,
  onDateChange,
  specialDays,
}) => {
  const days = getCalendarDays(month, year);
  const current = new Date([year, month, 1].join('-'));
  const today = new Date();

  const getDayColor = (day) => {
    const special = specialDays.find((x) => isSameDay(x.date, day));
    return special ? special.color : null;
  };

  return (
    <Container>
      {Object.keys(WEEK_DAYS).map((day) => <DayOfWeek key={day}>{WEEK_DAYS[day]}</DayOfWeek>)}

      {days.map((day) => (
        <Day
          key={getDateISO(day)}
          color={getDayColor(day)}
          isToday={isSameDay(day, today)}
          isSameMonth={isSameMonth(day, current)}
          isSelected={date && isSameDay(day, date)}
          onClick={() => {
            if (!isSameMonth(day, current) && onPeriodChange) {
              onPeriodChange({ month: day.getMonth() + 1, year: day.getFullYear() });
            }

            if (onDateChange) onDateChange(day);
          }}
        >
          {day.getDate()}
        </Day>
      ))}
    </Container>
  );
};

CalendarMonth.propTypes = {
  date: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func,
  period: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
  }).isRequired,
  onPeriodChange: PropTypes.func,
  specialDays: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    color: PropTypes.string.isRequired,
  })),
};

CalendarMonth.defaultProps = {
  date: undefined,
  onDateChange: undefined,
  onPeriodChange: undefined,
  specialDays: [],
};

export default CalendarMonth;
