import React, { ChangeEventHandler, FormEvent, useRef } from 'react';
import { Statuses } from '../../Data/Statuses/Statuses';
import TextArea from '../UI/Form/Textarea/Textarea';
import Input from '../UI/Form/Input/Input';
import styled from 'styled-components';
import Button from '../UI/Button/Button';
import { ADD_PROJECT } from 'queries/mutation/addProject';
import { Priorities } from 'Data/Priorities/Priorities';
import { Clients } from 'Data/Clients/Clients';
import { useMutation } from '@apollo/client';

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


export function AddProject() {
    const statusRef = useRef(null);
    let statusId: number | null = null;

    const [mutateFunction, { data, loading, error }] = useMutation(ADD_PROJECT, {
        variables: {
            // name: this.name.value,
            // description: this.description.value,
            statusId: Number(statusId),
            // priorityId: Number(this.priorityId.value),
            // clientId: Number(this.clientId.value)
        }
    });


    function submitProject(e: MouseEvent) {
        e.preventDefault();
        console.log(statusId);
        
        // mutateFunction()
    }  

    function updateStatus(e: any) {
        statusId = e.target.value
    }

    return(
        <Form>
            <InputsContainer>
                <Input placeholder="Project name" />
                <TextArea placeholder="Project description"></TextArea>
            </InputsContainer>
            <OptionsContainer>
                <Statuses ref={statusRef} onSelectCallback={updateStatus} />
                <Priorities />
                <Clients />
                <Button click={(e: MouseEvent) => submitProject(e)}>Create new project</Button>
            </OptionsContainer>
        </Form>
    )
}
