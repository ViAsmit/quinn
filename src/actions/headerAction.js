import { SET_HEADER_DATE } from "../types/headerType";

export const setHeaderDate = (date) => {
  return (dispatch) => {
    dispatch({
      type: SET_HEADER_DATE,
      payload: date,
    });
  };
};
