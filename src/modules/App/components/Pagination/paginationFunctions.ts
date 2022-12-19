
interface UsePaginationProps {
    onPageSet: (index: number) => void;
    currentPage: number;
    pagesCount: number;
}

export function paginationFunctions({ onPageSet, currentPage, pagesCount }: UsePaginationProps) {
    
    function maxPageLimit() {
        if(currentPage === pagesCount) {
            return currentPage
        }
        return currentPage + 1
    };

    function minPageLimit() {
        if(currentPage -1 < 0) {
            return 0
        }
        if(currentPage === pagesCount) {
            return currentPage - 3
        }
        if(currentPage === pagesCount - 1) {
            return currentPage - 2
        }
        return currentPage - 1
    };

    function setPageIndex(index: number) {
        onPageSet(index)
    }
    
    function onPrevPageSet() {
        setPageIndex(currentPage - 2)
    }

    function onNextPageSet() {
        setPageIndex(currentPage)
    }

    return {
        onPrevPageSet,
        onNextPageSet,
        setPageIndex,
        maxPageLimit: maxPageLimit(),
        minPageLimit: minPageLimit(),
    }
}