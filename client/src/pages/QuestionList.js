import styled from "styled-components";
import Ads from "../component/list/Ads";
import Footer from "../component/navNfooter/Footer";
import NavOnLogout from "../component/navNfooter/NavOnLogout";
import Sidebar from "../component/list/Sidebar";
import useFetch from "../util/useFetch";
import { Link } from "react-router-dom";
// import NavOnLogin from "../component/NavOnLogin";

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
export const QuestionTitle = styled.p`
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.5vh;
    color: #0074cc;
    width: 700px;
    font-size: 1.1rem;
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

const QuestionList = () => {
    // eslint-disable-next-line
    const [questions, isPending, error] = useFetch(
        "http://localhost:3001/questions"
    );

    return (
        <>
            {isPending || (
                <>
                    <QuestionListWrapper>
                        <QuestionListContainer>
                            <Sidebar />
                            <QuestionContainer>
                                <QuestionListHeader>
                                    <InsideHeaderUpper>
                                        <Title>All Questions</Title>
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
                                {questions.map((question) => (
                                    <QuestionUnit key={question.id}>
                                    <Link to={`/question-detail/${question.id}`} className='link'>
                                        <Left>
                                            <Shorter>
                                                {question.votes} votes
                                            </Shorter>
                                            <Shorter>
                                                <span
                                                    className={
                                                        question.answers > 0
                                                            ? "answered"
                                                            : ""
                                                    }
                                                >
                                                    {question.answers} answer
                                                    {question.answers !== 1
                                                        ? "s"
                                                        : ""}
                                                </span>
                                            </Shorter>
                                            <Shorter>
                                                {question.view} views
                                            </Shorter>
                                        </Left>
                                        <Right>
                                            <QuestionTitle>
                                                {question.title}
                                            </QuestionTitle>
                                            <QuestionContent>
                                                {question.problem}
                                            </QuestionContent>
                                            <QuestionInfo>
                                                <Tags>
                                                    {(question.tagList).map(
                                                        (t, i) => (
                                                            <Tag key={i}>
                                                                {t}
                                                            </Tag>
                                                        )
                                                    )}
                                                </Tags>
                                                <Author>
                                                    <Img src="icon.png" />
                                                    <span>
                                                        {question.author}
                                                    </span>
                                                    asked 1 min ago
                                                </Author>
                                            </QuestionInfo>
                                        </Right>
                                        </Link>
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
