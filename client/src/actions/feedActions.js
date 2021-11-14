import Axios from 'axios';
import {
  FEED_LIST_FAIL,
  FEED_LIST_REQUEST,
  FEED_LIST_SUCCESS
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