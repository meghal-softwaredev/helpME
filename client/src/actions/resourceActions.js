import Axios from 'axios';
import {
  RESOURCE_CATEGORY_LIST_REQUEST,
  RESOURCE_CATEGORY_LIST_SUCCESS,
  RESOURCE_CATEGORY_LIST_FAIL,
  RESOURCE_LIST_REQUEST,
  RESOURCE_LIST_SUCCESS,
  RESOURCE_LIST_FAIL,
} from '../constants/resourceConstants';

export const listResourceCategories = () => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  dispatch({
    type: RESOURCE_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/resourceCategories/${userInfo._id}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
    dispatch({ type: RESOURCE_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RESOURCE_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const listResources = ({
  resourceCategory = ''
}) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  dispatch({
    type: RESOURCE_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/resources?resourceCategory=${resourceCategory}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
    dispatch({ type: RESOURCE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RESOURCE_LIST_FAIL, payload: error.message });
  }
};