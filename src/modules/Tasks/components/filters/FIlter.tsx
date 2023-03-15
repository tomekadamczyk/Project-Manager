
import { ChangeEvent } from 'react';
import Spinner from 'modules/App/components/UI/Spinner/Spinner';
import Select from '../../../App/components/UI/Form/Select/Select'
import { DocumentNode, useQuery } from '@apollo/client';
import { useFilterQueryParam } from 'modules/App/hooks/useFilterQueryParam';

export function Filter({ query, filterKey }: { query: DocumentNode, filterKey: string }) {
    const { loading, error, data } = useQuery(query, {
        variables: {
            group: filterKey
        }
    });
    
    const { filters, onFilterClick } = useFilterQueryParam();
    const existingFilter = Object.keys(filters).find(key => key === filterKey);

    if(loading) return <Spinner />;
    if(error) return <p>Nie mogę pobrać filtrów</p>;
    if(!data || !data[Object.keys(data)[0]]) return null;

    return (
        <Select name={filterKey} value={existingFilter ? filters[existingFilter] : "choose"} testid={`${filterKey}-filter-select-options`} update={onFilterClick}>
            <option key={"choose"} value="choose">Wybierz</option>
            {data[Object.keys(data)[0]].map((filter: any) => {
                return (
                    <option key={filter.filter.id} value={filter.filter.id}>{filter.filter.name}</option>
                )
            })}
        </Select>
    )
}