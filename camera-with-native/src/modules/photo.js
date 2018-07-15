const POST = "photo/POST";
const SELECT = "photo/SELECT";
export const REQUEST = "photo/REQUEST";
export const SUCCESS_POST = "photo/SUCCESS_POST";
export const SUCCESS_GET = "photo/SUCCESS_GET";
export const FAILUER = "photo/FAILUER";

export const post = () => {
  return {
    type: POST
  };
};

export const successGet = payload => {
  return {
    payload,
    type: SUCCESS_GET
  };
};

export const successPost = () => {
  return {
    type: SUCCESS_Post
  };
};
export const failuer = () => {
  return {
    type: FAILUER
  };
};
export const get = payload => {
  return {
    payload,
    type: REQUEST
  };
};

export const select = payload => {
  return {
    payload,
    type: SELECT
  };
};

const initialState = {
  entities: [],
  selectedFiles: [],
  error: {},
  status: ""
};

export const photo = (state = initialState, action) => {
  switch (action.type) {
    case SELECT:
      return {
        ...state,
        selectedFiles: [...state.selectedFiles, action.payload]
      };
    case SUCCESS_POST:
      return {
        ...state,
        status: action.payload
      };
    case SUCCESS_GET:
      return {
        ...state,
        entities: action.payload
      };
    case FAILUER:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
