import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { width } = this.props;
    return (
      <div className={`header width-${width}`}>
        <h1 className="h1"> Snake Game </h1>
      </div>
    );
  }
}

export default Header;
