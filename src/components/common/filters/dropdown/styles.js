import styled from 'styled-components';
import { Form } from 'semantic-ui-react';

import colors from '../../../../colors';

import arrowDown from './images/ico-dropdown.svg';

const DropdownStyled = styled(Form.Dropdown)`
  &&& {
    background-color: ${colors.blueG};
    font-family: 'Roboto-Regular', 'Roboto' !important;
    margin-bottom: 6px;
    padding: 8px 0px 6px 0px;

    > label {
      font-size: 12px !important;
      margin-left: 14px;
    }

    > .dropdown {
      border: 0;
      box-shadow: none !important;
      background-color: ${colors.blueG} !important;

      > i:not(.clear):before {
        content: url(${arrowDown}) !important;
      }

      > i.clear {
        padding-right: 15px;

        &:before {
          color: ${colors.blueD};
        }
      }

      .text, .search {
        font-size: 12px !important;
        font-family: 'Roboto-Regular', 'Roboto' !important;
        font-weight: 700 !important;
      }

      > div.text:first-child {
        font-weight: 700 !important;
      }

      .menu {
        border: 0;
        border-radius: 0;
      }
    }
  }
`;

export { DropdownStyled }; // eslint-disable-line
