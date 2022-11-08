import { ApolloError, useMutation, useQuery } from "@apollo/client";
import Input from "components/UI/Form/Input/Input";
import TextArea from "components/UI/Form/Textarea/Textarea";
import UnorderedList from "components/UI/List/UnorderedList/UnorderedList";
import ListElement from "components/UI/List/UnorderedList/ListElement";
import { GET_PROJECT_BY_ID } from "queries/query/getProjects";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { GetProjectMutationVariables, SingleProject } from "../types";
import ContentTable from "components/UI/ContentTable/ContentTable";
import { Statuses } from "Data/Statuses/Statuses";
import { Priorities } from "Data/Priorities/Priorities";
import { UPDATE_PROJECT } from "queries/mutation/updateProject";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getOperationName } from "apollo-utilities";
import { useError } from "hooks/useError";
import Button from "components/UI/Button/Button";
import { UpdateProjectButton } from "./UpdateProjectButton";
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

    async function onChangeCallback(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof UpdateProps) {
        updateRef(e, key);
        await updateProject();
    }

    async function onSelectCallback(e: ChangeEvent<HTMLSelectElement>, key: keyof UpdateProps) {
        updateRef(e, key);
        await updateProject();
    }
    
    return (
        <ContentTable>
            
            <div style={{position: 'absolute', left: 50, top: 10}}>{updateLoading ? 'update loading' : null}</div>
            <LeftColumn>
                <Input 
                    testid="project-name-input"
                    onChangeCallback={e => onChangeCallback(e, 'name')} 
                    defaultValue={data.project.name} 
                    placeholder={data.project.name || ''} 
                />

                <TextArea 
                    onChangeCallback={e => onChangeCallback(e, 'description')} 
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
                                    {task.name ?
                                        task.name
                                        :
                                        <span style={{fontSize: 10, color: "gray"}}>Brak nazwy</span>
                                    }
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
                <Button role="submit" click={updateProject}>Wyślij</Button>
                {/* {id ? 
                    <UpdateProjectButton 
                        id={id} 
                        variables={{
                            id: Number(id),
                            name: UpdateProjectkDataRef.current.name,
                            description: UpdateProjectkDataRef.current.description,
                            statusId: Number(UpdateProjectkDataRef.current.statusId),
                            priorityId: Number(UpdateProjectkDataRef.current.priorityId)
                        }} 
                    /> 
                : 
                    null
                } */}

            </RightColumn>
        </ContentTable>
    )
}