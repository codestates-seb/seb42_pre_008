import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Ads from "../component/questionList/Ads";
import Sidebar from "../component/questionList/Sidebar";
import useFetch from "../util/useFetch";
import Loading from "../component/Loading";
import Pagination from "../component/questionList/pagignation";

const QuestionList = ({ login }) => {
    //! GET DATA
    // eslint-disable-next-line
    //* useFetch 변형 -> Question and Answer together
    // const [questions, isPending, error, setQuestions] = useFetch("http://localhost:3001/questions");
    //* useFetch -> Question and Answer together
    const [questions, isPending, error, setQuestions] = useFetch(
        "http://localhost:3004/questions"
    );
    // const [filtered, setFiltered] = useState(null);
    // .then(()=>setFiltered(questions))
    //* useFetch -> Question only
    // const [questions, isPending, error] = useFetch(
    //     "http://localhost:3001/questions"
    // );

    //! 기능 구현
    //* pagination
    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    //* 질문 게시 이후 시간 구하기
    const detailDate = (a) => {
        const milliSeconds = new Date() - new Date(a);
        const seconds = milliSeconds / 1000;
        if (seconds < 60) return `just now`;
        const minutes = seconds / 60;
        if (minutes < 60)
            return `${Math.floor(minutes)} min${
                Math.floor(minutes) === 1 ? "" : "s"
            } ago`;
        const hours = minutes / 60;
        if (hours < 24)
            return `${Math.floor(hours)} hour${
                Math.floor(hours) === 1 ? "" : "s"
            } ago`;
        const days = hours / 24;
        if (days < 7)
            return `${Math.floor(days)} day${
                Math.floor(days) === 1 ? "" : "s"
            } ago`;
        const weeks = days / 7;
        if (weeks < 5)
            return `${Math.floor(weeks)} week${
                Math.floor(weeks) === 1 ? "" : "s"
            } ago`;
        const months = days / 30;
        if (months < 12)
            return `${Math.floor(months)} month${
                Math.floor(months) === 1 ? "" : "s"
            } ago`;
        const years = days / 365;
        return `${Math.floor(years)} year${
            Math.floor(years) === 1 ? "" : "s"
        } ago`;
    };
    //* filter 버튼 눌린 상태에 따른 Css 스타일링
    const [filterOption, setFilterOption] = useState("");
    const Newest = () => setFilterOption("newest");
    const Unanswered = () => setFilterOption("unAnswered");
    const Answered = () => setFilterOption("answered");

    //! 페이지 본문
    return (
        <>
            {isPending ? (
                <Loading />
            ) : (
                <>
                    <QuestionListWrapper>
                        <QuestionListContainer>
                            <SidebarContainer>
                                <Sidebar />
                            </SidebarContainer>
                            <QuestionContainer>
                                <QuestionListHeader>
                                    <InsideHeaderUpper>
                                        <Title>All Questions</Title>
                                        {/*!!!!!! 질문하기 버튼 자리 : 로그인 상태에 따라 QuestionForm, 또는 Login 화면으로 안내하는 기능구현 필요 !!!!!!*/}
                                        {login ? (
                                            <Link to="/question-form/0">
                                                <AskQuestionButton>
                                                    Ask Question
                                                </AskQuestionButton>
                                            </Link>
                                        ) : (
                                            <Link to="/login">
                                                <AskQuestionButton>
                                                    Ask Question
                                                </AskQuestionButton>
                                            </Link>
                                        )}
                                    </InsideHeaderUpper>
                                    <InsideHeaderLower>
                                        <QuestionListCount>
                                            {questions.length} questions
                                        </QuestionListCount>
                                        {/*!!!!!! filter 메뉴박스가 들어갈 자리 : 기능구현 필요 !!!!!!*/}
                                        <FilterOptions>
                                            <FilterButton
                                                onClick={Newest}
                                                className={
                                                    filterOption === "newest"
                                                        ? "grey"
                                                        : ""
                                                }
                                            >
                                                Newest
                                            </FilterButton>
                                            <FilterButton
                                                onClick={Unanswered}
                                                className={
                                                    filterOption ===
                                                    "unAnswered"
                                                        ? "grey"
                                                        : ""
                                                }
                                            >
                                                Unanswered
                                            </FilterButton>
                                            <FilterButton
                                                onClick={Answered}
                                                className={
                                                    filterOption === "answered"
                                                        ? "grey"
                                                        : ""
                                                }
                                            >
                                                Answered
                                            </FilterButton>
                                        </FilterOptions>
                                    </InsideHeaderLower>
                                </QuestionListHeader>
                                {/*!!!!!! 데이터 맵핑해서 질문 리스트 꾸리는 자리 : 질문제목 클릭시 QuestionDetail 화면으로 안내 !!!!!!*/}
                                {questions
                                    .slice(offset, offset + limit)
                                    .map((question) => (
                                        <QuestionUnit key={question.id}>
                                            <Left>
                                                <Shorter>
                                                    {question.votes} votes
                                                </Shorter>
                                                <Shorter>
                                                    <span
                                                        className={`${
                                                            question.answers
                                                                .length > 0
                                                                ? "answered"
                                                                : ""
                                                        } ${
                                                            question.adoptChosen
                                                                ? "adopted"
                                                                : ""
                                                        }`}
                                                    >
                                                        {question.adoptChosen ? (
                                                            <strong>⎷ </strong>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {
                                                            question.answers
                                                                .length
                                                        }{" "}
                                                        answer
                                                        {question.answers
                                                            .length !== 1
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
                                                        {/*!!!!!! 얼마전 입력한 질문인지 보여주는 자리 : 현재시간 - 질문시간 차 !!!!!!*/}
                                                        asked{" "}
                                                        {detailDate(
                                                            new Date(
                                                                question.createdAt
                                                            )
                                                        )}
                                                    </Author>
                                                </QuestionInfo>
                                            </Right>
                                        </QuestionUnit>
                                    ))}
                                <Pagination
                                    limit={limit}
                                    setPage={setPage}
                                    total={questions.length}
                                    page={page}
                                    setLimit={setLimit}
                                />
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
    /* margin-left: 182px; */
`;
export const QuestionContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    width: 800px;
    border-left: 0.2vh solid #e4e6e7;
`;
export const QuestionListHeader = styled.header`
    display: flex;
    flex-direction: column;
    width: 800px;
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
        background-color: #f8f9f9;
        color: #3b4044;
    }
    &.grey {
        background-color: #e3e6e8;
        color: #3b4044;
    }
`;
export const QuestionUnit = styled.section`
    display: flex;
    flex-direction: row;
    align-items: space-evenly;
    justify-content: space-evenly;
    width: 800px;
    /* height: 120px; */
    padding: 1vh 0 2vh 0;
    border-bottom: 0.7px solid #d2d2d2;
`;
export const QuestionTitle = styled.a`
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.5vh;
    color: #0074cc;
    width: 650px;
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
    width: 650px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 0.9rem;
`;
export const Left = styled.span`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100px;
`;
export const Right = styled.span`
    width: 650px;
`;
export const QuestionInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 650px;
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
            &.adopted {
                background-color: #2f6f44;
                border: 1px solid #2f6f44;
                color: white;
            }
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
export const SidebarContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 181px;
    min-height: 100%;
`;
