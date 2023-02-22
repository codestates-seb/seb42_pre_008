import styled from "styled-components"
import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { useState ,useEffect } from 'react'
import { fetchPatch } from '../util/api'
import Avatar, { genConfig } from 'react-nice-avatar'
import useFetch from "../util/useFetch";

const config = genConfig()
const QuestionWrap = styled.div`
    padding-bottom: 5vh;
    margin-bottom: 5vh;
    border-bottom: 0.7px solid #d2d2d2;
    header{
        display: flex;
        justify-content: space-between;
        padding-bottom: 2vh;
        border-bottom: 0.7px solid #d2d2d2;
        h1{
            font-size: 1.5rem;
            width: 80vh;
            margin-bottom: 2vh;
        }
        span{
            margin-right: 1vw;
            :nth-child(2n){
                color: #6a737c;
            }
            :first-child{
                padding-left: 2vw;
            }
        }
        button{
            cursor:pointer;
            border: none;
            background: none;
            margin-right: 1vw;
            color: #0995ff;
            :hover {
                color: #3172c6;
            }
            :disabled{
                display: none;
            }
        }
        >button{
            cursor:pointer;
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

    }
`
const QuestionBodyWrap = styled.div`
    display: flex;
    aside{
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 5vh 2vh;
        span{
            margin: 2vh 0;
        }
        button{
            cursor:pointer;
            border: none;
            background: none;
            font-size: 1.3rem;
        }
    }
    article{
        padding-top: 5vh;
        div{
            margin-top: 2vh;
            span{
                background-color: #e1ecf4;
                color: #39739d;
                margin-right: 0.5vw;
                font-size: 0.9rem;
                padding: 0.2vh 0.7vh;
                :hover{
                    background-color: #b9d2e8;
                    color: #375774;
                }
            }
        }
    }
`
const Question = ({login,userInfo,handleDelete,setAuthor}) => {
    //fetchdata
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const [upClicked, setUpClicked] = useState(false);
    const [downClicked, setDownClicked] = useState(false);
    const [checked,setChecked] = useState('still');
    const [vote, setVote] = useState('')

    const onHandleVoteUp = () => {
        if(checked === 'still'){
            setChecked('up')
            setUpClicked(true)
            setVote(vote + 1)
        }else if( checked === 'down'){
            setChecked('still')
            setDownClicked(false)
            setVote(vote + 1)
        }
    }
    const onHandleVoteDown = () => {
        if(checked === 'still'){
            setChecked('down')
            setDownClicked(true)
            setVote(vote - 1)
        }else if( checked === 'up'){
            setChecked('still')
            setUpClicked(false)
            setVote(vote - 1)
        }
    }
    const onHandleQuestion = () =>{
        if(login){
            window.location.href = '/question-form';
        }
        else{
            window.location.href = '/login';
        }
    }


    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
        fetch(process.env.REACT_APP_API_QUESTION+'/'+'1', { signal: abortCont.signal })
        .then(res => {
            if (!res.ok) { 
                throw Error('could not fetch the data for that resource');
            } 
            return res.json();
        })
        .then(data => {
            setIsPending(false);
            setData(data);
            setError(null);
            setVote(data.votes)
            setAuthor(data.author)
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
        })
        }, 1000);},[])


    useEffect(() => {
        function handleBeforeUnload() {
            if(checked === 'up') fetchPatch(`${process.env.REACT_APP_API_QUESTION}/${data.id}`,{"votes": data.votes + 1 },)
            if(checked === 'down') fetchPatch(`${process.env.REACT_APP_API_QUESTION}/${data.id}`,{"votes": data.votes - 1 },)
        }
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, [checked]);

    return (

            <QuestionWrap>
                {data &&
                    <header>
                    <div>
                        <h1>{data.title}</h1>
                        <div>
                        <Avatar style={{ width: '1.5rem', height: '1.5rem', display: 'inline-block' }} {...config} />
                        <span>author</span>
                        <span>{data.author}</span>
                        <span>asked</span>
                        <span>{data.createdAt}</span>
                        <span>viewed</span> 
                        <span>{data.view}</span>
                        <button disabled={ userInfo.name !== data.author }>edit</button>
                        <button 
                        onClick={(e)=>handleDelete(e.target.value)} 
                        disabled={ userInfo.name !== data.author}
                        value={`${process.env.REACT_APP_API_QUESTION}/${data.id}`}>delete</button>
                        </div>
                    </div>
                    <button onClick={onHandleQuestion}>Ask Question</button>
                </header>
                }
            <QuestionBodyWrap>
                {data &&<>
                        <aside> 
                            {login? <button onClick={ onHandleVoteUp } disabled={upClicked} ><AiFillCaretUp/></button>:
                            <button onClick={ onHandleVoteUp } disabled={true} ><AiFillCaretUp/></button>
                            }       
                            <span>{vote}</span>
                            {login? <button onClick={ onHandleVoteDown } disabled={downClicked} ><AiFillCaretDown/></button>:
                            <button onClick={ onHandleVoteDown } disabled={true} ><AiFillCaretDown/></button>
                            }    
                        </aside>
                        <article>
                            {data.content}
                            <div>{data.tag.map((el) => <span>{el}</span>)}</div>
                        </article>
                        </>
                }

            </QuestionBodyWrap>
        </QuestionWrap>
        
    )
}

export default Question