import UnorderedList from 'modules/App/components/UI/List/UnorderedList/UnorderedList';
import ListElement from 'modules/App/components/UI/List/UnorderedList/ListElement';
import { useQuery } from '@apollo/client';
import { GET_PRIORITY } from 'queries/query/getPriorities';
interface ListProps {
    priorityID: number;
}

export function List({ priorityID }: ListProps) {

    const { error, data } = useQuery(GET_PRIORITY, {
        variables: {
            id: priorityID
        }
    });
    if(error) return <p>Nie mogę pobrać zadań</p>;

    return(
        <UnorderedList>
            {data && data.priority && data.priority.tasks.map((task: any) => <ListElement key={task.id}>{task.name} - <small>{task.statusId.name}</small></ListElement>)}
        </UnorderedList>
    )
}