import Loading from '../component/Loading' 
import Answer from "./Answer";
import styled from "styled-components";
import { useEffect, useState } from 'react';

const AnswerListWrap = styled.div`
    margin-bottom: 5vh;
    
    h3{
        font-size: 1.2rem;
        font-weight: 400;
        margin-bottom: 3vh;
    }
    li{
        list-style: none;
    }
`
const AdoptedLi = styled.li`
    background-color: #F9F9F9;
    padding-top: 4vh;
    >p{
        margin-left: 2vw;
        margin-bottom: 3vw;
        color:gray;
    }
`

const AnswerList = ({login,userInfo,author, handleDelete}) => {
    const [answers, setAnswers] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [adopt,setAdopt] = useState(false)

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
        fetch(process.env.REACT_APP_API_ANSWER, { signal: abortCont.signal })
        .then(res => {
            if (!res.ok) { 
                throw Error('could not fetch the data for that resource');
            } 
            return res.json();
        })
        .then(answers => {
            setIsPending(false);
            setAnswers(answers);
            setAdopt(answers.some((el)=>el.adopt))
            setError(null);
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
        })
        }, 1000);

        return (
            () => 
            {abortCont.abort()
            
            })
    }, [])
    
    
 return(
    <AnswerListWrap>
        <h3>{answers && answers.length} Answers</h3>
        <ul>
            {isPending && <Loading/>}
            {error && console.log(error)}
            {answers && answers.filter((el) => el.adopt === true ).map((el) => {
                return(
                    <AdoptedLi key={el.id}>
                        <p>Adopted Answer</p>
                        <Answer el = {el} login={login} userInfo={userInfo} author={author} handleDelete={handleDelete}/>
                    </AdoptedLi>
                )
            })}
            {answers && answers.filter((el) => el.adopt === false ).map((el) => {
                return(
                    <li key={el.id}>
                        <Answer el = {el}  adopt={adopt} login={login} userInfo={userInfo} author={author}  handleDelete={handleDelete}/>
                    </li>
                )
            })}
        </ul>
    </AnswerListWrap>
 )
}
export default AnswerList