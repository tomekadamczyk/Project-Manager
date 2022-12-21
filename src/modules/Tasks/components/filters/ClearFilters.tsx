
import { useFilterQueryParams } from 'modules/App/components/Pagination/usePaginations';
import Button from 'modules/App/components/UI/Button/Button';

export function ClearFilters() {
    
    const { filters, clear } = useFilterQueryParams();

    return (
        <Button disabled={!Object.keys(filters).length} onClick={clear}>Clear</Button>
    )
}