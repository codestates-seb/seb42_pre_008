import { useState } from 'react'
import { fetchCreate } from '../util/api'
import QuestionRead from './QuestionRead'
import AnswerRead  from './AnswerRead'


const QuestionDetail = ({login,userInfo,endpoint}) => {
    const [body,setbody] = useState('')

    //data update test완료
    const onHandleClick = () => {
        const random = Math.round(Math.random()*100)+0
        fetchCreate( {
            "id": random,
            "name": "임경아",
            "update": "2023.02.14",
            "like": 0,
            "body": body,
            "check": false
          } ,'/question-detail', )
    }
    
    return(
        <div>
            <QuestionRead login={login}/>
            <AnswerRead login={login}/>
            <input onChange={ (e) => setbody(e.target.value)} value ={body} ></input>
            <button onClick={ onHandleClick }>제출</button>
        </div>
    )
}
export default QuestionDetail