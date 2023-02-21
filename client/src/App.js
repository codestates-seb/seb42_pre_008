import { useEffect, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import LeftSide from "./component/mypage/LeftSide";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import QuestionDetail from "./pages/QuestionDetail";
import QuestionForm from "./pages/QuestionForm";
import QuestionList from "./pages/QuestionList";
import SignIn from "./pages/SignIn";
import MyPage2 from "./pages/MyPage2";


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
`;

function App() {
    const [login, setLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    //QuestionList -> QuestionDetail로 엔드포인트를 전달합니다
    const [endpoint, setEndpoint] = useState(null);

    //로그인 여부를 확인해 회원정보를 저장합니다
    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            //여기서 endpoint를 수정해주면 됩니다
            fetch(process.env.REACT_APP_API_URL, {
                signal: abortCont.signal,
                //인증정보를 포함하는 옵션입니다
                credentials: "include",
            })
                .then((res) => {
                    if (!res.ok) {
                        throw Error(
                            "could not fetch the data for that resource"
                        );
                    }
                    return res.json();
                })
                .then((data) => {
                    setLogin(true);
                    setUserInfo(data);
                    setError(null);
                })
                .catch((err) => {
                    setLogin(false);
                    setError(err.message);
                });
        }, 1000);

        return () => abortCont.abort();
    }, []);

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Suspense>
                    <Routes>
                        <Route exact path="/" element={<QuestionList />} />
                        <Route
                            path="/question-form"
                            element={<QuestionForm />}
                        />
                        <Route
                            path="/question-detail"
                            element={
                                <QuestionDetail
                                    login={login}
                                    userInfo={userInfo}
                                    endpoint={endpoint}
                                />
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/mypage" element={<MyPage2 />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
