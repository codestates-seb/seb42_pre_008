import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import Avatar, { genConfig } from 'react-nice-avatar'
import styled from "styled-components";
import { fetchDelete } from '../util/api'
import { fetchPatch } from '../util/api'

const config = genConfig()
const Button = styled.button`

`

const Answer = ({el}) => {

    const onHandleLikeUp = () => {
        fetchPatch(el.id,
            {
                "like":el.like + 1
            }
            ,'/question-detail')
    }
    const onHandleLikeDown = () => {
        fetchPatch(el.id,
            {
                "like":el.like - 1
            }
            ,'/question-detail')
    }
    const onHandleDelete = () => {
        fetchDelete(el.id,'/question-detail')
    }
    const onHandleCheck = () => {
        fetchPatch(el.id,
            {
                "check":!el.check
            }
            ,'/question-detail')
    }

    return (
        <>
        <Avatar style={{ width: '1.5rem', height: '1.5rem' }} {...config} />
        <span>{el.name}</span>
        <span>{el.update}</span>
        <Button onClick={ onHandleLikeUp } ><AiFillCaretUp/></Button>
            <span>{el.like}</span>
        <Button onClick={ onHandleLikeDown }><AiFillCaretDown/></Button>
        { el.check ? 
        <Button onClick={ onHandleCheck }>채택취소</Button>
        :<Button onClick={ onHandleCheck }>채택하기</Button>}
        <Button>수정</Button>
        <Button onClick={ onHandleDelete }>삭제</Button>
        <p>{el.body}</p>
        </>
    )
}
export default Answer