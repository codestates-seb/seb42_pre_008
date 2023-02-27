import styled from "styled-components";
import { useState ,useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Avatar, { genConfig } from 'react-nice-avatar'
import { fetchPatch } from "../util/api";
import Loading from "../component/Loading";

const config = genConfig()

const UserInfoEditWrap = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 20px;
 padding: 4rem 4rem;
 height: 100vh;
`;

const Header = styled.header`
  padding: 30px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  p{
    margin-left: 10px;
    font-size: 2rem;
    span{
        display: block;
        font-size: 1rem;
        color: #6A737c;
    }
  }
`;

const MainSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto;
  gap: 20px;
`;

const Sidebar = styled.div`
    h2{  font-size: 1.6rem;
  font-weight: 400;}
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 200px;
`;

const SidebarItem = styled.div`
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
  font-size: 1rem;
  :last-child{
    margin-bottom: 26rem;
  }
    span{
        display: block;
        font-size: 0.8rem;
        color: #6A737c;
    }
    :hover{
        border: 1px solid #bbb;
    }
`;

const UserInfoEditHead = styled.h1`
  padding: 10px;
  font-size: 1.6rem;
  font-weight: 400;
`;

const UserInfoEditForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 20px;
`;

const TitleInput = styled.input`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 0.3vh;
    :first-of-type{
        width: 300px;
    }
`;

const IntroductionTextarea = styled.textarea`
  border: 1px solid #ccc;
  padding: 10px;
  resize: vertical;
  border-radius: 0.3vh;
`;

const ImageUploadWrap = styled.div`
  padding: 10px;
`;

const ImageUploadLabel = styled.label`
  display: inline-block;
  background: #6A737c;;
  padding: 10px;
  color: #fff;
  display: flex;
  width: 120px;
  justify-content: center;
  border-radius: 0.3vh;
  cursor: pointer;
  font-size: 0.8rem;
  svg{
    width: 1rem;
    height: 1rem;
  }
  :hover{
    background: #545e66;
  }
`;

const ImageUploadInput = styled.input`
  display: none;
  max-width: 150px;
  max-height: 150px;
`;

const ImagePreview = styled.img`
  max-width: 150px;
  max-height: 150px;
  display: block;
  margin-bottom: 8px;

`;

const NoImg = styled.div`
    width: 150px;
    height: 150px;
    background-color: #ccc;
    margin-bottom: 10px;
`

const SignupButton = styled.button`
    height: 37px;
    border-radius: 0.3vh;
    background-color: #0995ff;
    color: white;
    border: 1px solid #477199;
    box-shadow: inset 0px 0px 0px 0px #54a3f7;
    margin-top: 1.8rem;
    font-size: 1rem;
    width: 10rem;
    cursor: pointer;
    :hover {
        background-color: #3172c6;
    }
`;


function UserInfoEdit({loginInfo}) {
  const [userInfo, setUserInfo] = useState({ name: "", title: "", intro: ""});
  const [answerNum, setAnswerNum] = useState();
  const [questionNum,setQuestionNum] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [isError, setError] = useState(null)

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', imageFile);

    fetchPatch(process.env.REACT_APP_API_USER +'/'+ loginInfo.id,
    {...userInfo,
    img:formData
    }, '/userinfo-edit')
  };

  const handleImageUpload = (event) => {
    setImageFile(event.target.files[0]);
  };

  /***Read data***/
  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
        fetch(process.env.REACT_APP_API_USER +'/'+ loginInfo.id, { signal: abortCont.signal })
            .then((res) => {
                if (!res.ok) {
                    throw Error(
                        "could not fetch the data for that resource"
                    );
                }
                return res.json();
            })
            .then((data) => {
                setUserInfo(
                    {name:data.name,
                    title:data.title,
                    intro:data.intro,
                    img:imageFile,
                    });
                setAnswerNum(data.answers)
                setQuestionNum(data.questions)
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, 1000);

    return () => abortCont.abort();
}, []);
  

  return (
    <UserInfoEditWrap>
      <Header>
      <Avatar style={{ width: '5rem', height: '5rem', display: 'inline-block' }} {...config} />
      <p>{userInfo.name} <span>{userInfo.title}</span></p>
       </Header>
      <MainSection>
        <Sidebar>
            <h2>Stats</h2>
          <SidebarItem>{answerNum} <span>answers</span></SidebarItem>
          <SidebarItem>{questionNum}<span>questions</span></SidebarItem>
        </Sidebar>
        <div>
          <UserInfoEditHead>User Info Edit</UserInfoEditHead>
          <UserInfoEditForm onSubmit={handleFormSubmit}>
            <ImageUploadWrap>
            {imageFile ?  (
                <ImagePreview src={URL.createObjectURL(imageFile)} alt="uploaded" />
              ): <NoImg />}
            <ImageUploadLabel htmlFor="image-upload-input">
               <AiOutlineCloudUpload/><p>Upload Image</p>
            </ImageUploadLabel>
            <ImageUploadInput
                type="file"
                id="image-upload-input"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </ImageUploadWrap>
            <TitleInput
              type="text"
              placeholder="name"
              value={userInfo.name}
              onChange={(event) =>
                setUserInfo({ ...userInfo, name: event.target.value })
              }
            />
            <TitleInput
              type="text"
              placeholder="Title"
              value={userInfo.title}
              onChange={(event) =>
                setUserInfo({ ...userInfo, title: event.target.value })
              }
            />
            <IntroductionTextarea
              placeholder="Introduction"
              value={userInfo.intro}
              onChange={(event) =>
                setUserInfo({ ...userInfo, intro: event.target.value })
              }
            />
            <SignupButton type="submit"
            >Save Changes</SignupButton>
          </UserInfoEditForm>
        </div>
      </MainSection>
    </UserInfoEditWrap>
  );
}

export default UserInfoEdit;