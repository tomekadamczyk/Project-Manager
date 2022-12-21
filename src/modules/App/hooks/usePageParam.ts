import { useSearchParams } from "react-router-dom";

export function usePageParam() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page'));

    let pageQueryVariable = isNaN(page) || page === 0 ? 0 : page - 1;

    function onPageSet(index: number) {
        searchParams.set('page', `${index + 1}`);
        setSearchParams(searchParams)
    }

    return {
        pageSearchQueryParam: page,
        pageQueryVariable,
        onPageSet
    }
}