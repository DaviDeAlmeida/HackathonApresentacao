import styled from 'styled-components';

import colors from '../../../colors';

const Container = styled.div`
  display: flex;
  flex-flow: ${(props) => (props.isMobile ? 'column' : 'row')} wrap;
`;

const ExpandButton = styled.button`
  cursor: pointer;
  box-sizing: border-box;
  padding: 0;
  width: 30px;
  height: 70px;
  background-color: ${colors.grayC};
  border: none;
`;

export {
  Container,
  ExpandButton,
};
