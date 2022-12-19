import { Fragment } from "react";
import styled from "styled-components";
import { PageButton, PageButtonStyle } from "./PageButton";
import { paginationFunctions } from "./paginationFunctions";

interface PaginationProps {
    operations: {
        onPageSet: (index: number) => void;
    }
    data: {
        totalCount: number;
        currentPage: number;
        pageSize: number;
    }
}

const PageButtonComponent = styled.div`
    padding: 10px;
`;

function ButtonsSet({ setPageIndex, currentPage, pagesCount, minPageLimit, maxPageLimit }: { setPageIndex: (number: number) => void; currentPage: number; pagesCount: number; minPageLimit: number; maxPageLimit: number; }) {

    const pages = [];
    for(let i = 1 ; i <= pagesCount; i++){
        pages.push(i);
    }
    
    return (
        <>
            {pages.map((item, index) => {
                const page = index + 1;
                
                if(minPageLimit > 0 && index === 0) {
                    return (
                        <Fragment key={page} >
                            <PageButton isActive={currentPage === page} count={page} onClick={() => setPageIndex(index)} />
                            <span style={{color: "#ccc"}}>&hellip;</span>
                        </Fragment>
                    )
                }

                if(index >= minPageLimit && index <= maxPageLimit) { 
                    return (
                        <PageButton isActive={currentPage === page} key={page} count={page} onClick={() => setPageIndex(index)} />
                    )
                }

                if(page === pagesCount) {
                    return (
                        <Fragment key={page} >
                            <span style={{color: "#ccc"}}>&hellip;</span>
                            <PageButton isActive={currentPage === page} count={page} onClick={() => setPageIndex(index)} />
                        </Fragment>
                    )
                }
            })}
        </>
    )
}

export function Pagination({ operations, data }: PaginationProps) {
    const { onPageSet } = operations;
    const { totalCount, currentPage, pageSize } = data;
    const pagesCount = Math.ceil(totalCount/pageSize);
    const {
        maxPageLimit,
        minPageLimit,
        onNextPageSet,
        onPrevPageSet,
        setPageIndex
    } = paginationFunctions({ onPageSet, currentPage, pagesCount })
    
    return (
        <>
            <PageButtonComponent>
                <PageButtonStyle disabled={currentPage === 1} onClick={onPrevPageSet}>
                    <i className="fas fa-angle-left"></i>
                </PageButtonStyle>
                    
                <ButtonsSet currentPage={currentPage} pagesCount={pagesCount} minPageLimit={minPageLimit} maxPageLimit={maxPageLimit} setPageIndex={setPageIndex} />
                    
                <PageButtonStyle disabled={currentPage === pagesCount} onClick={onNextPageSet}>
                    <i className="fas fa-angle-right"></i>
                </PageButtonStyle>
            </PageButtonComponent>
        </>
    )
}