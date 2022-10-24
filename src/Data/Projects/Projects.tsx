import React, { useEffect } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import Select from '../../components/UI/Form/Select/Select';
import { GET_PROJECTS } from 'queries/query/getProjects';
import { useQuery } from '@apollo/client';

interface Project {
    id: number;
    name: string;
}

interface ProjectsData {
    projects: Project[];
}

interface ProjectComponentProps {
    id?: number;
    projectId?: number;
    project?: string;
    onSelectCallback: (e: any) => void;
}

export const Projects = React.forwardRef(({ id, projectId, project, onSelectCallback }: ProjectComponentProps, ref) => {

    const { loading, error, data } = useQuery<ProjectsData>(GET_PROJECTS);

    if(loading) return <Spinner />;
    if(error || !data) return <p>Nie mogę pobrać projektów</p>;

    return(
        <Select update={onSelectCallback} ref={ref}>
            {project ? <option value={projectId}>{project}</option> : <option>Wybierz projekt</option>}
            {data.projects.map(item => {
                    
                if(item.id === projectId && item.name === project) {
                    return null;
                }
                else {
                    return <option key={item.id} value={item.id}>{item.name}</option>
                }
                
            })}
        </Select>
    )
}) 