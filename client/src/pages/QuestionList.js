// import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../component/Footer";
import NavOnLogout from "../component/NavOnLogout";
import useFetch from "../util/useFetch";
// import NavOnLogin from "../component/NavOnLogin";

export const QuestionListWrapper = styled.main`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    height: 120vh;
    margin-top: 5.7vh;
`;
export const QuestionContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 100vh;
    border-left: 0.2vh solid #e4e6e7;
`;
export const QuestionListHeader = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 15vh;
    width: 100vh;
    border-bottom: 0.2vh solid #e4e6e7;
`;
export const InsideHeaderUpper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2vh 2vh 0vh 3vh;
`;
export const InsideHeaderLower = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2vh 2vh 2vh 3vh;
`;
export const Title = styled.span`
    font-size: 2rem;
    margin-top: 2vh;
`;
export const AskQuestionButton = styled.button`
    font-size: 1rem;
    margin-top: 2vh;
    height: 4vh;
    padding: 0 1vh;
    border-radius: 0.3vh;
    background-color: #0995ff;
    color: white;
    border: 1px solid #477199;
    box-shadow: inset 0px 0px 0px 0px #54a3f7;
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
    height: 3vh;
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
    align-items: flex-start;
    justify-content: space-evenly;
    padding: 1vh 0 2vh 0;
    width: 100vh;
    border-bottom: 0.7px solid #d2d2d2;
`;
export const QuestionTitle = styled.p`
    display: flex;
    align-items: flex-start;
    width: 55vh;
    /* height: 4vh; */
    margin-bottom: 0.5vh;
    color: #0074cc;
    font-size: 1.1rem;
`;
export const QuestionContent = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 55vh;
    /* height: 4vh; */
    font-size: 0.9rem;
`;
export const Left = styled.span`
    /* border: 1px solid green; */
    width: 100px;
`;
export const Right = styled.span`
    /* border: 1px solid gold; */
    width: 700px;
`;
export const QuestionInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 55vh;
    padding-top: 1vh;
    font-size: 0.9rem;
`;
export const Tags = styled.div`
    display: flex;
    flex-direction: row;
    width: 30vh;
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
    width: 10vh;
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
    justify-content: center;
    align-items: center;
    color: #6a737c;
    font-size: 0.8rem;
    > span {
        color: #1b7bcf;
        margin-right: 0.6vh;
    }
`;
export const Img = styled.img`
    height: 2vh;
    border-radius: 50%;
    border: 2px solid orange;
    margin: 0 0.5vh 0.6vh 0;
`;

const QuestionList = () => {
    // eslint-disable-next-line
    const [questions, isPending, error] = useFetch("questions");

    return (
        <>
            {isPending || (
                <>
                    <NavOnLogout />
                    {/* <NavOnLogin /> */}
                    <QuestionListWrapper>
                        <QuestionContainer>
                            <QuestionListHeader>
                                <InsideHeaderUpper>
                                    <Title>All Questions</Title>
                                    <AskQuestionButton>
                                        Ask Question
                                    </AskQuestionButton>
                                </InsideHeaderUpper>
                                <InsideHeaderLower>
                                    <QuestionListCount>
                                        {questions.length} questions
                                    </QuestionListCount>
                                    <FilterOptions>
                                        <FilterButton value={"newest"}>
                                            Newest
                                        </FilterButton>
                                        <FilterButton value={"unanswwered"}>
                                            Unanswered
                                        </FilterButton>
                                        <FilterButton value={"answered"}>
                                            Answered
                                        </FilterButton>
                                    </FilterOptions>
                                </InsideHeaderLower>
                            </QuestionListHeader>
                            {questions.map((question, i) => (
                                <QuestionUnit key={i}>
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
                                        <Shorter>{question.view} views</Shorter>
                                    </Left>
                                    <Right>
                                        <QuestionTitle>
                                            {question.title}
                                        </QuestionTitle>
                                        <QuestionContent>
                                            {question.content.slice(0, 150)}...
                                        </QuestionContent>
                                        <QuestionInfo>
                                            <Tags>
                                                {question.tag.map((t, i) => (
                                                    <Tag key={i}>{t}</Tag>
                                                ))}
                                            </Tags>
                                            <Author>
                                                <Img src="icon.png" />
                                                <span>{question.author}</span>
                                                asked 1 min ago
                                            </Author>
                                        </QuestionInfo>
                                    </Right>
                                </QuestionUnit>
                            ))}
                        </QuestionContainer>
                    </QuestionListWrapper>
                    <Footer />
                </>
            )}
        </>
    );
};
export default QuestionList;
