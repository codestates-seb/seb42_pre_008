import { useState } from 'react';
import { fetchCreate } from '../util/api';
import Question from './Question';
import AnswerList  from './AnswerList';
import useFetch from "../util/useFetch";
import styled from "styled-components";

const QuestionDetailWraper = styled.div`
    margin:15vh 10vh;
    position: relative;
    label{
        display: block;
        font-size: 1.2rem;
        padding-bottom: 3vh;
    }
    textarea{
        width: 100%;
        resize: none;
        margin-bottom: 1vh;
        font-size: 1rem;
    }
    >button{
            cursor:pointer;
            position: absolute;
            right: 0;
            margin-right: 0;
            font-size: 16px;
            height: 4vh;
            padding: 0 1vh;
            margin-left: 1vh;
            border-radius: 0.3vh;
            background-color: #0995ff;
            color: white;
            border: 1px solid #477199;
            box-shadow: inset 0px 0px 0px 0px #54a3f7;
            :hover {
                color: #fff;
                background-color: #3172c6;
            }
    }
`


const QuestionDetail = ({login,userInfo,endpoint}) => {
    const [data, isPending, error ] = useFetch(process.env.REACT_APP_API_QUESTION)
    const [body,setbody] = useState('')

    //data update test완료
    const onHandleClick = () => {
        const random = Math.round(Math.random()*100)+0
        const date = new Date();
        const today = date.toLocaleDateString().slice(0,10);
        fetchCreate( {
            "id": random,
            "name": "임경아",
            "update": today,
            "like": 0,
            "body": body,
            "check": false
          } ,'/question-detail','/Answer' )
    }
    
    return(
        <QuestionDetailWraper>
            {data && <Question login={login} data={data[0]}/>}
            <AnswerList login={login}/>
            <label>Your Answer</label>
            <textarea onChange={ (e) => setbody(e.target.value)} value ={body} rows="4" cols="50"  ></textarea>
            <button onClick={ onHandleClick }>Post your Answer</button>
        </QuestionDetailWraper>
    )
}
export default QuestionDetail