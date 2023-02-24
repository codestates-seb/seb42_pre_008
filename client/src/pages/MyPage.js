import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import MyInfo from "../component/mypage/MyInfo/MyInfo";
import NavOnLogin from "../component/NavOnLogin";
import MyProfile from "../component/mypage/MyProfile/MyProfile"
import memberIdState from "../state/memberState";
import tokenState from "../state/tokenState";
import isLoginState from "../state/isLoginState";
import { UserinfoAPI } from "../util/UserinfoAPI";



const MyPage = () => {
    const [memberId, setMemberId] = useRecoilState(memberIdState);
    // const [isLoading, setIsLoaidng] = useState(false);
    const [user, setUser] = useState({ data: {} });
    const [token, setToken] = useRecoilState(tokenState);
    const [isLogin, setIsLogin] = useRecoilState(isLoginState); 

    // useEffect(() => {
    //     UserinfoAPI(memberId, token).then((res) => {
    //         if (res.status === 404) {
    //         alert('로그인을 해주세요.');
    //         setIsLogin(false);
    //         setToken(null);
    //         setMemberId(null);
    //         window.location.href = window.location.href = 'login';
    //         };
    //         setUser(res.data);
    //     })
    // }, []);


    return(
        <>
        <NavOnLogin />
        <MyInfo 
        memberId={memberId}
        user={user}
        />
        <MyProfile 
         memberId={memberId}
         user={user}
        />

        </>
    )
}

export default MyPage;