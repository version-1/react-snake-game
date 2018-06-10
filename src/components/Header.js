import React, { Component } from 'react';
import Status from './panels/Status';
import Info from './panels/Info';

class Header extends Component {
  render() {
    const { length, status, start, stop, restart, width } = this.props;
    return (
      <div className={`header width-${width}`}>
        <Status status={status} start={start} stop={stop} restart={restart} />
        <Info length={length} status={status} />
      </div>
    );
  }
}

export default Header;
