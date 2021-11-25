import Axios from "axios";
import {
  PROFILE_DETAILS_FAIL,
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
} from "../constants/profileConstants";

export const showProfileDetails = () => async (dispatch, getState) => {
  dispatch({
    type: PROFILE_DETAILS_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/profiles/${userInfo._id}`);
    dispatch({ type: PROFILE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PROFILE_DETAILS_FAIL, payload: error.message });
  }
};