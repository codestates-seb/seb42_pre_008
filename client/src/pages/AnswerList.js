import { useState } from 'react'
import useFetch from '../util/useFetch';
import Loading from '../component/Loading' 
import Answer from "./Answer";

 

const AnswerList = () => {
    const [answers, isPending, error] = useFetch(process.env.REACT_APP_API_ANSWER);
    const [adopt , setAdopt ] = useState(false)
 return(
    <>
        <h3>{answers && answers.length}개의 답변</h3>
        <ul>
            {isPending && <Loading/>}
            {error && console.log(error)}
            {answers && console.log(answers)}
            {answers && answers.filter((el) => el.adopt === true ).map((el) => {
                return(
                    <li key={el.id}>
                        <Answer el = {el} adopt = {setAdopt}/>
                    </li>
                )
            })}
            {answers && answers.filter((el) => el.adopt === false ).map((el) => {
                return(
                    <li key={el.id}>
                        <Answer el = {el}/>
                    </li>
                )
            })}
        </ul>
    </>
 )
}
export default AnswerList