import {
  USER_POST_DATE, CHANGE_MESSAGE, USER_POST_DATE_FAIL, USER_POST_DATE_SUCCESS,
  CLEAR_MESSAGE, CLEAR_USER, SAVE_USER, CHANGE_VALUE
} from '../actions/types';


const INITAL_STATE = {
  message: '', loading: false, user: null, minSocial: [], userSocial: null, nockedSocail: [], nockedSocailUser: null, address: [],
  updateNocked: false
};
export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case SAVE_USER:
      return { ...state, user: action.payload };
    case CLEAR_USER:
      return { ...state, ...INITAL_STATE };
    case CHANGE_MESSAGE:
      return { ...state, message: action.payload };
    case CLEAR_MESSAGE:
      return { ...state, message: '', updateNocked: false };
    case USER_POST_DATE:
      return { ...state, loading: true }
    case USER_POST_DATE_SUCCESS:
      const data = action.payload.data.data
      switch (action.payload.api) {
        case 'register':
          return { ...state, loading: false, user: data.user }
        case 'forgetPassword':
          return { ...state, loading: false, message: data.message, resetSucc: true }
        case 'login':
          return { ...state, loading: false, user: data.user }
        case 'edit':
          return { ...state, loading: false, user: action.payload.data }
        case 'user':
          return { ...state, loading: false, user: data.data }
        case 'address':
          return { ...state, loading: false, address: data.address }
        case 'socail':
          return { ...state, loading: false, minSocial: data.social, userSocial: data.user }
        case 'nockedSocail':
          return { ...state, loading: false, nockedSocail: data.social, nockedSocailUser: data.user, updateNocked: true }
        case 'logout':
          return { ...INITAL_STATE }
        default:
          return { ...state, loading: false }
      }
    case USER_POST_DATE_FAIL:
      return { ...state, loading: false, message: action.payload }
    case CHANGE_VALUE:
      const value = action.payload
      return { ...state, ...value }
    default:
      return state;
  }
};
