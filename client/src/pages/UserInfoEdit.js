import styled from "styled-components";

const UserInfoEditWrap = styled.main`
    
    article{
        width: 100vw;
        margin:15vh 0;
        display: flex;
        height: 80vh;
        aside{
        background-color:#F1F2F3;
        width: 20vw;
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
            width: 80%;
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
            margin-bottom: 0.4rem;
        }
        input{
            display: block;
            margin-bottom: 1rem;
            padding: 0.5rem;
            font-size: 1rem;
            border: 1px solid gray;
            border-radius: 0.25rem;
            box-sizing: border-box;
            :first-child{
                width: 20rem;
            }
        }
        textarea{
            display: block;
        }
        button{
            padding: 0.5rem;
            margin-top: 4rem;
        }
        }
    }
`
const Image = styled.div`
    width: 10rem;
    height: 10rem;
    background-color: #ccc;
    line-height: 10rem;
    text-align: center;
    margin-bottom: 2rem;
`
const UserInfoEdit = () => {

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
                    <Image>upload image</Image>
                    <label>display name</label>
                    <input/>
                    <label>title</label>
                    <input/>
                    <label>about me</label>
                    <textarea/>
                    <button>save profile</button>
                </div>
            </article>
        </UserInfoEditWrap>
    )
}
export default UserInfoEdit