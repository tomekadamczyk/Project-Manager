
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { TaskRow } from '../../components/TaskRow';
import Spinner from 'modules/App/components/UI/Spinner/Spinner';
import { Pagination } from 'modules/App/components/Pagination/Pagination';
import Select from '../../../App/components/UI/Form/Select/Select'
import { GET_TASKS_PAGINATED } from 'queries/query/getTasks';
import { useQuery } from '@apollo/client';
import { PaginatedTasksData } from '../../types';
import { useGetWithSearchParams } from 'modules/App/components/Pagination/usePaginations';

interface GetTasksQueryVariables {
    offset: number;
    limit: number;
}

export function GetTasksContainer() {
    const { pageQueryVariable, pageSearchQueryParam, limitQueryVariable, onPageSet, onResultsLimitChange } = useGetWithSearchParams()
    
    const { loading, error, data } = useQuery<PaginatedTasksData, GetTasksQueryVariables>(GET_TASKS_PAGINATED, {
        variables: {
            offset: pageQueryVariable * limitQueryVariable,
            limit: limitQueryVariable 
        }
    });
    
    if(loading) return <Spinner />;
    if(error) return <p>Nie mogę pobrać zadań</p>;
    if(!data || !data.tasksPaginated || !data.tasksPaginated.edges) return <p>Brak zadań</p>;
    
    return (
        <>
            <div style={{display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <span style={{marginBottom: 10, marginRight: 10}}>Wyświetl</span>
                <Select value={`${limitQueryVariable}`}defaultValue="choose" testid='items-select-options' update={onResultsLimitChange} >
                    <option key={10} value={10}>{10}</option>
                    <option key={15} value={15}>{15}</option>
                    <option key={20} value={20}>{20}</option>
                </Select>
                </div>
            </div>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Lp</TableCell>
                        <TableCell>Task</TableCell>
                        <TableCell>Project</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Priority</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.tasksPaginated.edges.map((task, index) => {
                        return <TaskRow key={index}
                        id={task.id} 
                        name={task.name}
                        project={task.projectsId.name}
                        status={task.statusId.name}
                        priority={task.priorityId.name}
                        />
                    })}
                </TableBody>
            </Table>

            {data.tasksPaginated.totalCount > limitQueryVariable 
                ?
                <div style={{position: 'relative'}}>
                    <div style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 10}}>
                        <Pagination 
                            operations={{
                                onPageSet
                            }} 
                            data={{
                                totalCount: data.tasksPaginated.totalCount,
                                currentPage: pageSearchQueryParam === 0 ? 1 : pageSearchQueryParam,
                                pageSize: limitQueryVariable
                            }}
                        />
                    </div>
                </div>
                :
                null
            }
        </>
    )
}