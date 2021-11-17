import Axios from 'axios';
import {
  FEED_LIST_FAIL,
  FEED_LIST_REQUEST,
  FEED_LIST_SUCCESS,
  FEED_CREATE_FAIL,
  FEED_CREATE_REQUEST,
  FEED_CREATE_SUCCESS,
} from '../constants/feedConstants';

export const listFeeds = () => async (dispatch) => {
  dispatch({
    type: FEED_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/feeds`
    );
    dispatch({ type: FEED_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FEED_LIST_FAIL, payload: error.message });
  }
};

export const createFeed = (newFeed) => async (dispatch, getState) => {
  dispatch({ type: FEED_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      '/api/feeds/new', {
        title: newFeed.title,
        description: newFeed.description,
        category_id: newFeed.category_id,
        user_id: userInfo._id,
        tags: newFeed.tags
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: FEED_CREATE_SUCCESS,
      payload: data.feed,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: FEED_CREATE_FAIL, payload: message });
  }
};