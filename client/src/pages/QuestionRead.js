import styled from "styled-components"
import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from 'react'

const QuestionHeadWrap = styled.div`

`
const Title = styled.div`

`
const QuestionBodyWrap = styled.div`

`
const QuestionReadWrap = styled.div`

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
    return (
        <>
            <QuestionReadWrap>
            <QuestionHeadWrap>
                <div>
                    <Title>{data.title}</Title>
                    <span>{data.createdAt}</span> <span>{data.view}</span> 
                    <Button onClick={ onHandleVoteUp } disabled={upClicked} ><AiFillCaretUp/></Button>
                    <span>{votes}</span>
                    <Button onClick={ onHandleVoteDown } disabled={downClicked}><AiFillCaretDown/></Button>
                    <Button>수정</Button>
                    <Button>삭제</Button>
                    <Button>질문하기</Button>
                </div>
            </QuestionHeadWrap>
            <QuestionBodyWrap>
                <div>{data.content}</div>
                <div>{data.tag.join("")}</div>
            </QuestionBodyWrap>
        </QuestionReadWrap>
        </>
    )
}

export default QuestionRead