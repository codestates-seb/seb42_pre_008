import { useState } from 'react';
import { fetchCreate } from '../util/api';
import Question from './Question';
import AnswerList  from './AnswerList';
import useFetch from "../util/useFetch";
import styled from "styled-components";
import { fetchDelete } from '../util/api'

const QuestionDetailWraper = styled.div`
    margin:15vh 10vh;
    position: relative;
    label{
        display: block;
        font-size: 1.2rem;
        padding-bottom: 3vh;
    }
    textarea{
        width: 100%;
        resize: none;
        margin-bottom: 1vh;
        font-size: 1rem;
    }
    >button{
            cursor:pointer;
            position: absolute;
            right: 0;
            margin-right: 0;
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
`
const Modal = styled.div`

`


const QuestionDetail = ({login,userInfo,endpoint}) => {
    const [data, isPending, error ] = useFetch(process.env.REACT_APP_API_QUESTION+'/'+'1')
    const [content,setContent] = useState('')
    /*** modal***/
    const [open,setIsOpen] = useState(false)
    const [deleteUrl, setDeleteUrl] = useState('')

    //data update test완료
    const onHandleClick = () => {
        const random = Math.round(Math.random()*100)+0
        const date = new Date();
        const today = date.toLocaleDateString().slice(0,-1);
        fetchCreate( process.env.REACT_APP_API_ANSWER, 
            {
                "id": random,
                "author": userInfo.name,
                "update": today,
                "votes": 0,
                "content": content,
                "adopt": false
              }
           ,'/question-detail' )
    }   
        /*** modal ***/
        const handleDelete = (url) => {
            setIsOpen(true);
            setDeleteUrl(url)
        }
        const handleConfirm = () => {
            fetchDelete(deleteUrl,'/question-detail')
            setIsOpen(false);
        };
        const handleCancel = () => {
            setIsOpen(false);
            setDeleteUrl('')
        };
    
    return(
        <QuestionDetailWraper>
            {open && 
                <Modal>
                    <h2>Delete</h2>
                    <p>Are you sure you want delete this item</p>

                    <button onClick={handleConfirm}>Confirm</button>
                    <button onClick={handleCancel}>Cancel</button>
                </Modal>}
            {data && 
                <Question login={login} data={data} userInfo={userInfo}  handleDelete={handleDelete}/>}
            {data &&
                <AnswerList login={login} userInfo={userInfo} author={data.author} handleDelete={handleDelete}/>}
            <label>Your Answer</label>
            {login?
            <>
                <textarea onChange={ (e) => setContent(e.target.value)} value ={content} rows="4" cols="50"  ></textarea>
                <button onClick={ onHandleClick }>Post your Answer</button>
            </>
                :<div>Please log in to write a reply</div>
            }
            
        </QuestionDetailWraper>
    )
}
export default QuestionDetail