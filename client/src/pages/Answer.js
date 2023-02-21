import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import Avatar, { genConfig } from 'react-nice-avatar'
import styled from "styled-components";
import { fetchDelete } from '../util/api'
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
            }
            p{
                width: 100%;
            }
            :last-child{
                display: flex;
                justify-content: flex-end;
                padding-top: 1vh;
                padding-bottom: 2vh;
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
const Styledbutton = styled.button`
    color: #fff;
    background-color: #0995ff;
`


const Answer = ({el}) => {
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
        <AnswerWrap>
        <aside>
            <button onClick={ onHandleVoteUp } disabled={upClicked}><AiFillCaretUp/></button>
                <span>{votes}</span>
            <button onClick={ onHandleVoteDown } disabled={downClicked}><AiFillCaretDown/></button>
        </aside>
        <section>
            <div>
            <Avatar style={{ width: '1.5rem', height: '1.5rem', display: 'inline-block' }} {...config} />
            <span>{el.name}</span>
            <span>{el.update}</span>
            </div>
            {edit ?  
            <textarea rows="4" cols="300" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
            :<p>{content}</p>}

            <div>
                {edit?
                <Styledbutton onClick={onHandleEdit}>submit</Styledbutton>
                :<button onClick={() => setEdit(!edit)}>edit</button>
                }
                <button onClick={ onHandleDelete }>delete</button>
                {el.adopt ? 
                <button onClick={ onHandleAdopt }>cancle adopt</button>
                :<button onClick={ onHandleAdopt }>adopt</button>}
                
            </div>
        </section>
        </AnswerWrap>
        
    )
}
export default Answer