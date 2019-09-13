import React, { Component } from 'react';
import UnorderedList from '../../UI/List/UnorderedList/UnorderedList';
import ListElement from '../../UI/List/UnorderedList/ListElement';
import { Query } from "react-apollo";


class List extends Component {

    render() {
        return(
            <UnorderedList>
                <Query query={this.props.priorityQuery}>
                    {({loading, error, data, refetch}) => {
                        if(error) return <p>Nie mogę pobrać zadań</p>;
                        const { priority } = data;
                        if(priority) {
                            const { tasks } = priority;
                            return(
                                tasks.map(task => <ListElement key={task.id}>{task.name} - <small>{task.statusId.name}</small></ListElement>)
                            )
                        }
                        return true;
                    }}
                </Query>
            </UnorderedList>
        )
    }
}

export default List;