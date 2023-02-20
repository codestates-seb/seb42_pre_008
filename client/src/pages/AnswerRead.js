import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import styled from "styled-components";
import { useState } from 'react'
import { fetchPatch } from '../util/api'
import Avatar, { genConfig } from 'react-nice-avatar'
import useFetch from '../util/useFetch';
import Loading from '../component/Loading' 

const config = genConfig() 
const Button = styled.button`

`
const AnswerRead = () => {
    const [answers, isPending, error] = useFetch(process.env.REACT_APP_API_URL);

 return(
    <>
        <h3>{answers && answers.length}개의 답변</h3>
        <ul>
            {isPending && <Loading/>}
            {error && console.log(error)}
            {answers && answers.map((el) => {
                return(
                    <li key={el.id}>
                    <Avatar style={{ width: '1.5rem', height: '1.5rem' }} {...config} />
                        <span>{el.name}</span>
                        <span>{el.update}</span>
                        <Button><AiFillCaretUp/></Button>
                            <span>{el.like}</span>
                        <Button><AiFillCaretDown/></Button>
                        <Button>채택</Button>
                        <Button>수정</Button>
                        <Button>삭제</Button>
                        <p>{el.body}</p>
                    </li>
                )
            })}
        </ul>
    </>
 )
}
export default AnswerRead