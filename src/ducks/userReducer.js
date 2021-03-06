import axios from 'axios';


const GET_USER = 'GET_USER';
const EDIT_INTERESTS = 'EDIT_INTERESTS';
const EDIT_USERNAME = 'EDIT_USERNAME';
const EDIT_AVATAR = 'EDIT_AVATAR';
const GET_USER_REVIEWS = 'GET_USER_REVIEWS';
const GET_TOTAL = 'GET_TOTAL';
const UPDATE_COUNT = 'UPDATE_COUNT';
const SEARCH_USER = 'SEARCH_USER';
// const GET_USER_BY_ID = 'GET_USER_BY_ID';


export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get('/api/me')
  };
};

export function editInterests(id, interests) {
  return {
    type: EDIT_INTERESTS,
    payload: axios.put(`/api/editinterests/${id}`, {interests})
  };
};

export function editUsername(id, username) {
  return {
    type: EDIT_USERNAME,
    payload: axios.put(`/api/editusername/${id}`, {username})
  };
};

export function editAvatar(id, avatar) {
  return {
    type: EDIT_AVATAR,
    payload: axios.put(`/api/editavatar/${id}`, {avatar})
  };
};

export function updateCount() {
  return {
    type: UPDATE_COUNT,
    payload: axios.get('/api/reviewcount')
  };
};

export function getUserReviews(id) {
  // console.log('hit!!!');
  return {
    type: GET_USER_REVIEWS,
    payload: axios.get(`/api/user/reviews/${id}`)
  };
};

export function getTotal(id) {
  // console.log('total!!!');
  return {
    type: GET_TOTAL,
    payload: axios.get(`/api/totalreviews/${id}`)
  };
};

export function searchUser(name) {
  return {
    type: SEARCH_USER,
    payload: axios.get(`/api/user/search/${name}`)
  };
};

// export function getUserById(id) {
//   return {
//     type: GET_USER_BY_ID,
//     payload: axios.get(`/api/user/${id}`)
//   };
// };


const initialState = {
  user: {},
  isAuthed: false,
  userReviews: [],
  reviewCount: 0,
  searchResults: []
  // following: []
};


export default function userReducer(state=initialState, action){
  // console.log('ACTION PAYLOAD!!!    ', action.payload);
  // console.log('action type!!!', action.type);
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
    case `${EDIT_AVATAR}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data[0]
      };
    case `${GET_USER_REVIEWS}_FULFILLED`:
      return {
        ...state,
        userReviews: action.payload.data
      };
    case `${GET_TOTAL}_FULFILLED`:
      return {
        ...state,
        reviewCount: action.payload.data[0].count
      };
    case `${UPDATE_COUNT}_FULFILLED`:
      return {
        ...state
      };
    case `${SEARCH_USER}_FULFILLED`:
      return {
        ...state,
        searchResults: action.payload.data
      };
    // case `${GET_USER_BY_ID}_FULFILLED`:
    //   return {
    //     ...state,
    //     following: action.payload.data
    //   };
    default:
      return state;
  }
};