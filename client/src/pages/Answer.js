import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import Avatar, { genConfig } from 'react-nice-avatar'
import styled from "styled-components";
import { fetchDelete } from '../util/api'
import { fetchPatch } from '../util/api'
import { useState } from 'react'

const config = genConfig()
const Button = styled.button`

`

const Answer = ({el,check}) => {
    const [clicked, setClicked] = useState(false);
     const onHandleVoteUp = () => {
        if (clicked === false) {
            setClicked(!clicked);
            fetchPatch('Answer/'+ el.id, {"votes": el.votes + 1}, '/question-detail');
            }
    }
    const onHandleVoteDown = () => {
        fetchPatch('Answer/'+ el.id,{"votes":el.votes - 1},'/question-detail')
    }
    const onHandleDelete = () => {
        fetchDelete('Answer/'+ el.id,'/question-detail')
    }
    const onHandleCheck = () => {
        fetchPatch('Answer/'+ el.id,
            {
                "check":!el.check
            }
            ,'/question-detail')
    }

    return (
        <>
        {console.log(clicked)}
        <Avatar style={{ width: '1.5rem', height: '1.5rem' }} {...config} />
        <span>{el.name}</span>
        <span>{el.update}</span>
        <Button onClick={ onHandleVoteUp } ><AiFillCaretUp/></Button>
            <span>{el.votes}</span>
        <Button onClick={ onHandleVoteDown }><AiFillCaretDown/></Button>
        {el.check ? 
        <Button onClick={ onHandleCheck }>채택취소</Button>
        :<Button onClick={ onHandleCheck }>채택하기</Button>}
        <Button>수정</Button>
        <Button onClick={ onHandleDelete }>삭제</Button>
        <p>{el.body}</p>
        </>
    )
}
export default Answer