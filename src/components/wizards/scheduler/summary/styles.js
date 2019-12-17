import styled from 'styled-components';
import colors from '../../../../colors';

import calendar from './images/calendar.svg';

const Container = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  margin-bottom: 90px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Text = styled.div`
  font-family: 'Roboto-Regular', 'Roboto';
  font-size: 16px;
  color: ${colors.grayA};
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 100%;
`;

const Sidebar = styled.div`
  display: flex;
  flex: 0 0 250px;
  flex-direction: column;
`;

const Calendar = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${calendar});
`;

const Content = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  padding-left: 20px;
  border-left: 1px solid ${colors.grayC};
  margin-left: 20px;
`;

const Interval = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubTitle = styled.div`
  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;
  font-size: 13px;
  margin-bottom: 3px;
  margin-top: 15px;
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export {
  Container,
  Header,
  Text,
  Wrapper,
  Sidebar,
  Calendar,
  Interval,
  Content,
  SubTitle,
  OrdersList,
};
