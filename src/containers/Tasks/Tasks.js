import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import TaskRow from './TaskRow';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../../components/UI/Spinner/Spinner';

const GET_TASKS = gql`
    query Tasks {
        tasks {
            id,
            name,
            projectsId {
                name
            },
            statusId {
                name
            },
            priorityId {
                name
            }
        }
    }
`;

const RoundButton = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ff9900;
    border: none;
    margin-top: 30px;
    transition: background .3s ease-in-out .5s;

    &:hover {
        background: #0099ff;
    }
`;

const Link = styled(NavLink)`
    color: #fff;
    text-decoration: none;
    display: block;
    position: relative;
    top: -2px;
    transition: transform .5s ease-in-out;
    font-size: 30px;

    &:hover {
        transform: rotate(360deg);
    }
`;

class Tasks extends Component {
    
    taskSelected = (id) => {
        this.props.history.push({pathname: '/projects/' + id})
    }

    render() {
        return (
            <>
            <div>PROJECTS</div>
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
                    <Query query={GET_TASKS}>
                        {({loading, error, data, refetch}) => {
                            if(loading) return <TableRow><TableCell><Spinner/></TableCell></TableRow>;
                            if(error) return <TableRow><TableCell>Nie mogę pobrać zadań</TableCell></TableRow>;

                            return(
                                <>
                                    {data.tasks.map(task => {
                                        return <TaskRow key={task.id}
                                        id={task.id} 
                                        name={task.name}
                                        project={task.projectsId.name}
                                        status={task.statusId.name}
                                        priority={task.priorityId.name}
                                        clicked={() => this.projectSelected(task.id)} 
                                        />
                                    })}
                                </>
                            )
                        }}
                    </Query>
                </TableBody>
            </Table>
            <RoundButton>
                <Link to='/tasks/add-task'>+</Link>
            </RoundButton>
            </>
        )
    }
}

export default Tasks;