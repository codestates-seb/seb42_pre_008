import styled from "styled-components";
import Footer from "../component/Footer";
import NavOnLogin from "../component/NavOnLogin";
import NavOnLogout from "../component/NavOnLogout";

export const QuestionContainer = styled.article``;

const QuestionList = () => {
    return (
        <>
            <NavOnLogout />
            <NavOnLogin />
            {/* <QuestionContainer></QuestionContainer> */}
            <Footer></Footer>
        </>
    );
};
export default QuestionList;
