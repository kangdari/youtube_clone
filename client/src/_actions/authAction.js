import axios from 'axios';
import { USER_SERVER } from '../utils/serverRoute';
import { AUTH_CHECK, SET_USER } from '../_actions/types';
import { createAction } from 'redux-actions';

export async function authCheck() {
    const request = await axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_CHECK,
        payload: request,
    }
}

export const setUser = createAction(SET_USER, auth => auth);

// export const authCheck = () => async dispatch => {
//     dispatch({ type: AUTH_CHECK });
//     try{
//         const res = await axios.get(`${USER_SERVER}/auth`);
//         // console.log(res.data);
//         dispatch({
//             type: AUTH_CHECK_SUCCESS,
//             payload: res.data,
//         })
//     }catch(err){
//         dispatch({
//             type: AUTH_CHECK_FAILURE,
//             payload: err,
//         })
//     }
// }


