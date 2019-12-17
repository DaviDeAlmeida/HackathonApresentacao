import styled from 'styled-components';
import colors from '../../../../colors';

import ico from './images/ico-dropdown.png';

// eslint-disable-next-line import/prefer-default-export
export const CustomSelect = styled.div`
  display: flex;
  flex: 1 0 auto;
  width: 100%;

  background: transparent;
  outline: 0;
  border: 0;

  padding: 2px 0px;
  border-bottom: 1px solid ${colors.blueD};

  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;
  font-size: 12px;

  color: ${colors.grayA};

  :focus {
    border-color: ${colors.blueF};
    caret-color: ${colors.blueF};
  }

  ::after {
    content: url(${ico});
    margin-left: auto;
  }
`;
