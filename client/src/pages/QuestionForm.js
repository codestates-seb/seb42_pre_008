import NavOnLogin from "../component/navNfooter/NavOnLogin";
import Footer from "../component/navNfooter/Footer";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import React, { useState,useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import useFetch from "../util/useFetch";
import { useNavigate } from "react-router-dom";
import Loading from "../component/Loading";
import { fetchPatch } from "../util/api";
import { v4 as uuidv4 } from "uuid";

const QuestionForm = ({ userInfo }) => {
    const navigate = useNavigate();
    /*** useParams***/
    const { id } = useParams();
    const [pending,setPending] = useState(true)
       /*** Raed data ***/
   useEffect(() => {
    if(id==='0'){
        setPending(false)
    }
    else{
    const abortCont = new AbortController();

    setTimeout(() => {
    fetch(`${process.env.REACT_APP_API_QUESTION}/${id}`
       , { signal: abortCont.signal })
    .then(res => {
        if (!res.ok) { 
            throw Error('could not fetch the data for that resource');
        } 
        return res.json();
    })
    .then(data => {
        setTitle(data.title);
        setProblem(data.problem);
        setExpectation(data.expectation);
        setTagList([...data.tagList]);
        setPending(false)
    })
    .catch(err => {
        console.log(err.message);
    })

    }, 1000)}},[id])

    //! 기능 구현
    //TODO input onFocus/onBlur 시 Helper msg popup 및 box shadow 효과주는 로직
    const [isTitleOnFocus, setIsTitleOnFocus] = useState(false);
    const [isProblemOnFocus, setIsProblemOnFocus] = useState(false);
    const [isExpectationOnFocus, setIsExpectationOnFocus] = useState(false);
    const [isTagOnFocus, setIsTagOnFocus] = useState(false);
    const titleFocusHandler = () => setIsTitleOnFocus(!isTitleOnFocus);
    const problemFocusHandler = () => setIsProblemOnFocus(!isProblemOnFocus);
    const expectationFocusHandler = () =>
        setIsExpectationOnFocus(!isExpectationOnFocus);
    const tagFocusHandler = () => setIsTagOnFocus(!isTagOnFocus);
    //TODO tag 로직
    const [tagItem, setTagItem] = useState("");
    const [tagList, setTagList] = useState([]);
    const [isInEnglish, setIsInEnglish] = useState(false);
    //* 유효성 검사 로직
    const onKeyPress = (e) => {
        // 영문 입력만 가능하게 하는 로직
        const isKorean = /[^A-Za-z]/g.test(e.target.value);
        if (isKorean) {
            setIsInEnglish(!isInEnglish);
            e.preventDefault();
            return;
        }
        // 태그는 5개 이하만 허용하게 하는 로직
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
    //* input value <tag/> 형태로 변환하는 로직
    const submitTagItem = () => {
        let updatedTagList = [...tagList];
        updatedTagList.push(tagItem);
        setTagList(updatedTagList);
        setTagItem("");
    };
    //* 태그의 x 클릭시 태그 삭제되는 로직
    const deleteTagItem = (e) => {
        const deleteTagItem = e.target.value;
        const filteredTagList = tagList.filter(
            (tagItem) => tagItem !== deleteTagItem
        );
        setTagList(filteredTagList);
    };
    //TODO discard draft 로직
    const [title, setTitle] = useState("");
    const [problem, setProblem] = useState("");
    const [expectation, setExpectation] = useState("");
    const onDiscard = (e) => {
        navigate("/question-form");
    };
    //TODO summit question 로직
    const problemRef = React.createRef(); //* Editor 관련 로직
    const expectationRef = React.createRef(); //* Editor 관련 로직
    const handleTitle = (e) => setTitle(e.target.value);
    const handleProblem = (e) =>
        setProblem(problemRef.current.getInstance().getMarkdown());
    const handleExpectation = (e) =>
        setExpectation(expectationRef.current.getInstance().getMarkdown());
    const handleTag = (e) => setTagItem(e.target.value);
    const onSubmit = (e) => {
        if(title.length === 0 || problem.length === 0) return;
        if(id==='0'){  
            
            let newQuestion = {
            id: uuidv4(),
            title,
            problem,
            expectation,
            tagList,
            author: userInfo.name,
            createdAt: new Date(),
            view: 0,
            votes: 0,
            answers: 0,
        };
        fetch("http://localhost:3003/questions/", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newQuestion),
        })
            .then(() => navigate("/"))
            .catch((err) => console.log("Error: ", err));
    }else{
        const patchData = {
            title,
            problem,
            expectation,
            tagList,
        }
        fetchPatch(`${process.env.REACT_APP_API_QUESTION}/${id}`, patchData, '/')
    }
    };

    //! 페이지 본문
    return (
        <>
            {pending ? (
                <Loading />
            ) : (
                <QuestionFormWrapper>
                    <Cover>
                        <Head>Ask a public question</Head>
                        <Robot src="image/robot.png"></Robot>
                    </Cover>
                    <Cover>
                        {/*!!!!!! 좋은 질문하는 방법에 관한 하늘색 텍스트 박스 !!!!!!*/}
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
                            <li>
                                Review your question and post it to the site.
                            </li>
                        </Information>
                    </Cover>
                    <Cover>
                        {/*!!!!!! 질문 제목 입력하는 부분 !!!!!!*/}
                        <Title>
                            <FormTitle id="title">Title</FormTitle>
                            <FormInfo>
                                Be specific and imagine you’re asking a question
                                to another person.
                            </FormInfo>
                            <FormInput
                                value={title}
                                id="titleInput"
                                onChange={handleTitle}
                                onFocus={titleFocusHandler}
                                onBlur={titleFocusHandler}
                                placeholder="e.g. Is there an R unction for finding the index of an element in a vector?"
                            ></FormInput>
                        </Title>
                        {/*!!!!!! 질문 제목 onFocus 시 helper msg popup 조건 !!!!!!*/}
                        {isTitleOnFocus ? (
                            <Helper>
                                <HelperHead>Writing a good title</HelperHead>
                                <HelperInfo>
                                    <Pen src="image/pen.png"></Pen>
                                    <HelperContent>
                                        <p>
                                            Your title should summarize the
                                            problem.
                                        </p>
                                        <p>
                                            You might find that you have a
                                            better idea of your title after
                                            writing out the rest of the
                                            question.
                                        </p>
                                    </HelperContent>
                                </HelperInfo>
                            </Helper>
                        ) : null}
                    </Cover>
                    <Cover>
                        {/*!!!!!! 질문 내용 입력하는 부분 !!!!!!*/}
                        <Problem>
                            <FormTitle>
                                What are the details of your problem?
                            </FormTitle>
                            <FormInfo>
                                Introduce the problem and expand on what you put
                                in the title. Minimum 20 characters.
                            </FormInfo>
                            {/*!!!!!! 이 안에 toast editor 있음 !!!!!!*/}
                            <EditorWrapper>
                               {!pending && <Editor
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
                                        [
                                            "ul",
                                            "ol",
                                            "task",
                                            "indent",
                                            "outdent",
                                        ],
                                        ["table", "image", "link"],
                                        ["code", "codeblock"],
                                    ]}
                                    ref={problemRef}
                                    onChange={handleProblem}
                                    autofocus={false}
                                    hideModeSwitch={true}
                                ></Editor>}
                            </EditorWrapper>
                        </Problem>
                        {/*!!!!!! 질문 내용 onFocus 시 helper msg popup 조건 !!!!!!*/}
                        {isProblemOnFocus ? (
                            <Helper id="problemHelper">
                                <HelperHead>Introduce the problem</HelperHead>
                                <HelperInfo>
                                    <Pen src="image/pen.png"></Pen>
                                    <HelperContent>
                                        <p>
                                            Explain how you encountered the
                                            problem you’re trying to solve, and
                                            any difficulties that have prevented
                                            you from solving it yourself.
                                        </p>
                                    </HelperContent>
                                </HelperInfo>
                            </Helper>
                        ) : null}
                    </Cover>
                    <Cover>
                        {/*!!!!!! 질문 상세 입력하는 부분 !!!!!!*/}
                        <Expectation>
                            <FormTitle>
                                What did you try and what were you expecting?
                            </FormTitle>
                            <FormInfo>
                                Describe what you tried, what you expected to
                                happen, and what actually resulted. Minimum 20
                                characters.
                            </FormInfo>
                            {/*!!!!!! 이 안에 toast editor 있음 !!!!!!*/}
                            <EditorWrapper>
                                {!pending && <Editor
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
                                        [
                                            "ul",
                                            "ol",
                                            "task",
                                            "indent",
                                            "outdent",
                                        ],
                                        ["table", "image", "link"],
                                        ["code", "codeblock"],
                                    ]}
                                    ref={expectationRef}
                                    onChange={handleExpectation}
                                    autofocus={false}
                                    hideModeSwitch={true}
                                ></Editor>}
                            </EditorWrapper>
                        </Expectation>
                        {/*!!!!!! 질문 상세 onFocus 시 helper msg popup 조건 !!!!!!*/}
                        {isExpectationOnFocus ? (
                            <Helper id="expectationHelper">
                                <HelperHead>Expand on the problem</HelperHead>
                                <HelperInfo>
                                    <Pen src="image/pen.png"></Pen>
                                    <HelperContent>
                                        <p>
                                            Show what you’ve tried, tell us what
                                            happened, and why it didn’t meet
                                            your needs.
                                        </p>
                                        <p>
                                            Not all questions benefit from
                                            including code, but if your problem
                                            is better understood with code
                                            you’ve written, you should include a
                                            minimal, reproducible example.
                                        </p>
                                        <p>
                                            Please make sure to post code and
                                            errors as text directly to the
                                            question (and not as images), and
                                            format them appropriately.
                                        </p>
                                    </HelperContent>
                                </HelperInfo>
                            </Helper>
                        ) : null}
                    </Cover>
                    <Cover>
                        {/*!!!!!! 태그 입력하는 부분 !!!!!!*/}
                        <Tags>
                            <FormTitle>Tags</FormTitle>
                            <FormInfo>
                                Add up to 5 tags to describe what your question
                                is about. Start typing to see suggestions.
                                Maximum 5 tags.
                            </FormInfo>
                            {/*!!!!!! 작성된 tag list 에 css 효과 입혀주는 부분 !!!!!!*/}
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
                        {/*!!!!!! 질문 상세 onFocus 시 helper msg popup 조건 !!!!!!*/}
                        {isTagOnFocus ? (
                            <Helper id="tagHelper">
                                <HelperHead>Adding tags</HelperHead>
                                <HelperInfo>
                                    <Pen src="image/pen.png"></Pen>
                                    <HelperContent>
                                        <p>
                                            Tags help ensure that your question
                                            will get attention from the right
                                            people.{" "}
                                        </p>
                                        <p>
                                            Tag things in more than one way so
                                            people can find them more easily.
                                            Add tags for product lines,
                                            projects, teams, and the specific
                                            technologies or languages used.{" "}
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
            )}
        </>
    );
};
export default QuestionForm;


//! styled components
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
// 해당 input onFocus 시 우측에서 나타나는 작성방법 안내 메시지
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
// 여기부터 태그
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
// 에디터
export const EditorWrapper = styled.div`
    margin-top: 10px;
    border-radius: 3px;
    &:focus-within {
        outline: 1px solid #58a4de;
        border-bottom: 2px solid #58a4de;
        box-shadow: 0px 0px 10px #ddeaf7;
    }
`;
