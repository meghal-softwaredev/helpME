const {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  PREFERRED_CATEGORIES_SAVE_REQUEST,
  PREFERRED_CATEGORIES_SAVE_SUCCESS,
  PREFERRED_CATEGORIES_SAVE_FAIL,
  PREFERRED_CATEGORIES_SAVE_RESET,
} = require("../constants/categoryConstants");

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
        categories: action.payload.categories,
      };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const preferredCategoriesSaveReducer = (state = {}, action) => {
  switch (action.type) {
    case PREFERRED_CATEGORIES_SAVE_REQUEST:
      return { loading: true };
    case PREFERRED_CATEGORIES_SAVE_SUCCESS:
      return {
        loading: false,
        success: true,
        preferred_categories: action.payload,
      };
    case PREFERRED_CATEGORIES_SAVE_FAIL:
      return { loading: false, error: action.payload };
    case PREFERRED_CATEGORIES_SAVE_RESET:
      return {};
    default:
      return state;
  }
};
