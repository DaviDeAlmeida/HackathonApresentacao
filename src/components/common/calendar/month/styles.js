import styled from 'styled-components';

import colors from '../../../../colors';

const Container = styled.div`
  display: flex;
  background-color: ${colors.grayC};
  padding: 20px;
  flex-wrap: wrap;
`;

const Day = styled.div`
  color: ${({ isSameMonth }) => (isSameMonth ? colors.grayA : colors.blueD)};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  width: 28px;
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  border-radius: 50%;
  margin: 1px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  ${({ isToday }) => isToday && `
    font-family: 'Roboto-Bold', 'Roboto';
    font-weight: 700;
  `}

  ${({ color }) => color && `
    border: 2px solid ${color};
  `}

  ${({ isSelected }) => isSelected && `
    border: 2px solid ${colors.blueF};
  `}
`;

const DayOfWeek = styled(Day)`
  font-family: 'Roboto-Bold', 'Roboto';
  font-weight: 700;
  color: ${colors.grayA};
  cursor: auto;

  &:hover {
    background-color: unset;
  }
`;

export {
  Container,
  DayOfWeek,
  Day,
};
