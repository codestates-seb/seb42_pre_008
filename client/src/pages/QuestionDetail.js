import useFetch from '../util/useFetch';

const QuestionDetail = () => {
    const [todos, isPending, error] = useFetch(`${process.env.REACT_APP_API_URL}/status`);
    return(
        <div >
        {/* { isPending && <Loading />}
        { todos && 
        <p>{todos}</p>} */}
        안녕
        </div>
    )
}
export default QuestionDetail