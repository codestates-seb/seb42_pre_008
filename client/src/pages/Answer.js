import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import Avatar, { genConfig } from 'react-nice-avatar'
import styled from "styled-components";
import { fetchPatch } from '../util/api'
import { useState } from 'react'

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
            height: 2rem;
            width: 100%;
            line-height: 2rem;
            display:flex;
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
            p{
                width: 100%;
            }
            :last-child{
                display: flex;
                justify-content: flex-end;
                padding-top: 1vh;
                padding-bottom: 2vh;
                button{
                    :disabled{
                        display: none;
                    }
                }
            }
        }
        textarea{
            display: block;
            width: 100%;
            height:50%;
            font-size: 1rem;
            border: none;
        }
    }
`

const Answer = ({el,adopt,login,userInfo,author,handleDelete}) => {
    /*** vote ***/
    const [upClicked, setUpClicked] = useState(false);
    const [downClicked, setDownClicked] = useState(false);
    const [checked,setChecked] = useState('still');
    const [votes, setVote] = useState(el.votes)
    /*** edit ***/
    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState(el.content)
    

    /*** fetch link ***/
    const url = process.env.REACT_APP_API_ANSWER + '/' + el.id

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
            }
            ,'/question-detail')
    }
    const onHandleEdit = () => {
        const date = new Date();
        const today = date.toLocaleDateString().slice(0,-1);

        setEdit(!edit)
        fetchPatch(url,{"content":content , "update": today},)
    }



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
                {edit ?  
                <textarea rows="4" cols="300" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                :<p>{content}</p>}

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
                    :<button onClick={ onHandleAdopt } disabled={ userInfo.name === author ? adopt :true }>adopt</button>}
                </div>
            </section>
        </AnswerWrap>
        
    )
}
export default Answer