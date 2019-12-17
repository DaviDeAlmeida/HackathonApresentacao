import styled from 'styled-components';
import colors from '../../../colors';

const Container = styled.div`
  padding: 20px;
  background-color: ${colors.white};
  margin-bottom: 20px;
  font-size: 12px;
`;

const Title = styled.div`
  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 10px;
`;

export {
  Container,
  Title,
};
