import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Selector,
  AddButton,
  RemoveButton,
  Input,
  Label,
} from './styles';

const NumberSelector = ({
  value,
  maxValue,
  minValue,
  onChange,
  onAddClick: onSum,
  onRemoveClick: onSubtract,
  label,
}) => (
  <Container>
    <Selector>
      <RemoveButton
        onClick={() => onSubtract(value)}
        disabled={minValue !== undefined && value === minValue}
      />
      <Input
        type="number"
        value={value}
        onChange={({ target }) => {
          const newValue = parseInt(target.value, 10);

          if (minValue !== undefined && newValue < minValue) return;
          if (maxValue !== undefined && newValue > maxValue) return;

          if (newValue) onChange(newValue);
          else onChange(0);
        }}
      />
      <AddButton
        onClick={() => onSum(value)}
        disabled={maxValue !== undefined && value === maxValue}
      />
    </Selector>
    {label && <Label>{label}</Label>}
  </Container>
);

NumberSelector.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  onChange: PropTypes.func,
  onAddClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  label: PropTypes.string,
};

NumberSelector.defaultProps = {
  value: 0,
  maxValue: undefined,
  minValue: undefined,
  onChange: undefined,
  onAddClick: undefined,
  onRemoveClick: undefined,
  label: undefined,
};

export default NumberSelector;
