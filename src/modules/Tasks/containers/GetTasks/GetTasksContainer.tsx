import { GetTasksTable } from './GetTasksTable';
import { Filters } from 'modules/Tasks/components/filters/FIlters';
import { Limit } from 'modules/Tasks/components/Limit/Limit';
    
const filters = [
    { key: 'priorityId', label: 'Priorytet' },
    { key: 'statusId', label: 'Status' },
    { key: 'projectId', label: 'Projekt' }
]

export function GetTasksContainer() {

    return (
        <>  
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 40}}>
                <Filters type="task" filters={filters} />
                <Limit />
            </div>
            <GetTasksTable />
        </>
    )
}