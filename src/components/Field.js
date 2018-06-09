import React, { Component } from 'react';

class Field extends Component {
  renderDots(size, dots) {
    return dots.map((item, index) => {
      const x = (index % size) + 1;
      const y = parseInt(index / size) + 1;
      const className = `${item} i${index} x${x} y${y}`;

      return <div key={index} className={className} />;
    });
  }

  render() {
    const { size, dots } = this.props;
    if (!dots) {
      return <div />;
    }
    return (
      <div>
        <div className="field field-600">{this.renderDots(size, dots)}</div>
      </div>
    );
  }
}

export default Field;
