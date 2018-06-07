import React, { Component } from 'react';
import Field from './Field';

const SIZE = 60
const START_X = 30
const START_Y = 30
const START_LENGTH = 3

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
