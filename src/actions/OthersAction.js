import {
  OTHER_API, OTHER_API_SUCCESS, OTHER_API_FAIL, SAVE_ITEM, DELETE, CLEAR_UPDATE
} from './types';

import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { headers, baseUrl, L } from '../Config';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

export const saveItem = (item) => {
  return {
    type: SAVE_ITEM,
    payload: item,
  };
};
export const clearUpdate = () => {
  return {
    type: CLEAR_UPDATE,
    payload: '',
  };
};

export const otherApi = (method, api, data, sessiontoken, flag) => {
  return (dispatch) => {
    dispatch({ type: OTHER_API });

    axios({
      url: baseUrl + api,
      headers: { ...headers, sessiontoken },
      method: method,
      data: method == "POST" ? data : '',
      params: method == "GET" ? data : ''
    }).then(function (res) {
      // console.log(res);
      if (flag == "contactUs") {
        Alert.alert(res.data.data.message)
        Actions.pop()
      }
      if (flag == "saveOrder") {
        Actions.pop()
        Actions.pop()
        Actions.push('pay', { url: res.data.data.payUrl })
      }
      otherSuccess(dispatch, res.data, flag, sessiontoken);

    }).catch(function (error) {
      let message
      // console.log(error.response);
      if (error.response && error.response.status == 400) {
        message = error.response.data.message
        otherFail(dispatch, error.response.data.message);
      } else if (error.response && error.response.status == 401) {
        message = 'Auth Fail'
        otherFail(dispatch, 'Auth Fail');
        _logOut()
      } else {
        message = L('connectionError');
        otherFail(dispatch, message);
      }
      Alert.alert(message)
    })
  }
}



export const otherFail = (dispatch, error) => {

  dispatch({
    type: OTHER_API_FAIL,
    payload: error,
  });

};

export const otherSuccess = (dispatch, data, api) => {
  // console.log(data, api);

  const res = { data, api }
  dispatch({
    type: OTHER_API_SUCCESS,
    payload: res,
  });

}
const _logOut = async () => {
  // console.log('sdds');
  try {
    await AsyncStorage.removeItem('user');
    // this.props.clearUser()
    Actions.reset('auth');
  } catch (e) { }
};
