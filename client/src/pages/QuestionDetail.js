// import useFetch from '../util/useFetch';
import { useSelector } from 'react-redux'



const QuestionDetail = () => {
    // const [data, isPending, error] = useFetch(`${process.env.REACT_APP_API_URL}`);
    const counter = useSelector(state => state)
    
    return(
        <div >
            {counter && console.log(counter)}
        </div>
    )
}
export default QuestionDetail