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
    const { start, stop, width } = this.props;
    return (
      <div className={`status width-${width}`}>
        {(this.isSuspended || this.isPreparing) && (
          <div className="btn btn-status start" onClick={() => start()}>
            start
          </div>
        )}
        {this.isStarting && (
          <div className="btn btn-status stop" onClick={() => stop()}>
            stop
          </div>
        )}
        {this.isOver && (
          <div
            className="btn btn-status over"
            onClick={() => window.location.reload()}
          >
            Game Over
          </div>
        )}
      </div>
    );
  }
}

export default Status;
