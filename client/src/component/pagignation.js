import styled from "styled-components";

const Pagination = ({ total, limit, page, setPage, setLimit }) => {
    const numPages = Math.ceil(total / limit);
    return (
        <PaginationLayout>
            <Block>
                <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    prev
                </Button>
                {Array(numPages)
                    .fill()
                    .map((_, i) => (
                        <Button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            className={page === i + 1 ? "current" : null}
                        >
                            {i + 1}
                        </Button>
                    ))}
                <Button
                    onClick={() => setPage(page + 1)}
                    disabled={page === numPages}
                >
                    next
                </Button>
            </Block>
            <Block>
                <Button
                    value="3"
                    className={limit === 3 ? "current" : null}
                    onClick={(e) => setLimit(Number(e.target.value))}
                >
                    3
                </Button>
                <Button
                    value="5"
                    className={limit === 5 ? "current" : null}
                    onClick={(e) => setLimit(Number(e.target.value))}
                >
                    5
                </Button>
                <Button
                    value="15"
                    className={limit === 15 ? "current" : null}
                    onClick={(e) => setLimit(Number(e.target.value))}
                >
                    15
                </Button>
                <span></span>per page
            </Block>
        </PaginationLayout>
    );
};

export default Pagination;

const PaginationLayout = styled.article`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    width: 900px;
`;
const Block = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin: 30px;
`;
const Button = styled.button`
    padding: 3px 6px;
    font-size: 15px;
    background: white;
    border: 1px solid #d5d9db;
    border-radius: 3px;
    &:hover {
        cursor: pointer;
        background: #d7d9dc;
        color: black;
        border: 1px solid #c1c5ca;
    }
    &[disabled] {
        cursor: revert;
        transform: revert;
    }
    &.current {
        color: white;
        background-color: #f48224;
        border: 1px solid #f48224;
    }
`;
