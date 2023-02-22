import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import styled from "styled-components";

export const EditorWrapper = styled.div`
    margin-top: 10px;
    border-radius: 3px;
    &:focus-within {
        outline: 1px solid #58a4de;
        border-bottom: 2px solid #58a4de;
        box-shadow: 0px 0px 10px #ddeaf7;
    }
`;



export const TextEditor = ({ focus, blur, placeholder }) => {
    return (
        <EditorWrapper>
            <Editor
                // initialValue={''} -> 수정버튼 클릭시 나타나는 (작성중상태의)텍스트 설정하는 속성
                onFocus={focus}
                onBlur={blur}
                placeholder={placeholder}
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
                hideModeSwitch={true}
            ></Editor>
        </EditorWrapper>
    );
};

export default TextEditor;
