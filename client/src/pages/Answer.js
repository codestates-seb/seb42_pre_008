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
    const [upClicked, setUpClicked] = useState(false);
    const [downClicked, setDownClicked] = useState(false);
    //up,still,down
    const [checked,setChecked] = useState('still');
    const [votes, setVote] = useState(el.votes)
    const [edit, setEdit] = useState(false);
    const [body, setbody] = useState(el.body)
    const date = new Date();
    const today = date.toLocaleDateString().slice(0,10);

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
        <Avatar style={{ width: '1.5rem', height: '1.5rem' }} {...config} />
        <span>{el.name}</span>
        <span>{el.update}</span>
        <Button onClick={ onHandleVoteUp } disabled={upClicked}><AiFillCaretUp/></Button>
            <span>{votes}</span>
        <Button onClick={ onHandleVoteDown } disabled={downClicked}><AiFillCaretDown/></Button>
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