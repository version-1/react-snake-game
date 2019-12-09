import React from 'react';
import Dot from '../atoms/Dot';

const FieldContent = props => {
  const {size, width, data} = props;
  return new Array(size).fill('').map((item, y) => {
    const offsets = data.slice(y * size, (y + 1) * size);

    return (
      <div key={`dots-${y + 1}`} className={`row  y${y + 1}`}>
        {offsets.map((item, x) => (
          <Dot x={x} y={y} width={width} size={size} item={item} />
        ))}
      </div>
    );
  });
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.data !== nextProps.data
}

export default FieldContent;
