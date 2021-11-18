import Axios from 'axios';
import {
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
  GROUP_LIST_FAIL,
  GROUP_CREATE_REQUEST,
  GROUP_CREATE_SUCCESS,
  GROUP_CREATE_FAIL
} from '../constants/groupConstants';

export const listGroups = () => async (dispatch) => {
  dispatch({
    type: GROUP_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/groups`
    );
    dispatch({ type: GROUP_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GROUP_LIST_FAIL, payload: error.message });
  }
};

export const createGroup = (newGroup) => async (dispatch, getState) => {
  dispatch({ type: GROUP_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      '/api/groups/new', {
        title: newGroup.title,
        description: newGroup.description,
        category_id: newGroup.category_id,
        user_id: userInfo._id,
        group_url: newGroup.group_url,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: GROUP_CREATE_SUCCESS,
      payload: data.group,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GROUP_CREATE_FAIL, payload: message });
  }
};