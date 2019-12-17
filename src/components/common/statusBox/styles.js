import styled from 'styled-components';

import colors from '../../../colors';

const Box = styled.div`
  position: relative;
  box-sizing: border-box;
  cursor: ${({ selected }) => (selected ? 'auto' : 'pointer')};
  display: flex;
  flex: 0 0 170px;
  width: 150px;
  height: 70px;
  flex-flow: column nowrap;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 500;
  color: ${({ color }) => (color === colors.white ? colors.grayA : colors.white)};
  background-color: ${({ color }) => color};
  margin: 0 15px 15px 0px;
  border: ${({ selected }) => (selected ? `2px solid ${colors.grayA}` : 'none')};
  padding: 10px;
  user-select: none;

  ${({ selected }) => selected && `
    &:after {
      content:'';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-top: solid 8px ${colors.grayA};
      border-left: solid 8px transparent;
      border-right: solid 8px transparent;
    }
  `}
`;

const Title = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
`;

const Quantity = styled.div`
  display: flex;
  font-size: 26px;
  font-weight: 700;
  align-self: flex-end;
`;

const DownButton = styled.button`
  display: flex;
  flex: 0 0 30px;
  width: 30px;
  height: 40px;
  font-size: 28px;
  padding: 0;
  color: ${colors.grayA}
`;

export {
  Box,
  Title,
  Quantity,
  DownButton,
};
