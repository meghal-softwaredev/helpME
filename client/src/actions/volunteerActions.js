import Axios from "axios";
import {
  VOLUNTEER_LIST_FAIL,
  VOLUNTEER_LIST_REQUEST,
  VOLUNTEER_LIST_SUCCESS,
} from "../constants/volunteerConstants";

export const showVolunteerList = (user_id) => async (dispatch, getState) => {
  dispatch({
    type: VOLUNTEER_LIST_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/volunteers`);
    dispatch({ type: VOLUNTEER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VOLUNTEER_LIST_FAIL, payload: error.message });
  }
};