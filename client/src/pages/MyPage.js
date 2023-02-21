import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import NavOnLogin from "../component/NavOnLogin"
import LeftSide from "../component/mypage/LeftSide";
import UserBtns from "../component/mypage/UserBtns";
import UserButtons from "../component/mypage/UserButtons";



const Container = styled.div`
display: flex;
justify-content: center;
max-width: auto;
max-height: auto;
padding-top: 40px;
`
const Nav = styled.nav`
position: sticky;
top: 60px;
width: 164px;
max-height: calc(100vh - 180px);
flex-grow: 0;
flex-shrink: 0;
flex-basis: 164px;
`

const MainWrapper = styled.div`
width: 100%;
margin: 0 3px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-left: 56px;
`
const Hscreen = styled.div`
height: 100vh;
`
const ContainerFlex = styled.div`
display: flex;
align-items: center;
padding: 40px 30px;

@media (max-width: 768px) {
    padding: 40px 20px;
}
`
const InfoContainer = styled.div`
display: flex;
flex-direction: row;
margin-top: 6px;
`
const ContainerTwo = styled.div`
width: 60%;
max-width: 960px;
margin: 0 auto;
`
const ProfileTitle = styled.div`
margin-left: 5px;
padding-bottom: 1px;
font-size: 2xl;
font-weight: 600;
border-bottom: 2px solid #ccc;
`
const Form = styled.form`
border: 1px solid #ccc;
box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.1);
padding: 1.25rem;
border-radius: 0.375rem;
margin: 1rem 0.625rem 2.5rem;
pad: 1.25rem;
`
const DisplayName = styled.div`
font-weight: bold;
margin-top: 10px;
margin-bottom: 1px;
`
const NickName = styled.input`
border-radius: 4px;
border: 1px solid #ccc;
padding: 6px 8px;
width: 75%;
outline: none;
&:focus {
    border-color: #90cdf4;
    box-shadow: 0 0 0 2px #e2f2ff;
}
`
const EmailTitle = styled.div`
font-weight: bold;
margin-top: 4px;
margin-bottom: 1px;
`
const EmailInput = styled.input`
border-radius: 4px;
border: 1px solid #ccc;
padding: 6px 8px;
width: 75%;
outline: none;
&:focus {
    border-color: #90cdf4;
    box-shadow: 0 0 0 2px #e2f2ff;
}
`
const PasswordTitle = styled.div`
font-weight: bold;
margin-top: 4px;
margin-bottom: 1px;
`
const PasswordInput = styled.input`
border-radius: 4px;
border: 1px solid #ccc;
padding: 6px 8px;
width: 75%;
outline: none;
&:focus {
    border-color: #90cdf4;
    box-shadow: 0 0 0 2px #e2f2ff;
}
`
const SubmitContainer = styled.div`
margin-top: 10px;
button {
    & + button {
      margin-left: 5px;
    }
  }
`
const SaveButton = styled.button`
  border-radius: 5px;
  background-color: #38b2ac;
  color: #fff;
  padding: 10px;
  margin-right: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #1d4ed8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;
const CancelButton = styled.button`
  border-radius: 5px;
  background-color: #d1fae5;
  color: #065f46;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #a7f3d0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;


function MyPage() {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <>
        <NavOnLogin />
            <Container>
            {/* <LeftSide /> */}
                <MainWrapper>
                    <Hscreen>
                        <ContainerFlex>
                            <div>Edit Profile</div>
                        </ContainerFlex>
                         <UserBtns />

                         <InfoContainer>
                            <UserButtons />
                            <ContainerTwo>
                                <ProfileTitle>
                                    Your Profile
                                </ProfileTitle>
                                <Form>
                                    {/** edit 자리  예정. */}
                                    <DisplayName>DisplayName</DisplayName>
                                    <NickName
                                    type="name"
                                    defaultValue={userInfo?.displayName}
                                    />
                                    <EmailTitle>Email</EmailTitle>
                                    <EmailInput 
                                    type="email"
                                    defaultValue={userInfo?.email}
                                    />
                                    <PasswordTitle>PassWord</PasswordTitle>
                                    <PasswordInput 
                                    type="password"
                                    />
                                    <SubmitContainer>
                                        <SaveButton type="submit">Save Profile</SaveButton>
                                        <CancelButton type="button">Cancel</CancelButton>

                                    </SubmitContainer>
                                </Form>
                            </ContainerTwo>
                         </InfoContainer>

                    </Hscreen>  
                </MainWrapper>
            </Container>

        </>
    )
}

export default MyPage;