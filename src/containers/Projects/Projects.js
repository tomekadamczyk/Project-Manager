import { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Query } from "react-apollo";
import ProjectRow from './ProjectRow';
import Spinner from '../../components/UI/Spinner/Spinner';
import { GET_ALL_PROJECTS } from 'queries/query/getProjects';
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Query query={GET_ALL_PROJECTS}>
                        {({loading, error, data, refetch}) => {
                            if(loading) return <TableRow><TableCell><Spinner/></TableCell></TableRow>;
                            if(error) return <TableRow><TableCell>Nie mogę pobrać projektów</TableCell></TableRow>;

                            return(
                                <>
                                    {data.projects.map((project, index) => {
                                        return <ProjectRow key={project.id}
                                        id={index + 1} 
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
            </>
        )
    }
}

export default Projects;