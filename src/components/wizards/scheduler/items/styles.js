import styled from 'styled-components';

import colors from '../../../../colors';
import { Container as Scrollable } from '../../../common/scrollable/Scrollable';

const Container = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  margin-bottom: 90px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const Content = styled(Scrollable)`
  margin-bottom: 10px;
`;

const Footer = styled.div`
  display: flex;
  flex: 1 1 100%;
  padding: 15px 30px;
  background-color: ${colors.blueD};

  ${({ marginTop }) => marginTop && `
    margin-top: 30px;
  `}
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;
  font-size: 14px;
  color: ${colors.white};
  width: ${({ width }) => width};
  justify-content: ${({ left }) => (left ? 'flex-start' : 'center')}
`;

const Text = styled.div`
  font-family: 'Roboto-Regular', 'Roboto';
  font-size: 16px;
  color: ${colors.grayA};
`;

export {
  Container,
  Header,
  Content,
  Footer,
  FooterContent,
  Text,
};
