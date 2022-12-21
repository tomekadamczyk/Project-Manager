
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { TaskRow } from '../../components/TaskRow';
import Spinner from 'modules/App/components/UI/Spinner/Spinner';
import { Pagination } from 'modules/App/components/Pagination/Pagination';
import { GET_TASKS_PAGINATED } from 'queries/query/getTasks';
import { useQuery } from '@apollo/client';
import { PaginatedTasksData, Task } from '../../types';
import { MouseEvent } from 'react';
import { usePageParam } from 'modules/App/hooks/usePageParam';
import { useLimitParam } from 'modules/App/hooks/useLImitParam';
import { useSortParam } from 'modules/App/hooks/useSortParam';
import { useFilterQueryParam } from 'modules/App/hooks/useFilterQueryParam';

interface GetTasksQueryVariables {
    offset: number;
    limit: number;
    orderBy: any
    filter: any;
}

interface Action { value: string, name: string, action: (e: MouseEvent<HTMLButtonElement>) => void };


function HeaderWithActions({ title, actionUp, actionDown }: { title: string; actionUp: Action; actionDown: Action; }) {

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{marginRight: 10}}>{title}</div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <button 
                    style={{ background: '#fff', borderColor: 'transparent', padding: 0, lineHeight: '8px', cursor: 'pointer' }} 
                    value={actionUp.value} 
                    name={actionUp.name} 
                    onClick={actionUp.action}
                >
                    <i style={{pointerEvents: 'none', lineHeight: '8px'}} className="fas fa-angle-up"></i>
                </button>
                <button 
                    style={{ background: '#fff', borderColor: 'transparent', padding: 0, lineHeight: '8px', cursor: 'pointer' }} 
                    value={actionDown.value} 
                    name={actionDown.name} 
                    onClick={actionDown.action}
                >
                    <i style={{pointerEvents: 'none', lineHeight: '8px'}} className="fas fa-angle-down"></i>
                </button>
            </div>
        </div>
    )
}

const TaskTableLabels = {
    id: 'ID',
    name: 'Zadanie',
    status: 'Status',
    priotity: 'Priorytet',
    project: 'Projekt'
}

export function GetTasksTable() {
    const { pageQueryVariable, pageSearchQueryParam, onPageSet} = usePageParam();
    const { limitQueryVariable } = useLimitParam();
    const { sort, onSortClick } = useSortParam()
    const { filters } = useFilterQueryParam();
    
    const { loading, error, data } = useQuery<PaginatedTasksData, GetTasksQueryVariables>(GET_TASKS_PAGINATED, {
        variables: {
            offset: pageQueryVariable * limitQueryVariable,
            limit: limitQueryVariable, 
            orderBy: sort,
            filter: filters
        },
    });
    
    if(loading) return <Spinner />;
    if(error) return <p>Nie mogę pobrać zadań</p>;
    if(!data || !data.tasksPaginated || !data.tasksPaginated.edges) return <p>Brak zadań</p>;
    
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Lp</TableCell>
                        <TableCell>
                            <HeaderWithActions 
                                title={TaskTableLabels.name}
                                actionUp={{
                                    name: "name",
                                    value: "asc",
                                    action: onSortClick
                                }}
                                actionDown={{
                                    name: "name",
                                    value: "desc",
                                    action: onSortClick
                                }}
                            />
                        </TableCell>
                        <TableCell>{TaskTableLabels.project}</TableCell>
                        <TableCell>
                            <HeaderWithActions 
                                title={TaskTableLabels.status}
                                actionUp={{
                                    name: "statusId",
                                    value: "asc",
                                    action: onSortClick
                                }}
                                actionDown={{
                                    name: "statusId",
                                    value: "desc",
                                    action: onSortClick
                                }}
                            /></TableCell>
                        <TableCell>{TaskTableLabels.priotity}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.tasksPaginated.edges.map((task, index) => {
                        return <TaskRow key={index}
                        id={task.id} 
                        name={task.name}
                        project={task.projectId.name}
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