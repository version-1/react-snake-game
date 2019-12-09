import React from 'react';

const Dot = props => {
  const {x, y, width, size, item} = props;
  const index = y * size + (x + 1);
  const className = `dots ${item} dots-for-width-${width} i${index} x${x + 1}`;

  return <div key={`dots-${x + 1}-${y + 1}`} className={className} />;
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.item !== nextProps.item
}

export default Dot
