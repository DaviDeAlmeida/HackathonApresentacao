import styled from 'styled-components';
import expand from './images/list-expand.svg';

const Container = styled.div`
  width: 100%;
`;

const TBody = styled.div`
  width: 100%;

  ${({ collapsed }) => collapsed && `
    overflow: hidden;
    height: 0;
  `}
`;

const THead = styled.div`
  position: relative;
  width: 100%;
`;

const CollapseButton = styled.button`
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &:before {
    width: 16px;
    height: 16px;
    content: url(${expand});
    display: inline-block;

    ${({ collapsed }) => !collapsed && `
      transform: rotate(180deg);
    `}
  }
`;

export {
  Container,
  THead,
  TBody,
  CollapseButton,
};
