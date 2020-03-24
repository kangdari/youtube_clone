import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";

const SubscribeButton = styled.button`
  outline: none;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  /* 구독 여부에 따라 버튼의 색상 변경 */
  background: ${props => (props.subscribed ? "grey" : "#CC0000")};
`;

const Subscribe = ({ userTo }) => {
  // 해당 비디오를 업로드한 유저를 구독한 유저의 수
  const [subscribeNumber, setSubscribeNumber] = useState("");
  // 해당 유저의 구독 상태
  const [subscribed, setSubscribed] = useState(false);

  // 현재 로그인 유저의 id값을 조회하기위해 useSelector 사용
  const { auth } = useSelector(state => ({
    auth: state.auth.auth
  }));

  // userTo: 비디오를 업로드한 유저의 id
  const variable = {
    userTo: userTo
  };

  const subscribedVariable = {
    userTo: userTo,
    userFrom: auth._id
  };
  // console.log(JSON.parse(localStorage.getItem('auth'))._id)
  // console.log(auth._id)

  // DB update
  const onSubscribe = e => {};

  useEffect(() => {
    // 해당 비디오를 업로드한 유저를 구독하는 유저의 수...
    axios.post("/api/subscribe/subscribeNumber", variable).then(response => {
      if (response.data.success) {
        console.log(response.data);
        setSubscribeNumber(response.data.subscribeNumber);
      } else {
        alert("구독자 수 정보를 받아 오지 못함.");
      }
    });

    // 현재 유저가 해당 비디오를 구독했는지 확인
    axios
      .post("/api/subscribe/subscribed", subscribedVariable)
      .then(response => {
        if (response.data.success) {
          console.log(response.data);
          setSubscribed(response.data.subscribed);
        } else {
          alert("구독 정보를 받아오지 못함.");
        }
      });
  }, []);

  return (
    <div>
      <SubscribeButton onClick={onSubscribe} subscribed={subscribed}>
        {subscribeNumber} {subscribed ? "subscribed" : "subscribe"}
      </SubscribeButton>
    </div>
  );
};

export default Subscribe;
