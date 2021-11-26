const {
  VOLUNTEER_LIST_REQUEST,
  VOLUNTEER_LIST_SUCCESS,
  VOLUNTEER_LIST_FAIL,
} = require("../constants/volunteerConstants");

export const volunteerListReducer = (
  state = { loading: true, volunteers: [] },
  action
) => {
  switch (action.type) {
    case VOLUNTEER_LIST_REQUEST:
      return { loading: true };
    case VOLUNTEER_LIST_SUCCESS:
      return {
        loading: false,
        volunteers: action.payload,
      };
    case VOLUNTEER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};