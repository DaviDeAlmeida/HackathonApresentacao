import styled from 'styled-components';
import colors from '../../../colors';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
  z-index: 900;

  ${({ closed }) => closed && `
    display: none;
  `}
`;

const Main = styled.div`
  position: fixed;
  background: ${colors.offwhite};

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  height: auto;
  min-width: 250px;

  padding: 30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
`;

const Title = styled.div`
  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;
  font-size: 18px;
`;

const Content = styled.div`
  background: ${colors.white};
  padding: 40px;
`;

const Close = styled.button`
  cursor: pointer;
  width: 14px;
  height: 14px;
  position: relative;

  :before, :after {
    position: absolute;
    content: '';
    height: 14px;
    width: 1px;
    background-color: ${colors.grayA};
    top: 0;
  }

  :before {
    transform: rotate(45deg);
  }

  :after {
    transform: rotate(-45deg);
  }
`;

const ToolbarContent = styled.div`
  padding-bottom: 90px;
`;

export {
  Wrapper,
  Main,
  Header,
  Title,
  Close,
  Content,
  ToolbarContent,
};
