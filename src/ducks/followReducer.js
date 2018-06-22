import axios from 'axios';

const ADD_FOLLOW = 'ADD_FOLLOW';
const GET_FOLLOW_REVIEWS = 'GET_FOLLOW_REVIEWS';
const GET_FOLLOW_LIST = 'GET_FOLLOW_LIST';
const DELETE_FOLLOW ='DELETE_FOLLOW';
const FOLLOW_CHECK = 'FOLLOW_CHECK';
const GET_FOLLOW_USERS = 'GET_FOLLOW_USERS';

export function addFollow(userid, followid) {
  return {
    type: ADD_FOLLOW,
    payload: axios.post('/api/followadd', {userid, followid})
  };
};
export function getFollowReviews(id) {
  // console.log('follow id!!!   ',id);
  return {
    type: GET_FOLLOW_REVIEWS,
    payload: axios.get(`/api/follow/reviews/${id}`)
  };
};
export function getFollowList(id) {
  return {
    type: GET_FOLLOW_LIST,
    payload: axios.get(`/api/followlist/${id}`) 
  };
};
export function deleteFollow(follower, following) {
  return {
    type: DELETE_FOLLOW,
    payload: axios.post(`/api/followdelete`, {follower, following})
  };
};
export function followCheck(follower, following) {
  return {
    type: FOLLOW_CHECK,
    payload: axios.post(`/api/followcheck/`, {follower, following})
  };
};
export function getFollowUsers(id) {
  return {
    type: GET_FOLLOW_USERS,
    payload: axios.get(`/api/following/${id}`)
  };
};

const initialState = {
  followCheck: {},
  followList: [],
  followReviews: [],
  following: []
};

export default function followReducer(state=initialState, action) {
  // console.log('action payload!!!!!!!!!!    ', action.payload);
  switch (action.type) {
    case `${ADD_FOLLOW}_FULFILLED`:
      return {
        ...state,
        followList: [action.payload, ...state.followList]
      };
    case `${GET_FOLLOW_REVIEWS}_FULFILLED`:
      return {
        ...state,
        followReviews: action.payload.data
      };
    case `${GET_FOLLOW_LIST}_FULFILLED`:
      return {
        ...state,
        followList: action.payload.data
      };
    case `${FOLLOW_CHECK}_FULFILLED`:
      return {
        ...state,
        followCheck: action.payload.data[0]
      };
    case `${DELETE_FOLLOW}_FULFILLED`:
      return {
        ...state
      };
    case `${GET_FOLLOW_USERS}_FULFILLED`:
      return {
        ...state,
        following: action.payload.data
      };
    default:
      return state;
  }
};