import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-flow: column nowrap;
  width: 100%;
  margin: ${(props) => (props.isMobile ? '0 6px;' : '0 18px')};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ViewSwitcher = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const MonthController = styled.div`
  display: flex;
  align-items: center;
`;

const MonthSwitcher = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60px;
`;

const TimeText = styled.div`
  width: 120px;
  margin-right: 15px;

  font-family: 'Roboto-Bold', 'Roboto';
  font-weight: 700;
  font-size: 14px;
`;

const ModalContent = styled.div`
  place-content: space-evenly;
  margin-top: 30px;
  display: flex;
`;

export {
  Main,
  Header,
  TimeText,
  MonthController,
  ViewSwitcher,
  MonthSwitcher,
  ModalContent,
};
