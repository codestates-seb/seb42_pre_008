import styled from "styled-components";
import { useState } from "react";

const UserInfoEditWrap = styled.main`
    
    article{
        width: 100vw;
        margin:15vh 0;
        display: flex;
        height: 100vh;
        aside{
        background-color:#F1F2F3;
        width: 40vw;
        text-align: center;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        margin-left: 15vw;
        div{
            :first-child{
                margin-top: 2vh;
            }
            background-color: #fff;
            width: 8rem;
            margin: 0 1rem;
            margin-bottom: 2vh;
            border: 1px solid #232629;
            box-sizing: border-box;
            padding: 1vh 0;
            color: #232629;
            font-size: 0.8rem;
            p{
                margin: 0.3rem 0;
                font-size: 1.4rem;
            }
        }
        }
        >div{
        width: 80vw;
        margin-right: 15vw;
        padding: 1rem;
        h1{
                font-size: 27px;
                padding: 24px 0;
                font-weight: 400;
                color: #232629;
                border-bottom: 1px solid #232629;
                margin-bottom: 30px;
            }
        label{
            display: block;
        }
        textarea{
            display: block;
            padding: 0.5rem;
            font-size: 1rem;
            border: 1px solid gray;
            border-radius: 0.25rem;
            box-sizing: border-box;
            margin-top: 0.4rem;
            margin-bottom: 1rem;
            resize: none;
        }
        button{
            padding: 0.5rem;
            margin-top: 2rem;
        }
        input{
            margin-bottom: 2rem;
            margin-top: 1rem;
        }
        }
    }
`
const SaveButton = styled.button`
    height: 37px;
    border-radius: 0.3vh;
    background-color: #0995ff;
    color: white;
    border: 1px solid #477199;
    box-shadow: inset 0px 0px 0px 0px #54a3f7;
    margin-top: 1.8rem;
    font-size: 1rem;
    cursor: pointer;
    :hover {
        background-color: #3172c6;
    }
`;

const Image = styled.div`
    width: 10rem;
    height: 10rem;
    background-color: #ccc;
    line-height: 10rem;
`
const UserInfoEdit = ({userInfo}) => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const [name, setName] = useState(userInfo.name);

    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");
    const [error, setError] = useState("")
    
    //save profile 버튼 클릭시
    const handleSubmit = (event) => {

    }
    
    //이미지 변경시 반영 코드    
    const handleChangeImg = event => {
        setFile(event.target.files[0]);
    
        const reader = new FileReader();
        reader.onload = function(event) {
            setImageUrl(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
        }

    return(
        <UserInfoEditWrap>
            <article>
                <aside>
                    <div><p>12</p>Qeustion</div>
                    <div><p>12</p>Answer</div>
                    <div><p>12</p>tags</div>
                </aside>
                <div>
                    <h1>Edit your profile</h1>

                    <Image />
                    <input type="file" onChange={handleChangeImg}/>
                    {imageUrl && <img src={imageUrl} alt="Uploaded image" />}
                    <label>display name</label>
                    <textarea
                        onChange={ (e) => setName(e.target.value)} 
                        value ={name} 
                        autoFocus={true}
                        rows="1"/>
                    <label>title</label>
                    <textarea
                        onChange={ (e) => setTitle(e.target.value)} 
                        value ={title}
                        rows="1" cols="80"/>
                    <label>about me</label>
                    <textarea
                        onChange={ (e) => setContent(e.target.value)} 
                        value ={content} 
                        rows="5" cols="80"/>
                    <SaveButton>save profile</SaveButton>
                </div>
            </article>
        </UserInfoEditWrap>
    )
}
export default UserInfoEdit