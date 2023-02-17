import styled from "styled-components";
import Footer from "../component/Footer";
import NavOnLogout from "../component/NavOnLogout";
// import NavOnLogin from "../component/NavOnLogin";

export const QuestionListWrapper = styled.main`
    position: relative;
    top: 6vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 120vh;
    border: 1px solid green;
`;
export const QuestionContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 70vh;
    height: 120vh;
    border-left: 1px solid red;
    border-right: 1px solid red;
`;
export const QuestionListHeader = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 15vh;
    width: 70vh;
    border: 1px solid orange;
`;
export const InsideHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2vh;
`;
export const Title = styled.span``;
export const AskQuestionButton = styled.button``;
export const QuestionListCount = styled.span``;
export const FilterOptions = styled.span``;
export const QuestionUnit = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    height: 15vh;
    width: 70vh;
    border: 1px solid blue;
`;

const QuestionList = () => {
    return (
        <>
            <NavOnLogout />
            {/* <NavOnLogin /> */}
            <QuestionListWrapper>
                <QuestionContainer>
                    <QuestionListHeader>
                        <InsideHeader>
                            <Title>All Questions</Title>
                            <AskQuestionButton>Ask Question</AskQuestionButton>
                        </InsideHeader>
                        <InsideHeader>
                            <QuestionListCount>
                                23,505,807 questions
                            </QuestionListCount>
                            <FilterOptions>
                                <button>Newest</button>
                                <button>Unanswered</button>
                                <button>Answered</button>
                            </FilterOptions>
                        </InsideHeader>
                    </QuestionListHeader>
                    <QuestionUnit>
                        <span>
                            <div>0 votes</div>
                            <div>0 answers</div>
                            <div>3 views</div>
                        </span>
                        <span>
                            <div>Title</div>
                            <div>Content</div>
                            <div>
                                <span>
                                    <span>tag1</span>
                                    <span>tag2</span>
                                    <span>tag3</span>
                                </span>
                                <span>@@@ asked 1 min ago</span>
                            </div>
                        </span>
                    </QuestionUnit>
                </QuestionContainer>
            </QuestionListWrapper>
            <Footer />
        </>
    );
};
export default QuestionList;
