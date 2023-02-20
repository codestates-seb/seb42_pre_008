import styled from "styled-components"
import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";

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

    return (
        <QuestionReadWrap>
            <QuestionHeadWrap>
                <div>
                    <Title>제목</Title>
                    <span>1개월전 작성</span> <span>조회수</span> 
                    <Button><AiFillCaretUp/></Button>
                    <span>좋아요개수</span>
                    <Button><AiFillCaretDown/></Button>
                    <Button>수정</Button>
                    <Button>삭제</Button>
                    <Button>질문하기</Button>
                </div>
            </QuestionHeadWrap>
            <QuestionBodyWrap>
                <div>질문내용</div>
                <div>taglist</div>
            </QuestionBodyWrap>
        </QuestionReadWrap>
    )
}

export default QuestionRead