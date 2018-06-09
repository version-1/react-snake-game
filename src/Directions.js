import {
  LEFT_KEY_CODE,
  RIGHT_KEY_CODE,
  UP_KEY_CODE,
  DOWN_KEY_CODE
} from './Constant';

export const move = (size, cursor, direction) => {

  let nextCursor = newCursor(cursor, direction);
  let nextDirection = direction;
  while (isConflicted(size, nextCursor)) {
    // 壁にぶつかった場合
    nextDirection = REFLECT_DIRECTIONS[nextDirection];
    nextCursor = newCursor(cursor, nextDirection);
  }

  return {
    cursor: nextCursor,
    direction: nextDirection
  };
};

const isConflicted = (size, cursor) => {
  return (cursor.x <= 0 || cursor.y <= 0) || (cursor.x > size || cursor.y >
    size);
};

export const newCursor = (cursor, direction) => {
  const directions = {
    up: { ...cursor,
      y: cursor.y - 1
    },
    down: { ...cursor,
      y: cursor.y + 1
    },
    left: { ...cursor,
      x: cursor.x - 1
    },
    right: { ...cursor,
      x: cursor.x + 1
    }
  };

  return directions[direction];
};

export const MAP_KEY_DIRECTION = {
  [LEFT_KEY_CODE]: 'left',
  [RIGHT_KEY_CODE]: 'right',
  [UP_KEY_CODE]: 'up',
  [DOWN_KEY_CODE]: 'down'
};

export const REFLECT_DIRECTIONS = {
  up: 'left',
  down: 'right',
  left: 'down',
  right: 'up'
};

const BANNED_DIRECTIONS = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left'
};

export const isBannedDirection = (nextDirection, prevDirection) => {
  return BANNED_DIRECTIONS[prevDirection] === nextDirection;
}