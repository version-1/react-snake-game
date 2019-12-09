import React from 'react';
import FieldContent from './FieldContent';

const Field = props => {
  const {size, dots, width} = props;
  if (!dots) {
    return <div />;
  }
  return (
    <div className="field">
      <FieldContent size={size} width={width} data={dots} />
    </div>
  );
};

export default Field;
