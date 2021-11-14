const {
  FEED_LIST_REQUEST,
  FEED_LIST_SUCCESS,
  FEED_LIST_FAIL,
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