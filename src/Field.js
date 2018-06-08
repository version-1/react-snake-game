import React, { Component } from 'react';

const LEFT_KEY_CODE = 37
const UP_KEY_CODE = 38
const RIGHT_KEY_CODE = 39
const DOWN_KEY_CODE = 40

class Field extends Component {
  constructor(props){
    super(props)
    this.initialize(this.cursor, props.length)
    document.addEventListener('keydown', (e) => this.handleOnkeyPress(e))
  }

  initialize(cursor, length, init = true){
    const initalState = {
      dots: this.food(this.dots),
      cursor,
      history: [cursor],
      length,
      direction: 'down',
      status: 'prepare'
    }

    if(init){
      this.state = initalState
    }else{
      this.setState(initalState)
    }
  }

  handleOnkeyPress(e){
    const codes = {
      [LEFT_KEY_CODE]:  'left',
      [RIGHT_KEY_CODE]: 'right',
      [UP_KEY_CODE]:    'up',
      [DOWN_KEY_CODE]:  'down',
    }
    if(codes[e.keyCode]){
      this.setDirection(codes[e.keyCode])
    }
  }

  get isStarting(){
    return this.state.status === 'starting'
  }

  get cursor(){
    const {startX, startY} = this.props
    return { x: startX, y: startY}
  }

  get dots() {
    const {size, startX, startY} = this.props
    const dots = new Array(size * size).fill('dots')
    const index = getIndex(size, startX, startY)
    return replace('snake', index, dots)
  }

  get directions() {
    const {cursor} = this.state
    return {
      up: { ...cursor, y: cursor.y - 1 },
      down: { ...cursor, y: cursor.y + 1 },
      left: { ...cursor, x: cursor.x - 1 },
      right: { ...cursor, x: cursor.x + 1 },
    }
  }

  get reflectDirections(){
    return {
      up: 'left',
      down: 'right',
      left: 'down',
      right: 'up'
    }
  }

  get bannedDirection(){
    const {direction} = this.state
    const directions = {
      up: 'down',
      down: 'up',
      left: 'right',
      right: 'left'
    }
    return directions[direction]
  }

  restart = () => {
    clearInterval(this.interval)
    this.setState({status: 'prearing'})
    this.initialize(this.cursor, this.props.length, false)
  }

  start = () => {
    this.setState({status: 'starting'})
    this.interval = setInterval(() => this.move(this.state.direction), this.props.interval)
  }
  clear = () => this.setState({status: 'cleared'})
  suspended = () => {
    clearInterval(this.interval)
    this.setState({status: 'suspended'})
  }
  over = () => this.setState({status: 'over'})

  move = (direction) => {
    if(this.bannedDirection === direction){
      // 逆方向は無視
      return
    }

    const {cursor} = this.state
    let newCursor = this.directions[direction]
    let nextDirection = direction
    while(this.isConflicted(newCursor)){
      // 壁にぶつかった場合
      nextDirection = this.reflectDirections[nextDirection]
      newCursor = this.directions[nextDirection]
    }
    this.update(nextDirection, newCursor, cursor)
  }

  isConflicted(cursor) {
    const {size} = this.props
    return (cursor.x <= 0 || cursor.y <= 0)
    || (cursor.x > size || cursor.y > size)
  }

  update = (direction, newCursor, prevCursor) => {
    const {size} = this.props
    const {history, dots, length} = this.state
    const index = getIndex(size, newCursor.x, newCursor.y)
    const isFood = dots[index - 1] === 'food'
    const reducers = [
      (index, dots) => snakenize(index, dots),
      (index, dots) => this.eraceFootprint(dots),
      (index, dots) => {
        return isFood ? this.food(dots) : dots
      }
    ]
    const newDots = reducers.reduce( (acc, reducer) => reducer(index, acc), dots)
    this.setState({
      dots: newDots,
      cursor: newCursor,
      history: [...history, newCursor],
      length: isFood ? length + 1 : length,
      direction
    })
  }

  eraceFootprint = (dots) => {
    const {size} = this.props
    const { length, history } = this.state
    const aIndex = history.length - length
    if (aIndex < 0){
      return dots
    }
    const cursor = history[aIndex]
    const index = getIndex(size, cursor.x, cursor.y)
    return erase(index, dots)
  }

  food = (dots) => {
    const {size} = this.props
    const index = Math.floor( Math.random() * size * size );
    return foodnize(index, dots)
  }

  eat = (target, dots) => {
    const {length} = this.state
    if (target === 'food'){
      return length + 1
    }
    return length
  }

  renderDots(){
    const {size} = this.props
    const {dots} = this.state
    return dots.map( (item, index) => {
      const x = (index % size) + 1
      const y = parseInt(index / size) + 1
      const className = `${item} i${index} x${x} y${y}`

      return <div key={index} className={className}/>
    })
  }

  setDirection(direction){
    if(this.bannedDirection === direction){
      // 逆方向は無視
      return
    }
    this.setState({ direction })
  }
  render() {
    const { length } = this.state
    return (
      <div>
        <div className="field">
          {this.renderDots()}
        </div>
        <div className="operator">
          <div className="move">
            <button onClick={() => this.setDirection('up')}>up</button>
            <button onClick={() => this.setDirection('down')}>down</button>
            <button onClick={() => this.setDirection('right')}>right</button>
            <button onClick={() => this.setDirection('left')}>left</button>
          </div>
          <div className="status">
            <button onClick={() => this.start()}>start</button>
            <button onClick={() => this.suspended()}>stop</button>
            <button onClick={() => this.restart()}>restart</button>
          </div>
          <div className="info">
            <span>length : {length}</span>
          </div>
        </div>
      </div>
    );
  }
}


const erase = (index, array) => replace('dots', index, array)
const snakenize = (index, array) => replace('snake', index, array)
const foodnize = (index, array) => replace('food', index, array)

/*
 * @param str 任意の文字列
 * @param index 0から始まる配列のindex
 * @param array 配列
 */
const replace = (str, index, array) => [
  ...array.slice(0, index - 1),
  str,
  ...array.slice(index, array.length)
]

const getIndex = (size, x, y) => {
  return (x - 1) + ( ( y - 1 ) * size) + 1
}


export default Field;
