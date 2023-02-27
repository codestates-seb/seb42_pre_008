import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import Avatar, { genConfig } from 'react-nice-avatar'
import styled from "styled-components";
import { fetchPatch } from '../util/api'
import React, { useEffect, useState } from 'react'
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const config = genConfig()
const AnswerWrap = styled.article`
    margin-bottom: 5vh;
    border-bottom: 0.7px solid #d2d2d2;
    display: flex;
    position: relative;
    aside{
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 0vh 2vh;
        span{
            margin: 2vh 0;
        }
        button{
            cursor:pointer;
            border: none;
            background: none;
            font-size: 1.3rem;
        }
    }
    section{
        flex-basis: 100%;
        span{
            display: inline-block;
            margin-right: 1vw;
            margin-bottom: 1vh;
            :nth-child(2){
                margin-left: 1vw;
            }
            :nth-child(3){
                color: #6a737c;
            }
        }
        div{
            button{
                display: inline-block;
                margin-right: 1vw;
                cursor:pointer;
                border: none;
                margin-right: 1vw;
                line-height: 2rem;
                color: #0995ff;
                background: none;
                :hover {
                    color: #3172c6;
                }
                :disabled{
                    display: none;
                }
            }
            :nth-child(3){
                text-align: end;
            }
        }
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

const Answer = ({el,adopt,login,userInfo,questionAuthor,handleDelete,id}) => {
    /*** vote ***/
    const [upClicked, setUpClicked] = useState(false);
    const [downClicked, setDownClicked] = useState(false);
    const [checked,setChecked] = useState('still');
    const [votes, setVote] = useState(el.votes)
    /*** edit ***/
    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState(el.content);
    const [blank, setBlank] = useState(false)
    
    /***Toast editor 적용***/
    const contentRef = React.createRef();
    const handleContent = (e) =>{
    setContent(contentRef.current.getInstance().getMarkdown());
    }
    /***blur event***/
    const onHandleBlur = () =>{
        if(content === '') {
            window.focus = contentRef
            setBlank(true)
        }
    }

    /*** fetch link ***/
    const url = process.env.REACT_APP_API_ANSWER + '/' + el.id
    /*** today ***/
    const date = new Date();
    const today = date.toLocaleDateString().slice(0,-1);

    /*** vote ***/
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
    /*** edit ***/
    const onHandleAdopt = () => {
        fetchPatch(url,
            {
                "adopt":!el.adopt
            },`/question-detail/${id}`)
    }
    const onHandleEdit = () => {

        setEdit(!edit)
        fetchPatch(url,
            {"content":content , "update": today
           },`/question-detail/${id}`)
    }

    useEffect(() => {
        function handleBeforeUnload() {
            if(checked === 'up') fetchPatch(url,{"votes": el.votes + 1},)
            if(checked === 'down') fetchPatch(url,{"votes": el.votes - 1 },)
        }
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, [checked]);


    return (
        <AnswerWrap>
        <aside>
            {login? <button onClick={ onHandleVoteUp } disabled={upClicked} ><AiFillCaretUp/></button>
                    :<button onClick={ onHandleVoteUp } disabled={true} ><AiFillCaretUp/></button>
                    }       
                    <span>{votes}</span>
                    {login? <button onClick={ onHandleVoteDown } disabled={downClicked} ><AiFillCaretDown/></button>
                    :<button onClick={ onHandleVoteDown } disabled={true} ><AiFillCaretDown/></button>
                    }    
            </aside>
            <section>
                <div>
                    <Avatar style={{ width: '1.5rem', height: '1.5rem', display: 'inline-block' }} {...config} />
                    <span>{el.author}</span>
                    <span>{el.update}</span>
                </div>
                <div>
                    {edit ?  
                    <Editor
                        initialValue={content} // -> 수정버튼 클릭시 나타나는 (작성중상태의)텍스트 설정하는 속성
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
                        hideModeSwitch={true}
                        height="200px"
                    />
                   :<Viewer
                    initialValue={content}/>} 
                </div>
                <div>
                    {edit?
                    <button onClick={onHandleEdit}>submit</button>
                    :<button onClick={() => setEdit(!edit)} disabled={ userInfo.name !== el.author }>edit</button>
                    }
                    <button 
                    onClick={ (e) => handleDelete(e.target.value) } 
                    disabled={ userInfo.name !== el.author } 
                    value = {url}>delete</button>
                    {el.adopt ? 
                    <button onClick={ onHandleAdopt } >cancle adopt</button>
                    :<button onClick={ onHandleAdopt } disabled={ userInfo.name === questionAuthor && el.author !== questionAuthor ? adopt :true }>adopt</button>}
                </div>
            </section>
        </AnswerWrap>
        
    )
}
export default Answer