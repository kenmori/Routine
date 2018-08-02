const POST = 'photo/POST';
const SELECT = 'photo/SELECT';
export const REQUEST = 'photo/REQUEST';
export const SUCCESS = 'photo/SUCCESS';
export const FAILUER = 'photo/FAILUER';

export const post = (payload) => {
  return {
    payload,
    type: POST
  }
}

export const request = (payload) => {
  return {
    payload,
    type: REQUEST
  }
}

export const select = (payload) => {
  return {
    payload,
    type: SELECT
  }
}

const initialState = {
  entities: [],
  thum: [],
  selectedFiles: [{}],
  error: {}
}

export const photo = (state = initialState, action) => {
  switch (action.type){
    case POST:
      return {
        ...state,
        entities: state.entities
      }
    case SELECT:
      return {
        ...state,
        thum: action.payload
      }
    case SUCCESS:
      return {
        ...state,
        entities: action.payload
      }
    case FAILUER:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

