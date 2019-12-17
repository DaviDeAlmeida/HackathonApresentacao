import styled from 'styled-components';

import colors from '../../../../../colors';

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

const Buttons = styled.div`
margin-top: 18px;
display: flex;
justify-content: space-between;
`;

const Owner = styled.div`
margin-top: 15px;
margin-bottom: 20px;
`;

const DeliveriesList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Status = styled.div`
  margin-top: 5px;
`;

const Info = styled.div`
  font-family: 'Roboto-Regular', 'Roboto';
  font-size: 11px;
  color: ${colors.grayB};
  margin-left: 17px;
`;

export {
  Container,
  Header,
  Text,
  Wrapper,
  Calendar,
  Interval,
  Content,
  SubTitle,
  Buttons,
  Owner,
  DeliveriesList,
  Status,
  Info,
};
