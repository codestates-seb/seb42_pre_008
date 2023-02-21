import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import styled from "styled-components";

export const EditorWrapper = styled.div`
    margin-top: 1vh;
    font-size: 20px;
`;

export const TextEditor = () => {
    return (
        <EditorWrapper>
            <Editor
                previewStyle="vertical" // 미리보기 스타일 지정
                height="300px" // 에디터 창 높이
                initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
                toolbarItems={[
                    // 툴바 옵션 설정
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
