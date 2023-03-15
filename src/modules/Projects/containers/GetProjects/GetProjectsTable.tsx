import { useQuery } from "@apollo/client";
import Spinner from "modules/App/components/UI/Spinner/Spinner";
import { GET_ALL_PROJECTS, GET_PROJECTS_PAGINATED } from "queries/query/getProjects";
import ProjectRow from "./ProjectRow";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { ProjectsData, ProjectsPaginated } from "../../types";
import { usePageParam } from "modules/App/hooks/usePageParam";
import { useLimitParam } from "modules/App/hooks/useLImitParam";
import { useSortParam } from "modules/App/hooks/useSortParam";
import { useFilterQueryParam } from "modules/App/hooks/useFilterQueryParam";
import { Pagination } from "modules/App/components/Pagination/Pagination";

export const GetProjectsTable = () => {
    const { pageQueryVariable, pageSearchQueryParam, onPageSet} = usePageParam();
    const { limitQueryVariable } = useLimitParam();
    const { sort, onSortClick } = useSortParam()
    const { filters } = useFilterQueryParam();

    const { loading, error, data } = useQuery<ProjectsPaginated>(GET_PROJECTS_PAGINATED, {
        variables: {
            offset: pageQueryVariable * limitQueryVariable,
            limit: limitQueryVariable, 
            orderBy: sort,
            filter: filters
        },
    });

    if(loading) return <Spinner />;
    if(error) return <p>Nie mogę pobrać klientów</p>;
    if(!data) return <p>Brak klientów</p>;

    return(
        <>
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
                {data.projectsPaginated.edges.map((project, index) => {
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


        <div style={{position: 'relative'}}>
            <div style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 10}}>
                <Pagination 
                    operations={{
                        onPageSet
                    }} 
                    data={{
                        totalCount: data.projectsPaginated.totalCount,
                        currentPage: pageSearchQueryParam === 0 ? 1 : pageSearchQueryParam,
                        pageSize: limitQueryVariable
                    }}
                />
            </div>
        </div>
        </>
    )
}