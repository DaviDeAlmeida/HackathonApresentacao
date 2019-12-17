import styled from 'styled-components';
import colors from '../../../../colors';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 820px;
`;

const Weekday = styled.div`
  display: flex;
  flex: 1 0 calc(100% / 7 - 2px);
  align-items: center;
  justify-content: center;
  height: 30px;
  min-width: 115px;
  margin: 1px;

  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;

  background-color: ${colors.white};
`;

export {
  Container,
  Weekday,
};
