import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

const MainWrapper = styled.div`
padding: 0.5rem;
padding-top: 28px;
width: 156px;
`
const Wrapper = styled.div`
position: fixed;
`
const NavLink = styled(Link)`
font-size: 13px;
font-weight: normal;
color: #718096;
&:hover {
    color: #000;
}
&:focus {
    color: #000;
    font-weight: bold;
}
.group-focus & {
    background-color: #f7fafc;
    border-right: 4px solid #fbd38d;
}
`
const Navitem = styled.div`
background-color: #f7fafc;
border-right: 4px solid #fbd38d;
`
const PublicDiv = styled.div`
padding: 0.25rem;
font-size: 11px;
font-weight: normal;
color: #8B8B8B;
margin-bottom: 0.375rem;
`
const BtnContainer = styled.ul`
margin-bottom: 3px;
`
const StyledLink = styled(Link)`
  .group {
    font-size: 0.875rem; /* 13px */
    color: #718096;
    transition: font-weight 0.2s ease-in, color 0.2s ease-in;

    &:hover,
    &:focus {
      font-weight: 600;
      color: #1a202c;
    }
  }
  .p-1 {
    height: 2rem; /* 8px */
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: background-color 0.2s ease-in, border-right 0.2s ease-in,
    border-color 0.2s ease-in;
    &.group-focus {
      background-color: #f7fafc;
      border-right-width: 0.25rem; /* 4px */
      border-color: #ed8936;
    }
  }
  svg {
    margin-right: 0.375rem; /* 6px */
    width: 1.125rem; /* 18px */
    height: 1.125rem; /* 18px */
  }
  span {
    font-size: 0.8125rem; /* 13px */
  }
`;


function LeftSide() {
 return (
    <MainWrapper>
        <Wrapper>
            <NavLink to="/">
                <Navitem className="group-focus"> 
                    Home
                </Navitem>
            </NavLink>
            <PublicDiv>
                Public
            </PublicDiv>

            <BtnContainer>
                <StyledLink to="/">
                <li>
                    <div className="p-1 h-8 flex flex-row items-center group-focus:bg-gray-100 group-focus:border-r-4 group-focus:border-orange-400">
                    <svg
                        aria-hidden="true"
                        className="mr-1.5"
                        viewBox="0 0 18 18"
                    >
                        <path
                        className="fill-gray-500 group-hover:fill-black group-focus:fill-black"
                        d="M9 1C4.64 1 1 4.64 1 9c0 4.36 3.64 8 8 8 4.36 0 8-3.64 8-8 0-4.36-3.64-8-8-8ZM8 15.32a6.46 6.46 0 0 1-4.3-2.74 6.46 6.46 0 0 1-.93-5.01L7 11.68v.8c0 .88.12 1.32 1 1.32v1.52Zm5.72-2c-.2-.66-1-1.32-1.72-1.32h-1v-2c0-.44-.56-1-1-1H6V7h1c.44 0 1-.56 1-1V5h2c.88 0 1.4-.72 1.4-1.6v-.33a6.45 6.45 0 0 1 3.83 4.51 6.45 6.45 0 0 1-1.51 5.73v.01Z"
                        />
                    </svg>
                    <span>Questions</span>
                    </div>
                </li>
                </StyledLink>

            </BtnContainer>
        

        </Wrapper>
    </MainWrapper>
 )
}
export default LeftSide;