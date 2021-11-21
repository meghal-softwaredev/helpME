import Axios from 'axios';
import {
  FEED_LIST_REQUEST,
  FEED_LIST_SUCCESS,
  FEED_LIST_FAIL,
  FEED_CREATE_REQUEST,
  FEED_CREATE_SUCCESS,
  FEED_CREATE_FAIL,
  FEED_UPDATE_REQUEST,
  FEED_UPDATE_SUCCESS,
  FEED_UPDATE_FAIL,
  FEED_DELETE_REQUEST,
  FEED_DELETE_SUCCESS,
  FEED_DELETE_FAIL,
  ANSWER_CREATE_REQUEST,
  ANSWER_CREATE_SUCCESS,
  ANSWER_CREATE_FAIL,
  INDIVIDUAL_FEED_DETAILS_REQUEST,
  INDIVIDUAL_FEED_DETAILS_SUCCESS,
  INDIVIDUAL_FEED_DETAILS_FAIL,
  FEED_ANSWERS_REQUEST,
  FEED_ANSWERS_SUCCESS,
  FEED_ANSWERS_FAIL,
  FEED_ANSWER_DELETE_REQUEST,
  FEED_ANSWER_DELETE_SUCCESS,
  FEED_ANSWER_DELETE_FAIL,
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

export const updateFeed = (updatedFeed) => async (dispatch, getState) => {
  dispatch({ type: FEED_UPDATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/feeds/${updatedFeed.feedId}`, {
        title: updatedFeed.title,
        description: updatedFeed.description,
        category_id: updatedFeed.category_id,
        user_id: userInfo._id,
        tags: updatedFeed.tags
    },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: FEED_UPDATE_SUCCESS,
      payload: data.feed,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: FEED_UPDATE_FAIL, payload: message });
  }
};

export const getIndividualFeed = (feedId) => async (dispatch) => {
  dispatch({ type: INDIVIDUAL_FEED_DETAILS_REQUEST, payload: feedId });
  try {
    const { data } = await Axios.get(`/api/feeds/${feedId}`);
    dispatch({ type: INDIVIDUAL_FEED_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_FEED_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFeedAnswers = (feedId) => async (dispatch) => {
  dispatch({ type: FEED_ANSWERS_REQUEST, payload: feedId });
  try {
    const { data } = await Axios.get(`/api/feeds/${feedId}/answers`);
    dispatch({ type: FEED_ANSWERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FEED_ANSWERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const saveAnswer = (newAnswerDetails) => async (dispatch, getState) => {
  dispatch({ type: ANSWER_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/feeds/${newAnswerDetails.feedId}/answer/new`, {
        user_id: userInfo._id,
        answer: newAnswerDetails.newAnswer
    },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: ANSWER_CREATE_SUCCESS,
      payload: data.answer,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ANSWER_CREATE_FAIL, payload: message });
  }
};

export const deleteFeed = (feedId) => async (dispatch, getState) => {
  dispatch({ type: FEED_DELETE_REQUEST, payload: feedId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(
      `/api/feeds/${feedId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: FEED_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: FEED_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteFeedAnswer = (ans_id) => async (dispatch, getState) => {
  dispatch({ type: FEED_ANSWER_DELETE_REQUEST, payload: ans_id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(
      `/api/answers/${ans_id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
    );
    dispatch({ type: FEED_ANSWER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: FEED_ANSWER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};