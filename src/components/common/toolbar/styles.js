import styled from 'styled-components';

import colors from '../../../colors';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ hidden }) => (hidden ? '0px' : '90px')};
  background-color: ${colors.blueA};
  padding: 0 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  opacity: 0.99;
  z-index: 100;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row${({ reversed }) => reversed && '-reverse'};
  align-items: center;

  button {
    margin-left: 20px;
  }
`;

const CloseButton = styled.button`
  color: ${colors.white}
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0px !important;
  margin-right: 10px;
`;

const Text = styled.div`
  font-size: 14px;
  color: ${colors.white};
`;

export {
  Container,
  Content,
  CloseButton,
  Text,
};
