import { SET_HEADER_DATE } from "../types/headerType";

const initialState = new Date();

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HEADER_DATE:
      return action.payload;
    default:
      return state;
  }
};

export default headerReducer;
