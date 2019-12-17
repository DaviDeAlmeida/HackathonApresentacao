import styled from 'styled-components';
import { Dimmer as SemanticDimmer } from 'semantic-ui-react';

const LoaderContainer = styled.div`
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 110;
    &.scoped {
        position: absolute;
    }
`;

const Dimmer = styled(SemanticDimmer)`
    &&& {
      background-color: rgba(255,255,255,0.5);
    }
`;

export {
  LoaderContainer,
  Dimmer,
};
