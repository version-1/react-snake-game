import React, { Component } from 'react';
import Field from './components/Field';
import Pannel from './components/Pannel';
import Header from './components/Header';
import { SIZE, START_X, START_Y, START_LENGTH } from './Constant';
import { MAP_KEY_DIRECTION, isBannedDirection, move } from './Directions';
import { getIndex, isSelf, isFood, newDots, initDots } from './Helper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState(this.initCursor, this.initLength);
    document.addEventListener('keydown', e => this.handleOnkeyPress(e));
  }

  initialState(cursor, length) {
    return {
      dots: this.dots,
      cursor,
      history: [cursor],
      length,
      direction: 'down',
      status: 'preparing',
      interval: 10
    };
  }

  get initCursor() {
    return { x: START_X, y: START_Y };
  }
  get initLength() {
    return START_LENGTH;
  }
  get size() {
    return SIZE;
  }

  get dots() {
    const dots = new Array(this.size * this.size).fill('dots');
    const initSnakeIndex = getIndex(
      this.size,
      this.initCursor.x,
      this.initCursor.y
    );
    const initFoodIndex = Math.floor(Math.random() * this.size * this.size);
    return initDots(dots, initSnakeIndex, initFoodIndex);
  }

  handleOnkeyPress(e) {
    if (MAP_KEY_DIRECTION[e.keyCode]) {
      this.setDirection(MAP_KEY_DIRECTION[e.keyCode]);
    }
  }

  setDirection(nextDirection) {
    const {direction} = this.state
    if(direction === nextDirection) {return}
    if (isBannedDirection(nextDirection, direction)) {
      return;
    }
    this.setState({ direction: nextDirection });
  }

  move() {
    const { cursor, direction } = this.state;
    const newState = move(this.size, cursor, direction);
    this.update(newState.direction, newState.cursor, cursor);
  }

  update = (newDirection, newCursor, prevCursor) => {
    const { history, dots, length } = this.state;
    const index = getIndex(this.size, newCursor.x, newCursor.y);
    if (isSelf(index, dots)) {
      return this.over();
    }

    this.setState({
      dots: newDots(index, this.size, length, history, dots),
      cursor: newCursor,
      history: [...history, newCursor],
      length: isFood(index, dots) ? length + 1 : length,
      direction: newDirection
    });
  };

  start = () => {
    this.setState({ status: 'starting' });
    this.interval = setInterval(
      () => this.move(),
      this.state.interval
    );
  };
  clear = () => {
    clearInterval(this.interval);
    this.setState({ status: 'cleared' });
  };
  suspended = () => {
    clearInterval(this.interval);
    this.setState({ status: 'suspended' });
  };
  over = () => {
    clearInterval(this.interval);
    this.setState({ status: 'over' });
  };
  /* status 管理　*/

  render() {
    const { status, dots, cursor, history, length } = this.state;
    return (
      <div className="app">
        <Header
          setDirection={direction => this.setDirection(direction)}
          start={this.start}
          stop={this.suspended}
          restart={this.restart}
          clear={this.clear}
          status={status}
          length={length}
        />
        <Field
          dots={dots}
          history={history}
          length={length}
          interval={10}
          size={this.size}
          cursor={cursor}
          over={this.over}
        />
        <Pannel
          setDirection={direction => this.setDirection(direction)}
          start={this.start}
          stop={this.suspended}
          restart={this.restart}
          clear={this.clear}
          status={status}
          length={length}
        />
      </div>
    );
  }
}

export default App;
