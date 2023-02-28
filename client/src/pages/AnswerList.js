import Loading from '../component/Loading' 
import Answer from "./Answer";
import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { fetchCreate } from '../util/api';
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const AnswerListWrap = styled.div`
    margin-bottom: 5vh;
    
    h3{
        font-size: 1.2rem;
        font-weight: 400;
        margin-bottom: 3vh;
    }
    li{
        list-style: none;
    }
`
const AdoptedLi = styled.li`
    background-color: #F1F2F3;
    padding-top: 4vh;
    >p{
        margin-left: 2vw;
        margin-bottom: 3vw;
    }
`
const AnsewerPostWrap = styled.div`
    text-align: end;
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
    span{
        color:#F23A51;
    }
`
const EditorWrapper = styled.div`
margin-bottom: 1rem;
    &:focus-within {
        outline: 1px solid #58a4de;
        border-bottom: 2px solid #58a4de;
        box-shadow: 0px 0px 10px #ddeaf7;
    }
`;

const AnswerList = ({login,userInfo,questionAuthor, handleDelete,id}) => {
    const [answers, setAnswers] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [adopt,setAdopt] = useState(false)

    //답변입력
    const [content,setContent] = useState('')
    const [blank, setBlank] = useState(false)

    /***Toast editor 적용***/
    const contentRef = React.createRef();
    const handleContent = (e) =>{
    setContent(contentRef.current.getInstance().getMarkdown());
    }

    /*** Answer GET ***/
    useEffect(() => {
        const abortCont = new AbortController();
        //`${process.env.REACT_APP_API_SERVER}/answers?questionId=${id}`
        setTimeout(() => {
        fetch(process.env.REACT_APP_API_ANSWER, { signal: abortCont.signal })
        .then(res => {
            if (!res.ok) { 
                throw Error('could not fetch the data for that resource');
            } 
            return res.json();
        })
        .then(answers => {
            setIsPending(false);
            setAnswers(answers);
            setAdopt(answers.some((el)=>el.adopt))
            setError(null);
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
        })
        }, 1000);

        return (
            () => 
            {abortCont.abort()
            
            })
    }, [])
    
    /*** Answer POST ***/
    const onHandleClick = () => {
        if(content.length === 0) return ;
        const random = Math.round(Math.random()*100)+0
        const date = new Date();
        const today = date.toLocaleDateString().slice(0,-1);
        //`${process.env.REACT_APP_API_SERVER}/answers`
        fetchCreate( process.env.REACT_APP_API_ANSWER, 
            {
                "id": random,
                "author": userInfo.name,
                "update": today,
                "votes": 0,
                "content": content,
                "adopt": false
              }
           ,`/question-detail/${id}` )
    }   
    const onHandleBlur = () =>{
        if(content === '') {
            window.focus = contentRef
            setBlank(true)
        }
    }
    
    
 return(
    <>
    {content&&console.log(content)}
    <AnswerListWrap>
        <h3>{answers && answers.length} Answers</h3>
        <ul>
            {isPending && <Loading/>}
            {error && console.log(error)}
            {answers && answers.filter((el) => el.adopt === true ).map((el) => {
                return(
                    <AdoptedLi key={el.id}>
                        <p>Adopted Answer</p>
                        <Answer el = {el} login={login} userInfo={userInfo} questionAuthor={questionAuthor} handleDelete={handleDelete} id={id}/>
                    </AdoptedLi>
                )
            })}
            {answers && answers.filter((el) => el.adopt === false ).map((el) => {
                return(
                    <li key={el.id}>
                        <Answer el = {el}  adopt={adopt} login={login} userInfo={userInfo} questionAuthor={questionAuthor}  handleDelete={handleDelete} id={id}/>
                    </li>
                )
            })}
        </ul>
    </AnswerListWrap>
    {login?
        <>
        <label>Your Answer</label>
            <EditorWrapper>
            <Editor
                initialValue={content} // -> 수정버튼 클릭시 나타나는 (작성중상태의)텍스트 설정하는 속성
                placeholder={
                    "Click to enter details of your answer."
                }
                previewStyle="vertical"
                height="300px"
                initialEditType="wysiwyg"
                toolbarItems={[
                    ["heading", "bold", "italic", "strike"],
                    ["hr", "quote"],
                    ["ul", "ol", "task", "indent", "outdent"],
                    ["table", "image", "link"],
                    ["code", "codeblock"],
                ]}
                ref={contentRef}
                onChange={handleContent}
                onBlur={onHandleBlur}
                autofocus={true}
                hideModeSwitch={true}
            ></Editor>
            </EditorWrapper>


            <AnsewerPostWrap>
                {blank && <span>Please write the answer in this field</span>}
                <button onClick={ onHandleClick }>Post your Answer</button>
            </AnsewerPostWrap>
            
        </>
            :<div>Please log in to write a reply</div>
        }
    </>
 )
}
export default AnswerList