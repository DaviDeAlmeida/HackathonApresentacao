import styled from 'styled-components';

import colors from '../../../../colors';

const Container = styled.div`
  background-color: ${colors.offwhite};
  min-width: 200px;
`;

const ContainerMobile = styled.div`
  background-color: ${colors.blueC};
  padding: 20px 10px;
`;

const StyledBox = styled.div`
  width: 100%;
  padding: 17px 15px;
  background-color: ${colors.blueG};
  margin-bottom: 6px;
`;

const StyledBoxMobile = styled.div`
  padding: 17px 15px;
  background-color: ${colors.blueG};
  margin-bottom: 6px;
`;

const StyledTitle = styled.div`
  font-size: 12px;
  color: ${colors.grayA};
`;

const StyledContent = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.grayA};
  margin-top: 8px;
`;

const StyledLink = styled.button`
  font-size: 13px;
  color: ${colors.blueF};
  margin: 10px 0;
  padding: 0;
  border-color: transparent;
  background-color: transparent;
  cursor: pointer;
  outline-color: transparent;
  outline-style: none;
`;

const ApplyButtonContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0px;
  background-color: ${colors.blueH};
  padding: 25px 60px;
`;

const ApplyButton = styled.button`
  width: 100%;
  font-size: 13px;
  color: ${colors.white};
  background-color: ${colors.blueF};
  border: 1px solid ${colors.white};
  padding: 11px;
`;

const Options = styled.div`
  padding-bottom: 100px;

  > label {
    margin-top: 12px;
    font-weight: 500;
  }
`;

const ImageContent = styled.img`
  height: 15px;
  margin-top: 10px;
  width: 15px;
  transform: ${(props) => (props.opened ? 'rotate(180deg)' : '')};
  transition: all 400ms;
`;

const StyledDivContent = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
`;

const StyledList = styled.div`
  width: 190px;
  background-color: ${colors.blueI};
  margin-bottom: 6px;
`;

const StyledListOption = styled.li`
  cursor: pointer;
  width: 90px;
  font-size: 13px;
  font-weight: 700;
  color: ${colors.grayA};
  margin-top: 15px;
  margin-left: 15px;
  white-space: nowrap;
`;

export {
  Options,
  Container,
  ContainerMobile,
  StyledBox,
  StyledBoxMobile,
  StyledTitle,
  StyledListOption,
  StyledContent,
  StyledLink,
  ApplyButtonContainer,
  ApplyButton,
  ImageContent,
  StyledDivContent,
  StyledList,
};
