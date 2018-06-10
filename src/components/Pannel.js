import React, { Component } from 'react';
import Move from './panels/Move';
import Info from './panels/Info';
import Status from './panels/Status';

class Pannel extends Component {
  render() {
    const {
      setDirection,
      width,
      length,
      status,
      start,
      stop,
      restart,
      interval,
      setSpeed
    } = this.props;
    return (
      <div className={`pannel width-${width}`}>
        <div className="pannel-body">
          <Move setDirection={setDirection} />
        </div>
        <div className="pannel-header">
          <Info
            setSpeed={setSpeed}
            interval={interval}
            length={length}
            status={status}
          />
        </div>
      </div>
    );
  }
}

export default Pannel;
