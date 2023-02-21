import styled from "styled-components"
import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from 'react'
import { fetchDelete } from '../util/api'

const QuestionReadWrap = styled.div`
    margin:15vh 10vh;
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
            :nth-child(2n){
                color: #6a737c;
            }
        }
    }
`
const QuestionBodyWrap = styled.div`
    display: flex;
    aside{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 2vh 2vh;
        span{
            margin: 2vh 0;
        }
    }
`

const QuestionButton = styled.button`
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
        background-color: #3172c6;
    }
`
const UpdownButton = styled.button`

`
const Button = styled.button`

`

const QuestionRead = ({login,data}) => {
    
    const [upClicked, setUpClicked] = useState(false);
    const [downClicked, setDownClicked] = useState(false);
    const [checked,setChecked] = useState('still');
    const [votes, setVote] = useState(data && parseInt(data.votes))

    const onHandleVoteUp = () => {
        if(checked === 'still'){
            setChecked('up')
            setUpClicked(true)
            setVote(votes + 1)
        }else if( checked === 'down'){
            setChecked('still')
            setDownClicked(false)
            setVote(votes + 1)
        }
    }
    const onHandleVoteDown = () => {
        if(checked === 'still'){
            setChecked('down')
            setDownClicked(true)
            setVote(votes - 1)
        }else if( checked === 'up'){
            setChecked('still')
            setUpClicked(false)
            setVote(votes - 1)
        }
    }
    const onHandleDelete = () => {
        fetchDelete('questions/'+ 1,'/question-detail')
    }
    return (
        <>
            <QuestionReadWrap>
                <header>
                    <div>
                    <h1>{data.title}</h1>
                    <span>asked </span>
                    <span>{data.createdAt} </span>
                    <span>viewed </span> 
                    <span>{data.view} </span>
                    <Button>수정</Button>
                    <Button onClick={onHandleDelete}>삭제</Button>
                    </div>
                    <QuestionButton>Ask Question</QuestionButton>
                </header>
            <QuestionBodyWrap>
                <aside>                    
                    <UpdownButton onClick={ onHandleVoteUp } disabled={upClicked} ><AiFillCaretUp/></UpdownButton>
                    <span>{votes}</span>
                    <UpdownButton onClick={ onHandleVoteDown } disabled={downClicked}><AiFillCaretDown/></UpdownButton>
                </aside>
                <article>
                    <div>{data.content}</div>
                    <div>{data.tag.join("")}</div>
                </article>
            </QuestionBodyWrap>
        </QuestionReadWrap>
        </>
    )
}

export default QuestionRead