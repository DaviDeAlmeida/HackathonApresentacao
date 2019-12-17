import styled from 'styled-components';
import colors from '../../../colors';

import splitter from './images/historico-splitter.svg';
import clock from './images/historico-nota.svg';

const Card = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.white};
  padding: 20px 25px
  position: relative;

  ${({ statusColor }) => statusColor && `
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 10px;
      height: 100%;
      background-color: ${statusColor};
    }
  `}
`;

const Image = styled.div`
  margin-right: 20px;
  width: 30px;
  height: 30px;
  background-image: url(${clock});
  background-position: center;
`;

const Splitter = styled.div`
  background-image: url(${splitter});
  background-position: center;
  width: 30px;
  height: 20px;
  margin-left: 25px;
`;

const Content = styled.div`
  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;
  font-size: 12px;
  color: ${colors.grayA};
`;

const Title = styled.div`
  font-family: 'Roboto-Regular', 'Roboto';
  font-weight: 400;
  font-size: 12px;
  color: ${colors.grayB};

  margin-bottom: 5px;
`;

const Text = styled.div``;

export {
  Card,
  Image,
  Splitter,
  Content,
  Title,
  Text,
};
