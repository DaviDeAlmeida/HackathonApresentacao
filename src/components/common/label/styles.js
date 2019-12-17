import styled from 'styled-components';

const Label = styled.label`
  font-family: 'Roboto-Medium', 'Roboto';
  font-weight: 500;
  font-size: 12px;
  display: flex;
  align-items: center;

  ${({ status }) => status && `
    &:before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      border: 2px solid ${status};
      border-radius: 100%;
      margin-right: 5px;
  `}
`;

export {
  Label,
};
