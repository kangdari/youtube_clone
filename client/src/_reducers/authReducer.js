import { handleActions } from 'redux-actions';  
import { 
    SET_USER,
    LOGOUT,
    AUTH_CHECK, 
} from '../_actions/types';

const initialState = {
    auth: '',
    authError: '',
}

const auth = handleActions(
    {
        [AUTH_CHECK]: (state, action ) => ({
            ...state,
            auth: action.payload,
            authError: null,
        }),
        // [AUTH_CHECK_SUCCESS]: (state, action ) => ({
        //     ...state,
        //     auth: action.payload,
        //     authError: null,
        // }),
        // [AUTH_CHECK_FAILURE]: (state, action ) => ({
        //     ...state,
        //     authError: action.payload,
        // }),
        [SET_USER]: (state, action) => ({
            ...state,
            auth: action.payload,
        }),
        [LOGOUT]: state => ({
            ...state,
            auth: "",
        }),
    },
    initialState,
)

export default auth;
