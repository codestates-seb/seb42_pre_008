import styled from "styled-components";
const LodingSVG = styled.svg`
    transform-origin:center;
    animation: spinner_sEAn .75s infinite linear;
    @keyframes spinner_sEAn{100%{transform:rotate(360deg)}}
`
const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70vh;
`

const Loading = () => {
    return (
        <LoadingContainer>
        <LodingSVG 
            width="60" 
            height="60" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg">
            <path fill="rgba(188, 187, 188, 1)" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
            <path fill="rgba(244, 128, 35, 1)" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"/>
        </LodingSVG>
        </LoadingContainer>
    )
}
  
export default Loading; 