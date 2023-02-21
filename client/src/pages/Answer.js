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

const Answer = ({el,adopt}) => {
    //vote기능
    const [upClicked, setUpClicked] = useState(false);
    const [downClicked, setDownClicked] = useState(false);
    const [checked,setChecked] = useState('still');
    const [votes, setVote] = useState(el.votes)

    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState(el.content)
    const date = new Date();
    const today = date.toLocaleDateString().slice(0,10);
    //fetch link
    const url = process.env.REACT_APP_API_ANSWER + '/' + el.id

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
        fetchDelete(url,'/question-detail')
    }
    const onHandleAdopt = () => {
        fetchPatch(url,
            {
                "adopt":!el.adopt
            }
            ,'/question-detail')
    }
    const onHandleEdit = () => {
        setEdit(!edit)
        fetchPatch(url,{"content":content , "update": today},)
    }

    return (
        <>
        <Avatar style={{ width: '1.5rem', height: '1.5rem' }} {...config} />
        <span>{el.name}</span>
        <span>{el.update}</span>
        <Button onClick={ onHandleVoteUp } disabled={upClicked}><AiFillCaretUp/></Button>
            <span>{votes}</span>
        <Button onClick={ onHandleVoteDown } disabled={downClicked}><AiFillCaretDown/></Button>
        {el.adopt ? 
        <Button onClick={ onHandleAdopt }>채택취소</Button>
        :<Button onClick={ onHandleAdopt }>채택하기</Button>}
        {edit?
        <Button onClick={onHandleEdit}>수정완료</Button>
        :<Button onClick={() => setEdit(!edit)}>수정</Button>
        }
        <Button onClick={ onHandleDelete }>삭제</Button>
        {edit ?  
        <Input rows="4" cols="50" value={content} onChange={(e)=>setContent(e.target.value)}></Input>
        :<p>{content}</p>}
        
        </>
    )
}
export default Answer