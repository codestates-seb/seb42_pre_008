import React, {useState} from "react";
import {FcGoogle} from 'react-icons/fc'
import { Link, useNavigate } from "react-router-dom";
import {MdOutlineOpenInNew} from 'react-icons/md'
import {SiNaver} from 'react-icons/si'
import {AiOutlineGithub} from 'react-icons/ai'
import { fetchLogin } from "../util/fetchLogin";
import styled from 'styled-components';

const DivWrapper = styled.div`
    background-color: #F1F2F3;
    padding:15vh 0;
    display: flex;
    justify-content: center;
`;

const OauthWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
    margin-top: 1rem;
    >button{
        width: 100%;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #e1e4e8;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        svg{
            width: 20px;
            height: 20px;
            margin-right: 4px;
        }
        p{
            display: inline-block;
            height: 100%;
            transform: translateY(4px);
        }
        :first-child{
            background-color: #fff;
            color: #3b4045;
            :hover{
                background-color: #f7f8f9;
            }
        }
        :nth-child(2){
            background-color: #242629;
            color: #FFFFFF;
            :hover{
                background-color: #18191c;
            }
        }
        :nth-child(3){
            background-color: #03CF5D;
            color: #FFFFFF;
            :hover{
                background-color: #01ba51;
            }
        }
    }
`


const IconWrapper = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const SvgIcon = styled.svg`
  width: 32px;
  height: 37px;
`;

const Path = styled.path`
  fill: ${props => props.fillColor};
`;


const Form = styled.form`
  box-sizing:border-box;
  width:40rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 2rem;
  background-color:#fff;
  padding:4vh 4vh;
  box-shadow: 2px 2px 4px #e3e9ef;
  border-radius: 0.25rem;
    label{
        font-weight: 500;
        margin-bottom: 0.8rem;
        margin-top: 1.8rem;
        :first-child{
            margin-top: 0;
        }
    }
    input{  
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid gray;
      border-radius: 0.25rem;
      width: 100%;
      box-sizing: border-box;
    }
    p{
        margin-top: 0.4rem;
        font-size: 14px;
        color: #6A737c;
        :first-child{
            color: red;
        }
    }
`;

const LoginButton = styled.button`
    height: 37px;
    border-radius: 0.3vh;
    background-color: #0995ff;
    color: white;
    border: 1px solid #477199;
    box-shadow: inset 0px 0px 0px 0px #54a3f7;
    margin-top: 1.8rem;
    font-size: 1rem;
    cursor: pointer;
    :hover {
        background-color: #3172c6;
    }
`;
const AccountDiv = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  `
const SignupLink = styled(Link)`
  color: #0995ff;
  font-size: 1.2rem;
  margin-left: 0.4rem;
  text-decoration: none;
  &:hover {
    color: #00bfff;
  }
`



export default function Login (props) {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [emailError, setEmailError] = useState('')

    const [userPassword, setUserPassword] = useState('');
    const [passwordError, setPasswordError] = useState("");

    const onEmailChange = (e) => {
        setUserEmail(e.target.value);
    };
    const onPasswordChange = (e) => {
        setUserPassword(e.target.value);
    };

   function onSubmit(e) {
    e.preventDefault();
    onLogin()
    };

    /***빈칸검사***/
    const handleEmailBlur = (event) => {
      const value = event.target.value;
      if (!value.includes("@")) {
          setEmailError("Please enter a valid email address");
      }
      else if(value.length === 0){
        setEmailError("Please enter email address")
      }
      else {
          setEmailError("");
      }}
    
      const handlePasswordBlur = (event) => {
        const value = event.target.value;
        if (value.length === 0) {
        setPasswordError("Please enter your Password");
        } else {
        setPasswordError("");
    }}

    const onLogin = async (callback) => {
        const loginData = JSON.stringify({
            email: userEmail,
            password: userPassword,
        });
        const toHome = () => {
            navigate('/');
        }
        let login = await fetchLogin(loginData).then((data) => {
            if(data.status === 200) {
                toHome();
                window.location.reload();
            }
        })
    }
        



    return (
		<DivWrapper>
      <div>
							<IconWrapper>
							 <SvgIcon viewBox="0 0 32 37" aria-hidden="true">
								<Path
									d="M 26 33 v -9 h 4 v 13 H 0 V 24 h 4 v 9 h 22 Z"
									fillColor="#c2c3c4"
								/>
								<Path
									d="m 21.5 0 l -2.7 2 l 9.9 13.3 l 2.7 -2 L 21.5 0 Z M 26 18.4 L 13.3 7.8 l 2.1 -2.5 l 12.7 10.6 l -2.1 2.5 Z M 9.1 15.2 l 15 7 l 1.4 -3 l -15 -7 l -1.4 3 Z m 14 10.79 l 0.68 -2.95 l -16.1 -3.35 L 7 23 l 16.1 2.99 Z M 23 30 H 7 v -3 h 16 v 3 Z"
									fillColor="#F77F2B"
								/>
								</SvgIcon>  
							</IconWrapper>

            <OauthWrap>
							<button><FcGoogle />Log in with Google</button>
              <button><AiOutlineGithub/>Log in with GitHub</button>
              <button><SiNaver/>Log in with Facebook</button>
            </OauthWrap>

							<Form>
								<label htmlFor="email">Email</label>
								<input
                  onChange={onEmailChange}
                  value={userEmail}
									type="email"
                  id="email"
                  onBlur={handleEmailBlur}
								/>
								{emailError && <p>{emailError}</p>}

								<label htmlFor="password">Password</label>
								<input
									onChange={onPasswordChange}
                  value={userPassword}
									type="password"
                  id="password"
                  onBlur={handlePasswordBlur}
								/>
                {passwordError && <p>{passwordError}</p>}
								<LoginButton
									type="submit"
									onClick={onSubmit}
								>
									Log in
								</LoginButton>
							</Form>

					<AccountDiv>
						Don’t have an account?
						<SignupLink
							to="/sign-up"
						>
							Sign up
						</SignupLink>
					</AccountDiv>
          </div>
		</DivWrapper>
	);
}
