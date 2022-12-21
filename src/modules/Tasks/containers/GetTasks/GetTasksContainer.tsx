import { GetTasksTable } from './GetTasksTable';
import { Filters } from 'modules/Tasks/components/filters/FIlters';

export function GetTasksContainer() {
    
    return (
        <>  
            <Filters />
            <GetTasksTable />
        </>
    )
}