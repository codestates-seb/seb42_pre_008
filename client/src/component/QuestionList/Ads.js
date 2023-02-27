import styled from "styled-components";
import { FaStackOverflow } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { HiPencil } from "react-icons/hi";
import { AiFillEye } from "react-icons/ai";

const Ads = () => {
    return (
        <SidebarWrapper>
            <Yellow>
                <YellowTitle>The Overflow Blog</YellowTitle>
                <YellowContent>
                    <Line>
                        <HiPencil />
                        <span>ML and AI consulting-as-a-service (Ep. 541)</span>
                    </Line>
                    <Line>
                        <HiPencil />
                        <span>
                            Why governments need open source more than ever
                        </span>
                    </Line>
                </YellowContent>
                <YellowTitle>Featured on Meta</YellowTitle>
                <YellowContent>
                    <Line>
                        <FiMessageSquare className="colored" />
                        <span>
                            Ticket smash for [status-review] tag: Part Deux
                        </span>
                    </Line>
                    <Line>
                        <FiMessageSquare className="colored" />
                        <span>
                            We've added a "Necessary cookies only" option to the
                            cookie consent popup
                        </span>
                    </Line>
                    <Line>
                        <FaStackOverflow />
                        <span>The [amazon] tag is being burninated</span>
                    </Line>
                    <Line>
                        <FaStackOverflow />
                        <span>
                            Microsoft Azure Collective launch and proposed tag
                            changes
                        </span>
                    </Line>
                    <Line>
                        <FaStackOverflow />
                        <span>Temporary policy: ChatGPT is banned</span>
                    </Line>
                </YellowContent>
            </Yellow>
            <Grey>
                <GreyTitle>Custom Filters</GreyTitle>
                <GreyContent>
                    <p>Create a custom filter</p>
                </GreyContent>
            </Grey>
            <Grey>
                <GreyTitle>Watched Tags</GreyTitle>
                <GreyContent className="exceptions">
                    <Img
                        src="/image/magnifyingGlass.png"
                        alt="magnifyingGlass"
                    />
                    <span>Watch tags to curate your list of</span>
                    <span>questions.</span>
                    <button>
                        <AiFillEye/>Watch a tag
                    </button>
                </GreyContent>
            </Grey>
            <Grey>
                <GreyTitle>Ignored Tags</GreyTitle>
                <GreyContent className="exceptions">
                    <button>Add an Ignored tag</button>
                </GreyContent>
            </Grey>
        </SidebarWrapper>
    );
};

export default Ads;

export const SidebarWrapper = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 350px;
    height: 1100px;
    padding-top: 25px;
    gap: 15px;
`;
export const Yellow = styled.div`
    border: 1px solid #f1e4bb;
    display: flex;
    flex-direction: column;
    width: 310px;
    box-shadow: 0px 0px 10px #ddeaf7;
`;
export const Grey = styled.div`
    border: 1px solid #f1e4bb;
    display: flex;
    flex-direction: column;
    width: 310px;
    box-shadow: 0px 0px 10px #ddeaf7;
`;
export const YellowTitle = styled.span`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 15px;
    background-color: #fbf2d5;
    font-size: 14px;
    font-weight: bold;
    color: #51595f;
    height: 40px;
    border-top: 1px solid #f1e4bb;
    border-bottom: 1px solid #f1e4bb;
`;
export const YellowContent = styled.span`
    background-color: #fdf7e2;
    color: #3b4044;
`;
export const GreyTitle = styled.span`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 0 5px 15px;
    background-color: #f8f9f9;
    font-size: 15px;
    color: #51595f;
    height: 40px;
    border-top: 1px solid #e3e6e8;
    border-bottom: 1px solid #e3e6e8;
`;
export const GreyContent = styled.span`
    display: flex;
    flex-direction: column;
    padding: 20px;
    &.exceptions {
        justify-content: center;
        align-items: center;
    }
    p {
        font-size: 15px;
        color: #0074cc;
    }
    span {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 230px;
        font-size: 15px;
        color: #6a737c;
    }
    button {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 5px;
        font-size: 13.5px;
        height: 4.3vh;
        padding: 0 1.3vh;
        margin-top: 15px;
        border-radius: 0.3vh;
        background-color: #e3ecf3;
        color: #477199;
        border: 0.9px solid #477199;
        box-shadow: inset 0px 0px 0px 0px #54a3f7;
        :hover {
            background-color: #b9d2e8;
        }
    }
`;
export const Line = styled.span`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 15px;
    .colored {
        color: #70b4db;
    }
    span {
        width: 240px;
        margin-left: 10px;
        font-size: 13.5px;
    }
`;
export const Img = styled.img`
    height: 70px;
    margin-bottom: 15px;
`;
