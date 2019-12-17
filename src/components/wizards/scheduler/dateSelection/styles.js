import styled from 'styled-components';
import colors from '../../../../colors';

const Container = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
  font-family: 'Roboto-Regular', 'Roboto';
  font-size: 16px;
  color: ${colors.grayA};
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 100%;
  margin-bottom: 90px;
`;

const Content = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  padding: 0 18px;
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const Text = styled.div`
  font-family: 'Roboto-Bold', 'Roboto';
  font-weight: 700;
  font-size: 14px;
  font-color: ${colors.grayA};
`;

const Interval = styled.div`
  display: flex;
  padding: 20px;
  background-color: ${colors.white};
  margin-bottom: 2px;
  border-radius: 2px;
`;

const Legend = styled.div`
  margin-top: 20px;
`;

export {
  Container,
  Title,
  Content,
  Wrapper,
  Header,
  Text,
  Interval,
  Legend,
};
