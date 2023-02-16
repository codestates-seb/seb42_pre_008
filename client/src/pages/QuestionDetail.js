import useFetch from '../util/useFetch';

const QuestionDetail = () => {
    const [data, isPending, error] = useFetch(`${process.env.REACT_APP_API_URL}`);
    return(
        <div >
         {data && console.log(data)}
            {console.log(isPending)}
            {console.log(error)}
        </div>
    )
}
export default QuestionDetail