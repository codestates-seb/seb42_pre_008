import styled from "styled-components";
import Actives from '../component/mypage/Actives'
import { Routes, Route } from "react-router-dom";


const MainWrapper = styled.div`

`
const Container = styled.div`
display: flex;
justify-content: center;
max-width: auto;
max-height: auto;
`

function MyPage() {
    return (
        <MainWrapper>
            <Container>
                <nav className="sticky max-h-[calc(100vh-180px)] top-[60px] w-[164px] flex-grow-0 flex-shrink-0 basis-[164px]">
                    {/* sidebar */}
                </nav>
                <div className="so-main-content so-with-one-side">
                    <div className="p-6 w-[1100px]">


                        <Routes>
                            <Route exact path="/" element={<Actives/>} />
                            <Route exact path="/actives" element={<Actives />} />
                            <Route exact path="/settings/*" element={<Actives />} />
                        </Routes>
                    </div>
                </div>
            </Container>
        </MainWrapper>

    )
}

export default MyPage;