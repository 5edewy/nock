import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
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
        case 'forget':
          Alert.alert(data.message)
          return { ...state, loading: false, message: data.message }
        case 'login':
          return { ...state, loading: false, user: data.user }
        case 'edit':
          return { ...state, loading: false, user: action.payload.data }
        case 'user':
          return { ...state, loading: false, user: data.data }
        case 'address':
          return { ...state, loading: false, address: data.address }
        case 'socail':
          console.log(data);
          return { ...state, loading: false, minSocial: data.social, userSocial: data.user }
        case 'nockedSocail':
          Actions.pop()
          Actions.push('Myprofile', { profile: data.social, userProfile: data.user })
          return { ...state, loading: false, nockedSocail: data.social, nockedSocailUser: data.user, updateNocked: false }
        case 'nockedPepole':
          Actions.push('Myprofile', { profile: data.social, userProfile: data.user })
          return { ...state, loading: false, nockedSocail: data.social, nockedSocailUser: data.user, updateNocked: false }
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
