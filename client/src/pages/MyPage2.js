import React from "react";
import styled from "styled-components";
import MypageHeader from "../component/mypage/MypageHeader";
import UserBtns from "../component/mypage/UserBtns";
import NavOnLogin from "../component/NavOnLogin";

const CotentContainer = styled.div`

`




export default function MyPage2() {
    return(
        <>
        <NavOnLogin />
        <MypageHeader />
        <UserBtns />
        </>
    )
}