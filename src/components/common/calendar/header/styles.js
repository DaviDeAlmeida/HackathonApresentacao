import styled from 'styled-components';

import colors from '../../../../colors';

import Next from './images/ico-next-on.svg';
import NextOff from './images/ico-next-off.svg';
import Previous from './images/ico-previous-on.svg';
import PreviousOff from './images/ico-previous-off.svg';

const Container = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const TimeText = styled.div`
  font-family: 'Roboto-Bold', 'Roboto';
  font-weight: 700;
  color: ${colors.grayA};
`;

const Switcher = styled.div`
  width: 60px;
  display: flex;
  justify-content: space-between;
`;

const Arrow = styled.button`
  width: 25px;
  height: 25px;
  cursor: ${({ off }) => (off ? 'unset' : 'pointer')};

  &:before {
    width: 25px;
    height: 25px;
  }
`;

const ArrowLeft = styled(Arrow)`
  &:before {
    content: url(${({ off }) => (off ? PreviousOff : Previous)});
  }
`;

const ArrowRight = styled(Arrow)`
  &:before {
    content: url(${({ off }) => (off ? NextOff : Next)});
  }
`;

export {
  Container,
  TimeText,
  Switcher,
  ArrowLeft,
  ArrowRight,
};
