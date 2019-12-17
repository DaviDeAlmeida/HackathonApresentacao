import React from 'react';
import PropTypes from 'prop-types';

import { CALENDAR_MONTHS } from '../../../../modules/calendar';

import {
  Container,
  TimeText,
  Switcher,
  ArrowLeft,
  ArrowRight,
} from './styles';

const CalendarHeader = ({
  period: {
    month,
    year,
  },
  onPreviousClick,
  onNextClick,
}) => (
  <Container>
    <TimeText>{`${CALENDAR_MONTHS[month]}/${year}`}</TimeText>
    <Switcher>
      <ArrowLeft onClick={onPreviousClick} off={onPreviousClick === undefined} />
      <ArrowRight onClick={onNextClick} off={onNextClick === undefined} />
    </Switcher>
  </Container>
);

CalendarHeader.propTypes = {
  period: PropTypes.shape({
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
};

CalendarHeader.defaultProps = {
  onPreviousClick: undefined,
  onNextClick: undefined,
};

export default CalendarHeader;
