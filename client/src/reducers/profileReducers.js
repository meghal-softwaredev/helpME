const {
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_DETAILS_FAIL,
} = require("../constants/profileConstants");

export const profileDetailsReducer = (
  state = { loading: true, profileDetails: {} },
  action
) => {
  switch (action.type) {
    case PROFILE_DETAILS_REQUEST:
      return { loading: true };
    case PROFILE_DETAILS_SUCCESS:
      return {
        loading: false,
        profileDetails: action.payload,
      };
    case PROFILE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};