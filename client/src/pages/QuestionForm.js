import NavOnLogin from "../component/navNfooter/NavOnLogin";
import Footer from "../component/navNfooter/Footer";
import styled from "styled-components";
import TextEditor from "../component/TextEditor";
import useFetch from "../util/useFetch";
import React, { useEffect, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

export const QuestionFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #f8f9f9;
    padding-bottom: 10vh;
`;
export const Head = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 15vh;
    padding-bottom: 3vh;
    font-size: 30px;
    font-weight: bold;
    color: #232629;
`;
export const Robot = styled.img`
    height: 17vh;
    margin-top: 1vh;
`;
export const Cover = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 1300px;
    margin: 1vh 0;
`;
export const Information = styled.span`
    display: flex;
    flex-direction: column;
    width: 836px;
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
    a {
        text-decoration-line: none;
        color: #0074cc;
        :hover {
            color: #0a95ff;
        }
    }
`;
export const InfoTitle = styled.p`
    font-size: 23px;
    margin-bottom: 10px;
`;
export const Helper = styled.span`
    display: flex;
    flex-direction: column;
    width: 390px;
    color: #232629;
    border: 1px solid #d6d9dc;
    box-shadow: 1px 1px 5px #d5d9db;
    background-color: white;
    &#problemHelper {
        height: 140px;
    }
    &#expectationHelper {
        height: 275px;
    }
    &#tagHelper {
        height: 230px;
    }
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
    width: 836px;
    height: 130px;
    padding: 25px;
    background-color: white;
    border: 1px solid #e4e5e7;
`;
export const Problem = styled.span`
    display: flex;
    flex-direction: column;
    height: 380px;
    width: 836px;
    padding: 25px;
    background-color: white;
    border: 1px solid #e4e5e7;
`;
export const Expectation = styled.span`
    display: flex;
    flex-direction: column;
    width: 836px;
    height: 380px;
    padding: 25px;
    background-color: white;
    border: 1px solid #e4e5e7;
`;
export const Tags = styled.span`
    display: flex;
    flex-direction: column;
    width: 836px;
    padding: 25px;
    margin-bottom: 70px;
    background-color: white;
    border: 1px solid #e4e5e7;
`;
export const FormTitle = styled.span`
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    font-size: 20px;
    font-weight: bold;
    &#title {
        font-size: 25px;
    }
`;
export const FormInfo = styled.span`
    display: flex;
    flex-direction: column;
    margin: 2px 0;
    font-size: 15px;
`;
export const FormInput = styled.input`
    height: 35px;
    margin-top: 10px;
    padding-left: 10px;
    border-radius: 3px;
    border: 1px solid #babfc4;
    cursor: text;
    &#titleInput {
        font-size: 15px;
        ::placeholder {
            font-size: 15px;
            color: #999999;
        }
    }
    &:focus {
        outline: 1px solid #58a4de;
        box-shadow: 0px 0px 10px #ddeaf7;
    }
`;
export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 1300px;
    margin: 1vh 0;
`;
export const Discard = styled.button`
    font-size: 13.5px;
    height: 4.3vh;
    padding: 0 1.3vh;
    border-radius: 0.3vh;
    color: #c22d32;
    border: none;
    background-color: transparent;
    :hover {
        background-color: #f8e1e0;
    }
`;
export const SubmitButton = styled.button`
    font-size: 13.5px;
    height: 4.3vh;
    padding: 0 1.3vh;
    border-radius: 0.3vh;
    background-color: #0995ff;
    color: white;
    border: 0.9px solid #477199;
    box-shadow: inset 0px 0px 0px 0px #54a3f7;
    :hover {
        background-color: #3172c6;
    }
    margin-left: 1vw;
`;
// ! 여기부터 태그
export const TagBox = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 35px;
    margin-top: 10px;
    /* padding-left: 10px; */
    border-radius: 3px;
    border: 1px solid #babfc4;
    cursor: text;
    &:focus-within {
        outline: 1px solid #58a4de;
        box-shadow: 0px 0px 10px #ddeaf7;
    }
`;
export const TagItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 3px;
    padding: 5px;
    border-radius: 2px;
    background-color: #e1ecf4;
    color: #39739c;
    font-size: 13px;
`;
export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    padding: 0 3px;
    background-color: transparent;
    border: none;
    font-weight: bolder;
    color: #39739c;
    :hover {
        background-color: #39739c;
        color: #e1ecf4;
        border-radius: 2px;
    }
`;
export const TagInput = styled.input`
    display: inline-flex;
    flex-grow: 1;
    padding-left: 10px;
    background: transparent;
    border: none;
    outline: none;
    cursor: text;
    &::placeholder {
        font-size: 15px;
        color: #999999;
    }
`;
export const TagAlert = styled.span`
    font-size: 14px;
    margin-top: 5px;
    margin-left: 5px;
    color: #de4f54;
    visibility: hidden;
    &#english {
        visibility: visible;
    }
`;
export const EditorWrapper = styled.div`
    margin-top: 10px;
    border-radius: 3px;
    &:focus-within {
        outline: 1px solid #58a4de;
        border-bottom: 2px solid #58a4de;
        box-shadow: 0px 0px 10px #ddeaf7;
    }
`;

const QuestionForm = () => {
    const [isTitleOnFocus, setIsTitleOnFocus] = useState(false);
    const [isProblemOnFocus, setIsProblemOnFocus] = useState(false);
    const [isExpectationOnFocus, setIsExpectationOnFocus] = useState(false);
    const [isTagOnFocus, setIsTagOnFocus] = useState(false);
    const titleFocusHandler = () => {
        setIsTitleOnFocus(!isTitleOnFocus);
    };
    const problemFocusHandler = () => {
        setIsProblemOnFocus(!isProblemOnFocus);
    };
    const expectationFocusHandler = () => {
        setIsExpectationOnFocus(!isExpectationOnFocus);
    };
    const tagFocusHandler = () => {
        setIsTagOnFocus(!isTagOnFocus);
    };
    //! 여기서부터 태그
    const [tagItem, setTagItem] = useState("");
    const [tagList, setTagList] = useState([]);
    const [isInEnglish, setIsInEnglish] = useState(false);
    const onKeyPress = (e) => {
        const isKorean = /[^A-Za-z]/g.test(e.target.value);
        if (isKorean) {
            setIsInEnglish(!isInEnglish);
            e.preventDefault();
            return;
        }
        if (
            !isKorean &&
            e.target.value.length &&
            e.key === "Enter" &&
            tagList.length < 5
        ) {
            setIsInEnglish(false);
            submitTagItem();
        }
    };
    const submitTagItem = () => {
        let updatedTagList = [...tagList];
        updatedTagList.push(tagItem);
        setTagList(updatedTagList);
        setTagItem("");
    };
    const deleteTagItem = (e) => {
        const deleteTagItem = e.target.value;
        const filteredTagList = tagList.filter(
            (tagItem) => tagItem !== deleteTagItem
        );
        setTagList(filteredTagList);
    };
    //! 여기서부터 discard
    const [title, setTitle] = useState("");
    // const [descriptions, setDescriptions] = useState("")
    const [problem, setProblem] = useState("");
    const [expectation, setExpectation] = useState("");
    const onDiscard = (e) => {
        setTitle("");
        setProblem("");
        setExpectation("");
        setTagList([]);
    };

    //! 여기서부터 submit
    const [data, isPending, error] = useFetch(
        "http://localhost:3001/questions"
    );
    const handleTitle = (e) => setTitle(e.target.value);

    //todo 여기서부터 에디터랑 기싸움중
    const textRef = React.createRef();
    // const handleChangeInput = () => {
    //     setDescriptions(textRef.current.getInstance().getMarkdown()
    //     )
    // }
    const handleProblem = (e) =>
        setProblem(textRef.current.getInstance().getMarkdown());
    const handleExpectation = (e) =>
        setExpectation(textRef.current.getInstance().getMarkdown());

    // console.log("이거는??");
    // console.log(handleProbelem);
    // console.log("됐아? 됐어? 안됐지?");
    // console.log("안된거 다알아");

    const handleTag = (e) => setTagItem(e.target.value);
    const onSubmit = (e) => {
        let newQuestion = {
            id: data.length + 1,
            title,
            problem,
            expectation,
            tagList,
            author: "kkte02",
            createdAt: "date",
            view: 0,
            votes: 0,
            answers: 0,
        };
        fetch("http://localhost:3001/questions/", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newQuestion),
        })
            // .then(() => window.location)
            .catch((err) => console.log("Error: ", err));
    };

    return (
        <>
            <NavOnLogin />
            <QuestionFormWrapper>
                <Cover>
                    <Head>Ask a public question</Head>
                    <Robot src="robot.png"></Robot>
                </Cover>
                <Cover>
                    <Information>
                        <InfoTitle>Writing a good question</InfoTitle>
                        <p>
                            You’re ready to{" "}
                            <a href="https://stackoverflow.com/help/how-to-ask">
                                ask
                            </a>{" "}
                            a{" "}
                            <a href="https://stackoverflow.com/help/on-topic">
                                programming-related question
                            </a>{" "}
                            and this form will help guide you through the
                            process.
                        </p>
                        <p>
                            Looking to ask a non-programming question? See{" "}
                            <a href="https://stackexchange.com/sites#technology">
                                the topics here
                            </a>{" "}
                            to find a relevant site.
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
                    <Title>
                        <FormTitle id="title">Title</FormTitle>
                        <FormInfo>
                            Be specific and imagine you’re asking a question to
                            another person.
                        </FormInfo>
                        <FormInput
                            id="titleInput"
                            onChange={handleTitle}
                            onFocus={titleFocusHandler}
                            onBlur={titleFocusHandler}
                            placeholder="e.g. Is there an R unction for finding the index of an element in a vector?"
                        ></FormInput>
                    </Title>
                    {isTitleOnFocus ? (
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
                    ) : null}
                </Cover>
                <Cover>
                    <Problem>
                        <FormTitle>
                            What are the details of your problem?
                        </FormTitle>
                        <FormInfo>
                            Introduce the problem and expand on what you put in
                            the title. Minimum 20 characters.
                        </FormInfo>
                        <EditorWrapper>
                            <Editor
                                initialValue={problem} // -> 수정버튼 클릭시 나타나는 (작성중상태의)텍스트 설정하는 속성
                                onFocus={problemFocusHandler}
                                onBlur={problemFocusHandler}
                                placeholder={
                                    "Click to enter details of your problem."
                                }
                                previewStyle="vertical"
                                height="300px"
                                initialEditType="wysiwyg"
                                toolbarItems={[
                                    ["heading", "bold", "italic", "strike"],
                                    ["hr", "quote"],
                                    ["ul", "ol", "task", "indent", "outdent"],
                                    ["table", "image", "link"],
                                    ["code", "codeblock"],
                                ]}
                                ref={textRef}
                                onChange={handleProblem}
                                autofocus={false}
                                hideModeSwitch={true}
                            ></Editor>
                        </EditorWrapper>
                    </Problem>
                    {isProblemOnFocus ? (
                        <Helper id="problemHelper">
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
                    ) : null}
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
                        {/* <TextEditor
                            className={isProblemOnFocus ? "focus" : ""}
                            onChange={handleExpectation}
                            focus={expectationFocusHandler}
                            blur={expectationFocusHandler}
                            placeholder={
                                "Click to enter details of your trial and expectation."
                            }
                        /> */}
                        <Editor
                                initialValue={expectation} // -> 수정버튼 클릭시 나타나는 (작성중상태의)텍스트 설정하는 속성
                                onFocus={expectationFocusHandler}
                                onBlur={expectationFocusHandler}
                                placeholder={
                                    "Click to enter details of your problem."
                                }
                                previewStyle="vertical"
                                height="300px"
                                initialEditType="wysiwyg"
                                toolbarItems={[
                                    ["heading", "bold", "italic", "strike"],
                                    ["hr", "quote"],
                                    ["ul", "ol", "task", "indent", "outdent"],
                                    ["table", "image", "link"],
                                    ["code", "codeblock"],
                                ]}
                                ref={textRef}
                                onChange={handleExpectation}
                                autofocus={false}
                                hideModeSwitch={true}
                            ></Editor>
                    </Expectation>
                    {isExpectationOnFocus ? (
                        <Helper id="expectationHelper">
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
                    ) : null}
                </Cover>
                <Cover>
                    <Tags>
                        <FormTitle>Tags</FormTitle>
                        <FormInfo>
                            Add up to 5 tags to describe what your question is
                            about. Start typing to see suggestions. Maximum 5
                            tags.
                        </FormInfo>
                        <TagBox>
                            {tagList.map((tagItem, index) => {
                                return (
                                    <TagItem key={index}>
                                        <span>{tagItem}</span>
                                        <Button
                                            value={tagItem}
                                            onClick={deleteTagItem}
                                        >
                                            ✕
                                        </Button>
                                    </TagItem>
                                );
                            })}
                            <TagInput
                                type="text"
                                onFocus={tagFocusHandler}
                                onBlur={tagFocusHandler}
                                placeholder="e.g. (ajax iphone string)"
                                tabIndex={2}
                                // onChange={(e) => setTagItem(e.target.value)}
                                onChange={handleTag}
                                value={tagItem}
                                onKeyPress={onKeyPress}
                            />
                        </TagBox>
                        <TagAlert id={isInEnglish ? "english" : ""}>
                            Tags must be in English
                        </TagAlert>
                    </Tags>
                    {isTagOnFocus ? (
                        <Helper id="tagHelper">
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
                    ) : null}
                </Cover>
                <ButtonContainer>
                    <Discard onClick={onDiscard}>Discard draft</Discard>
                    <SubmitButton onClick={onSubmit}>
                        Submit your question
                    </SubmitButton>
                </ButtonContainer>
            </QuestionFormWrapper>
            <Footer />
        </>
    );
};
export default QuestionForm;
