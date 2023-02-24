import styled from "styled-components";
import { BsCheckCircle } from "react-icons/bs";

const WelcomeWrap = styled.main`
    height: 100vh;
    width: 100vw;
    background-color: #F1F2F3;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    svg{
        width: 6rem;
        height: 6rem;
        margin-bottom: 2rem;
        color:#0995ff;
    }
    h1{
        font-size: 27px;
        margin-bottom: 32px;
        font-weight: 400;
        text-align: center;
        width: 75%;
        color: #232629;
    }
    p{
        text-align: center;
    }
    button{
    height: 37px;
    border-radius: 0.3vh;
    background-color: #0995ff;
    color: white;
    border: 1px solid #477199;
    box-shadow: inset 0px 0px 0px 0px #54a3f7;
    margin-top: 1.8rem;
    display: block;
    width: 10rem;
    cursor: pointer;
    :hover {
        background-color: #3172c6;
    }
    }
`
const Welcome = () => {
    return (
            <WelcomeWrap>
            <BsCheckCircle/>
            <h1>Welcome!</h1>
            <p>Thank you for signing up for our service.<br/>
                We're excited to have you as a member of our community.</p>
            <button onClick={()=> window.location.href = '/login'}>Login</button>
            </WelcomeWrap>
            
            )
}

export default Welcome