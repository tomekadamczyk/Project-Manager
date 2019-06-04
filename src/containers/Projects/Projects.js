import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ProjectRow from './ProjectRow';
import { NavLink, Route } from 'react-router-dom';
import styled from 'styled-components';
import FullProject from './FullProject';
import Spinner from '../../components/UI/Spinner/Spinner';

const GET_PROJECTS = gql`
    query Projects {
        projects {
            id,
            name,
            tasks {
                name
            },
            statusId {
                name
            },
            priorityId {
                name
            },
            clientId {
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

class Projects extends Component {
    
    projectSelected = (id) => {
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
                        <TableCell>Project</TableCell>
                        <TableCell>Tasks</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Client</TableCell>
                        <TableCell>Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Query query={GET_PROJECTS}>
                        {({loading, error, data, refetch}) => {
                            if(loading) return <TableRow><TableCell><Spinner/></TableCell></TableRow>;
                            if(error) return <TableRow><TableCell>Nie mogę pobrać projektów</TableCell></TableRow>;

                            return(
                                <>
                                    {data.projects.map(project => {
                                        return <ProjectRow key={project.id}
                                        id={project.id} 
                                        name={project.name}
                                        tasks={project.tasks.length}
                                        status={project.statusId.name}
                                        priority={project.priorityId.name}
                                        client={project.clientId.name}
                                        clicked={() => this.projectSelected(project.id)} 
                                        />
                                    })}
                                </>
                            )
                        }}
                    </Query>
                </TableBody>
            </Table>
            <RoundButton>
                <Link to='/projects/add-project'>+</Link>
            </RoundButton>
            </>
        )
    }
}

export default Projects;