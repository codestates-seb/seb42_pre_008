import useFetch from '../util/useFetch';
import Loading from '../component/Loading' 
import Answer from "./Answer";
import styled from "styled-components";

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

const AnswerList = () => {
    const [answers, isPending, error] = useFetch(process.env.REACT_APP_API_ANSWER);
 return(
    <AnswerListWrap>
        <h3>{answers && answers.length} Answers</h3>
        <ul>
            {isPending && <Loading/>}
            {error && console.log(error)}
            {answers && answers.filter((el) => el.adopt === true ).map((el) => {
                return(
                    <li key={el.id}>
                        <Answer el = {el}/>
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
    </AnswerListWrap>
 )
}
export default AnswerList