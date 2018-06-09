import React, { Component } from 'react';
import Move from './panels/Move';

class Pannel extends Component {
  render() {
    const { length, status, start, stop, restart, setDirection } = this.props;
    return (
      <div className="operator">
        <Move setDirection={setDirection} />
      </div>
    );
  }
}

export default Pannel;
