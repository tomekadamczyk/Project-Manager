const {Task, Project, Client, Message, Note} = require('./connector');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        status: { type: GraphQLString },
        priority: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        projectId: {type: GraphQLInt},
        projects: {
            type: ProjectType,
            resolve(task) {
                return task.getProject();
            }
        }
    })
})

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        status: { type: GraphQLString },
        priority: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(project) {
                return project.getTasks();
            }
        },
        notes: {
            type: new GraphQLList(NoteType),
            resolve(project) {
                return project.getNotes();
            }
        },
        client: {
            type: ClientType,
            resolve(project) {
                return project.getClient();
            }
        }
    })
})

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(client) {
                return client.getProjects();
            }
        },
        messages: {
            type: new GraphQLList(MessageType),
            resolve(client) {
                return client.getMessages();
            }
        }
    })
})

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        content: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        client: {
            type: ClientType,
            resolve(message) {
                return message.getClient();
            }
        }
    })
})

const NoteType = new GraphQLObjectType({
    name: 'Note',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        project: {
            type: ProjectType,
            resolve(note) {
                return note.getProject();
            }
        }
    })
})

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(obj, args) {
                return Task.findAll({where: args})
            }
        },
        task: {
            type: TaskType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(obj, args) {
                return Task.findByPk(args.id)
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(obj, args) {
                return Project.findAll({where: args})
            }
        },
        project: {
            type: ProjectType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(obj, args) {
                return Project.findByPk(args.id)
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(obj, args) {
                return Client.findAll({where: args})
            }
        },
        client: {
            type: ClientType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(obj, args) {
                return Client.findByPk(args.id)
            }
        },
        messages: {
            type: new GraphQLList(MessageType),
            resolve(obj, args) {
                return Message.findAll({where: args})
            }
        },
        message: {
            type: MessageType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(obj, args) {
                return Message.findByPk(args.id)
            }
        },
        notes: {
            type: new GraphQLList(NoteType),
            resolve(obj, args) {
                return Note.findAll({where: args})
            }
        },
        note: {
            type: NoteType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(obj, args) {
                return Note.findByPk(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: rootQuery
})