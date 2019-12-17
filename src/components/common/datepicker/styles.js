import styled from 'styled-components';

import colors from '../../../colors';
import calendar from './images/view-calendar-on.svg';


const Container = styled.div`

`;

const CalendarIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${calendar});
`;

export {
  Container,
  CalendarIcon,
};
