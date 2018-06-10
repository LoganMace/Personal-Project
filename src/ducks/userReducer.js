import axios from 'axios';


const GET_USER = 'GET_USER';
const EDIT_INTERESTS = 'EDIT_INTERESTS';
const EDIT_USERNAME = 'EDIT_USERNAME';
const GET_USER_REVIEWS = 'GET_USER_REVIEWS';


export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get('/api/me')
  };
};

export function editInterests(id, interests) {
  return {
    type: EDIT_INTERESTS,
    payload: axios.put(`/api/editinterests/${id}`, {interests: interests})
  };
};

export function editUsername(id, username) {
  return {
    type: EDIT_USERNAME,
    payload: axios.put(`/api/editusername/${id}`, {username: username})
  };
};

export function getUserReviews(id) {
  return {
    type: GET_USER_REVIEWS,
    payload: axios.get(`/api/user/reviews/${id}`)
  };
};


const initialState = {
  user: {},
  isAuthed: false,
  userReviews: []
};


export default function userReducer(state=initialState, action){
  // console.log('ACTION PAYLOAD!!!    ', action.payload);
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data[0],
        isAuthed: true
      };
    case `${GET_USER}_REJECTED`:
      return {
        ...state,
        isAuthed: false
      };
    case `${EDIT_INTERESTS}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data[0]
      };
    case `${EDIT_USERNAME}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data[0]
      };
    case `${GET_USER_REVIEWS}_FULFILLED`:
      return {
        ...state,
        userReviews: action.payload.data
      };
    default:
      return state;
  }
};