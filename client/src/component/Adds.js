import styled from "styled-components";

export const SidebarWrapper = styled.span`
    position: sticky;
    display: flex;
    flex-direction: column;
    min-height: 80vh;
    padding-top: 50vh;
    margin-right: 3vh;
    width: 20vw;
    border: 1px solid red;
`;

const Adds = () => {
    return (
        <SidebarWrapper>
        </SidebarWrapper>
    );
};

export default Adds;
