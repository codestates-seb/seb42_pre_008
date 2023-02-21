import { useState } from 'react'
import { fetchCreate } from '../util/api'
import QuestionRead from './QuestionRead'
import AnswerList  from './AnswerList'


const QuestionDetail = ({login,userInfo,endpoint}) => {
    const [body,setbody] = useState('')

    //data update test완료
    const onHandleClick = () => {
        const random = Math.round(Math.random()*100)+0
        const date = new Date();
        const today = date.toLocaleDateString().slice(0,10);
        fetchCreate( {
            "id": random,
            "name": "임경아",
            "update": today,
            "like": 0,
            "body": body,
            "check": false
          } ,'/question-detail','/Answer' )
    }
    
    return(
        <div>
            <QuestionRead login={login}/>
            <AnswerList login={login}/>
            <input onChange={ (e) => setbody(e.target.value)} value ={body} ></input>
            <button onClick={ onHandleClick }>제출</button>
        </div>
    )
}
export default QuestionDetail