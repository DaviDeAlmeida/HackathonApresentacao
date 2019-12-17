import styled from 'styled-components';
import { Search as SemanticSearch } from 'semantic-ui-react';

import colors from '../../../../colors';

const SearchContainer = styled.div`
  display: flex;
  flex: 0 1 690px;
  max-width: 690px;
  height: 50px;
  background-color: ${colors.blueB};
  margin: 0 10px;
`;

const SearchButton = styled.button`
  display: flex;
  flex: 0 0 50px;
  width: 50px;
  color: ${colors.blueD}
  background: transparent;
  border: 0px solid transparent;
  padding: 0;
  font-size: 18px;
  justify-content: center;
`;

const Search = styled(SemanticSearch)`
  &&& {
    display: flex;
    flex: 1 1 100%;

    div {
      width: 100%;

      input {
        color: ${colors.blueC}
        background: transparent;
        border: 0px solid transparent;
        margin: 0;
        padding: 0;
        font-size: 14px;
        font-family: 'Roboto-Italic', 'Roboto';
        font-style: italic;
        ::placeholder {
          color: ${colors.blueD}
        }
      }

      i:before {
        content: none;
      }
    }
  }
`;

export {
  SearchContainer,
  SearchButton,
  Search,
};
