import styled from 'styled-components';

import colors from '../../../../colors';

const Wrapper = styled.header`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  height: 42px;
  background-color: ${colors.blueC};
  align-items: center;
`;

const MenuButton = styled.button`
  display: flex;
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  min-height: 42px;
  font-size: 19px;
  font-weight: 500;
  color: ${colors.grayA};
  cursor: pointer;
  align-items: center;
  justify-content: center;
  :hover {
    color: ${colors.black};
  }
`;

const StyledTitle = styled.h1`
  color: ${colors.grayA};
  font-size: 16px;
  font-weight: 400;
  display: flex;
  flex: 1 1 100%;
  width: 100%;
`;

const StyledCenterTitle = styled.h1`
  color: ${colors.grayA};
  font-size: 16px;
  font-weight: 400;
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  justify-content: center;
`;

const RightButton = styled.button`
  display: flex;
  flex: 0 0 36px;
  width: 36px;
  height: 42px;
  font-size: 19px;
  font-weight: 500;
  color: ${colors.grayA};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  :hover {
    color: ${colors.black};
  }
`;

const MoreButton = styled.button`
  display: flex;
  flex: 0 0 26px;
  width: 26px;
  height: 42px;
  margin: 0;
  padding: 0;
  font-size: 19px;
  font-weight: 500;
  color: ${colors.grayA};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  :hover {
    color: ${colors.black};
  }
`;

export {
  Wrapper,
  MenuButton,
  StyledTitle,
  StyledCenterTitle,
  RightButton,
  MoreButton,
};
