import React, { Component } from 'react';

class Info extends Component {
  render() {
    const { length, status } = this.props;
    return (
      <div className="info">
        <div>length : {length}</div>
        <div>status : {status}</div>
      </div>
    );
  }
}

export default Info;
