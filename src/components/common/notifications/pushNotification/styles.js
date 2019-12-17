import styled from 'styled-components';
import colors from '../../../../colors';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 950;

  width: 320px;
  min-height: 60px;

  padding: 10px;
  margin-bottom: 5px;

  font-size: 13px;
  color: ${colors.white};

  ${({ color }) => `
    background-color: ${color};
  `}
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 10px;
`;

const Close = styled.button`
  cursor: pointer;
  width: 14px;
  position: relative;

  :before, :after {
    position: absolute;
    content: '';
    height: 14px;
    width: 1px;
    background-color: ${colors.white};
  }

  :before {
    transform: rotate(45deg);
  }

  :after {
    transform: rotate(-45deg);
  }
`;

const Content = styled.div``;

export {
  Wrapper,
  Controls,
  Close,
  Content,
};
