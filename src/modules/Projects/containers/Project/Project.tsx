import Input from "modules/App/components/UI/Form/Input/Input";
import TextArea from "modules/App/components/UI/Form/Textarea/Textarea";
import UnorderedList from "modules/App/components/UI/List/UnorderedList/UnorderedList";
import ListElement from "modules/App/components/UI/List/UnorderedList/ListElement";
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components';
import ContentTable from "modules/App/components/UI/ContentTable/ContentTable";
import { Statuses } from "modules/Statuses/components/SelectStatuses/Statuses";
import { Priorities } from "modules/Priorities/components/SelectPriorities/Priorities";
import { ChangeEvent, useRef } from "react";
import { UpdateProps } from "./types";
import { useUpdateProjectMutation } from "./hooks/useUpdateProjectMutation";
import { useGetProjectQuery } from "./hooks/useGetProjectQuery";

const LeftColumn = styled.div`
    width: 45%;
    padding-right: 10px;
`;

const CenterColumn = styled.div`
    padding: 0 20px;
    border-top: 1px solid #ddd;

    @media (min-width: 1024px) {
        border-top: none;
        border-left: 1px solid #ddd;
        width: 37%;
    }
`;

const RightColumn = styled.div`
    padding: 20px 50px 0 20px;
    border-top: 1px solid #ddd;

    @media (min-width: 1024px) {
        padding-top: 0;
        border-top: none;
        border-left: 1px solid #ddd;
        width: 18%;
    }
`;

function validateIsSame<T>(currentValue: T, comparedValue: T): boolean {
    return currentValue === comparedValue;
}

export function Project() {
    let { id } = useParams();

    const UpdateProjectkDataRef = useRef<UpdateProps>({
        name: '',
        description: '',
        statusId: 0,
        priorityId: 0
    });

    const { data, fetchError, loading, updateRef } = useGetProjectQuery(id, UpdateProjectkDataRef);
    const { updateProject, updateLoading } = useUpdateProjectMutation(id, UpdateProjectkDataRef);
    
    if(loading) return <p>loading</p>;
    if(fetchError) return <p>Nie mogę pobrać danych projektu</p>;
    if(!data) return <p>Brak danych projektu</p>;

    async function onPropsChangeCallback(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, key: keyof UpdateProps): Promise<void> {
        updateRef(e, key);
        if(!validateIsSame(UpdateProjectkDataRef.current[key], data?.project[key] as any)) {
            await updateProject();
        }
    }

    async function onSelectCallback(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, key: keyof UpdateProps): Promise<void> {
        updateRef(e, key);
        await updateProject();
    }
    
    return (
        <ContentTable>
            
            <div style={{position: 'absolute', left: 50, top: 10}}>{updateLoading ? 'update loading' : null}</div>
            <LeftColumn>
                <Input 
                    testid="project-name-input"
                    onChangeCallback={e => onPropsChangeCallback(e, 'name')} 
                    defaultValue={data.project.name} 
                    placeholder={data.project.name || ''} 
                />

                <TextArea 
                    onChangeCallback={e => onPropsChangeCallback(e, 'description')} 
                    defaultValue={data.project.description}  
                    placeholder={data.project.description || ''}
                />
            </LeftColumn>

            <CenterColumn>
                <h2>List of tasks</h2>
                <div>
                    <UnorderedList style={{overflow: 'auto', height: '500px'}}>
                        {data.project.tasks.map(task => {
                            return (
                                <ListElement key={task.id}>
                                    <Link style={{color: "gray"}} to={`/tasks/${task.id}`}>{task.name ? task.name : '(Brak nazwy)'}</Link>
                                </ListElement>
                            )
                        })}
                    </UnorderedList>
                </div>
            </CenterColumn>
            <RightColumn>

                <h3>Status</h3>
                <Statuses
                    onSelectCallback={e => onSelectCallback(e, 'statusId')}
                    statusId={data.project.statusId.id} 
                    status={data.project.statusId.name} 
                />

                <h3>Priority</h3>
                <Priorities 
                    onSelectCallback={e => onSelectCallback(e, 'priorityId')} 
                    priorityId={data.project.priorityId.id} 
                    priority={data.project.priorityId.name} 
                />

                <h3>Client</h3>
                <p>{data.project.clientId.name}</p>

            </RightColumn>
        </ContentTable>
    )
}