import styled from 'styled-components';
import colors from '../../../colors';

import on from './images/notification-on.svg';

const Wrapper = styled.div``;

const Icon = styled.div`
  cursor: pointer;

  width: 22px;
  height: 22px;
  background-image: url(${on});
`;

const Container = styled.div`
  width: 400px;

  > div:not(:last-child) {
    border-bottom: 1px solid ${colors.grayC};
  }
`;

const Notification = styled.div`
  margin: 0 10px;
  padding: 10px 0;
`;

const PushNotifications = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

export {
  Wrapper,
  Container,
  Icon,
  Notification,
  PushNotifications,
};
