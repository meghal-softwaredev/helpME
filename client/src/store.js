import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  userRegisterReducer,
  userSigninReducer
} from './reducers/userReducers';
import {
  feedListReducer,
  feedCreateReducer,
  individualFeedDetailsReducer,
  answerCreateReducer,
} from './reducers/feedReducers';
import {
  groupListReducer,
  groupCreateReducer,
  individualGroupDetailsReducer,
  groupUpdateReducer,
  groupDeleteReducer
} from './reducers/groupReducers';
import {
  eventListReducer,
  eventCreateReducer,
  individualEventDetailsReducer,
  eventDeleteReducer,
} from './reducers/eventReducers';
import {
  categoryListReducer,
} from './reducers/categoryReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  }
};

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  categoryList: categoryListReducer,
  feedList: feedListReducer,
  feedCreate: feedCreateReducer,
  individualFeedDetails: individualFeedDetailsReducer,
  answerCreate: answerCreateReducer,
  groupList: groupListReducer,
  groupCreate: groupCreateReducer,
  individualGroupDetails: individualGroupDetailsReducer,
  groupUpdate : groupUpdateReducer,
  groupDelete: groupDeleteReducer,
  eventList: eventListReducer,
  eventCreate: eventCreateReducer,
  individualEventDetails: individualEventDetailsReducer,
  eventDelete: eventDeleteReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;