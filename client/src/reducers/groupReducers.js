import {
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
  GROUP_LIST_FAIL
} from '../constants/groupConstants';

export const groupListReducer = (state = { loading: true, feeds: [] }, action) => {
  switch (action.type) {
    case GROUP_LIST_REQUEST:
      return { loading: true };
    case GROUP_LIST_SUCCESS:
      return { loading: false, groups: action.payload.groups };
    case GROUP_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};