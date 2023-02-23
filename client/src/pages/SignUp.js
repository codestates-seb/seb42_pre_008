import React, { useState } from "react";
import styled from "styled-components";
import { BiMessageSquareError } from "react-icons/bi";
import { BiArchiveOut } from "react-icons/bi";
import { BiBookmarkPlus } from "react-icons/bi";
import { BiCool } from "react-icons/bi";
import {FcGoogle} from 'react-icons/fc';
import {AiFillGithub} from 'react-icons/ai'
import {AiFillFacebook} from 'react-icons/ai'

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
            background-color: #314A86;
            color: #FFFFFF;
            :hover{
                background-color: #2a427a;
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
    span{
        margin-top: 0.4rem;
        color: #6A737c;
        font-size: 14px;
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
    :hover {
        background-color: #3172c6;
    }
`;




function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // code to handle form submission
  }

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
                <Button type="submit"><FcGoogle/><span>Sign Up with Google</span></Button>
                <Button type="submit"><AiFillGithub/><span>Sign Up with GitHub</span></Button>
                <Button type="submit"><AiFillFacebook/><span>Sign Up with Facebook</span></Button>
            </OauthWrap>

            <Form onSubmit={handleSubmit}>
            <label htmlFor="name">Display name</label>
            <Input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor="email">Email</label>
            <Input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="password">Password</label>
            <Input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <span>Passwords must contain at least eight characters, including at least 1 letter and 1 number.</span>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <SignupButton type="submit">Sign Up</SignupButton>
            </Form>
        </div>
        </div>
    </SignUpWrap>
  );
}

export default SignUp;