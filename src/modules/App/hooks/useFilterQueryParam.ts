import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useFilterQueryParam() {
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
        if(index > -1) {
            dest[index] = element
            Object.keys(element).find(key => {
                if(element[key] === "choose") {
                    dest.splice(index, 1)
                }
            });
            
        }
        else dest.push(element)
        return dest
    }

    function onFilterClick(e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) {
        const filter = { [e.target.name]: e.target.value }

        const existingFilterIndex = getExistingParamInFiltersArray(filters, e.target.name);
        const dest = composeFiltersParams(filters, filter, existingFilterIndex);
        
        searchParams.set('filter', JSON.stringify(dest));
        if(!dest.length) {
            searchParams.delete('filter');
        }
        setSearchParams(searchParams);
    }

    function clear() {
        searchParams.delete('filter');
        setSearchParams(searchParams);
    }

    return { filters: transformFiltersArrayToObject(), onFilterClick, clear }
}

