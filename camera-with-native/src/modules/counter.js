
const UP = 'counter/UP';
const DOWN = 'counter/DOWN';

export const upCounter = (payload) => {
  return {
    payload,
    type: UP
  }
}

export const downCounter = (payload) => {
  return {
    payload,
    type: DOWN
  }
}

const initialState = {
  count: 0
}

export const counter = (state = initialState, action) => {
  switch (action.type){
    case UP:
      return {
        count: state.count + 1
      }
    case DOWN:
      return {
        count: state.count -1
      }
    default:
      return state
  }
}

