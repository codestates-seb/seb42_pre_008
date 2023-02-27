import styled from "styled-components";

const Footer = () => {
    //! 페이지 본문
    return (
        <StyledFooter>
            <ContentsWrapper>
                <Logo src="image/icon.png" />
                <ExceptLogo>
                    <Extra>
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
                        <Contents>
                            <span className="title">
                                STACK EXCHANGE NETWORK
                            </span>
                            <span>Technology</span>
                            <span>Culture & recreation</span>
                            <span>Life & arts</span>
                            <span>Science</span>
                            <span>Professional</span>
                            <span>Business</span>
                            <span>API</span>
                            <span>Data</span>
                        </Contents>
                    </Extra>
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
                                Site design / logo © 2023 Stack Exchange Inc;
                                user
                            </div>
                            <div>contributions licensed under CC BY-SA.</div>
                            <div>rev 2023.2.16.43246</div>
                        </div>
                    </Smallests>
                </ExceptLogo>
            </ContentsWrapper>
        </StyledFooter>
    );
};
export default Footer;

//! style components
export const StyledFooter = styled.footer`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    bottom: 0;
    height: 40vh;
    padding-top: 2vh;
    background-color: #23262a;
`;
export const ContentsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    width: 90vw;
`;
export const ExceptLogo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80vw;
`;
export const Extra = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 50vw;
`;
export const Contents = styled.span`
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin-top: 3vh;
    color: white;
    span {
        margin-bottom: 1.5vh;
        font-size: 15px;
        color: #9199a1;
    }
    .title {
        font-weight: bold;
        color: #babfc4;
        font-size: 15px;
    }
`;
export const Smallests = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 3vh;
    height: 30vh;
    font-size: 13px;
    color: #9199a1;
`;
export const Upper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
export const Logo = styled.img`
    margin-top: 1.5vh;
    height: 7vh;
`;
