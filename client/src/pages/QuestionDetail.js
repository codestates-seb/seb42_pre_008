import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { fetchCreate } from '../util/api'
import { fetchDelete } from '../util/api'
import { fetchPatch } from '../util/api'


const QuestionDetail = () => {
    const counter = useSelector(state => state)
    const [data,setdata] = useState('')
    const [id,setid] = useState('')
    const [update,setUpdate] = useState('')

    //data update test완료
    const onHandleClick = () => {
        const random = Math.round(Math.random()*100)+0
        fetchCreate( {
            "id":random,
            "todo":data,
            "check": true
          } ,'/question-detail', )
    }

    const onHandleDelete = () => {
      fetchDelete(id,'/question-detail')
    }

    const onHandleUpdate = () => {
        fetchPatch(id,
            {
                "id":id,
                "todo":update,
                "check": true
            }
            ,'/question-detail')
    }
    
    return(
        <div >
            <input onChange={ (e) => setdata(e.target.value)} value ={data} ></input>
            <button onClick={ onHandleClick }>제출</button>
            <input onChange={ (e) => setid(e.target.value)} value ={id} ></input>
            <button onClick={ onHandleDelete }>제출</button>
            <input onChange={ (e) => setUpdate(e.target.value)} value ={update} ></input>
            <button onClick={ onHandleUpdate }>제출</button>
            {counter && console.log(counter)}
        </div>
    )
}
export default QuestionDetail