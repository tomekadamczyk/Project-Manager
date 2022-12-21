import Button from 'modules/App/components/UI/Button/Button';
import { useFilterQueryParam } from 'modules/App/hooks/useFilterQueryParam';

export function ClearFilters() {
    
    const { filters, clear } = useFilterQueryParam();

    return (
        <Button disabled={!Object.keys(filters).length} onClick={clear}>Clear</Button>
    )
}