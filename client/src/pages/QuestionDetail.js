import { useState } from 'react';
import { fetchCreate } from '../util/api';
import Question from './Question';
import AnswerList  from './AnswerList';
import useFetch from "../util/useFetch";
import styled from "styled-components";
import { fetchDelete } from '../util/api'

const QuestionDetailWraper = styled.div`
    padding:15vh 10vh;
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
`
const Modal = styled.div`
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
    h2{
        border-bottom:  0.7px solid #d2d2d2;
        padding-bottom: 2vh;
        margin-bottom: 2vh;
    }
    p{
        margin-bottom: 2vh;
    }
    div{
        width: 100%;
        text-align: right;
        button{
            :first-child{
            font-size: 16px;
            height: 4vh;
            padding: 0 1vh;
            margin-left: 1vh;
            border-radius: 0.3vh;
            background-color: #e3ecf3;
            color: #477199;
            border: 1px solid #477199;
            box-shadow: inset 0px 0px 0px 0px #54a3f7;
            :hover {
                background-color: #b9d2e8;
            }
            }
            :nth-child(2){
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
            }

        }
    }
`
const ModalWrap = styled.div`
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
`
const AnsewerPostWrap = styled.div`
    width: 100%;
    text-align: right;
    button{
            cursor:pointer;
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

const QuestionDetail = ({login,userInfo,endpoint}) => {
    const [data, isPending, error ] = useFetch(process.env.REACT_APP_API_QUESTION+'/'+'1')
    const [content,setContent] = useState('')
    /*** modal***/
    const [openAnswerDel,setOpenAnswerDel] = useState(false)
    const [openQuestionDel,setOpenQuestionDel] = useState(false)
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
        /*** Answer delete modal ***/
        const handleDelete = (url) => {
            setOpenAnswerDel(true);
            setDeleteUrl(url)
        }
        const handleConfirm = () => {
            fetchDelete(deleteUrl,'/question-detail')
            setOpenAnswerDel(false);
        };
        const handleCancel = () => {
            setOpenAnswerDel(false);
            setDeleteUrl('')
        };
    
    return(
        <>
        <QuestionDetailWraper>

            {openAnswerDel && 
            <ModalWrap>
            <Modal>
                <h2>Delete</h2>
                <p>Are you sure you want delete this {deleteUrl.includes('answer') ? 'Answer' :'Question'}?</p>
                <div>
                    <button onClick={handleConfirm}>Delete {deleteUrl.includes('answer') ? 'Answer' :'Question'}</button>
                    <button onClick={handleCancel}>Close</button>
                </div>
            </Modal>
            </ModalWrap>
            }
            {
                console.log(deleteUrl)
            }
            {data && 
                <Question login={login} data={data} userInfo={userInfo}  handleDelete={handleDelete}/>}
            {data &&
                <AnswerList login={login} userInfo={userInfo} author={data.author} handleDelete={handleDelete}/>}
            <label>Your Answer</label>
            {login?
            <>
                <textarea onChange={ (e) => setContent(e.target.value)} value ={content} rows="4" cols="50"  ></textarea>
                <AnsewerPostWrap>
                    <button onClick={ onHandleClick }>Post your Answer</button>
                </AnsewerPostWrap>
            </>
                :<div>Please log in to write a reply</div>
            }
        </QuestionDetailWraper>
        </>
    )
}
export default QuestionDetail