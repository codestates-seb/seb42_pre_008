// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil"; // eslint-disable-next-line
import styled from "styled-components";
import MyInfo from "../component/mypage/MyInfo/MyInfo";
// import NavOnLogin from "../component/navNfooter/NavOnLogin";
import MyProfile from "../component/mypage/MyProfile/MyProfile";
import memberIdState from "../state/memberState";
import tokenState from "../state/tokenState";
import isLoginState from "../state/isLoginState"; // eslint-disable-next-line
import { UserinfoAPI } from "../util/UserinfoAPI";

const MyPage = () => {
    // eslint-disable-next-line
    const [memberId, setMemberId] = useRecoilState(memberIdState);
    // const [isLoading, setIsLoaidng] = useState(false);
    // eslint-disable-next-line
    const [user, setUser] = useState({ data: {} }); // eslint-disable-next-line
    const [token, setToken] = useRecoilState(tokenState); // eslint-disable-next-line
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

    return (
        <>
            {/* <NavOnLogin /> */}
            <MyInfo memberId={memberId} user={user} />
            <MyProfile memberId={memberId} user={user} />
        </>
    );
};

export default MyPage;
