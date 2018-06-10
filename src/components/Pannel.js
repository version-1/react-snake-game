import React, { Component } from 'react';
import Move from './panels/Move';

class Pannel extends Component {
  render() {
    const { setDirection, width } = this.props;
    return (
      <div className={`operator width-${width}`}>
        <Move setDirection={setDirection} />
      </div>
    );
  }
}

export default Pannel;
