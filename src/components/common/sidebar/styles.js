import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  transition: all 0.3s ease-out;

  ${({ isOpen }) => (isOpen
    ? `
      max-width: 293px;
    `
    : `
      max-width: 25px;
    `)}
`;

const SidebarContainer = styled.aside`
  display: flex;

  ${({ width, minWidth }) => `
    flex: 0 1 ${width}px;
    min-width: ${minWidth}px;
  `}

  ${({ column }) => column && `
    flex-direction: column;
  `}

  overflow: hidden;
  transition: all 0.3s ease-out;

  ${({ isOpen }) => !isOpen && `
    width: 0px;
    min-width: 0px;
    opacity: 0;
  `}
`;

export {
  Container,
  SidebarContainer,
};
