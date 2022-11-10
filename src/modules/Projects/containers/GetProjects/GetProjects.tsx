import { useQuery } from "@apollo/client";
import Spinner from "modules/App/components/UI/Spinner/Spinner";
import { GET_ALL_PROJECTS } from "queries/query/getProjects";
import ProjectRow from "./ProjectRow";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { ProjectsData } from "../../types";

export const GetProjects = () => {

    const { loading, error, data } = useQuery<ProjectsData>(GET_ALL_PROJECTS);

    if(loading) return <Spinner />;
    if(error) return <p>Nie mogę pobrać klientów</p>;
    if(!data) return <p>Brak klientów</p>;

    return(
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
                {data.projects.map((project, index) => {
                    return <ProjectRow key={project.id}
                        id={project.id} 
                        name={project.name}
                        tasks={project.tasks.length}
                        status={project.statusId.name}
                        priority={project.priorityId.name}
                        client={project.clientId.name}
                    />
                })}
            </TableBody>
        </Table>
    )
}