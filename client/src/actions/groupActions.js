import Axios from 'axios';
import {
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
  GROUP_LIST_FAIL,
  GROUP_CREATE_REQUEST,
  GROUP_CREATE_SUCCESS,
  GROUP_CREATE_FAIL,
  INDIVIDUAL_GROUP_DETAILS_REQUEST,
  INDIVIDUAL_GROUP_DETAILS_SUCCESS,
  INDIVIDUAL_GROUP_DETAILS_FAIL,
  GROUP_UPDATE_REQUEST,
  GROUP_UPDATE_SUCCESS,
  GROUP_UPDATE_FAIL,
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

export const getIndividualGroup = (groupId) => async (dispatch) => {
  dispatch({ type: INDIVIDUAL_GROUP_DETAILS_REQUEST, payload: groupId });
  try {
    const { data } = await Axios.get(`/api/groups/${groupId}`);
    dispatch({ type: INDIVIDUAL_GROUP_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_GROUP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateGroup = (groupId, group) => async (dispatch, getState) => {
  console.log("group",groupId);
  dispatch({ type: GROUP_UPDATE_REQUEST, payload: group });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/groups/${groupId}`, { title: group.title,
          description: group.description,
          category_id: group.category_id,
          user_id: userInfo._id,
          group_url: group.group_url }, 
    {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    // const { data } = await Axios.put(`/api/groups/${group._id}/edit`, { group, user_id: userInfo._id }, {
    //   headers: { Authorization: `Bearer ${userInfo.token}` },
    // });
    dispatch({ type:GROUP_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GROUP_UPDATE_FAIL, payload: message });
  }
};