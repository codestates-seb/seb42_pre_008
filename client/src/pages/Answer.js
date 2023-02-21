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
const Input = styled.textarea`
    display: block;
    width: 100vw;
`

const Answer = ({el,check}) => {
    const [clicked, setClicked] = useState(false);
    const [edit, setEdit] = useState(false);
    const [body, setbody] = useState(el.body)
    const date = new Date();
    const today = date.toLocaleDateString().slice(0,10);

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
    const onHandleEdit = () => {
        setEdit(!edit)
        fetchPatch('Answer/'+ el.id,{"body":body , "update": today},)
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
        {edit?
        <Button onClick={onHandleEdit}>수정완료</Button>
        :<Button onClick={() => setEdit(!edit)}>수정</Button>
        }
        <Button onClick={ onHandleDelete }>삭제</Button>
        {edit ?  
        <Input rows="4" cols="50" value={body} onChange={(e)=>setbody(e.target.value)}></Input>
        :<p>{body}</p>}
        
        </>
    )
}
export default Answer