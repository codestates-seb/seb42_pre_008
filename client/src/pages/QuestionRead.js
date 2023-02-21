import styled from "styled-components"
import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import useFetch from "../util/useFetch";

const QuestionHeadWrap = styled.div`

`
const Title = styled.div`

`
const QuestionBodyWrap = styled.div`

`
const QuestionReadWrap = styled.div`

`
const Button = styled.button`

`


const QuestionRead = () => {
    const [data, isPending, error ] = useFetch('http://localhost:3002/questions')
    return (
        <>
        { data && 
            <QuestionReadWrap>
            <QuestionHeadWrap>
                <div>
                    <Title>{data[0].title}</Title>
                    <span>{data[0].createdAt}</span> <span>{data[0].view}</span> 
                    <Button><AiFillCaretUp/></Button>
                    <span>{data[0].votes}</span>
                    <Button><AiFillCaretDown/></Button>
                    <Button>수정</Button>
                    <Button>삭제</Button>
                    <Button>질문하기</Button>
                </div>
            </QuestionHeadWrap>
            <QuestionBodyWrap>
                <div>{data[0].content}</div>
                <div>{data[0].tag.join("")}</div>
            </QuestionBodyWrap>
        </QuestionReadWrap>}
        </>
    )
}

export default QuestionRead