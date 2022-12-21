import { clear } from 'console';
import { ChangeEvent, MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useFilterQueryParams() {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = searchParams.get('filter')
    const filters = params ? JSON.parse(params) as any[] : [];

    function transformFiltersArrayToObject() {
        return filters.reduce((acc, param) => {
            acc = {
                ...acc,
                ...param
            }
            return acc
        }, {})
    }

    function getExistingParamInFiltersArray(filters: any[], searchingKey: string) {
        return filters.findIndex(filter => searchingKey in filter)
    }

    function composeFiltersParams(filters: any[], element: any, index: number) {
        const dest = [...filters]
        if(index > -1) dest[index] = element
        else dest.push(element)
        return dest
    }

    function onFilterClick(e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) {
        const filter = { [e.target.name]: e.target.value }

        const existingFilterIndex = getExistingParamInFiltersArray(filters, e.target.name);
        const dest = composeFiltersParams(filters, filter, existingFilterIndex);
        
        searchParams.set('filter', JSON.stringify(dest));
        setSearchParams(searchParams);
    }

    function clear() {
        searchParams.delete('filter');
        setSearchParams(searchParams);
    }

    return { filters: transformFiltersArrayToObject(), onFilterClick, clear }
}

export function useGetWithSortParams(params: any[]) {
    const [searchParams, setSearchParams] = useSearchParams();
    let orderByVariablesObject = params.reduce((acc, item) => {
        
        if(searchParams.get(item)) {
            acc[item] = searchParams.get(item)
        }
        
        return acc
    }, {})

    function onSortClick(e: MouseEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement | HTMLElement>) {
        const buttonTarget = e.target as HTMLButtonElement;
        searchParams.set(buttonTarget.name, buttonTarget.value);
        setSearchParams(searchParams)
    }

    return { orderByVariablesObject, onSortClick }
}

export function useGetWithSearchParams() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page'));
    const limit = Number(searchParams.get('limit'));

    let pageQueryVariable = isNaN(page) || page === 0 ? 0 : page - 1;
    let limitQueryVariable = isNaN(limit) || limit === 0 ? 10 : limit;

    function onPageSet(index: number) {
        searchParams.set('page', `${index + 1}`);
        setSearchParams(searchParams)
    }

    function onResultsLimitChange(e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) {
        searchParams.set('limit', `${Number(e.target.value)}`);
        setSearchParams(searchParams)
    }

    function onSortChange(e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) {
        const buttonTarget = e.target as HTMLButtonElement;
        searchParams.set(buttonTarget.name, buttonTarget.value);
        setSearchParams(searchParams)
    }

    return {
        pageSearchQueryParam: page,
        pageQueryVariable,
        limitQueryVariable,
        onPageSet,
        onResultsLimitChange,
        onSortChange
    }
}
