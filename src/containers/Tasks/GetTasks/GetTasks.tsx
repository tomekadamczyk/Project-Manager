
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { TaskRow } from '../TaskRow';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { GET_ALL_TASKS } from 'queries/query/getTasks';
import { useQuery } from '@apollo/client';
import { TasksData } from '../types';

export function GetTasks() {
    const { loading, error, data } = useQuery<TasksData>(GET_ALL_TASKS);

    if(loading) return <Spinner />;
    if(error) return <p>Nie mogę pobrać zadań</p>;
    if(!data || !data.tasks.length) return <p>Brak zadań</p>;

    return (
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
                {data.tasks.map((task, index) => {
                    return <TaskRow key={task.id}
                    id={index + 1} 
                    name={task.name}
                    project={task.projectsId.name}
                    status={task.statusId.name}
                    priority={task.priorityId.name}
                    />
                })}
            </TableBody>
        </Table>
    )
}