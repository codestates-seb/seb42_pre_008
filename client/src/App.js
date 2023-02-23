import { useEffect, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import QuestionDetail from "./pages/QuestionDetail";
import QuestionForm from "./pages/QuestionForm";
import QuestionList from "./pages/QuestionList";
import SignUp from "./pages/SignUp";
import NavOnLogin from "./component/NavOnLogout";
import Footer from "./component/Footer";
import Welcome from "./pages/Welcome";
import UserInfoEdit from "./pages/UserInfoEdit";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
`;


function App() {
    const [login, setLogin] = useState(true);
    const [userInfo, setUserInfo] = useState({
        "id": 1,
        "name": "kkte02"
      });
    const [error, setError] = useState(null);
    //QuestionList -> QuestionDetail로 엔드포인트를 전달합니다
    const [endpoint, setEndpoint] = useState(null);
    //로그인 여부를 확인해 회원정보를 저장합니다
    // useEffect(() => {
    //     const abortCont = new AbortController();

    //     setTimeout(() => {
    //         //여기서 endpoint를 수정해주면 됩니다
    //         fetch(`${process.env.REACT_APP_API_URL$}/loginIfon`, {
    //             signal: abortCont.signal,
    //             //인증정보를 포함하는 옵션입니다
    //             credentials: "include",
    //         })
    //             .then((res) => {
    //                 if (!res.ok) {
    //                     throw Error(
    //                         "could not fetch the data for that resource"
    //                     );
    //                 }
    //                 return res.json();
    //             })
    //             .then((data) => {
    //                 setLogin(true);
    //                 setUserInfo(data);
    //                 setError(null);
    //             })
    //             .catch((err) => {
    //                 setLogin(false);
    //                 setError(err.message);
    //             });
    //     }, 1000);

    //     return () => abortCont.abort();
    // }, []);

    return (
        <>
            <GlobalStyle />
            <NavOnLogin/>
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
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/mypage" element={<MyPage />} />
                        <Route path="/welcome" element={<Welcome/>} />
                        <Route path="/userinfo-edit" element={<UserInfoEdit/>} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
            <Footer/>
        </>
    );
}

export default App;
