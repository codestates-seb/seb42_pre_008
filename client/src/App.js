import { useEffect, Suspense} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Login from './pages/Login'
import MyPage from './pages/MyPage'
import QuestionDetail from './pages/QuestionDetail'
import QuestionForm from './pages/QuestionForm'
import QuestionList from './pages/QuestionList'
import SignIn from './pages/SignIn'

function App() {

  return (
    <BrowserRouter>
    {/* { error && <div>{ error }</div> } */}
    <Suspense>
        <Routes>
          <Route exact path="/" element={<QuestionList />} />
          <Route path="/question-form" element={<QuestionForm />} />
          <Route path="/question-detail" element={<QuestionDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
    </Suspense>
    </BrowserRouter>
  );
}

export default App;
