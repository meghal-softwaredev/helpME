const {
  FEED_LIST_REQUEST,
  FEED_LIST_SUCCESS,
  FEED_LIST_FAIL,
  FEED_CREATE_REQUEST,
  FEED_CREATE_SUCCESS,
  FEED_CREATE_FAIL,
  FEED_CREATE_RESET,
  FEED_UPDATE_REQUEST,
  FEED_UPDATE_SUCCESS,
  FEED_UPDATE_FAIL,
  INDIVIDUAL_FEED_DETAILS_REQUEST,
  INDIVIDUAL_FEED_DETAILS_SUCCESS,
  INDIVIDUAL_FEED_DETAILS_FAIL,
  FEED_ANSWERS_REQUEST,
  FEED_ANSWERS_SUCCESS,
  FEED_ANSWERS_FAIL,
  ANSWER_CREATE_REQUEST,
  ANSWER_CREATE_SUCCESS,
  ANSWER_CREATE_FAIL,
} = require('../constants/feedConstants');

export const feedListReducer = (
  state = { loading: true, feeds: [] },
  action
) => {
  switch (action.type) {
    case FEED_LIST_REQUEST:
      return { loading: true };
    case FEED_LIST_SUCCESS:
      return {
        loading: false,
        feeds: action.payload.feeds
      };
    case FEED_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const feedCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FEED_CREATE_REQUEST:
      return { loading: true };
    case FEED_CREATE_SUCCESS:
      return { loading: false, success: true, feed: action.payload };
    case FEED_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case FEED_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const feedUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case FEED_UPDATE_REQUEST:
      return { loading: true };
    case FEED_UPDATE_SUCCESS:
      return { loading: false, success: true, updatedFeed: action.payload };
    case FEED_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const answerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ANSWER_CREATE_REQUEST:
      return { loading: true };
    case ANSWER_CREATE_SUCCESS:
      return { loading: false, success: true, answer: action.payload };
    case ANSWER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const individualFeedDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case INDIVIDUAL_FEED_DETAILS_REQUEST:
      return { loadingFeedDetails: true };
    case INDIVIDUAL_FEED_DETAILS_SUCCESS:
      return { loadingFeedDetails: false, feed: action.payload };
    case INDIVIDUAL_FEED_DETAILS_FAIL:
      return { loadingFeedDetails: false, errorFeedDetails: action.payload };
    default:
      return state;
  }
};

export const feedAnswersReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case FEED_ANSWERS_REQUEST:
      return { loadingAnswers: true };
    case FEED_ANSWERS_SUCCESS:
      return { loadingAnswers: false, answers: action.payload };
    case FEED_ANSWERS_FAIL:
      return { loadingAnswers: false, errorAnswers: action.payload };
    default:
      return state;
  }
};