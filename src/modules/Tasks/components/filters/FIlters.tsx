import Select from "modules/App/components/UI/Form/Select/Select";
import { ClearFilters } from "./ClearFilters";
import { GET_FILTERS } from "queries/query/getTasks";
import { Filter } from "./FIlter";
import { useState } from "react";
import Button from "modules/App/components/UI/Button/Button";

interface FilterProps {
    key: string;
    label: string;
}
interface FiltersProps {
    type: string;
    filters: FilterProps[];
}

export function Filters({ type, filters }: FiltersProps) {

    const [filtersShown, setFiltersShown] = useState(false);

    function toggleFilters() {
        setFiltersShown(!filtersShown)
    }

    return (
        <div>
            <div style={{marginBottom: 10}}>
                <Button onClick={toggleFilters}>{!filtersShown ? 'Pokaż filtry' : 'Schowaj filtry'}</Button>
            </div>
            
            {filtersShown ?
                <div style={{display: 'flex', alignItems: 'end'}}>
                    <div>
                        {filters.map(filter => {
                            return (
                                <div key={filter.key} style={{display: 'inline-block', marginRight: 10}}>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <div style={{fontSize: 12, marginBottom: 5}}>{filter.label}</div>
                                        <Filter query={GET_FILTERS(type, filter.key)} filterKey={filter.key} />
                                    </div>
                                </div> 
                            )
                        })}
                        
                    </div>
                    <div style={{display: 'inline-block', justifyContent: 'flex-end' }}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <ClearFilters />
                        </div>
                    </div>
                </div>
                :
                <div></div>
            }
        </div>
    )
}