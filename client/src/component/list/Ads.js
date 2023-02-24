import styled from "styled-components";

export const SidebarWrapper = styled.span`
    position: sticky;
    display: flex;
    flex-direction: column;
    min-height: 80vh;
    padding-top: 50vh;
    /* margin-right: 3vh; */
    width: 400px;
    border: 1px solid red;
`;

const Ads = () => {
    return (
        <SidebarWrapper>
        </SidebarWrapper>
    );
};

export default Ads;
