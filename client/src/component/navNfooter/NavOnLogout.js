import styled from "styled-components";
import { GrSearch } from "react-icons/gr";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
    position: sticky;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 5.3vh;
    padding: 0.5vh 5vw;
    border-top: 0.4vh solid #f48023;
    border-bottom: 0.2vh solid #e4e6e7;
    box-shadow: 0 4px 4px -6.5px black;
    background-color: #f9f9f9;
    z-index: 3;
`;
export const Menu = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4vh;
    padding: 0 1vw;
    font-size: 13.5px;
    color: #51595f;
    background-color: transparent;
    border: none;
    :hover {
        background-color: #e4e6e7;
        color: black;
        border-radius: 5vh;
    }
`;
export const LoginButton = styled.button`
    font-size: 13.5px;
    height: 4.3vh;
    padding: 0 1.3vh;
    margin-left: 1vh;
    border-radius: 0.3vh;
    background-color: #e3ecf3;
    color: #477199;
    border: 0.9px solid #477199;
    box-shadow: inset 0px 0px 0px 0px #54a3f7;
    :hover {
        background-color: #b9d2e8;
    }
`;
export const SignupButton = styled.button`
    font-size: 13.5px;
    height: 4.3vh;
    padding: 0 1.3vh;
    margin-left: 1vh;
    border-radius: 0.3vh;
    background-color: #0995ff;
    color: white;
    border: 0.9px solid #477199;
    box-shadow: inset 0px 0px 0px 0px #54a3f7;
    :hover {
        background-color: #3172c6;
    }
`;
export const SearchBox = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: 4vh;
    margin-left: 0.5vh;
    padding: 0 0.5vw;
    border: 1px solid #bcbbbc;
    background-color: white;
    border-radius: 0.3vh;
    font-weight: bold;
    color: #bcbbbc;
    #magnifyingGlass {
        color: #838c95;
        font-size: 20.8px;
    }
`;
export const Input = styled.input`
    display: flex;
    align-items: center;
    width: 30vw;
    flex-grow: 1;
    height: 4vh;
    padding: 0 1vw;
    border: none;
    font-size: 13.5px;
`;
export const Logo = styled.img`
    height: 3.8vh;
    margin: 2vh;
`;
export const None = styled.button`
    margin: 0;
    padding-top: 0.4vh;
    background-color: transparent;
    border: none;
    color: #838c95;
`;

const NavOnLogout = () => {
    return (
        <Nav>
            <Link to="/">
                <Logo src="logo.png" />
            </Link>
            <Link to="/">
                <Menu>Home</Menu>
            </Link>
            <Link to="/">
                <Menu>Questions</Menu>
            </Link>
            <SearchBox>
                <None>
                    <GrSearch id="magnifyingGlass" />
                </None>
                <Input placeholder="Search..."></Input>
            </SearchBox>
            <Link to="/login">
                <LoginButton>Log in</LoginButton>
            </Link>
            <Link to="/sign-in">
                <SignupButton>Sign up</SignupButton>
            </Link>
        </Nav>
    );
};
export default NavOnLogout;
