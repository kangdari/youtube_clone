import { combineReducers } from 'redux';
import form from './formReducer';
import user from './userReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
    form,
    user,
    auth,
});

export default rootReducer;
