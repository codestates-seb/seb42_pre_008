import styled from "styled-components";
import { FaStackOverflow } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { HiPencil } from "react-icons/hi";

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
                    <p id="blue">Create a custom filter</p>
                </GreyContent>
            </Grey>
            <Grey>
                <GreyTitle>Watched Tags</GreyTitle>
                <GreyContent className="exceptions">
                    <Img
                        src="/image/magnifyingGlass.png"
                        alt="magnifyingGlass"
                    />
                    <p>Watch tags to curate your list of</p>
                    <p>questions.</p>
                    <button>
                        <i>@</i>Watch a tag
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
        width: 250px;
        font-size: 15px;
        color: #3b4044;
        &#blue {
            color: #0074cc;
        }
        /* border: 1px solid red; */
    }
    span {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 200px;
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
`;
