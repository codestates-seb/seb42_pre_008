import styled from "styled-components";
import React from "react";
import {MdCake} from "react-icons/md"
import {FiClock} from "react-icons/fi"
import {AiOutlineCalendar} from "react-icons/ai"
import { FaPencilAlt } from 'react-icons/fa';

const Container = styled.div`
padding-top: 140px;
position: relative;
margin-bottom: 16px;
border: solid 1px red;
`
const UserinfoContainer = styled.div`
display: flex;
align-items: center;
flex-wrap: wrap;
gap: 16px;
`

const UserAvatarContainer = styled.a`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const AvatarWrapper = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

const MdAvatarContainer = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

const SmAvatarContainer = styled.div`
  @media (max-width: 575px) {
    display: none;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;
const FlexItem = styled.div`
display: flex;
`;
const FlexWrapper = styled.div`
display: flex;
align-items: center;
flex-wrap: wrap;
gap: 8px;
max-width: 4rem;
`;
const Nickname = styled.div`
flex: 1 1 auto;
margin-bottom: 12px;
font-size: 12px;
line-height: 1.2;
`;
const InfoWrapper = styled.div`
flex: 0 0 auto;
display: flex;
align-items: center;
flex-wrap: nowrap;
gap: 4px;
`;
const InfoEtc = styled.ul`
list-style: none;
display: flex;
align-items: center;
color: #ddd;
gap: 8px;
margin-left: -4px;
flex-wrap: wrap;
`;
const ItemFlex = styled.li`
flex: 1;
`;
const FlexContainer = styled.div`
display: flex;
gap: 4px;
align-items: center;
`;
const IconWrapper = styled.div`
width: 18px;
height: 18px;
margin-right: 4px;
`;
const IconCake = styled(MdCake)`
display: block;
fill: currentColor;
`;
const IconClock = styled(FiClock)`
display: block;
fill: currentColor;
`;
const CalendarContainer = styled.li`
`;
const CalendarBtn = styled.button`
display: flex;
align-items: center;
justify-content: center;
background-color: unset;
border: none;
font-size: 16px;
&:hover{
    color: #000;
}
`;
const IconCalendar = styled(AiOutlineCalendar)`
display:block;
fill: currentColor;
`;
const EditBtnContainer = styled.div`
position: absolute;
top: 0;
right: 0;
display: flex;
gap: 16px;
flex-wrap: wrap;
`;
const EditProfileButton = styled.a`
  margin-top: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 0.25rem;
  border: 1px solid #6a737d;
  color: #24292e;
  background-color: #fff;
  transition: color 0.2s cubic-bezier(0.3, 0, 0.5, 1), background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1), border-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  cursor: pointer;

  &:hover {
    background-color: #f6f8fa;
    border-color: #d1d5da;
  }

  svg {
    margin-right: 0.5rem;
    fill: currentColor;
  }
`;
const IconEdit = styled(FaPencilAlt)`
`;



export default function MypageHeader(props) {
    return(
        <Container>
            <UserinfoContainer>
                <UserAvatarContainer href={`/users/${props.userId}/myongdol`}>
                    <MdAvatarContainer className="js-usermini-avatar-container">
                        <AvatarWrapper className="bar-md bs-sm">
                        <AvatarImg
                            src={`https://lh3.googleusercontent.com/a/AEdFTp6A0EQCRCIxFbDQMQUJPf4awFIckMUPhxHfghGtXg=k-s256`}
                            alt={`${props.userName}'s user avatar`}
                        />
                        </AvatarWrapper>
                    </MdAvatarContainer>
                    <SmAvatarContainer className="js-usermini-avatar-container">
                        <AvatarWrapper className="bar-md bs-sm">
                        <AvatarImg
                            src={`https://lh3.googleusercontent.com/a/AEdFTp6A0EQCRCIxFbDQMQUJPf4awFIckMUPhxHfghGtXg=k-s192`}
                            alt={`${props.userName}'s user avatar`}
                        />
                        </AvatarWrapper>
                    </SmAvatarContainer>
                    <AvatarWrapper className="js-usermini-avatar-container">
                        <AvatarImg
                        src={`https://lh3.googleusercontent.com/a/AEdFTp6A0EQCRCIxFbDQMQUJPf4awFIckMUPhxHfghGtXg=k-s128`}
                        alt={`${props.userName}'s user avatar`}
                        />
                    </AvatarWrapper>
                </UserAvatarContainer>

                <FlexItem>
                    <FlexWrapper>
                        <Nickname>Myongdol</Nickname>
                        <InfoWrapper></InfoWrapper>
                    </FlexWrapper>

                    <InfoEtc>
                        <ItemFlex>
                            <FlexContainer>
                                 <IconWrapper>
                                    <IconCake />
                                 </IconWrapper>
                                Member for 30 days
                            </FlexContainer>
                        </ItemFlex>

                        <ItemFlex>
                            <FlexContainer>
                                <IconWrapper>
                                    <IconClock />
                                </IconWrapper>
                                Last Seen this week
                            </FlexContainer>
                        </ItemFlex>

                        <CalendarContainer>
                                <CalendarBtn>
                                    <IconCalendar />
                                    Visited 7 days, 0 consecutive
                                </CalendarBtn>
                        </CalendarContainer>
                    </InfoEtc>
                </FlexItem>
            </UserinfoContainer>

            <EditBtnContainer className="ps-absolute t0 r0 d-flex gs6 fw-wrap">
                <EditProfileButton href="/users/edit">
                <IconEdit className="svg-icon" />

                </EditProfileButton>

            </EditBtnContainer>


        </Container>
    )
}