import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import MyInfo from "../component/mypage/MyInfo/MyInfo";
import NavOnLogin from "../component/NavOnLogin";
import MyProfile from "../component/mypage/MyProfile/MyProfile"
// import memberIdState from "../state/memberState";
// import tokenState from "../state/tokenState";
// import isLoginState from "../state/isLoginState";









const MyPage2 = () => {
    // const [memberId, setMemberId] = useRecoilState(memberIdState);
    // const [isLoading, setIsLoaidng] = useState(false);
    // const [user, setUser] = useState({ data: {} });
    // const [token, setToken] = useRecoilState(tokenState);
    // const [isLogin, setIsLogin] = useRecoilState(isLoginState); 

    // useEffect(() => {
    //     setIsLoaidng(true) ;
    //     //api 적용해야함.   
    // })


    return(
        <>
        <NavOnLogin />
        <MyInfo />
        <MyProfile />

        </>
    )
}

export default MyPage2