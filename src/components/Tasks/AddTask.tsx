import { useRef, useState} from 'react';
//import Statuses from '../../Data/Statuses/Statuses';
import TextArea from '../UI/Form/Textarea/Textarea';
import Input from '../UI/Form/Input/Input';
import styled from 'styled-components';
import Button from '../UI/Button/Button';
import { Projects } from 'Data/Projects/Projects';
import { ADD_PROJECT } from 'queries/mutation/addProject';
import { useMutation } from '@apollo/client';
import { Statuses } from 'Data/Statuses/Statuses';
import { Priorities } from 'Data/Priorities/Priorities';

const Form = styled.form`
margin: 20px 0;
display: flex;
justify-content: center;
`;
const InputsContainer = styled.div`
width: 45%;

`;
const OptionsContainer = styled.div`
`;


export function AddTask() {
    const statusRef = useRef(null);
    let statusId: number | null = null;
    const projectRef = useRef(null);
    const priorityRef = useRef(null);
    let priorityId: number | null = null;
    // let projecId: number | null = null;
    // const [showTasks, setShowTasks]= useState(true);


    // const [mutateFunction, { data, loading, error }] = useMutation(ADD_PROJECT, {
    //     variables: {
    //         // name: this.name.value,
    //         // description: this.description.value,
    //         statusId: Number(statusId),
    //         // priorityId: Number(this.priorityId.value),
    //         // clientId: Number(this.clientId.value)
    //     }
    // });

    function submitTask(e: MouseEvent) {
        e.preventDefault();
        // this.props.history.replace('/tasks');
        // mutateFunction()
    }

    // checkboxUpdate = (e) => {
    //     console.log(this.state.showTasks)
    //     const tasks = this.state.showTasks;
    //     this.setState({tasks: !tasks})
    // }


    function updateStatus(e: any) {
        statusId = e.target.value
    }


    function updateProject(e: any) {
        statusId = e.target.value
    }

    function updatePriority(e: any) {
        priorityId = e.target.value
    }

    // const tasks = <AllTasks ref={input => this.tasks = input} />;
    return(
        <>
            <Form>
                <InputsContainer>
                    <Input placeholder="Task name" />
                    <TextArea placeholder="Task description" ></TextArea>
                    
                    {/* <Checkbox id="addRelation" name="Assign relation to another task" ref={input => this.checkbox = input} update={(e) => this.checkboxUpdate(e)}/>
                    {this.checkbox.checked ? tasks : null} */}
                </InputsContainer>
                <OptionsContainer>
                    <Projects ref={projectRef} onSelectCallback={updateProject} />
                    <Statuses ref={statusRef} onSelectCallback={updateStatus} />
                    <Priorities ref={priorityRef} onSelectCallback={updatePriority} />
                    <Button click={(e: MouseEvent) => submitTask(e)}>Create new task</Button>
                </OptionsContainer>
            </Form>
        </>
    )
}