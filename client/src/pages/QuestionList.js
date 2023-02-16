import styled from "styled-components";
import NavOnLogout from "../component/NavOnLogout";

export const QuestionContainer = styled.article``;

const QuestionList = () => {
    return (
        <>
            <NavOnLogout />
            <QuestionContainer>여기 보이니</QuestionContainer>
        </>
    );
};
export default QuestionList;
