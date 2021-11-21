import Axios from 'axios';
import {
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL,
  INDIVIDUAL_EVENT_DETAILS_REQUEST,
  INDIVIDUAL_EVENT_DETAILS_SUCCESS,
  INDIVIDUAL_EVENT_DETAILS_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_FAIL,
} from '../constants/eventConstants';

export const listEvents = () => async (dispatch) => {
  dispatch({
    type: EVENT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/events`
    );
    dispatch({ type: EVENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EVENT_LIST_FAIL, payload: error.message });
  }
};

export const createEvent = (newEvent) => async (dispatch, getState) => {
  dispatch({ type: EVENT_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      '/api/events/new', {
        title: newEvent.title,
        description: newEvent.description,
        user_id: userInfo._id,
        // date: newEvent.date,
        // start_time: newEvent.start_time,
        date_time: newEvent.date_time,
        duration: newEvent.duration,
        event_image_url: newEvent.event_image_url,
        event_video_url: newEvent.event_video_url,
        group_id: newEvent.group_id,
        tags: newEvent.tags,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: EVENT_CREATE_SUCCESS,
      payload: data.event,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: EVENT_CREATE_FAIL, payload: message });
  }
};

export const getIndividualEvent = (eventId) => async (dispatch) => {
  dispatch({ type: INDIVIDUAL_EVENT_DETAILS_REQUEST, payload: eventId });
  try {
    const { data } = await Axios.get(`/api/events/${eventId}`);
    dispatch({ type: INDIVIDUAL_EVENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_EVENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEvent = (eventId) => async (dispatch, getState) => {
  dispatch({ type: EVENT_DELETE_REQUEST, payload: eventId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/events/${eventId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: EVENT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: EVENT_DELETE_FAIL, payload: message });
  }
};