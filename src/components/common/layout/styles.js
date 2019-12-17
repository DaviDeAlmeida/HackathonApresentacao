import styled from 'styled-components';

import colors from '../../../colors';

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  flex-flow: column nowrap;
`;

const Content = styled.div`
  display: flex;
  flex: 1 1 100%;
  margin: 0 10px;
  padding: 0 40px;
  background-color: ${colors.offwhite};
  overflow: hidden;
  margin-top: -90px;
`;

export {
  Wrapper,
  Content,
};
