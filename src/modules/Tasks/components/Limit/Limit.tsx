import Select from "modules/App/components/UI/Form/Select/Select";
import { useLimitParam } from "modules/App/hooks/useLImitParam";

export function Limit() {
    const { limitQueryVariable, onResultsLimitChange } = useLimitParam();
    
    return (
        <div style={{display: 'inline-block', justifyContent: 'flex-end' }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: 10}}>Wyświetl</span>
                <Select value={`${limitQueryVariable}`}defaultValue="choose" testid='items-select-options' update={onResultsLimitChange} >
                    <option key={10} value={10}>{10}</option>
                    <option key={15} value={15}>{15}</option>
                    <option key={20} value={20}>{20}</option>
                </Select>
            </div>
    </div>
    )
}