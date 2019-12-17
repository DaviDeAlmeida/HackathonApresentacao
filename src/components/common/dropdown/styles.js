import styled from 'styled-components';
import colors from '../../../colors';

import arrow from './images/ico-dropdown.svg';

const Wrapper = styled.div`
  position: relative;
`;

const Select = styled.div`
  display: flex;

  cursor: pointer;
  user-select: none;

  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;

  ::after {
    width: 16px;
    height: 16px;
    content: url(${arrow});
    margin-left: 10px;
  }
`;

const Content = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  font-size: 12px;
  white-space: nowrap;


  color: ${colors.grayA};
  background-color: ${colors.white};
  box-shadow: 1px 1px 5px ${colors.grayF};

  z-index: 50;

  ${({ minWidth }) => minWidth && `
    min-width: ${minWidth}px;
  `}
`;

const Item = styled.div`
  cursor: pointer;
  user-select: none;
  padding: 5px 10px;
  width: 100%;

  :hover {
    background-color: rgba(0, 0, 0, .08);
  }

  ${({ selected }) => selected && `
    :hover {
      background-color: rgba(0, 0, 0, .05);
    }
  `}
`;

export {
  Wrapper,
  Select,
  Content,
  Item,
};
