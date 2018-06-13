import axios from 'axios';

const ADD_FOLLOW = 'ADD_FOLLOW';
const GET_FOLLOW_REVIEWS = 'GET_FOLLOW_REVIEWS';

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

const initialState = {
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
    default:
      return state;
  }
};