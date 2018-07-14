const POST = "photo/POST";
const SELECT = "photo/SELECT";
export const REQUEST = "photo/REQUEST";
export const SUCCESS = "photo/SUCCESS";
export const FAILUER = "photo/FAILUER";

export const post = () => {
  return {
    type: POST
  };
};

export const request = payload => {
  return {
    payload,
    type: REQUEST
  };
};

export const select = payload => {
  console.log("select", payload);
  return {
    payload,
    type: SELECT
  };
};

const initialState = {
  entities: [],
  thum: [],
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
    case SUCCESS:
      return {
        ...state,
        status: action.payload
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
