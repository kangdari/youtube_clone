import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authCheck } from "../_actions/authAction";

//null    =>  아무나 출입이 가능한 페이지
//true    =>  로그인한 유저만 출입이 가능한 페이지
//false   =>  로그인한 유저는 출입 불가능한 페이지
export default function(SpecificComponent, option, adminRoute = null) {
  // function AuthenticationCheck({ history }) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(authCheck()).then(response => {
        // console.log(response);
        // 비 로그인 상태
        if (!response.payload.isAuth) {
          if (option) {
            // true
            props.history.push("/login");
          }
        } else {
          // isAuth = true
          // 로그인 상태
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            // 일반 유저
            if (!option) {
              // false
              props.history.push("/");
            }
          }
        }
      });
    }, [dispatch, props.history]);
    return <SpecificComponent {...props} />;
  }
  return AuthenticationCheck;
}
