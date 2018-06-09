import React, { Component } from 'react';

class Move extends Component {
  render() {
    const { setDirection } = this.props;
    return (
      <div className="move">
        <button onClick={() => setDirection('up')}>up</button>
        <button onClick={() => setDirection('down')}>down</button>
        <button onClick={() => setDirection('right')}>right</button>
        <button onClick={() => setDirection('left')}>left</button>
      </div>
    );
  }
}

export default Move;
