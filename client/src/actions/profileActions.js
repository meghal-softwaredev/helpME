import Axios from "axios";
import {
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_DETAILS_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  CURRENT_CATEGORY_UPDATE_REQUEST,
  CURRENT_CATEGORY_UPDATE_SUCCESS,
  CURRENT_CATEGORY_UPDATE_FAIL,
} from "../constants/profileConstants";

export const showProfileDetails = (user_id) => async (dispatch, getState) => {
  dispatch({
    type: PROFILE_DETAILS_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/profiles/${user_id}`);
    dispatch({ type: PROFILE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PROFILE_DETAILS_FAIL, payload: error.message });
  }
};

export const updateProfile = (updatedProfile) => async (dispatch, getState) => {
  dispatch({ type: PROFILE_UPDATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/profiles/${updatedProfile._id}`, updatedProfile,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data.updatedProfile
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PROFILE_UPDATE_FAIL, payload: message });
  }
};

export const changeCurrentCategory = ({ user_id = '', updated_current_category = ''}) => async (dispatch, getState) => {
  dispatch({ type: CURRENT_CATEGORY_UPDATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/profiles/current_category/${user_id}`, { updated_current_category},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: CURRENT_CATEGORY_UPDATE_SUCCESS,
      payload: data.updatedProfile
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CURRENT_CATEGORY_UPDATE_FAIL, payload: message });
  }
};