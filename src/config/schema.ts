import { makeExecutableSchema } from "@graphql-tools/schema";
const typeDefs = `
    type Client {
        id: Int!
        name: String!
        createdAt: Int
        updatedAt: Int
        projects: [Project]
        messages: [Message]
    }

    type Message {
        id: Int!
        name: String!
        content: String
        createdAt: Int
        updatedAt: Int
        client: Client
    }

    type Status {
        id: Int!
        name: String!
        tasks: [Task]
    }

    type Priority {
        id: Int!
        name: String!
        tasks: [Task]
    }

    type Note {
        id: Int!
        name: String!
        createdAt: Int
        updatedAt: Int
        project: Project
    }

    type Project {
        id: Int!
        name: String!
        description: String
        createdAt: Int
        updatedAt: Int
        statusId: Status
        priorityId: Priority
        tasks: [Task]
        notes: [Note]
        clientId: Client
        userId: Client
    }

    type Task {
        id: Int!
        name: String!
        description: String
        createdAt: Int
        updatedAt: Int
        projectId: Int
        statusId: Status
        priorityId: Priority
        projectsId: Project
    }

    type Query {
        status(id: Int!): Status
        statuses: [Status]

        project(id: Int!): Project
        projects: [Project]

        task(id: Int!): Task
        tasks: [Task]

        client(id: Int!): Client
        clients: [Client]

        message(id: Int!): Message
        messages: [Message]

        note(id: Int!): Note
        notes: [Note]

        priority(id: Int!): Priority
        priorities: [Priority]
    }

    type Mutation {
        updateProject(
            id: Int! 
            name: String 
            description: String 
            statusId: Int 
            priorityId: Int
        ): Project
    }
`;

export const schema = makeExecutableSchema({ typeDefs });
