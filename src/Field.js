import React, { Component } from 'react';

const LEFT_KEY_CODE = 37
const UP_KEY_CODE = 38
const RIGHT_KEY_CODE = 39
const DOWN_KEY_CODE = 40

class Field extends Component {
  constructor(props){
    super(props)
    const cursor = { x: props.startX, y: props.startY}
    this.state = {
      dots: this.dots,
      cursor,
      history: [cursor],
      direction: 'down',
      length: props.length,
    }
    document.addEventListener('keydown', (e) => this.handleOnkeyPress(e))
  }

  componentDidMount(){
    this.interval = setInterval(() => this.move(this.state.direction), this.props.interval)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
    const {history, dots} = this.state
    const index = getIndex(size, newCursor.x, newCursor.y)
    const newDots = snakenize(index, dots)
    this.setState({
      dots: this.eraceFootprint(newDots),
      cursor: newCursor,
      history: [...history, newCursor],
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
    return (
      <div>
        <div className="field">
          {this.renderDots()}
        </div>
        <button onClick={() => this.setDirection('up')}>up</button>
        <button onClick={() => this.setDirection('down')}>down</button>
        <button onClick={() => this.setDirection('right')}>right</button>
        <button onClick={() => this.setDirection('left')}>left</button>
      </div>
    );
  }
}


const erase = (index, array) => replace('dots', index, array)
const snakenize = (index, array) => replace('snake', index, array)

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
