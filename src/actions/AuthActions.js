import {
  USER_POST_DATE, CHANGE_MESSAGE, USER_POST_DATE_FAIL, USER_POST_DATE_SUCCESS,
  CLEAR_MESSAGE, CLEAR_USER, SAVE_USER, CHANGE_VALUE
} from './types';

import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { headers, baseUrl, L } from '../Config';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native'

export const changeValue = (object) => {
  return {
    type: CHANGE_VALUE,
    payload: object
  }
}
export const saveUser = text => {
  return {
    type: SAVE_USER,
    payload: text,
  };
};
export const clearUser = text => {
  return {
    type: CLEAR_USER,
    payload: text,
  };
};


export const showMessageChanged = text => {
  return {
    type: CHANGE_MESSAGE,
    payload: text,
  };
};
export const clearMessage = text => {
  return {
    type: CLEAR_MESSAGE,
    payload: text,
  };
};
export const userApi = (method, api, data, sessiontoken, flag) => {
  // console.log(sessiontoken);
  // const header = { ...headers, ...{ "Authorization": 'Bearer ' + token } }
  return (dispatch) => {
    dispatch({ type: USER_POST_DATE });

    axios({
      url: baseUrl + api,
      headers: sessiontoken ? { ...headers, sessiontoken } : headers,
      method: method,
      data: method == "POST" ? data : '',
      params: method == "GET" ? data : ''
    }).then(function (res) {
      // console.clear();
      // console.log(res);

      userPostSuccess(dispatch, res.data, flag, sessiontoken);

    }).catch(function (error) {
      let message
      // console.clear();
      // console.log(error);
      // console.log(error.config);
      // console.log(error.response);
      if (error.response && error.response.status == 400) {
        message = error.response.data.message
        userPostFail(dispatch, error.response.data.message);
      } else if (error.response && error.response.status == 401) {
        message = 'Auth Fail'
        userPostFail(dispatch, 'Auth Fail');
        _logOut()
      } else {
        message = L('connectionError');
        userPostFail(dispatch, message);
      }
      Alert.alert(message)
    })
  }
}


export const userPostFail = (dispatch, error) => {

  dispatch({
    type: USER_POST_DATE_FAIL,
    payload: error,
  });

};

export const userPostSuccess = (dispatch, data, api) => {
  // console.log(data);

  const res = { data, api }
  dispatch({
    type: USER_POST_DATE_SUCCESS,
    payload: res,
  });
  if (api == "login" || api == "register") {
    Actions.reset('MainStack')
    // console.log(data.data);
    _storeData(data.data.user)
  } else if (api == "edit") {
    const user = { ...data.data.user, access: token }
    _storeData(user)
  } else if (api == "logout") {
    _logOut()
  }

}



const _storeData = async (user) => {
  // console.log(user);
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }

}
const _logOut = async () => {
  // console.log('sdds');
  try {
    await AsyncStorage.removeItem('user');
    // this.props.clearUser()
    Actions.reset('auth');
  } catch (e) { }
};