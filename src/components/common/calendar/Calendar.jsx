import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  THIS_MONTH,
  THIS_YEAR,
  getNextMonth,
  getPreviousMonth,
} from '../../../modules/calendar';

import CalendarHeader from './header/CalendarHeader';
import CalendarMonth from './month/CalendarMonth';

import {
  Container,
} from './styles';

class Calendar extends Component {
  _handleNextMonthClick = () => {
    const {
      period: {
        month,
        year,
      },
      onPeriodChange,
    } = this.props;

    onPeriodChange(getNextMonth(month, year));
  }

  _handlePreviousMonthClick = () => {
    const {
      period: {
        month,
        year,
      },
      onPeriodChange,
    } = this.props;

    onPeriodChange(getPreviousMonth(month, year));
  }

  render() {
    const {
      date,
      onDateChange,
      period,
      onPeriodChange,
      specialDays,
    } = this.props;

    return (
      <Container>
        <CalendarHeader
          period={period}
          onNextClick={this._handleNextMonthClick}
          onPreviousClick={this._handlePreviousMonthClick}
        />
        <CalendarMonth
          period={period}
          date={date}
          onDateChange={onDateChange}
          onPeriodChange={onPeriodChange}
          specialDays={specialDays}
        />
      </Container>
    );
  }
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func,
  period: PropTypes.shape({
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }),
  onPeriodChange: PropTypes.func,
  specialDays: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    color: PropTypes.string.isRequired,
  })),
};

Calendar.defaultProps = {
  date: undefined,
  onDateChange: undefined,
  period: {
    month: THIS_MONTH,
    year: THIS_YEAR,
  },
  onPeriodChange: undefined,
  specialDays: [],
};

export default Calendar;
