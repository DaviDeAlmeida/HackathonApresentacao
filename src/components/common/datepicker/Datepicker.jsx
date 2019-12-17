/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import { React, Component } from 'react';
import { PropTypes } from 'prop-types';
import { FaCalendarAlt } from 'react-icons/fa';

import Input from '../input/text';
import Calendar from '../Calendar/Calendar';
import { isDate, getDateFormated, getDateISO } from '../../../modules/calendar';

import {
  Container,
} from './styles';

class DatePicker extends Component {

  state = { date: null, calendarOpen: false }


  componentDidMount() {
    const { value: date } = this.props;
    const newDate = date && new Date(date);

    isDate(newDate) && this.setState({ date: getDateFormated(newDate) });
  }

  componentDidUpdate(prevProps) {
    const { value: date } = this.props;
    const { value: prevDate } = prevProps;
    const dateISO = getDateFormated(new Date(date));
    const prevDateISO = getDateFormated(new Date(prevDate));

    dateISO !== prevDateISO && this.setState({ date: dateISO });
  }

  handleDateChange = (date) => {
    const { onDateChanged } = this.props;
    const { date: currentDate } = this.state;
    const newDate = date ? getDateFormated(date) : null;

    currentDate !== newDate
    && this.setState({ date: newDate, calendarOpen: false }, () => {
      typeof onDateChanged === 'function' && onDateChanged(this.state.date);
    });
  }

  toggleCalendar = () => this.setState({ calendarOpen: !this.state.calendarOpen })

  handleChange = (evt) => evt.preventDefault()
}

// render() {

//   const { label } = this.props;
//   const { date, calendarOpen } = this.state;

//   return (
//         <Input
//           value={date ? date.split("-").join(" / ") : ""}
//           onChange={this.handleChange}
//           readOnly="readonly"
//           label={label}
//         />
//   );
// }

// const Datepicker = ({
//   label,
// }) => (
//   <Container>
//     <Input
//       label={label}
//       icon={<FaCalendarAlt />}
//       width="50%"
//     />
//     <Calendar />
//   </Container>
// );

DatePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onDateChanged: PropTypes.func,
};

export default DatePicker;
