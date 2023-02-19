import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import styled from "styled-components";
import { useState } from 'react'
import { fetchPatch } from '../util/api'

const Button = styled.button`

`
const AnswerRead = () => {
    const [update,setUpdate] = useState('')
    // const onHandleUpdate = () => {
    //     fetchPatch(id,
    //         {
    //             "id":id,
    //             "todo":update,
    //             "check": true
    //         }
    //         ,'/question-detail')
    // }
 return(
    <>
        <h3>3개의 답변</h3>
        <ul>
            <li>
                <img src=""/>
                <span>작성자명</span>
                <Button><AiFillCaretUp/></Button>
                    <span>좋아요개수</span>
                <Button><AiFillCaretDown/></Button>
                <Button >채택</Button>
                <Button>수정</Button>
                <Button>삭제</Button>
                <p>답변내용</p>
            </li>
        </ul>
    </>
 )
}
export default AnswerRead