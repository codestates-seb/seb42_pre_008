import styled from "styled-components";
import { Link } from "react-router-dom";
import Ads from "../component/questionList/Ads";
import Sidebar from "../component/questionList/Sidebar";
import useFetch from "../util/useFetch";
import Loading from "../component/Loading";

const QuestionList = ({ login }) => {
    //! GET DATA
    // eslint-disable-next-line
    const [questions, isPending, error] = useFetch(
        "http://localhost:3003/questions"
    );
    // const [questions, isPending, error] = useFetch(
    //     "http://localhost:3001/questions"
    // );

    //! 기능 구현

    //! 페이지 본문
    return (
        <>
            {isPending ? (
                <Loading />
            ) : (
                <>
                    <QuestionListWrapper>
                        <QuestionListContainer>
                            <Sidebar />
                            <QuestionContainer>
                                <QuestionListHeader>
                                    <InsideHeaderUpper>
                                        <Title>All Questions</Title>
                                        {/*!!!!!! 질문하기 버튼 자리 : 로그인 상태에 따라 QuestionForm, 또는 Login 화면으로 안내하는 기능구현 필요 !!!!!!*/}
                                        <Link to="/question-form">
                                            <AskQuestionButton>
                                                Ask Question
                                            </AskQuestionButton>
                                        </Link>
                                    </InsideHeaderUpper>
                                    <InsideHeaderLower>
                                        <QuestionListCount>
                                            {questions.length} questions
                                        </QuestionListCount>
                                        {/*!!!!!! filter 메뉴박스가 들어갈 자리 : 기능구현 필요 !!!!!!*/}
                                        <FilterOptions>
                                            <FilterButton value={"newest"}>
                                                Newest
                                            </FilterButton>
                                            <FilterButton value={"unanswered"}>
                                                Unanswered
                                            </FilterButton>
                                            <FilterButton value={"answered"}>
                                                Answered
                                            </FilterButton>
                                        </FilterOptions>
                                    </InsideHeaderLower>
                                </QuestionListHeader>
                                {/*!!!!!! 데이터 맵핑해서 질문 리스트 꾸리는 자리 : 질문제목 클릭시 QuestionDetail 화면으로 안내 !!!!!!*/}
                                {questions.map((question) => (
                                    <QuestionUnit key={question.id}>
                                        <Left>
                                            <Shorter>
                                                {question.votes} votes
                                            </Shorter>
                                            <Shorter>
                                                <span
                                                    className={
                                                        question.answers
                                                            .length > 0
                                                            ? "answered"
                                                            : ""
                                                    }
                                                >
                                                    {question.answers.length}{" "}
                                                    answer
                                                    {question.answers.length !==
                                                    1
                                                        ? "s"
                                                        : ""}
                                                </span>
                                            </Shorter>
                                            <Shorter>
                                                {question.view} views
                                            </Shorter>
                                        </Left>
                                        <Right>
                                            <QuestionTitle
                                                href={`/question-detail/${question.id}`}
                                            >
                                                {question.title}
                                            </QuestionTitle>
                                            <QuestionContent>
                                                {question.problem}
                                            </QuestionContent>
                                            <QuestionInfo>
                                                <Tags>
                                                    {question.tagList.map(
                                                        (t, i) => (
                                                            <Tag key={i}>
                                                                {t}
                                                            </Tag>
                                                        )
                                                    )}
                                                </Tags>
                                                <Author>
                                                    <Img src="image/icon.png" />
                                                    <span>
                                                        {question.author}
                                                    </span>
                                                    {/*!!!!!! 얼마전 입력한 질문인지 보여주는 자리 : 현재시간 - 질문시간 차 구하는 로직 구현 필요 !!!!!!*/}
                                                    asked 1 min ago
                                                </Author>
                                            </QuestionInfo>
                                        </Right>
                                    </QuestionUnit>
                                ))}
                            </QuestionContainer>
                            <Ads />
                        </QuestionListContainer>
                    </QuestionListWrapper>
                </>
            )}
        </>
    );
};
export default QuestionList;

//! styled components
export const QuestionListWrapper = styled.main`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`;
export const QuestionListContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 1400px;
`;
export const QuestionContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    width: 900px;
    border-left: 0.2vh solid #e4e6e7;
`;
export const QuestionListHeader = styled.header`
    display: flex;
    flex-direction: column;
    width: 900px;
    border-bottom: 0.2vh solid #e4e6e7;
`;
export const InsideHeaderUpper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1vh 2vh 0vh 3vh;
`;
export const InsideHeaderLower = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 3vh 2vh 2vh 3vh;
`;
export const Title = styled.span`
    font-size: 2rem;
    margin-top: 2vh;
`;
export const AskQuestionButton = styled.button`
    font-size: 13px;
    margin-top: 2vh;
    padding: 1vh;
    border-radius: 0.3vh;
    background-color: #0995ff;
    color: white;
    border: 1px solid #477199;
    :hover {
        background-color: #3172c6;
    }
`;
export const QuestionListCount = styled.span`
    font-size: 1.2rem;
`;
export const FilterOptions = styled.span`
    border-radius: 0.3vh;
    border: 0.5px solid #838c95;
`;
export const FilterButton = styled.button`
    font-size: 0.8rem;
    height: 4vh;
    padding: 0 1vh;
    background-color: white;
    color: #6a737c;
    border: 0.5px solid #838c95;
    :hover {
        background-color: #e3e6e8;
        color: #3b4044;
    }
`;
export const QuestionUnit = styled.section`
    display: flex;
    flex-direction: row;
    align-items: space-evenly;
    justify-content: space-evenly;
    width: 900px;
    padding: 1vh 0 2vh 0;
    border-bottom: 0.7px solid #d2d2d2;
`;
export const QuestionTitle = styled.a`
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.5vh;
    color: #0074cc;
    width: 700px;
    font-size: 1.1rem;
    text-decoration: none;
    :hover {
        color: #0a95ff;
    }
`;
export const QuestionContent = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 700px;
    font-size: 0.9rem;
`;
export const Left = styled.span`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 150px;
`;
export const Right = styled.span`
    /* width: 45vw; */
    width: 700px;
`;
export const QuestionInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 700px;
    padding-top: 1vh;
    font-size: 0.9rem;
`;
export const Tags = styled.div`
    display: flex;
    flex-direction: row;
    width: 30vw;
`;
export const Tag = styled.span`
    display: flex;
    align-items: center;
    height: 2.5vh;
    padding: 0.2vh 0.7vh;
    border-radius: 0.2vh;
    margin-right: 0.5vh;
    background-color: #e1ecf4;
    color: #39739d;
    :hover {
        background-color: #b9d2e8;
        color: #375774;
    }
`;
export const Shorter = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    width: 10vw;
    padding: 0.5vh 0;
    font-size: 0.9rem;
    color: gray;
    > span {
        &.answered {
            border: 1px solid #2f6f44;
            color: #2f6f44;
            padding: 0.2vh 0.5vh;
            border-radius: 0.3vh;
        }
    }
`;
export const Author = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    color: #6a737c;
    font-size: 0.8rem;
    > span {
        color: #1b7bcf;
        margin-right: 0.6vh;
    }
    width: 400px;
`;
export const Img = styled.img`
    height: 2vh;
    border-radius: 50%;
    border: 2px solid orange;
    margin: 0 0.5vh 0.6vh 0;
`;
