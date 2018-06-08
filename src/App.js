import React, { Component } from 'react';
import Field from './Field';

const SIZE = 60
const START_X = SIZE / 2
const START_Y = SIZE / 2
const START_LENGTH = 1

class App extends Component {
  render() {
    return (
      <div className="app">
        <Field
          interval={10}
          size={SIZE}
          length={START_LENGTH}
          startX={START_X}
          startY={START_Y}
          />
      </div>
    );
  }
}

export default App;
