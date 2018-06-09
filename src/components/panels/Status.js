import React, { Component } from 'react';

class Status extends Component {
  get status() {
    return this.props.status;
  }

  get isPreparing() {
    return this.status === 'preparing';
  }

  get isStarting() {
    return this.status === 'starting';
  }

  get isSuspended() {
    return this.status === 'suspended';
  }

  get isOver() {
    return this.status === 'over';
  }

  render() {
    const { start, stop, restart } = this.props;
    return (
      <div className="status">
        {(this.isSuspended || this.isPreparing) && (
          <button onClick={() => start()}>start</button>
        )}
        {this.isStarting && <button onClick={() => stop()}>stop</button>}
        <button onClick={() => restart()}>restart</button>
      </div>
    );
  }
}

export default Status;
