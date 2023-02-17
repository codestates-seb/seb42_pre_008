import styled from "styled-components";
import { GrSearch } from "react-icons/gr";

export const Nav = styled.nav`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 5vh;
    padding: 0.5vh 1vh;
    border-top: 0.5vh solid #f48023;
    border-bottom: 0.2vh solid #e4e6e7;
    background-color: #f9f9f9;
    font-size: 1.3rem;
`;
export const Menu = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4vh;
    margin-right: 1vh;
    padding: 0 1vh;
    font-size: 1rem;
    background-color: transparent;
    border: none;
    :hover {
        background-color: #e4e6e7;
        border-radius: 5vh;
    }
`;
export const LoginButton = styled.button`
    font-size: 1rem;
    height: 4vh;
    padding: 0 1vh;
    margin-left: 1vh;
    border-radius: 0.3vh;
    background-color: #e3ecf3;
    color: #477199;
    border: 1px solid #477199;
    box-shadow: inset 0px 0px 0px 0px #54a3f7;
    :hover {
        background-color: #b9d2e8;
    }
`;
export const SignupButton = styled.button`
    font-size: 1rem;
    height: 4vh;
    padding: 0 1vh;
    margin-left: 1vh;
    border-radius: 0.3vh;
    background-color: #4393f8;
    color: white;
    border: 1px solid #477199;
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
    padding: 0 0.5vh;
    border: 0.2vh solid #bcbbbc;
    background-color: white;
    border-radius: 0.3vh;
    font-weight: bold;
    color: #bcbbbc;
    #magnifyingGlass {
        font-size: 1.3rem;
    }
`;
export const Input = styled.input`
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: 4vh;
    padding: 0;
    border: none;
    font-size: 1rem;
`;
export const Logo = styled.img`
    height: 2.7vh;
    margin: 2vh;
`;
export const None = styled.button`
    margin: 0;
    padding-top: 0.4vh;
    background-color: transparent;
    border: none;
`;

const NavOnLogout = () => {
    return (
        <Nav>
            <Logo src="logo.png" />
            <Menu>Home</Menu>
            <Menu>Questions</Menu>
            <SearchBox>
                <None>
                    <GrSearch id="magnifyingGlass" />
                </None>
                <Input placeholder="Search..."></Input>
            </SearchBox>
            <LoginButton>Log in</LoginButton>
            <SignupButton>Sign up</SignupButton>
        </Nav>
    );
};
export default NavOnLogout;
