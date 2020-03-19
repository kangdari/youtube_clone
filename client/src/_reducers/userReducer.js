import { handleActions } from "redux-actions";
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILUER,
  LOGOUT,
} from "../_actions/types";

const initialState = {
  userError: "",
  userInfo: "" // 로그인, 회원가입 성공 여부
};

const user = handleActions(
  {
    [REGISTER_USER_SUCCESS]: (state, action) => ({
      ...state,
      userInfo: action.payload,
      userError: ""
    }),
    [REGISTER_USER_FAILURE]: (state, action) => ({
      ...state,
      userError: action.payload
    }),
    [LOGIN_USER_SUCCESS]: (state, { payload: userInfo }) => ({
      ...state,
      userInfo,
      userError: ""
    }),
    [LOGIN_USER_FAILUER]: (state, action) => ({
      ...state,
      userError: action.payload
    }),
    [LOGOUT]: state => ({
      ...state,
      userInfo: ""
    })
  },
  initialState
);

export default user;
