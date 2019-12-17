import styled from 'styled-components';
import colors from '../../../colors';

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-flow: column nowrap;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const Text = styled.div`
  font-family: 'Roboto-Bold', 'Roboto';
  font-weight: 700;
  font-size: 14px;
  margin-right: auto;
`;

const Switchers = styled.div``;

const Content = styled.div`
  width: 100%;
`;

export {
  Wrapper,
  Header,
  Text,
  Switchers,
  Content,
};
