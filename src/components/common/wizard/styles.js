import styled from 'styled-components';
import colors from '../../../colors';

export const Container = styled.div`
  display: flex;
  flex: 1 1 100%;
  padding-top: 30px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding-right: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex: 1 1 100%;
`;

export const Header = styled.div`
  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;
  font-size: 18px;
  color: ${colors.grayA};
  margin-bottom: 20px;
`;

export const Trail = styled.nav`
  margin-bottom: 90px;
`;

export const Step = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  font-family: 'Roboto-Regular', 'Roboto';
  font-weight: 400;

  ${({ current }) => current && `
    font-family: 'Roboto-Medium', 'Roboto';
    font-weight: 500;
  `}

  &:before {
    width: 25px;
    height: 25px;
    margin-right: 5px;
    font-size: 16px;
    color: ${colors.grayA};

    content: url(${({ icon }) => icon});
  }
`;
