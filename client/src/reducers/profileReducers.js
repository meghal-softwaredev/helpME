const {
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_DETAILS_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  CURRENT_CATEGORY_UPDATE_REQUEST,
  CURRENT_CATEGORY_UPDATE_SUCCESS,
  CURRENT_CATEGORY_UPDATE_FAIL,
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
    case PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true, profileDetails: action.payload };
    case PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CURRENT_CATEGORY_UPDATE_REQUEST:
      return { loading: true };
    case CURRENT_CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true, profileDetails: action.payload };
    case CURRENT_CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};