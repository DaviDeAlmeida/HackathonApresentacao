import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import colors from '../../../colors';
import {
  getMonthAndYear,
  getPreviousMonth,
  getNextMonth,
  WEEK_DAYS_NAMES,
} from '../../../modules/calendar';
import Layout from '../../common/layout/pageLayout/PageLayout';
import AppLoader from '../../common/appLoader/AppLoader';
import Sidebar from '../../common/sidebar/Sidebar';
import Calendar from '../../common/calendar/Calendar';
import Switcher from '../../common/switcher/Switcher';
import Scrollable from '../../common/scrollable/Scrollable';
import Table from '../../common/table/Table';
import TableContent from '../../common/table/tableContent/TableContent';
import ProgressBar from '../../common/charts/progressBar/ProgressBar';
import Label from '../../common/label/Label';
import FilterDropdown from '../../common/filters/dropdown/FilterDropdown';

import {
  Wrapper,
  Header,
  Text,
  Switchers,
} from './styles';

@inject('AppStore')
@observer
class Occupancy extends Component {
  componentDidMount() {
    const {
      AppStore: {
        OccupancyStore: {
          load,
        },
      },
    } = this.props;

    load();
  }

  _handleNextMonthClick = () => {
    const {
      AppStore: {
        OccupancyStore: {
          selectedPeriod: {
            month,
            year,
          },
          setSelectedPeriod,
        },
      },
    } = this.props;

    setSelectedPeriod(getNextMonth(month, year));
  }

  _handlePrevMonthClick = () => {
    const {
      AppStore: {
        OccupancyStore: {
          selectedPeriod: {
            month,
            year,
          },
          setSelectedPeriod,
        },
      },
    } = this.props;

    setSelectedPeriod(getPreviousMonth(month, year));
  }

  _buildRows = (occupancy) => occupancy.map((day) => ({
    id: day.date.toString(),
    columns: [
      {
        maxWidth: '5%',
        content: <TableContent
          title={day.date.getDate()}
          secondaryContent={[WEEK_DAYS_NAMES[day.date.getDay() + 1].split('-')[0]]}
          pushTo="left"
        />,
      },
      {
        maxWidth: '35%',
        content: <ProgressBar
          layers={[
            {
              color: colors.green,
              percentage: day.preScheduled,
            },
            {
              color: colors.purple,
              percentage: day.scheduled,
            },
          ]}
        />,
      },
      {
        maxWidth: '20%',
        content: <Label
          text={`Agendado – ${day.scheduled}%`}
          status={colors.purple}
        />,
      },
      {
        maxWidth: '20%',
        content: <Label
          text={`Pré-agendado – ${day.preScheduled}%`}
          status={colors.green}
        />,
      },
      {
        maxWidth: '20%',
        content: <TableContent
          title={`${day.deliveries} entrega(s)`}
        />,
      },
    ],
  }))

  render() {
    const {
      AppStore: {
        OccupancyStore: {
          isLoading,
          selectedDate,
          setSelectedDate,
          selectedPeriod,
          setSelectedPeriod,
          occupancy,
          warehouseId,
          warehouses,
          setWarehouseId,
        },
      },
      match: {
        url,
      },
    } = this.props;

    return (
      <Layout url={url}>
        {isLoading && <AppLoader />}
        <Helmet>
          <title>Ocupação do CD | AccuScheduler</title>
        </Helmet>
        <Sidebar collapsable={false} column>
          <FilterDropdown
            search
            clearable
            label="Centro de distribuição"
            value={warehouseId}
            options={warehouses.slice()}
            onChange={(e, { value }) => setWarehouseId(value)}
          />
          <Calendar
            date={selectedDate}
            onDateChange={setSelectedDate}
            period={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
        </Sidebar>
        <Wrapper>

          <Header>
            <Text>
              {getMonthAndYear(new Date(selectedPeriod.year, selectedPeriod.month - 1, 1))}
            </Text>
            <Switchers>
              <Switcher
                onPrevclick={this._handlePrevMonthClick}
                onNextClick={this._handleNextMonthClick}
              />
            </Switchers>
          </Header>

          <Scrollable>
            <Table rows={this._buildRows(occupancy)} />
          </Scrollable>

        </Wrapper>
      </Layout>
    );
  }
}

Occupancy.propTypes = {
  AppStore: PropTypes.shape(), // eslint-disable-line react/require-default-props
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Occupancy;
