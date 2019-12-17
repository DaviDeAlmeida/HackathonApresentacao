import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Bar,
  Layer,
  Label,
  Wrapper,
} from './styles';

const ProgressBar = ({ width, height, layers }) => {
  const element = useRef(null);
  const total = layers.reduce((sum, layer) => sum + layer.percentage, 0);

  const [data, setData] = useState(
    layers
      .sort((a, b) => a.percentage + b.percentage)
      .map((layer) => ({
        ...layer,
        width: 0,
      })),
  );

  useEffect(() => {

    setData(layers.map((layer) => ({
      ...layer,
      width: (element.current.offsetWidth / 100) * layer.percentage,
    })));

  }, []);

  return (
    <Wrapper>
      <Bar
        ref={element}
        width={width}
        height={height}
      >
        {data.map((layer) => (
          <Layer
            key={`${layer.label}-${layer.color}-${layer.width}`}
            color={layer.color}
            width={layer.width}
          />
        ))}
      </Bar>
      <Label>{`${total}%`}</Label>
    </Wrapper>
  );
};

ProgressBar.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  layers: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    color: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
  })),
};

ProgressBar.defaultProps = {
  width: 200,
  height: 16,
  layers: [],
};

export default ProgressBar;
