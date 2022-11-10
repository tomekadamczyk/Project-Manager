import { ChangeEvent, useRef } from 'react';
import { Statuses } from 'modules/Statuses/components/SelectStatuses/Statuses';
import TextArea from 'modules/App/components/UI/Form/Textarea/Textarea';
import Input from 'modules/App/components/UI/Form/Input/Input';
import styled from 'styled-components';
import Button from 'modules/App/components/UI/Button/Button';
import { ADD_PROJECT } from 'queries/mutation/addProject';
import { Priorities } from 'modules/Priorities/components/SelectPriorities/Priorities';
import { Clients } from 'modules/Clients/components/SelectClients/Clients';
import { ApolloError, useMutation } from '@apollo/client';
import { errorsDictionary, ErrorType } from 'modules/App/config/ErrorMessages/AddTaskMessages';
import { ErrorInine } from 'modules/App/components/ErrorInline/ErrorInline.component';
import { useError } from 'modules/App/hooks/useError';

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
    priorityId: number;
    clientId: number;
}

export function AddProject() {
    const {error, getError} = useError();
    const statusRef = useRef(null);
    const priorityRef = useRef(null);
    const clientRef = useRef(null);

    const AddProjectkDataRef = useRef<AddProps>({
        name: '',
        description: '',
        statusId: 0,
        priorityId: 0,
        clientId: 0
    });
    const [mutateFunction, { loading }] = useMutation(ADD_PROJECT);


    async function submitProject(e: MouseEvent) {
        e.preventDefault();
        
        try {
            await mutateFunction({
                variables: {
                    name: AddProjectkDataRef.current.name,
                    description: AddProjectkDataRef.current.description,
                    statusId: Number(AddProjectkDataRef.current.statusId),
                    clientId: Number(AddProjectkDataRef.current.clientId),
                    priorityId: Number(AddProjectkDataRef.current.priorityId)
                }
            });  
            getError(undefined)
        } catch(e) {
            getError(e as ApolloError)
        }
    }

    function updateRef(e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>, key: keyof AddProps) {
        AddProjectkDataRef.current = {
            ...AddProjectkDataRef.current,
            [key]: e.target.value
        }
    }

    return(
        <Container>
        <h1>Dodaj projekt</h1>
        <Form>
            <InputsContainer>
                <Input testid="add-project-name" onChangeCallback={e => updateRef(e, 'name')} placeholder="Project name" />
                <TextArea onChangeCallback={e => updateRef(e, 'description')} placeholder="Project description" ></TextArea>
            </InputsContainer>
            <OptionsContainer>
                <div>
                    <Statuses ref={statusRef} onSelectCallback={e => updateRef(e, 'statusId')} />
                    {error === errorsDictionary[ErrorType.STATUS_ID_CANNOT_BE_NULL].message ? 
                        <ErrorInine>{errorsDictionary[ErrorType.STATUS_ID_CANNOT_BE_NULL].error}</ErrorInine> 
                    : null}
                    {error === errorsDictionary[ErrorType.STATUS_FOREIGN_KEY_CONSTRAINT_FAILS_2].message ? 
                        <ErrorInine>{errorsDictionary[ErrorType.STATUS_FOREIGN_KEY_CONSTRAINT_FAILS_2].error}</ErrorInine> 
                    : null}
                    
                </div>
                <div>
                    <Priorities ref={priorityRef} onSelectCallback={(e) => updateRef(e, 'priorityId')} />
                    {error === errorsDictionary[ErrorType.PRIORITY_ID_CANNOT_BE_NULL].message ? 
                        <ErrorInine>{errorsDictionary[ErrorType.PRIORITY_ID_CANNOT_BE_NULL].error}</ErrorInine> 
                    : null}
                    {error === errorsDictionary[ErrorType.PRIORITY_FOREIGN_KEY_CONSTRAINT_FAILS_2].message ? 
                        <ErrorInine>{errorsDictionary[ErrorType.PRIORITY_FOREIGN_KEY_CONSTRAINT_FAILS_2].error}</ErrorInine> 
                    : null}
                </div>
                <div>
                    <Clients ref={clientRef} onSelectCallback={(e) => updateRef(e, 'clientId')} />
                    {error === errorsDictionary[ErrorType.CLIENT_ID_NOT_PROVIDED].message ? 
                        <ErrorInine>{errorsDictionary[ErrorType.CLIENT_ID_NOT_PROVIDED].error}</ErrorInine> 
                    : null}
                    {error === errorsDictionary[ErrorType.CLIENT_FOREIGN_KEY_CONSTRAINT_FAILS].message ? 
                        <ErrorInine>{errorsDictionary[ErrorType.CLIENT_FOREIGN_KEY_CONSTRAINT_FAILS].error}</ErrorInine> 
                    : null}
                    
                </div>
                <Button 
                    aria-label="Przycisk Dodaj projekt" 
                    className={loading ? 'loading' : undefined}
                    disabled={loading}
                    click={(e: MouseEvent) => submitProject(e)}
                >Create new project</Button>
            </OptionsContainer>
        </Form>
        </Container>
    )
}
