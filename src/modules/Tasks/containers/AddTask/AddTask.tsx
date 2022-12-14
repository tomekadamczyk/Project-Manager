import { ChangeEvent, useRef } from 'react';
import styled from 'styled-components';
//import Statuses from '../../Data/Statuses/Statuses';
import TextArea from 'modules/App/components/UI/Form/Textarea/Textarea';
import Input from 'modules/App/components/UI/Form/Input/Input';
import Button from 'modules/App/components/UI/Button/Button';
import { Projects } from 'modules/Projects/components/SelectProjects/Projects';
import { Statuses } from 'modules/Statuses/components/SelectStatuses/Statuses';
import { Priorities } from 'modules/Priorities/components/SelectPriorities/Priorities';
import { errorsDictionary, ErrorType } from 'modules/App/config/ErrorMessages/AddTaskMessages';
import { useError } from 'modules/App/hooks/useError';
import { ErrorInine } from 'modules/App/components/ErrorInline/ErrorInline.component';
import { AddTaskProps } from 'modules/Tasks/types';
import { useAddTaskMutation } from '../../hooks/useAddTaskMutation';

const Form = styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: center;
`;
const InputsContainer = styled.div`
    width: 75%;
`;
const OptionsContainer = styled.div`
    width: 25%;
`;

const Container = styled.div`
    padding: 0 15%;
`;

const userMap = new Map();
userMap.set(1, { name: 'Tomek'})
userMap.set(2, { name: 'Tomek2'})
userMap.set(3, { name: 'Tomek3'})

export function AddTask() {
    const { error } = useError();
    const statusRef = useRef(null);
    const projectRef = useRef(null);
    const priorityRef = useRef(null);
    // const [showTasks, setShowTasks]= useState(true);
    
    const AddTaskDataRef = useRef<AddTaskProps>({
        name: '',
        description: '',
        statusId: 0,
        projectId: 0,
        priorityId: 0
    });
    const { submitTask, loading, abort } = useAddTaskMutation(AddTaskDataRef)

    function updateRef(e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>, key: keyof AddTaskProps) {
        AddTaskDataRef.current = {
            ...AddTaskDataRef.current,
            [key]: e.target.value
        }
        
    }
    // checkboxUpdate = (e) => {
    //     console.log(this.state.showTasks)
    //     const tasks = this.state.showTasks;
    //     this.setState({tasks: !tasks})
    // }

    // const tasks = <AllTasks ref={input => this.tasks = input} />;
    return(
        <Container>
            <h1>Dodaj zadanie</h1>
            <Form>
                <InputsContainer>
                    <Input testid='add-task-name' onChangeCallback={e => updateRef(e, 'name')} placeholder="Task name" />
                    <TextArea onChangeCallback={e => updateRef(e, 'description')} placeholder="Task description" ></TextArea>
                    
                    {/* <Checkbox id="addRelation" name="Assign relation to another task" ref={input => this.checkbox = input} update={(e) => this.checkboxUpdate(e)}/>
                    {this.checkbox.checked ? tasks : null} */}
                </InputsContainer>
                <OptionsContainer>
                    <div>
                        <Projects ref={projectRef} onSelectCallback={e => updateRef(e, 'projectId')} />
                        {error === errorsDictionary[ErrorType.PROJECT_FOREIGN_KEY_CONSTRAINT_FAILS].message ? 
                            <ErrorInine>{errorsDictionary[ErrorType.PROJECT_FOREIGN_KEY_CONSTRAINT_FAILS].error}</ErrorInine> 
                        : null}
                        {error === errorsDictionary[ErrorType.PROJECT_ID_CANNOT_BE_NULL].message ? 
                            <ErrorInine>{errorsDictionary[ErrorType.PROJECT_ID_CANNOT_BE_NULL].error}</ErrorInine> 
                        : null}
                    </div>
                    <div>
                        <Statuses ref={statusRef} onSelectCallback={e => updateRef(e, 'statusId')} />
                        {error === errorsDictionary[ErrorType.STATUS_FOREIGN_KEY_CONSTRAINT_FAILS].message ? 
                            <ErrorInine>{errorsDictionary[ErrorType.STATUS_FOREIGN_KEY_CONSTRAINT_FAILS].error}</ErrorInine> 
                        : null}
                    </div>
                    <div>
                        <Priorities ref={priorityRef} onSelectCallback={e => updateRef(e, 'priorityId')} />
                        {error === errorsDictionary[ErrorType.PRIORITY_FOREIGN_KEY_CONSTRAINT_FAILS].message ? 
                            <ErrorInine>{errorsDictionary[ErrorType.PRIORITY_FOREIGN_KEY_CONSTRAINT_FAILS].error}</ErrorInine> 
                        : null}
                    </div>
                    <Button 
                        aria-label="Przycisk Dodaj zadanie" 
                        className={loading ? 'loading' : undefined} 
                        click={submitTask}
                        // disabled={loading}
                    >Create new task</Button>
                    <Button 
                        aria-label="Abort" 
                        click={abort}
                    >Abort</Button>
                </OptionsContainer>
            </Form>
        </Container>
    )
}