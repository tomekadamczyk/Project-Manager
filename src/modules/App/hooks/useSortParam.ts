import { MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";

export function useSortParam() {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = searchParams.get('sort');
    const sortings = params ? JSON.parse(params) as any[] : [];
    
    function transformSortArrayToObject() {
        return sortings.reduce((acc, param) => {
            acc = {
                ...acc,
                ...param
            }
            return acc
        }, {})
    }

    function getExistingParamInSortingsArray(sortings: any[], searchingKey: string) {
        return sortings.findIndex(sorting => searchingKey in sorting)
    }

    function composeSortParams(sortings: any[], element: any, index: number) {
        const dest = [...sortings]
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

    function onSortClick(e: MouseEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement | HTMLElement>) {
        const buttonTarget = e.target as HTMLButtonElement;

        const sortItem = { [buttonTarget.name]: buttonTarget.value }

        const existingSortIndex = getExistingParamInSortingsArray(sortings, buttonTarget.name);
        const dest = composeSortParams(sortings, sortItem, existingSortIndex);
        
        searchParams.set('sort', JSON.stringify(dest));
        if(!dest.length) {
            searchParams.delete('sort');
        }
        setSearchParams(searchParams);
    }

    return { sort: transformSortArrayToObject(), onSortClick }
}