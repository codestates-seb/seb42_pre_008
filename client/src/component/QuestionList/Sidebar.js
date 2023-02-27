import styled from "styled-components";
import { RiEarthFill } from "react-icons/ri";
import { TiStarburst } from "react-icons/ti";
import { RiInformationFill } from "react-icons/ri";
import { AiOutlineTeam } from "react-icons/ai";

export const SidebarWrapper = styled.span`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 180px;
    min-height: 100%;
    /* border: 1px solid magenta; */
`;
export const Home = styled.div`
    display: flex;
    align-items: center;
    height: 5vh;
    padding-top: 20px;
    padding-left: 15px;
    font-size: 14px;
    color: #51595f;
    /* border: 1px solid pink; */
`;
export const Mini = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 182px;
    color: #6a737c;
    font-size: 13px;
    padding-top: 1.5vh;
    padding-bottom: 1vh;
    /* padding-left: 15px; */
    /* border: 1px solid magenta; */
    span {
        margin: 0 15px;
    }
`;
export const Questions = styled.div`
    display: flex;
    align-items: center;
    width: 163px;
    height: 5vh;
    padding-left: 15px;
    border-right: 4px solid #f48224;
    font-size: 14px;
    font-weight: bold;
    background-color: #f1f2f3;
`;
export const Else = styled.div`
    display: flex;
    align-items: center;
    height: 5vh;
    padding-left: 2vw;
    font-size: 14px;
    color: #51595f;
    /* border: 1px solid burlywood; */
`;
export const Collectives = styled.div`
    display: flex;
    align-items: center;
    height: 5vh;
    padding-left: 1vw;
    font-size: 14px;
    color: #51595f;
    .star {
        color: #f48224;
    }
    /* border: 1px solid brown; */
`;
export const Icon = styled.span`
    font-size: 20px;
    margin-right: 0.5vw;
`;

const Sidebar = () => {
    return (
        <SidebarWrapper>
            <Home>Home</Home>
            <Mini>
                <span>PUBLIC</span>
                <span></span>
            </Mini>
            <Questions>
                <Icon>
                    <RiEarthFill />
                </Icon>
                Questions
            </Questions>
            <Else>Tags</Else>
            <Else>Users</Else>
            <Else>Companies</Else>
            <Mini>
                <span>COLLECTIVES</span>
                <span>
                    <RiInformationFill />
                </span>
            </Mini>
            <Collectives>
                <Icon>
                    <TiStarburst className="star" />
                </Icon>
                Explore Collectives
            </Collectives>
            <Mini>
                <span>TEAMS</span>
                <span>
                    <RiInformationFill />
                </span>
            </Mini>
            <Collectives>
                <Icon>
                    <AiOutlineTeam className="star" />
                </Icon>
                Create free Team
            </Collectives>
        </SidebarWrapper>
    );
};

export default Sidebar;
