import styled from 'styled-components';
import colors from '../../../colors';

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
`;

const Navbar = styled.ul`
   display: flex;
   margin: 0 0 30px;
   border-bottom: 1px solid ${colors.blueD}
`;

const Content = styled.div`
  display: flex;
  flex: 1 1 100%;
  overflow: hidden;
`;

export {
  Wrapper,
  Navbar,
  Content,
};
