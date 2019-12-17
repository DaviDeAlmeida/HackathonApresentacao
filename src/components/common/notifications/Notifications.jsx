import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Button from '../button/Button';
import Dropdown from '../dropdown/Dropdown';
import PushNotification from './pushNotification/PushNotification';
import {
  Wrapper,
  Container,
  Notification,
  PushNotifications,
} from './styles';

import on from './images/notification-on.svg';

@inject('AppStore')
@observer
class Notifications extends Component {
  componentDidMount() {
    const {
      AppStore: {
        NotificationStore: {
          load,
          connect,
        },
      },
    } = this.props;

    load();
    connect();
  }

  render() {
    const {
      AppStore: {
        NotificationStore: {
          notifications,
          pushNotifications,
          remove,
        },
      },
    } = this.props;

    return (
      <Wrapper>
        <Dropdown
          customSelect={(
            <Button
              image={on}
              width={22}
              height={22}
              count={notifications.length}
            />
          )}
          content={(
            <Container>
              {notifications.map(({ id, content }) => (
                <Notification key={id} dangerouslySetInnerHTML={{ __html: content }} />
              ))}
            </Container>
          )}
        />
        <PushNotifications>
          {pushNotifications.map(({ id, color, payload }) => (
            <PushNotification
              key={id}
              color={color}
              payload={payload}
              onClose={() => remove(id)}
            />
          ))}
        </PushNotifications>
      </Wrapper>
    );
  }
}

Notifications.propTypes = {
  AppStore: PropTypes.shape({ // eslint-disable-line react/require-default-props
    NotificationStore: PropTypes.shape(),
  }),
};

export default Notifications;
