import Axios from "axios";
import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  PREFERRED_CATEGORIES_SAVE_REQUEST,
  PREFERRED_CATEGORIES_SAVE_SUCCESS,
  PREFERRED_CATEGORIES_SAVE_FAIL,
  PREFERRED_CATEGORIES_SAVE_RESET,
} from "../constants/categoryConstants";

export const listCategories = () => async (dispatch) => {
  dispatch({
    type: CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/categories`);
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const savePrefferedCategories =
  (prefferedCategories) => async (dispatch, getState) => {
    dispatch({ type: PREFERRED_CATEGORIES_SAVE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        "/api/profiles/preferred_categories/new",
        {
          prefferedCategories,
          user_id: userInfo._id,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: PREFERRED_CATEGORIES_SAVE_SUCCESS,
        payload: data.preferred_categories,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PREFERRED_CATEGORIES_SAVE_FAIL, payload: message });
    }
  };
