import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import QuestionDetail from "./pages/QuestionDetail";
import QuestionForm from "./pages/QuestionForm";
import QuestionList from "./pages/QuestionList";
import SignIn from "./pages/SignIn";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                {/* { error && <div>{ error }</div> } */}
                <Suspense>
                    <Routes>
                        <Route exact path="/" element={<QuestionList />} />
                        <Route
                            path="/question-form"
                            element={<QuestionForm />}
                        />
                        <Route
                            path="/question-detail"
                            element={<QuestionDetail />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/mypage" element={<MyPage />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
