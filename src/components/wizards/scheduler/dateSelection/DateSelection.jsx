import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

import { CALENDAR_MONTHS, WEEK_DAYS_NAMES } from '../../../../modules/calendar';
import colors from '../../../../colors';
import Sidebar from '../../../common/sidebar/Sidebar';
import Calendar from '../../../common/calendar/Calendar';
import RadioButton from '../../../common/radioButton/RadioButton';
import EmptyList from '../../../common/emptyList/EmptyList';
import Label from '../../../common/label/Label';
import {
  Container,
  Wrapper,
  Title,
  Content,
  Header,
  Text,
  Interval,
  Legend,
} from './styles';

@inject('AppStore')
@observer
class DateSelection extends Component {
  componentDidMount() {
    const {
      AppStore: {
        SchedulerStore: {
          loadAvailableDates,
        },
      },
    } = this.props;

    loadAvailableDates();
  }

  _formatDate = (date) => {
    const day = date.getDate();
    const month = CALENDAR_MONTHS[date.getMonth() + 1];
    const year = date.getFullYear();
    const weekDay = WEEK_DAYS_NAMES[date.getDay() + 1];

    return `${day} de ${month} de ${year} – ${weekDay}`;
  }

  _renderIntervals = () => {
    const {
      AppStore: {
        SchedulerStore: {
          selectedInterval,
          setInterval,
          intervals,
        },
      },
    } = this.props;

    if (intervals.length < 1) return <EmptyList />;

    return intervals.map((interval) => (
      <Interval key={interval.begin}>
        <RadioButton
          name="interval"
          label={`${interval.begin.slice(0, 5)} - ${interval.end.slice(0, 5)}`}
          checked={interval.begin === selectedInterval.begin}
          onChange={() => setInterval(interval)}
        />
      </Interval>
    ));
  }

  _getSpecialDays = (leadtime, availableDays) => [{
    date: new Date(leadtime),
    color: colors.green,
  }].concat(availableDays.map(({ date }) => ({
    date: new Date(date),
    color: colors.blueD,
  })));

  render() {
    const {
      AppStore: {
        SchedulerStore: {
          leadtime,
          availableDates,
          selectedDate,
          setDate,
          setSelectedPeriod,
          selectedPeriod,
        },
      },
    } = this.props;

    return (
      <Container>
        <Title>Escolha a data de entrega</Title>
        <Wrapper>
          <Sidebar column minWidth={260}>
            <Calendar
              date={selectedDate}
              onDateChange={setDate}
              period={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
              specialDays={this._getSpecialDays(leadtime, availableDates)}
            />
            <Legend>
              <Label
                text="Leadtime"
                status={colors.green}
              />
              <Label
                text="Dia disponível"
                status={colors.blueD}
              />
              <Label
                text="Dia selecionado"
                status={colors.blueF}
              />
            </Legend>
          </Sidebar>
          <Content>
            <Header>
              {selectedDate && (
                <Text>{this._formatDate(selectedDate)}</Text>
              )}
            </Header>
            {this._renderIntervals()}
          </Content>
        </Wrapper>
      </Container>
    );
  }
}

DateSelection.propTypes = {
  AppStore: PropTypes.shape(), // eslint-disable-line react/require-default-props
};

export default DateSelection;
