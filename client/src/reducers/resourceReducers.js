const {
  RESOURCE_CATEGORY_LIST_REQUEST,
  RESOURCE_CATEGORY_LIST_SUCCESS,
  RESOURCE_CATEGORY_LIST_FAIL,
  RESOURCE_LIST_REQUEST,
  RESOURCE_LIST_SUCCESS,
  RESOURCE_LIST_FAIL,
} = require("../constants/resourceConstants");

export const resourceCategoryListReducer = (state={}, action) => {
  switch (action.type) {
    case RESOURCE_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case RESOURCE_CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        resourceCategories: action.payload.createdResourceCategory,
      };
    case RESOURCE_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const resourceListReducer = (state={}, action) => {
  switch (action.type) {
    case RESOURCE_LIST_REQUEST:
      return { loading: true };
    case RESOURCE_LIST_SUCCESS:
      return {
        loading: false,
        resources: action.payload.resources,
      };
    case RESOURCE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};