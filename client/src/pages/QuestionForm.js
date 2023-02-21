import NavOnLogin from "../component/NavOnLogin";
import Footer from "../component/Footer";
import styled from "styled-components";

export const QuestionFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 200vh;
    background-color: #f8f9f9;
`;
export const Head = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* width: 87vw; */
    height: 15vh;
    padding-bottom: 3vh;
    font-size: 30px;
    font-weight: bold;
    color: #232629;
    /* border: 1px solid black; */
`;
export const Robot = styled.img`
    height: 17vh;
    margin-top: 1vh ;
`
export const Main = styled.div`
    display: flex;
    flex-direction: column;
    /* border: 1px solid red; */
`;
export const Cover = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 86vw;
    margin: 1vh 0;
`;
export const Information = styled.span`
    display: flex;
    flex-direction: column;
    width: 850px;
    padding: 25px;
    color: #3b4044;
    background-color: #ebf4fa;
    border: 1px solid #a6ceed;
    strong {
        font-size: 15px;
        padding: 20px 0 10px 0;
    }
    li {
        font-size: 15px;
        padding-left: 20px;
    }
`;
export const InfoTitle = styled.p`
    font-size: 23px;
    margin-bottom: 10px;
`;
export const Helper = styled.span`
    display: flex;
    flex-direction: column;
    width: 25vw;
    color: #232629;
    border: 1px solid #d6d9dc;
    box-shadow: 1px 1px 5px #d5d9db;
    background-color: white;
`;
export const HelperHead = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1vw;
    height: 6vh;
    font-size: 17px;
    background-color: #f8f9f9;
    border-bottom: 1px solid #d6d9dc;
`;
export const HelperInfo = styled.div`
    display: flex;
    flex-direction: row;
    padding: 15px;
    justify-content: space-between;
    align-items: flex-start;
`;
export const Pen = styled.img`
    height: 50px;
    margin-right: 10px;
`;
export const HelperContent = styled.span`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    > p {
        margin-bottom: 10px;
    }
`;
export const Title = styled.span`
    display: flex;
    flex-direction: column;
    width: 850px;
    padding: 25px;
    background-color: white;
    border: 1px solid #e4e5e7;
`;
export const Problem = styled.span`
    display: flex;
    flex-direction: column;
    width: 850px;
    padding: 25px;
    background-color: white;
    border: 1px solid #e4e5e7;
`;
export const Expectation = styled.span`
    display: flex;
    flex-direction: column;
    width: 850px;
    padding: 25px;
    background-color: white;
    border: 1px solid #e4e5e7;
`;
export const Tags = styled.span`
    display: flex;
    flex-direction: column;
    width: 850px;
    padding: 25px;
    background-color: white;
    border: 1px solid #e4e5e7;
`;
export const FormTitle = styled.span`
    display: flex;
    flex-direction: column;
    margin: 2px 0;
    font-size: 17px;
    font-weight: bold;
    /* border: 1px solid gray; */
`;
export const FormInfo = styled.span`
    display: flex;
    flex-direction: column;
    margin: 2px 0;
    font-size: 14px;
    /* border: 1px solid gold; */
`;
export const FormInput = styled.input`
    height: 35px;
    margin-top: 10px;
    padding-left: 10px;
    border-radius: 3px;
    font-size: 15px;
    border: 1px solid #babfc4;
    &:focus {
        outline: 1px solid #58a4de;
        box-shadow: 0px 0px 10px #ddeaf7;
    }
`;

const QuestionForm = () => {
    return (
        <>
            <NavOnLogin />
            <QuestionFormWrapper>
                <Cover>
                <Head>Ask a public question</Head>
                <Robot src="robot.png"></Robot>
                </Cover>
                <Main>
                    <Cover>
                        <Information>
                            <InfoTitle>Writing a good question</InfoTitle>
                            <p>
                                You’re ready to ask a programming-related
                                question and this form will help guide you
                                through the process.
                            </p>
                            <p>
                                Looking to ask a non-programming question? See
                                the topics here to find a relevant site.
                            </p>
                            <strong>Steps</strong>
                            <li>Summarize your problem in a one-line title.</li>
                            <li>Describe your problem in more detail.</li>
                            <li>
                                Describe what you tried and what you expected to
                                happen.
                            </li>
                            <li>
                                Add “tags” which help surface your question to
                                members of the community.
                            </li>
                            <li>
                                Review your question and post it to the site.
                            </li>
                        </Information>
                    </Cover>
                    <Cover>
                        <Title>
                            <FormTitle>Title</FormTitle>
                            <FormInfo>
                                Be specific and imagine you’re asking a question
                                to another person.
                            </FormInfo>
                            <FormInput placeholder="e.g. Is there an R unction for finding the index of an element in a vector?"></FormInput>
                        </Title>
                        <Helper>
                            <HelperHead>Writing a good title</HelperHead>
                            <HelperInfo>
                                <Pen src="pen.png"></Pen>
                                <HelperContent>
                                    <p>
                                        Your title should summarize the problem.
                                    </p>
                                    <p>
                                        You might find that you have a better
                                        idea of your title after writing out the
                                        rest of the question.
                                    </p>
                                </HelperContent>
                            </HelperInfo>
                        </Helper>
                    </Cover>
                    <Cover>
                        <Problem>
                            <FormTitle>
                                What are the details of your problem?
                            </FormTitle>
                            <FormInfo>
                                Introduce the problem and expand on what you put
                                in the title. Minimum 20 characters.
                            </FormInfo>
                            <FormInput></FormInput>
                        </Problem>
                        <Helper>
                            <HelperHead>Introduce the problem</HelperHead>
                            <HelperInfo>
                                <Pen src="pen.png"></Pen>
                                <HelperContent>
                                    <p>
                                        Explain how you encountered the problem
                                        you’re trying to solve, and any
                                        difficulties that have prevented you
                                        from solving it yourself.
                                    </p>
                                </HelperContent>
                            </HelperInfo>
                        </Helper>
                    </Cover>
                    <Cover>
                        <Expectation>
                            <FormTitle>
                                What did you try and what were you expecting?
                            </FormTitle>
                            <FormInfo>
                                Describe what you tried, what you expected to
                                happen, and what actually resulted. Minimum 20
                                characters.
                            </FormInfo>
                            <FormInput></FormInput>
                        </Expectation>
                        <Helper>
                            <HelperHead>Expand on the problem</HelperHead>
                            <HelperInfo>
                                <Pen src="pen.png"></Pen>
                                <HelperContent>
                                    <p>
                                        Show what you’ve tried, tell us what
                                        happened, and why it didn’t meet your
                                        needs.
                                    </p>
                                    <p>
                                        Not all questions benefit from including
                                        code, but if your problem is better
                                        understood with code you’ve written, you
                                        should include a minimal, reproducible
                                        example.
                                    </p>
                                    <p>
                                        Please make sure to post code and errors
                                        as text directly to the question (and
                                        not as images), and format them
                                        appropriately.
                                    </p>
                                </HelperContent>
                            </HelperInfo>
                        </Helper>
                    </Cover>
                    <Cover>
                        <Tags>
                            <FormTitle>Tags</FormTitle>
                            <FormInfo>
                                Add up to 5 tags to describe what your question
                                is about. Start typing to see suggestions.
                            </FormInfo>
                            <FormInput placeholder="e.g. (ajax iphone string)"></FormInput>
                        </Tags>
                        <Helper>
                            <HelperHead>Adding tags</HelperHead>
                            <HelperInfo>
                                <Pen src="pen.png"></Pen>
                                <HelperContent>
                                    <p>
                                        Tags help ensure that your question will
                                        get attention from the right people.{" "}
                                    </p>
                                    <p>
                                        Tag things in more than one way so
                                        people can find them more easily. Add
                                        tags for product lines, projects, teams,
                                        and the specific technologies or
                                        languages used.{" "}
                                    </p>
                                    <p>Learn more about tagging</p>
                                </HelperContent>
                            </HelperInfo>
                        </Helper>
                    </Cover>
                </Main>
            </QuestionFormWrapper>
            <Footer />
        </>
    );
};
export default QuestionForm;

// eslint-disable-next-line
{/* <Cover>
<Head>Ask a public question</Head>
<Robot src="robot.png"></Robot>
</Cover>
<Cover>
<Information>
    <InfoTitle>Writing a good question</InfoTitle>
    <p>
        You’re ready to ask a programming-related question
        and this form will help guide you through the
        process.
    </p>
    <p>
        Looking to ask a non-programming question? See the
        topics here to find a relevant site.
    </p>
    <strong>Steps</strong>
    <li>Summarize your problem in a one-line title.</li>
    <li>Describe your problem in more detail.</li>
    <li>
        Describe what you tried and what you expected to
        happen.
    </li>
    <li>
        Add “tags” which help surface your question to
        members of the community.
    </li>
    <li>Review your question and post it to the site.</li>
</Information>
</Cover>
<Cover>
<Main>
    <Title>
        <FormTitle>Title</FormTitle>
        <FormInfo>
            Be specific and imagine you’re asking a question
            to another person.
        </FormInfo>
        <FormInput placeholder="e.g. Is there an R unction for finding the index of an element in a vector?"></FormInput>
    </Title>
    <Problem>
        <FormTitle>
            What are the details of your problem?
        </FormTitle>
        <FormInfo>
            Introduce the problem and expand on what you put
            in the title. Minimum 20 characters.
        </FormInfo>
        <FormInput></FormInput>
    </Problem>
    <Expectation>
        <FormTitle>
            What did you try and what were you expecting?
        </FormTitle>
        <FormInfo>
            Describe what you tried, what you expected to
            happen, and what actually resulted. Minimum 20
            characters.
        </FormInfo>
        <FormInput></FormInput>
    </Expectation>
    <Tags>
        <FormTitle>Tags</FormTitle>
        <FormInfo>
            Add up to 5 tags to describe what your question
            is about. Start typing to see suggestions.
        </FormInfo>
        <FormInput placeholder="e.g. (ajax iphone string)"></FormInput>
    </Tags>
</Main>
<Side>
    <Helper>
        <HelperHead>Writing a good title</HelperHead>
        <HelperInfo>
            <Pen src="pen.png"></Pen>
            <HelperContent>
                <p>
                    Your title should summarize the problem.
                </p>
                <p>
                    You might find that you have a better
                    idea of your title after writing out the
                    rest of the question.
                </p>
            </HelperContent>
        </HelperInfo>
    </Helper>
    <Helper>
        <HelperHead>Introduce the problem</HelperHead>
        <HelperInfo>
            <Pen src="pen.png"></Pen>
            <HelperContent>
                <p>
                    Explain how you encountered the problem
                    you’re trying to solve, and any
                    difficulties that have prevented you
                    from solving it yourself.
                </p>
            </HelperContent>
        </HelperInfo>
    </Helper>
    <Helper>
        <HelperHead>Expand on the problem</HelperHead>
        <HelperInfo>
            <Pen src="pen.png"></Pen>
            <HelperContent>
                <p>
                    Show what you’ve tried, tell us what
                    happened, and why it didn’t meet your
                    needs.
                </p>
                <p>
                    Not all questions benefit from including
                    code, but if your problem is better
                    understood with code you’ve written, you
                    should include a minimal, reproducible
                    example.
                </p>
                <p>
                    Please make sure to post code and errors
                    as text directly to the question (and
                    not as images), and format them
                    appropriately.
                </p>
            </HelperContent>
        </HelperInfo>
    </Helper>
    <Helper>
        <HelperHead>Adding tags</HelperHead>
        <HelperInfo>
            <Pen src="pen.png"></Pen>
            <HelperContent>
                <p>
                    Tags help ensure that your question will
                    get attention from the right people.{" "}
                </p>
                <p>
                    Tag things in more than one way so
                    people can find them more easily. Add
                    tags for product lines, projects, teams,
                    and the specific technologies or
                    languages used.{" "}
                </p>
                <p>Learn more about tagging</p>
            </HelperContent>
        </HelperInfo>
    </Helper>
</Side>
</Cover> */}