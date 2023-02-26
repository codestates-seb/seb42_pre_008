import styled from "styled-components";

const Pagination = ({ total, limit, page, setPage, setLimit }) => {
    const numPages = Math.ceil(total / limit);
    return (
        <PaginationLayout>
            <Nav>
                <NumBtn onClick={() => setPage(page - 1)} disabled={page === 1}>
                    &lt;
                </NumBtn>
                {Array(numPages)
                    .fill()
                    .map((_, i) => (
                        <NumBtn
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            aria-current={page === i + 1 ? "page" : null}
                        >
                            {i + 1}
                        </NumBtn>
                    ))}
                <NumBtn
                    onClick={() => setPage(page + 1)}
                    disabled={page === numPages}
                >
                    Next
                </NumBtn>
            </Nav>
            <PerPage>
                per page &nbsp;
                <select
                    type="number"
                    value={limit}
                    onChange={({ target: { value } }) =>
                        setLimit(Number(value))
                    }
                >
                    <option value="1">1</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                </select>
            </PerPage>
        </PaginationLayout>
    );
};

export default Pagination;

const PaginationLayout = styled.article`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin: 16px;
`;
const NumBtn = styled.button`
    border: 1px solid var(--line-003);
    border-radius: 3px;
    padding: 4px 10px;
    margin: 0;
    color: var(--black-003);
    font-size: var(--font-size-md);
    background: none;

    &:hover {
        cursor: pointer;
        background: var(--black-005);
    }

    &[disabled] {
        cursor: revert;
        transform: revert;
    }

    &[aria-current] {
        font-weight: bold;
        color: white;
        background-color: var(--main-002);
        cursor: revert;
        transform: revert;
    }
`;
const PerPage = styled.label`
    color: var(--black-002);
    font-size: var(--font-size-md);
    & > select {
        border: 1px solid var(--line-003);
        border-radius: 3px;
        padding: 4px 10px;
        margin: 0;
        color: var(--black-003);
        font-size: var(--font-size-md);
    }
`;
