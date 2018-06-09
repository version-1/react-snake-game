import React, { Component } from 'react';

class Move extends Component {
  render() {
    const { setDirection } = this.props;
    return (
      <div className="move">
        <div className="move-row">
          <div className="btn void"></div>
          <div className="btn" onClick={() => setDirection('up')}>↑</div>
          <div className="btn void"></div>
        </div>
        <div className="move-row">
          <div className="btn" onClick={() => setDirection('left')}>←</div>
          <div className="btn void"></div>
          <div className="btn btn-side" onClick={() => setDirection('right')}>→</div>
        </div>
        <div className="move-row">
          <div className="btn void"></div>
          <div className="btn" onClick={() => setDirection('down')}>↓</div>
          <div className="btn void"></div>
        </div>
      </div>
    );
  }
}

export default Move;
