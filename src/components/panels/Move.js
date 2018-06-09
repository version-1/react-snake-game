import React, { Component } from 'react';

class Move extends Component {
  render() {
    const { setDirection } = this.props;
    return (
      <div className="move">
        <div className="col">
          <div className="btn btn-side" onClick={() => setDirection('left')}>←</div>
        </div>
        <div className="col">
          <div className="btn" onClick={() => setDirection('up')}>↑</div>
          <div className="btn" onClick={() => setDirection('down')}>↓</div>
        </div>
        <div className="col">
          <div className="btn btn-side" onClick={() => setDirection('right')}>→</div>
        </div>
      </div>
    );
  }
}

export default Move;
