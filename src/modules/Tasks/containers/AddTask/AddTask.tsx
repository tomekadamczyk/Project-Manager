import { ChangeEvent, useRef } from 'react';
import styled from 'styled-components';
//import Statuses from '../../Data/Statuses/Statuses';
import TextArea from 'modules/App/components/UI/Form/Textarea/Textarea';
import Input from 'modules/App/components/UI/Form/Input/Input';
import Button from 'modules/App/components/UI/Button/Button';
import { Projects } from 'modules/Projects/components/SelectProjects/Projects';
import { ApolloError, useMutation } from '@apollo/client';
import { Statuses } from 'modules/Statuses/components/SelectStatuses/Statuses';
import { Priorities } from 'modules/Priorities/components/SelectPriorities/Priorities';
import { ADD_TASK } from 'queries/mutation/addTask';
import { errorsDictionary, ErrorType } from 'modules/App/config/ErrorMessages/AddTaskMessages';
import { useError } from 'modules/App/hooks/useError';
import { ErrorInine } from 'modules/App/components/ErrorInline/ErrorInline.component';


const Form = styled.form`
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

interface AddProps {
    name: string;
    description: string;
    statusId: number;
    projectId: number;
    priorityId: number;
}


export function AddTask() {
    const {error, getError} = useError();
    const statusRef = useRef(null);
    const projectRef = useRef(null);
    const priorityRef = useRef(null);
    // const [showTasks, setShowTasks]= useState(true);
    
    const AddTaskDataRef = useRef<AddProps>({
        name: '',
        description: '',
        statusId: 0,
        projectId: 0,
        priorityId: 0
    });

    function updateRef(e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>, key: keyof AddProps) {
        AddTaskDataRef.current = {
            ...AddTaskDataRef.current,
            [key]: e.target.value
        }
    }

    const [mutateFunction, { loading }] = useMutation<AddProps, AddProps>(ADD_TASK);
    async function submitTask(e: MouseEvent) {
        e.preventDefault();
        try {
            await mutateFunction({
                variables: {
                    name: AddTaskDataRef.current.name,
                    description: AddTaskDataRef.current.description,
                    statusId: Number(AddTaskDataRef.current.statusId),
                    projectId: Number(AddTaskDataRef.current.projectId),
                    priorityId: Number(AddTaskDataRef.current.priorityId)
                }
            });  
            getError(undefined)
        } catch(e) {
            getError(e as ApolloError)
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
                        disabled={loading}
                    >Create new task</Button>
                </OptionsContainer>
            </Form>
        </Container>
    )
}