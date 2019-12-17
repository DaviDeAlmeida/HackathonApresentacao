import styled from 'styled-components';

import colors from '../../../../../colors';

const Container = styled.div`
  display: flex;
  flex: 1 1 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding-right: 20px;
  margin-top: 50px;
`;

const Header = styled.div`
  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;
  font-size: 18px;
  color: ${colors.grayA};
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 100%;
  overflow: hidden;
`;

const InputContent = styled.div`
  margin-bottom: 200px;
`;

const Errors = styled.div`
  color: red;
  margin-top: 20px;
  font-size: 10px
`;

const Sort = styled.div`
  display: flex;
`;

const Options = styled.div`
  margin-left: 5px;
`;

export {
  Container,
  Content,
  Header,
  Wrapper,
  InputContent,
  Errors,
  Sort,
  Options,
};
