import styled from 'styled-components';

import colors from '../../../colors';

const Container = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;

  width: 100%;
  padding-right: 5px;

  ::-webkit-scrollbar {
    background: ${colors.blueD};
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.offwhite};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.blueD};

    &:hover {
      background: ${colors.blueD};
    }
  }
`;

export { Container }; // eslint-disable-line import/prefer-default-export
