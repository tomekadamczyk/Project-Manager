import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useGetWithSearchParams() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page'));
    const limit = Number(searchParams.get('limit'));

    let pageQueryVariable = isNaN(page) || page === 0 ? 0 : page - 1;
    let limitQueryVariable = isNaN(limit) || limit === 0 ? 10 : limit;

    function onPageSet(index: number) {
        setSearchParams(prev => {
            if(prev.get('limit')) {
                return {
                    page: `${index + 1}`,
                    limit: `${prev.get('limit')}`
                }
            }
            return {
                page: `${index + 1}`,
                limit: `${limitQueryVariable}`
            }
        })
    }

    function onResultsLimitChange(e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) {
        setSearchParams(prev => {
            if(prev.get('page')) {
                return {
                    page: `${prev.get('page')}`,
                    limit: `${Number(e.target.value)}`
                }
            }
            return {
                page: `${pageQueryVariable + 1}`,
                limit: `${Number(e.target.value)}`
            }
        })
    }

    return {
        pageSearchQueryParam: page,
        pageQueryVariable,
        limitQueryVariable,
        onPageSet,
        onResultsLimitChange
    }
}
