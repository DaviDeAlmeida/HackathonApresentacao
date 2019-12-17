import styled from 'styled-components';
import colors from '../../../../colors';

const Bar = styled.div`
  display: flex;
  background-color: ${colors.grayC};

  ${({ width, height }) => `
    width: ${(typeof width === 'number' ? `${width}px` : width)};
    height: ${(typeof height === 'number' ? `${height}px` : height)};
  `}
`;

const Wrapper = styled.div`
  display: flex;
`;

const Layer = styled.div`
  height: 16px;

  ${({ width, color }) => `
    width: ${(typeof width === 'number' ? `${width}px` : width)};
    background-color: ${color};
  `}
`;

const Label = styled.div`
  font-size: 12px;
  margin-left: 10px;
`;

export {
  Wrapper,
  Bar,
  Layer,
  Label,
};
