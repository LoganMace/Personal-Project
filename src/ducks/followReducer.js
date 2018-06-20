import axios from 'axios';

const ADD_FOLLOW = 'ADD_FOLLOW';
const GET_FOLLOW_REVIEWS = 'GET_FOLLOW_REVIEWS';
const GET_FOLLOW_LIST = 'GET_FOLLOW_LIST';
const DELETE_FOLLOW ='DELETE_FOLLOW';
const FOLLOW_CHECK = 'FOLLOW_CHECK';

export function addFollow(userid, followid) {
  return {
    type: ADD_FOLLOW,
    payload: axios.post('/api/follow', {userid, followid})
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
export function deleteFollow(id) {
  return {
    type: DELETE_FOLLOW,
    payload: axios.delete(`/api/follow/${id}`)
  };
};
export function followCheck(follower, following) {
  return {
    type: FOLLOW_CHECK,
    payload: axios.post(`/api/followcheck/`, {follower, following})
  };
};

const initialState = {
  followCheck: {},
  followList: [],
  followReviews: []
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
    default:
      return state;
  }
};