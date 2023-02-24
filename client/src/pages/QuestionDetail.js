import { useState,useEffect } from 'react';
import Question from './Question';
import AnswerList  from './AnswerList';
import styled from "styled-components";
import { fetchDelete } from '../util/api'

const QuestionDetailWraper = styled.main`
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
        margin-bottom: 4vh;
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


const QuestionDetail = ({login,userInfo,endpoint}) => {

    const [author,setAuthor] = useState('') 

    /*** modal***/
    const [openModal,setOpenModal] = useState(false)
    const [deleteUrl, setDeleteUrl] = useState('')

    /*** Answer delete modal ***/
    const handleDelete = (url) => {
        setOpenModal(true);
        setDeleteUrl(url)
    }
    const handleConfirm = () => {
        fetchDelete(deleteUrl,'/question-detail')
        setOpenModal(false);
    };
    const handleCancel = () => {
        setOpenModal(false);
        setDeleteUrl('')
    };
    /*** scrol top ***/
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    return(
        <>
        <QuestionDetailWraper>
            {openModal && 
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
            <Question 
                login={login} 
                userInfo={userInfo} 
                handleDelete={handleDelete} 
                setAuthor={setAuthor}/>

            <AnswerList 
                login={login} userInfo={userInfo} 
                author={author} handleDelete={handleDelete}/>
            
        </QuestionDetailWraper>
        </>
    )
}
export default QuestionDetail