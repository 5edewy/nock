import {
  OTHER_API, OTHER_API_SUCCESS, OTHER_API_FAIL, SAVE_ITEM, CHANGE_MESSAGE, CLEAR_MESSAGE, CHANGE_VALUE, DELETE, CLEAR_UPDATE
} from '../actions/types';


const INITAL_STATE = {
  loading: false, message: '', countries: [], cities: []
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_UPDATE:
      return { ...state, updateHome: false };
    case CHANGE_MESSAGE:
      return { ...state, message: action.payload };
    case SAVE_ITEM:
      return { ...state };
    case CLEAR_MESSAGE:
      return { ...state, message: '' };
    case OTHER_API:
      return { ...state, loading: true, onRefresh: true }
    case DELETE:
      return { ...state, loading: true }
    case OTHER_API_SUCCESS:
      const data = action.payload.data.data
      // console.log(data, action.payload.api);
      switch (action.payload.api) {
        case 'country':
          return { ...state, countries: data.countries, loading: false }
        case 'city':
          return { ...state, cities: data.cities, loading: false }
        default:
          return state
      }
    case OTHER_API_FAIL:
      return { ...state, loading: false, message: action.payload, onRefresh: false }
    case CHANGE_VALUE:
      const value = action.payload
      return { ...state, ...value }

    default:
      return state;
  }
};
