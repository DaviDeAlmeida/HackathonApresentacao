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
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const Sort = styled.div`
  display: flex;
`;

const Options = styled.div`
  margin-left: 5px;
`;

export {
  Main,
  Header,
  Sort,
  Options,
};
