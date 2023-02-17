import { useEffect, Suspense} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Login from './pages/Login'
import MyPage from './pages/MyPage'
import QuestionDetail from './pages/QuestionDetail'
import QuestionForm from './pages/QuestionForm'
import QuestionList from './pages/QuestionList'
import SignIn from './pages/SignIn'
import { useDispatch } from 'react-redux'
import { read } from './counterSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const abortCont = new AbortController();

    fetch( process.env.REACT_APP_API_URL, { signal: abortCont.signal })
    .then(res => {
        if (!res.ok) { 
            throw Error('could not fetch the data for that resource');
        } 
        return res.json();
    })
    .then(data => {
        dispatch(read(data))
    })
    .catch(err => {
        console.log(err)
    })
    return () => abortCont.abort();
    }, [])

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
