import Axios from 'axios';
import {
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
  GROUP_LIST_FAIL
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