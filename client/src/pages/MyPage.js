import styled from "styled-components";
import Actives from '../component/mypage/Actives'
import { Routes, Route } from "react-router-dom";
import NavOnLogout from "../component/NavOnLogout";
import NavOnLogin from "../component/NavOnLogin"


const MainWrapper = styled.div`

`
const Container = styled.div`
display: flex;
justify-content: center;
max-width: auto;
max-height: auto;
`
const Nav = styled.nav`
position: sticky;
top: 60px;
width: 164px;
max-height: calc(100vh - 180px);
flex-grow: 0;
flex-shrink: 0;
flex-basis: 164px;
`
const MainContent = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 0 auto;
max-width: 1024px;
padding: 0 1rem;

&.so-with-one-side {
  margin-top: 60px;
  padding-left: 250px;
}
`


function MyPage() {
    return (
        <>
        <NavOnLogin />
        <MainWrapper>
            <Container>
                <Nav>
                    {/* sidebar */}
                </Nav>

                <MainContent className="so-main-content so-with-one-side">
                    <div className="p-6 w-[1100px]">
                        <Routes>
                            <Route exact path="/" element={<Actives/>} />
                            <Route exact path="/actives" element={<Actives />} />
                            <Route exact path="/settings/*" element={<Actives />} />
                        </Routes>
                    </div>
                </MainContent>
            </Container>
        </MainWrapper>
        </>
    )
}

export default MyPage;