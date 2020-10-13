import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import OthersReducer from './OthersReducer';


export default combineReducers({
    auth: AuthReducer,
    others: OthersReducer
});
