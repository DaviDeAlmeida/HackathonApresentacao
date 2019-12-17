import styled from 'styled-components';

import back from './images/back.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 30px;
  margin-bottom: 20px;

  font-family: 'Roboto-Bold', 'Roboto';
  font-weight: 700;
  font-size: 18px;

  > * {
    margin-right: 20px;
  }
`;

const GoBack = styled.button`
  background: url(${back}) no-repeat;
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

export {
  Wrapper,
  GoBack,
};
