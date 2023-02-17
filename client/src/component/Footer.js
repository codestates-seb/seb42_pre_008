import styled from "styled-components";

export const StyledFooter = styled.footer`
    position: relative;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    height: 20vh;
    margin: 0;
    background-color: #23262A;
`;
export const Contents = styled.span`
    height: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin-top: 3vh;
    color: white;
    span {
        margin-bottom: 0.7vh;
        font-size: 0.8rem;
        color: #9199A1;
    }
    .title {
        font-weight: bold;
        color: #BABFC4;
        font-size: 0.9rem;
    }
`;
export const Smallests = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 3vh;
    height: 10vh;
    font-size: 0.6rem;
    color: #9199A1;
`;
export const Upper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
export const Logo = styled.img`
    margin-top: 1.5vh;
    height: 5vh;
`;

const Footer = () => {
    return (
        <StyledFooter>
            <Logo src="icon.png" />
            <Contents>
                <span className="title">STACK OVERFLOW</span>
                <span>Questions</span>
                <span>Mypage</span>
            </Contents>
            <Contents>
                <span className="title">FRONTEND</span>
                <span>KyungaIM</span>
                <span>myongdol</span>
                <span>JudiPARK0416</span>
            </Contents>
            <Contents>
                <span className="title">BACKEND</span>
                <span>kkte02</span>
                <span>IKori</span>
                <span>Eom0j</span>
            </Contents>
            <Smallests>
                <Upper>
                    <span className="title">Blog</span>
                    <span>Facebook</span>
                    <span>Twitter</span>
                    <span>Linkedin</span>
                    <span>Instagram</span>
                </Upper>
                <div>
                    <div>
                        Site design / logo © 2023 Stack Exchange Inc; user
                    </div>
                    <div>contributions licensed under CC BY-SA.</div>
                    <div>rev 2023.2.16.43246</div>
                </div>
            </Smallests>
        </StyledFooter>
    );
};
export default Footer;
