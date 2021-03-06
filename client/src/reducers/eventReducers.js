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
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_FAIL,
} from '../constants/eventConstants';

export const eventListReducer = (state = { loading: true, events: [] }, action) => {
  switch (action.type) {
    case EVENT_LIST_REQUEST:
      return { loading: true };
    case EVENT_LIST_SUCCESS:
      return { loading: false, events: action.payload.events };
    case EVENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_CREATE_REQUEST:
      return { loading: true };
    case EVENT_CREATE_SUCCESS:
      return { loading: false, success: true, event: action.payload };
    case EVENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const individualEventDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case INDIVIDUAL_EVENT_DETAILS_REQUEST:
      return { loading: true };
    case INDIVIDUAL_EVENT_DETAILS_SUCCESS:
      return { loading: false, event: action.payload };
    case INDIVIDUAL_EVENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_UPDATE_REQUEST:
      return { loading: true };
    case EVENT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case EVENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_DELETE_REQUEST:
      return { loading: true };
    case EVENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case EVENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};