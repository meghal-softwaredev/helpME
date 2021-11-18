const {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL
} = require('../constants/categoryConstants');

export const categoryListReducer = (
  state = { loading: true, categories: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true };
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        categories: action.payload.categories
      };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};