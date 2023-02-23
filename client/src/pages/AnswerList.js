import Loading from '../component/Loading' 
import Answer from "./Answer";
import styled from "styled-components";
import { useEffect, useState, useRef } from 'react';
import { fetchCreate } from '../util/api';

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
const AnsewerPostWrap = styled.div`
    width: 100%;
    text-align: right;
    button{
            cursor:pointer;
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
    span{
        color:#F23A51;
    }
`
const Input = styled.textarea`
    padding: 0.5rem;
    box-sizing: border-box;
    border-radius: 0.25rem;
`

const AnswerList = ({login,userInfo,author, handleDelete}) => {
    const [answers, setAnswers] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [adopt,setAdopt] = useState(false)

    //답변입력
    const [content,setContent] = useState('')
    const [blank, setBlank] = useState(false)

    /*** 특정 focus로 이동***/
    const inputRef = useRef(null);

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

    const onHandleClick = () => {
        
        if(content.length === 0 ) {
            return (
                (()=>{
                    inputRef.current.focus();
                    setBlank(true);
                })()
                )};

        const random = Math.round(Math.random()*100)+0
        const date = new Date();
        const today = date.toLocaleDateString().slice(0,-1);
        fetchCreate( process.env.REACT_APP_API_ANSWER, 
            {
                "id": random,
                "author": userInfo.name,
                "update": today,
                "votes": 0,
                "content": content,
                "adopt": false
              }
           ,'/question-detail' )
    }   
    
    
 return(
    <>
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
    {login?
        <>
        <label>Your Answer</label>
            <Input 
            onChange={ (e) => setContent(e.target.value)} 
            value ={content} 
            rows="4" cols="50"
            autoFocus={true}
            ref={inputRef}
            ></Input>
            <AnsewerPostWrap>
                {blank && <span>Please write the answer in this field</span>}
                <button onClick={ onHandleClick }>Post your Answer</button>
            </AnsewerPostWrap>
            
        </>
            :<div>Please log in to write a reply</div>
        }
    </>
 )
}
export default AnswerList