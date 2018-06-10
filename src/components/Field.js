import React, { Component } from 'react';

class Field extends Component {
  renderDots(size, width, dots) {
    return new Array(size).fill('').map((item, y) => {
      const offsets = dots.slice(y * size, (y + 1) * size);

      return (
        <div key={`dots-${y + 1}`} className={`row  y${y + 1}`}>
          {offsets.map((item, x) => {
            const index = y * size + (x + 1);
            const className = `dots ${item} dots-for-width-${width} i${index} x${x +
              1}`;
            return <div key={`dots-${x + 1}-${y + 1}`} className={className} />;
          })}
        </div>
      );
    });
  }

  render() {
    const { size, dots, width } = this.props;
    if (!dots) {
      return <div />;
    }
    const className = `field`;
    return (
      <div className={className}>{this.renderDots(size, width, dots)}</div>
    );
  }
}

export default Field;
