import styled from 'styled-components';

import colors from '../../../../../colors';

import calendar from './images/calendar.svg';

const Container = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  margin-bottom: 90px;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 100%;
`;

const SidebarLeft = styled.div`
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

const Buttons = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const cancelButton = styled.div`
  margin-top: 30px;
  display: flex;
`;

const ModalContent = styled.div`
  place-content: space-evenly;
  margin-top: 30px;
  display: flex;
`;

const ImgQRCode = styled.img`
  width: 200px;
`;

const OptionsQRCode = styled.div`
  justify-content: space-evenly;
  display: flex;
  margin-bottom: 5px;
`;

const Pipe = styled.div`
border-left: 1px solid ${colors.grayC};
`;

const StyledLink = styled.button`
  font-size: 13px;
  color: ${colors.blueF};
  margin: 10px 0;
  padding: 0;
  border-color: transparent;
  background-color: transparent;
  cursor: pointer;
  outline-color: transparent;
  outline-style: none;
`;

const VoucherDetails = styled.button`
  margin-left: 20px;
`;

const VoucherInfo = styled.button`
text-align: center;
`;

const TextBold = styled.div`
  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;
  font-size: 13px;
`;

export {
  Container,
  Wrapper,
  SidebarLeft,
  Calendar,
  Interval,
  Content,
  SubTitle,
  Buttons,
  OrdersList,
  cancelButton,
  ModalContent,
  ImgQRCode,
  OptionsQRCode,
  Pipe,
  StyledLink,
  VoucherDetails,
  VoucherInfo,
  TextBold,
};
