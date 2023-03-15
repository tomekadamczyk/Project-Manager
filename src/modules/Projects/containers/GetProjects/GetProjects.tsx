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
import { Filters } from "modules/Tasks/components/filters/FIlters";
import { Limit } from "modules/Tasks/components/Limit/Limit";
import { GetProjectsTable } from "./GetProjectsTable";
  
const projectFilters = [
    { key: 'priorityId', label: 'Priorytet' },
    { key: 'statusId', label: 'Status' },
    { key: 'clientId', label: 'Klient' }
]

export const GetProjects = () => {
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
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 40}}>
                <Filters type="project" filters={projectFilters} />
                <Limit />
            </div>
            <GetProjectsTable />
        </>
    )
}