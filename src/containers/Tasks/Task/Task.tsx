import ContentTable from "components/UI/ContentTable/ContentTable";
import LeftColumn from "components/UI/ContentTable/LeftColumn/LeftColumn";
import RightColumn from "components/UI/ContentTable/RightColumn/RightColumn";
import Input from "components/UI/Form/Input/Input";
import TextArea from "components/UI/Form/Textarea/Textarea";
import { Priorities } from "Data/Priorities/Priorities";
import { Statuses } from "Data/Statuses/Statuses";
import { ChangeEvent, useRef } from "react";
import { useParams } from "react-router-dom";
import { UpdateTaskProps } from "../types";
import { useGetTaskQuery } from "./hooks/useGetTaskQuery";
import { useUpdateTaskMutation } from "./hooks/useUpdateTaskMutation";

function validateIsSame<T>(currentValue: T, comparedValue: T): boolean {
    return currentValue === comparedValue;
}

export function Task() {
    let { id } = useParams();

    const UpdateTaskDataRef = useRef<UpdateTaskProps>({
        name: '',
        description: '',
        statusId: 0,
        priorityId: 0
    });


    const { data, fetchError, loading, updateRef } = useGetTaskQuery(id, UpdateTaskDataRef);
    const { updateTask, updateLoading } = useUpdateTaskMutation(id, UpdateTaskDataRef);

    if(loading) return <p>loading</p>;
    if(fetchError) return <p>Nie mogę pobrać danych zadania</p>;
    if(!data || !data.task) return <p>Brak danych zadania</p>;
    
    async function onPropsChangeCallback(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, key: keyof UpdateTaskProps): Promise<void> {
        updateRef(e, key);
        if(!validateIsSame(UpdateTaskDataRef.current[key], data?.task[key] as any)) {
            await updateTask();
        }
    }

    async function onSelectCallback(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, key: keyof UpdateTaskProps): Promise<void> {
        updateRef(e, key);
        await updateTask();
    }
    
    return(
        <ContentTable>
            {/* {this.updateInformation ? <InfoBox updateTask={props.updateTask} info={this.updateInformation}></InfoBox> : null} */}

            <LeftColumn>
                <h2>Task {data.task.name}</h2>
                <Input 
                    testid="task-name-input"
                    onChangeCallback={e => onPropsChangeCallback(e, 'name')} 
                    defaultValue={data.task.name} 
                    placeholder={data.task.name || ''} 
                />

                <TextArea 
                    onChangeCallback={e => onPropsChangeCallback(e, 'description')} 
                    defaultValue={data.task.description}  
                    placeholder={data.task.description || ''}
                />
            </LeftColumn>

            <RightColumn>
                <h3>Status</h3>
                <Statuses
                    onSelectCallback={e => onSelectCallback(e, 'statusId')}
                    statusId={data.task.statusId.id} 
                    status={data.task.statusId.name} 
                />

                <h3>Priority</h3>
                <Priorities 
                    onSelectCallback={e => onSelectCallback(e, 'priorityId')}
                    priorityId={data.task.priorityId.id} 
                    priority={data.task.priorityId.name} />

            </RightColumn>
            
        </ContentTable>
    )
}