import Select from "modules/App/components/UI/Form/Select/Select";
import { ClearFilters } from "./ClearFilters";
import { GET_FILTER_BY_TASK } from "queries/query/getTasks";
import { Filter } from "./FIlter";
import { useState } from "react";
import Button from "modules/App/components/UI/Button/Button";

const filters = [
    { key: 'priorityId', label: 'Priorytet' },
    { key: 'statusId', label: 'Status' },
    { key: 'projectId', label: 'Projekt' }
]

export function Filters() {

    const [filtersShown, setFiltersShown] = useState(false);

    function toggleFilters() {
        setFiltersShown(!filtersShown)
    }

    return (
        <div style={{marginBottom: 40}}>
            <div style={{marginBottom: 10}}>
                <Button onClick={toggleFilters}>{!filtersShown ? 'Pokaż filtry' : 'Schowaj filtry'}</Button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                {filtersShown ?
                <div style={{display: 'flex', alignItems: 'end'}}>
                    <div>
                        {filters.map(filter => {
                            return (
                                <div key={filter.key} style={{display: 'inline-block', marginRight: 10}}>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <div style={{fontSize: 12, marginBottom: 5}}>{filter.label}</div>
                                        <Filter query={GET_FILTER_BY_TASK(filter.key)} filterKey={filter.key} />
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
                <div></div>}
        
                <div style={{display: 'inline-block', justifyContent: 'flex-end' }}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: 10}}>Wyświetl</span>
                    {/* <Select value={`${limitQueryVariable}`}defaultValue="choose" testid='items-select-options' update={onResultsLimitChange} >
                        <option key={10} value={10}>{10}</option>
                        <option key={15} value={15}>{15}</option>
                        <option key={20} value={20}>{20}</option>
                    </Select> */}
                    <Select defaultValue="choose" testid='items-select-options' update={(e) => console.log(e)} >
                        <option key={10} value={10}>{10}</option>
                        <option key={15} value={15}>{15}</option>
                        <option key={20} value={20}>{20}</option>
                    </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}