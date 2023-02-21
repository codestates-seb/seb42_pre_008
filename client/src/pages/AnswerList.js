import { useState } from 'react'
import useFetch from '../util/useFetch';
import Loading from '../component/Loading' 
import Answer from "./Answer";

 

const AnswerList = () => {
    const [answers, isPending, error] = useFetch(process.env.REACT_APP_API_URL+'/Answer');
    const [check , setCheck ] = useState(false)
 return(
    <>
        <h3>{answers && answers.length}개의 답변</h3>
        <ul>
            {isPending && <Loading/>}
            {error && console.log(error)}
            {answers && answers.filter((el) => el.check === true ).map((el) => {
                return(
                    <li key={el.id}>
                        <Answer el = {el} check = {setCheck}/>
                    </li>
                )
            })}
            {answers && answers.filter((el) => el.check === false ).map((el) => {
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