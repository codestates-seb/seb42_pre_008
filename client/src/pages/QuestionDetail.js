import { useSelector } from 'react-redux'



const QuestionDetail = () => {
    const counter = useSelector(state => state)
    
    return(
        <div >
            {counter && console.log(counter)}
        </div>
    )
}
export default QuestionDetail