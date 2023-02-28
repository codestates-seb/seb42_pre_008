import React, {useState} from "react";
import {FcGoogle} from 'react-icons/fc'
import { Link, useNavigate } from "react-router-dom";
import {MdOutlineOpenInNew} from 'react-icons/md'
// import {SiNaver} from 'react-icons/si'
import {AiOutlineGithub, AiOutlineFacebook} from 'react-icons/ai'
import styled from 'styled-components';
import useUserActions from "../component/oauth/useUserAction";
import axios from "axios";
import { useSetRecoilState, useRecoilValue } from "recoil";
import authAtom from "../component/oauth/auth";
import userAtom from "../component/oauth/userAuth";


const DivWrapper = styled.div`
justify-content: center;
align-items: middle;
`;
//
const Container = styled.div`
  width: 100%;
  background-color: #E5E7EB;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
`
const FlexDiv = styled.div`
 display: flex;
`

const OauthWrapper = styled.div`
  margin-top: 24px;
  margin-left: auto;
  margin-right: auto;
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

const GoogleBtn = styled.button`
  width: 100%;
  padding: 0.5rem 2.5rem;
  margin: 0.25rem 0;
  background-color: white;
  color: black;
  text-align: center;
  font-size: 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: #f3f3f3;
	border: 2px solid blue;
  }
  &:focus {
    outline: none;
    border: 2px solid blue;
  }

`
const GoogleLogo = styled(FcGoogle)`
  display: inline;
  font-size: 1.5rem;
  margin-right: 0.25rem;
`;


const GithubBtn = styled.button`
  width: 100%;
  border-radius: 4px;
  background-color: #1c1c1e;
  margin-bottom: 0.75rem;
  padding: 0.5rem 1rem;
  text-align: center;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #2c2c2e;
	border: 2px solid blue;
  }
  &:focus {
    outline: none;
    border: 2px solid blue;
  }
`
const GithubLogo = styled(AiOutlineGithub)`
  display: inline;
  font-size: 1.5rem;
  margin-right: 0.25rem;
`

const FacebookBtn = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
  text-transform: none;
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
  border-radius: 0.25rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #218838;
    border-color: 1px solid #1e7e34;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
  }
  `
const FacebookLogo = styled(AiOutlineFacebook)`
  display: inline;
  font-size: 1.5rem;
  margin-right: 0.25rem;
`

const FormContainer = styled.form`
width: 100%;
background-color: #fff;
padding: 1.25rem;
margin-top: 1.5rem;
box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.06);
border-radius: 0.375rem;
& > div:first-child {
  font-weight: 500;
  margin-bottom: 0.25rem;
  font-size: 1rem;
}
input {
  width: 100%;
  border: 1.5px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  outline: none;
  &:focus {
	border-color: #60a5fa;
	box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.25);
  }
}
button {
  width: 100%;
  background-color: #3b82f6;
  color: #fff;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
	background-color: #2563eb;
  }
  &:focus {
	box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.25);
  }
}
`

const SubmitBtn = styled.button`
  background-color: #3b82f6;
  border-radius: 0.375rem;
  width: 100%;
  margin-top: 0.625rem;
  margin-bottom: 0.25rem;
  padding: 0.5rem 0;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border: none;
  &:hover {
    background-color: #2563eb;
  }
  &:focus {
    outline: none;
    border: 2px solid blue;
  }
`
const AccountDiv = styled.div`
  font-size: 16px;
  margin-top: 16px;
  `
const SignupLink = styled(Link)`
  color: blue;
  font-size: 14px;
  text-decoration: none;
  &:hover {
    color: #00bfff;
  }
`
const EmployContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 7rem;
  font-size: 0.875rem;
  color: #4b5563;
`;
const EmployerLink = styled(Link)`
  margin-left: 0.25rem;
  color: #3b82f6;
  text-decoration: none;
  &:hover {
    color: #60a5fa;
  }
`;
const EmployIcon = styled(MdOutlineOpenInNew)`
  margin-left: 0.25rem;
  vertical-align: middle;
`;



export default function Login (props) {
  //   const navigate = useNavigate();
  //   const [userEmail, setUserEmail] = useState('');
  //   const [userPassword, setUserPassword] = useState('');


  //   const onEmailChange = (e) => {
  //       setUserEmail(e.target.value);
  //   };
  //   const onPasswordChange = (e) => {
  //       setUserPassword(e.target.value);
  //   };

  //  function onSubmit(e) {
  //   e.preventDefault();
  //   onLogin()
  //   };

  //   const onLogin = async (callback) => {
  //       const loginData = JSON.stringify({
  //           email: userEmail,
  //           password: userPassword,
  //       });
  //       const toHome = () => {
  //           navigate('/');
  //       }
  //       let login = await fetchLogin(loginData).then((data) => {
  //           if(data.status === 200) {
  //               toHome();
  //               window.location.reload();
  //           }
  //       })
  //   }
  const navigate = useNavigate();
  const userActions = useUserActions();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const auth = useRecoilValue(authAtom);

  const setAuth = useSetRecoilState(authAtom);
  const setUserAuth = useSetRecoilState(userAtom);

  const onEmailChange = (e) => {
      setUserEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
      setUserPassword(e.target.value);
  };

  const onSubmit = (e) => {
      e.preventDefault();
      axios
          .post(
              `URL`,
              { email: userEmail, password: userPassword },
          )
          .then((response) => {
              alert('로그인 되었습니다');
              const { data } = response;
              localStorage.setItem('user', JSON.stringify(data.accessToken));
              localStorage.setItem('userInfo', JSON.stringify(data));
              setAuth(data.accessToken);
              setUserAuth(data);
          })
          .then(() => navigate('/'))
          .catch((error) => {
              alert(error);
          });
  }; 

 
        



    return (
		<DivWrapper>
			<Container>
                
				<Container2>
					<FlexDiv>
						<OauthWrapper>
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

							<GoogleBtn>
								<GoogleLogo />
								Log in with Google
							</GoogleBtn>

							<GithubBtn>
                <GithubLogo/>
								Log in with GitHub
							</GithubBtn>

							<FacebookBtn>
								<FacebookLogo/>
								Log in with Facebook
							</FacebookBtn>

							<FormContainer>
								<div>Email</div>
								<input
                  onChange={onEmailChange}
                  value={userEmail}
									type="email"
								/>
								
								<div>Password</div>
								<input
									onChange={onPasswordChange}
                  value={userPassword}
									type="password"
								/>
								<SubmitBtn
									type="submit"
									onClick={onSubmit}
								>
									Log in
								</SubmitBtn>
							</FormContainer>
						</OauthWrapper>
					</FlexDiv>


					<AccountDiv>
						Don’t have an account?
						<SignupLink
							to="/signup"
							className="ml-1"
						>
							Sign up
						</SignupLink>
					</AccountDiv>

					<EmployContainer>
						Are you an employer?
						<EmployerLink
							to="."
						>
							Sign up on Talent
							<EmployIcon/>
						</EmployerLink>
					</EmployContainer>

				</Container2>
			</Container>
		</DivWrapper>
	);
}
