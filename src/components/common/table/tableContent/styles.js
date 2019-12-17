import styled from 'styled-components';

import colors from '../../../../colors';

const Content = styled.div`
  font-size: 12px;
  white-space: nowrap;

  ${({ textToRight }) => textToRight && 'text-align: right;'}

  ${({ pushTo }) => {
    switch (pushTo) {
      case 'right':
        return 'margin-left: auto';
      case 'left':
        return 'margin-right: auto';
      default:
        return '';
    }
  }}
`;

const Title = styled.div`
  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;
  color: ${colors.grayA};
`;

const Info = styled.div`
  color: ${colors.grayB};
  margin-top: 8px;
`;

export {
  Content,
  Title,
  Info,
};
