import React, { Component } from 'react';
import Move from './panels/Move';
import Status from './panels/Status';
import Info from './panels/Info';

class Pannel extends Component {
  render() {
    const { length, status, start, stop, restart, setDirection } = this.props;
    return (
      <div className="operator">
        <Move setDirection={setDirection} />
        <Status status={status} start={start} stop={stop} restart={restart} />
        <Info length={length} status={status} />
      </div>
    );
  }
}

export default Pannel;
