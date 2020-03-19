import axios from 'axios';
import { USER_SERVER } from '../utils/serverRoute';
import {
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILUER,
    LOGOUT,
} from './types'

export const registerUser = (dataToSubmit) => async dispatch => {
    dispatch({ type: REGISTER_USER });
    try {
        // register api
        const res = await axios.post(`${USER_SERVER}/register`, dataToSubmit);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: REGISTER_USER_FAILURE,
            payload: err,
        })
    }
};


export const loginUser = (dataToSubmit) => async dispatch => {
    dispatch({ type: LOGIN_USER });
    try{
        const res = await axios.post(`${USER_SERVER}/login`, dataToSubmit);
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: res.data,
        })

    }catch(err) {
        dispatch({ 
            type: LOGIN_USER_FAILUER,
            payload: err,
        })
    }
};

export const logout = () => async dispatch => {
    dispatch({ type: LOGOUT });
    try{
        // logout api
        await axios.get(`${USER_SERVER}/logout`);
    }catch(err){
        throw err;
    }
}