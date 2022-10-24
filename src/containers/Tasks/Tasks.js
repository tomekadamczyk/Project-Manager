import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import TaskRow from './TaskRow';
import Spinner from '../../components/UI/Spinner/Spinner';
import { GET_ALL_TASKS } from 'queries/query/getTasks';
class Tasks extends Component {
    
    taskSelected = (id) => {
        this.props.history.push({pathname: '/tasks/' + id})
    }

    render() {
        return (
            <>
            <div>TASKS</div>
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
                    <Query query={GET_ALL_TASKS}>
                        {({loading, error, data, refetch}) => {
                            if(loading) return <TableRow><TableCell><Spinner/></TableCell></TableRow>;
                            if(error) return <TableRow><TableCell>Nie mogę pobrać zadań</TableCell></TableRow>;

                            return(
                                <>
                                    {data.tasks.map((task, index) => {
                                        return <TaskRow key={task.id}
                                        id={index + 1} 
                                        name={task.name}
                                        project={task.projectsId.name}
                                        status={task.statusId.name}
                                        priority={task.priorityId.name}
                                        clicked={() => this.taskSelected(task.id)} 
                                        />
                                    })}
                                </>
                            )
                        }}
                    </Query>
                </TableBody>
            </Table>
            </>
        )
    }
}

export default Tasks;