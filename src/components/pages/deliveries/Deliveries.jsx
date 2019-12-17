import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line
import { Helmet } from 'react-helmet';

import calendarOn from './images/view-calendar-on.svg';
import calendarOff from './images/view-calendar-off.svg';
import gridOn from './images/view-grid-on.svg';
import gridOff from './images/view-grid-off.svg';
import prev from './images/ico-previous-on.svg';
import next from './images/ico-next-on.svg';

import { nextTick } from '../../../utils';
import { pageView, sendEvent } from '../../../analytics';
import { CALENDAR_MONTHS, getPreviousMonth, getNextMonth } from '../../../modules/calendar';
import PageLayout from '../../common/layout/pageLayout/PageLayout';
import Filters from '../../sidebars/deliveries/filters/Filters';
import DeliveriesList from '../../common/deliveriesList/DeliveriesList';
import Notifications from '../../sidebars/deliveries/notifications/Notifications';
import DeliveriesStatus from '../../common/deliveriesStatus/DeliveriesStatus';
import Sidebar from '../../common/sidebar/Sidebar';
import AppLoader from '../../common/appLoader/AppLoader';
import ImageButton from '../../common/imageButton/ImageButton';
import Calendar from './calendar/Calendar';
import ConfirmReceiptModal from '../../common/modal/confirmReceipt/ConfirmReceiptModal';

import {
  Main,
  Header,
  ViewSwitcher,
  MonthSwitcher,
  TimeText,
  MonthController,
} from './styles';

@inject('AppStore')
@observer
class Deliveries extends Component {
  UNSAFE_componentWillMount = () => { // eslint-disable-line camelcase
    nextTick(pageView);
  }

  componentDidMount = () => {
    const {
      AppStore: {
        DeliveriesStore: {
          searchFirstPage,
        },
      },
    } = this.props;

    searchFirstPage();
  }

  render() {
    const {
      AppStore: {
        DeliveriesStore: {
          isLoadingSearch,
          isStatusOpen,
          setStatus,
          filter: {
            status,
          },
          totalDeliveriesByStatus,
          deliveries,
          isCalendarView,
          setCalendarView,
          calendar: { month, year },
          setCalendar,
        },
      },
      match: {
        url,
      },
      isMobile,
    } = this.props;

    const onSidebarToggle = () => sendEvent('UI - Entregas - LeftBar', 'Click - Left Bar', 'Detalhes do evento');

    return (
      <PageLayout url={url}>

        <Helmet>
          <title>Entregas | AccuScheduler</title>
        </Helmet>

        {isLoadingSearch && (
          <AppLoader />
        )}

        <Sidebar afterToggle={onSidebarToggle} column>
          <ConfirmReceiptModal />
          <Filters />
        </Sidebar>

        <Main
          isMobile={isMobile}
        >
          <DeliveriesStatus
            isOpen={isStatusOpen}
            isMobile={isMobile}
            setStatus={setStatus}
            selectedStatus={status}
            totalDeliveriesByStatus={totalDeliveriesByStatus}
          />

          <Header>
            { isCalendarView && (
              <MonthController>
                <TimeText>{`${CALENDAR_MONTHS[month]} de ${year}`}</TimeText>
                <MonthSwitcher>
                  <ImageButton
                    image={prev}
                    onClick={() => setCalendar(getPreviousMonth(month, year))}
                  />
                  <ImageButton
                    image={next}
                    onClick={() => setCalendar(getNextMonth(month, year))}
                  />
                </MonthSwitcher>
              </MonthController>
            )}
            <ViewSwitcher>
              <ImageButton
                image={isCalendarView ? gridOff : gridOn}
                onClick={() => setCalendarView(false)}
                width={30}
                height={30}
              />
              <ImageButton
                image={isCalendarView ? calendarOn : calendarOff}
                onClick={() => setCalendarView(true)}
                width={30}
                height={30}
              />
            </ViewSwitcher>
          </Header>

          {isCalendarView
            ? <Calendar deliveries={deliveries.slice()} month={month} year={year} />
            : <DeliveriesList deliveries={deliveries.slice()} />}
        </Main>

        <Sidebar afterToggle={onSidebarToggle} right>
          <Notifications
            totalDeliveriesByStatus={totalDeliveriesByStatus}
          />
        </Sidebar>
      </PageLayout>
    );
  }
}

Deliveries.propTypes = {
  AppStore: PropTypes.shape({ // eslint-disable-line react/require-default-props
    DeliveriesStore: PropTypes.shape(),
  }),
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Deliveries;
