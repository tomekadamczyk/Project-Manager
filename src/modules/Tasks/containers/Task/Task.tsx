import ContentTable from "modules/App/components/UI/ContentTable/ContentTable";
import LeftColumn from "modules/App/components/UI/ContentTable/LeftColumn/LeftColumn";
import RightColumn from "modules/App/components/UI/ContentTable/RightColumn/RightColumn";
import Input from "modules/App/components/UI/Form/Input/Input";
import TextArea from "modules/App/components/UI/Form/Textarea/Textarea";
import { Priorities } from "modules/Priorities/components/SelectPriorities/Priorities";
import { Statuses } from "modules/Statuses/components/SelectStatuses/Statuses";
import { ChangeEvent, useRef } from "react";
import { useParams } from "react-router-dom";
import { UpdateTaskProps } from "../../types";
import { useGetTaskQuery } from "../../hooks/useGetTaskQuery";
import { useUpdateTaskMutation } from "../../hooks/useUpdateTaskMutation";
import { TimeTracker } from "modules/Tasks/components/TimeTracker/TimeTracker";

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
    const { task, fetchError, loading, updateRef } = useGetTaskQuery(id, UpdateTaskDataRef);
    const { updateTask } = useUpdateTaskMutation(id, UpdateTaskDataRef);
    
    if(loading) return <p>loading</p>;
    if(fetchError) return <p>Nie mogę pobrać danych zadania</p>;
    if(!task) return <p>Brak danych zadania</p>;
    
    async function onPropsChangeCallback(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, key: keyof UpdateTaskProps): Promise<void> {
        updateRef(e, key);
        if(!validateIsSame(UpdateTaskDataRef.current[key], (task as any)[key] as any)) {
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
                <h2>Task {task.name}</h2>
                <Input 
                    testid="task-name-input"
                    onChangeCallback={e => onPropsChangeCallback(e, 'name')} 
                    defaultValue={task.name} 
                    placeholder={task.name || ''} 
                />

                <TextArea 
                    onChangeCallback={e => onPropsChangeCallback(e, 'description')} 
                    defaultValue={task.description}  
                    placeholder={task.description || ''}
                />
            </LeftColumn>

            <RightColumn>
                <h3>Status</h3>
                <Statuses
                    onSelectCallback={e => onSelectCallback(e, 'statusId')}
                    statusId={task.statusId.id} 
                    status={task.statusId.name} 
                />

                <h3>Priority</h3>
                <Priorities 
                    onSelectCallback={e => onSelectCallback(e, 'priorityId')}
                    priorityId={task.priorityId.id} 
                    priority={task.priorityId.name} />

                <TimeTracker taskId={Number(id)} />
            </RightColumn>
            
        </ContentTable>
    )
}