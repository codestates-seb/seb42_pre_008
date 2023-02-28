import { useState, useRef } from "react";
import styled from "styled-components";
import { BiMessageSquareError } from "react-icons/bi";
import { BiArchiveOut } from "react-icons/bi";
import { BiBookmarkPlus } from "react-icons/bi";
import { BiCool } from "react-icons/bi";
import {FcGoogle} from 'react-icons/fc';
import {AiFillGithub} from 'react-icons/ai'
import {SiNaver} from 'react-icons/si'



const SignUpWrap = styled.main`
    background-color: #F1F2F3;
      >div{
        padding:15vh 0;
        display: flex;
        justify-content: center;
        aside{
            flex-basis:40rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            h1{
                font-size: 27px;
                margin-bottom: 32px;
                font-weight: 400;
                width: 75%;
                color: #232629;
            }
            ul{
                list-style: none;
                width: 75%;
                li{
                    margin-bottom: 32px;
                    color: #232629;
                    height: 26px;
                    line-height: 26px;
                    svg{
                        width: 22px;
                        height: 22px;
                        color: #0A95FF;
                        transform: translateY(5px);
                        margin-right:4px;
                    }
            }}
        }
        div{
            flex-basis:30rem;
            margin-right: 10vh;
        }
      }
`
const OauthWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
    >button{
        width: 100%;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
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
            border: 1px solid #e1e4e8;
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

const Form = styled.form`
  box-sizing:border-box;
  width: 100%;
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
    p{
        margin-top: 0.4rem;
        font-size: 14px;
        color: #6A737c;
        :first-child{
            color: red;
        }
    }
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid gray;
  border-radius: 0.25rem;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  display: block;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 2px 2px 3px #e3e9ef;
`;
const SignupButton = styled.button`
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





function SignUp() {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("")

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("")

    const [password, setPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("")

    /*** 특정 focus로 이동***/
    const nameRef = useRef(null);
    const mailRef = useRef(null);
    const passwordRef = useRef(null);
    const conformRef = useRef(null)

    const handleSubmit = (event) => {

    if(!name.length){
        nameRef.current.focus();
    }
    else if(!email.length){
        mailRef.current.focus();
    }
    else if(!password.length){
        passwordRef.current.focus()
    }
    else if( !validatePassword(password) ){
        passwordRef.current.focus()
    }
    else if(!confirmPassword.length || confirmPassword !== password){
        conformRef.current.focus()
    }
    else if( !email.includes("@") ){
        mailRef.current.focus();
    }
    else
    {   
        const random = Math.round(Math.random()*100)+0
        const data = {
            "id" : random,
            "name" : name,
            "email" : email,
            "password" : password
        }
        /*** Users POST ***/
        //`${process.env.REACT_APP_API_SERVER}/users`
        fetch(process.env.REACT_APP_API_USER, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data),
            credentials: "include" 
        })
        .then(() => {
            window.location.href = '/welcome';
        })
        .catch((error) => {
            setError(error);
        })
    }
    event.preventDefault();
    }

    const handleNameBlur = (event) => {
    const value = event.target.value;
    if (!value.length) {
        setNameError("Please enter a name");
    } else {
        setNameError("");
    }}

    const handleEmailBlur = (event) => {
    const value = event.target.value;
    if (!value.includes("@")) {
        setEmailError("Please enter a valid email address");
    } else {
        setEmailError("");
    }}

    const validatePassword = (password) => {
        if (password.length < 8) {
            return false;
        }
        const letterRegex = /[a-zA-Z]/;
        const numberRegex = /[0-9]/;
        if (!letterRegex.test(password) || !numberRegex.test(password)) {
            return false;
        }
        return true;
        }

    const handlePasswordChange = (event) => {
        const newValue = event.target.value;
        setPassword(newValue);
        setIsValidPassword(validatePassword(newValue));
    }

    const handlePasswordBlur = (event) => {
        const value = event.target.value;
        if (value !== password) {
        setPasswordError("Password are not matching");
        } else {
        setPasswordError("");
    }}

  return (
    <SignUpWrap>
        <div>
        <aside>
            <h1>Join the Stack Overflow community</h1>
            <ul>
                <li><BiMessageSquareError/>Get unstuck — ask a question</li>
                <li><BiArchiveOut/>Unlock new privileges like voting and commenting</li>
                <li><BiBookmarkPlus/>Save your favorite tags, filters, and jobs</li>
                <li><BiCool/>Earn reputation and badges</li>
            </ul>
        </aside>
        <div>
            <OauthWrap>
                <Button ><FcGoogle/><span>Sign Up with Google</span></Button>
                <Button ><AiFillGithub/><span>Sign Up with GitHub</span></Button>
                <Button ><SiNaver/><span>Sign Up with Naver</span></Button>
            </OauthWrap>

            <Form onSubmit={handleSubmit}>
                <label htmlFor="name">Display name</label>
                <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onBlur={handleNameBlur}
                    ref={nameRef}
                    autoFocus={true}
                />
                {nameError && <p>{nameError}</p>}
                <label htmlFor="email">Email</label>
                <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    onBlur={handleEmailBlur}
                    ref={mailRef}
                />
                {emailError && <p>{emailError}</p>}
                <label htmlFor="password">Password</label>
                <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    ref={passwordRef}
                />
                {!isValidPassword && (
                <p>Password must contain at least 8 characters, including at least 1 letter and 1 number.</p>
                )}
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    onBlur={handlePasswordBlur}
                    ref={conformRef}
                />
                {passwordError && <p>{passwordError}</p>}
                <SignupButton type="submit">Sign Up</SignupButton>
                {error && <p>{error}</p>}
            </Form>
        </div>
        </div>
    </SignUpWrap>
  );
}

export default SignUp;