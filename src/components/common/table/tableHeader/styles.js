import styled from 'styled-components';

const THead = styled.div`
  display: flex;
  flex: 1 1 100%;
  align-items: center;
  padding: 15px 30px;
`;

const Th = styled.div`
  display: flex;
  flex: 0 1 ${({ maxWidth }) => maxWidth || '100%'};
  justify-content: center;

  ${({ alignTo }) => alignTo && `
    justify-content: flex-${alignTo};
  `}

  padding-right: 8px;

  font-family: 'Roboto-Bold', 'Roboto';
  font-weight: 700;
  font-size: 12px;
`;

export {
  THead,
  Th,
};
