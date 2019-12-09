import React from 'react';

const Controller = props => {
  const {setDirection} = props;
  return (
    <div className="move">
      <div className="col">
        <div
          className="btn btn-side btn-left"
          onClick={() => setDirection('left')}>
          ←
        </div>
      </div>
      <div className="col">
        <div className="btn btn-up" onClick={() => setDirection('up')}>
          ↑
        </div>
        <div className="btn btn-down" onClick={() => setDirection('down')}>
          ↓
        </div>
      </div>
      <div className="col">
        <div
          className="btn btn-side btn-right"
          onClick={() => setDirection('right')}>
          →
        </div>
      </div>
    </div>
  );
};

export default Controller;
