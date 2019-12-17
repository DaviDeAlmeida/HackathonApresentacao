import styled from 'styled-components';

import colors from '../../../colors';

import emptyList from './images/list-empty.svg';

const Container = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${emptyList});
`;

const Text = styled.div`
  margin-top: 20px;

  font-family: 'Roboto-Italic', 'Roboto';
  font-style: italic;
  color: ${colors.blueD};
`;

export {
  Container,
  Image,
  Text,
};
