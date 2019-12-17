import styled from 'styled-components';
import colors from '../../../colors';
import expand from './images/list-expand.svg';

const Wrapper = styled.div`
  background-color: ${colors.white};
  padding: 20px;
  width: 100%;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;

  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;
  font-size: 18px;
`;

const Content = styled.div`
  padding: 20px 30px;

  ${({ collapsed }) => collapsed && `
    overflow: hidden;
    height: 0;
    padding: 0;
  `}
`;

const CollapseButton = styled.button`
  cursor: pointer;

  width: 16px;
  height: 16px;
  background-image: url(${expand});

  margin-right: 14px;

  ${({ collapsed }) => !collapsed && `
    transform: rotate(180deg);
  `}
`;

export {
  Wrapper,
  Header,
  Content,
  CollapseButton,
};
