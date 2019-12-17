import styled from 'styled-components';
import colors from '../../../../../colors';

const Container = styled.div`
  display: flex;
  flex: 1 0 calc(100% / 7 - 2px);
  height: 120px;
  min-width: 115px;
  flex-direction: column;
  margin: 1px;
  padding: 10px;
  background-color: ${colors.white};
`;

const Header = styled.div`
  font-size: 12px;
  text-align: left;
  color: ${colors.grayB};
`;

const Content = styled.div``;

export {
  Container,
  Header,
  Content,
};
