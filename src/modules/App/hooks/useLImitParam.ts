import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";


export function useLimitParam() {
    const [searchParams, setSearchParams] = useSearchParams();
    const limit = Number(searchParams.get('limit'));
    let limitQueryVariable = isNaN(limit) || limit === 0 ? 10 : limit;

    function onResultsLimitChange(e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) {
        searchParams.set('limit', `${Number(e.target.value)}`);
        setSearchParams(searchParams)
    }

    return {
        limitQueryVariable,
        onResultsLimitChange
    }
}