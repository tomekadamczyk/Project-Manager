const {Task, Project, Client, Message, Note, Status, Priority, User} = require('./connector');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const RelatedTaskType = new GraphQLObjectType({
    name: 'RelatedTask',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        projectId: {type: GraphQLInt},
        statusId: { 
            type: StatusType,
            resolve(task) {
                return task.getStatus();
            }
        },
        priorityId: { 
            type: PriorityType,
            resolve(task) {
                return task.getPriority();
            }
        },
        projectsId: {
            type: ProjectType,
            resolve(task) {
                return task.getProject();
            }
        },
        mainTask: {
            type: TaskType,
            resolve(task) {
                return task.getTask();
            }
        },
    })
})

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        projectId: {type: GraphQLInt},
        statusId: { 
            type: StatusType,
            resolve(task) {
                return task.getStatus();
            }
        },
        priorityId: { 
            type: PriorityType,
            resolve(task) {
                return task.getPriority();
            }
        },
        projectsId: {
            type: ProjectType,
            resolve(task) {
                return task.getProject();
            }
        },
        // relatedTasks: {
        //     type: new GraphQLList(TaskType),
        //     resolve(relatedTask) {
        //         return relatedTask.getTasks();
        //     }
        // },
    })
})

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        statusId: { 
            type: StatusType,
            resolve(project) {
                return project.getStatus();
            }
        },
        priorityId: { 
            type: PriorityType,
            resolve(project) {
                return project.getPriority();
            }
        },
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
        clientId: {
            type: ClientType,
            resolve(project) {
                return project.getClient();
            }
        },
        userId: {
            type: UserType,
            resolve(user) {
                return user.getClient();
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

const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString},
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(status) {
                return status.getTasks();
            }
        }
    })
})

const PriorityType = new GraphQLObjectType({
    name: 'Priority',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString}
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(user) {
                return user.getProjects();
            }
        }
    })
})

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // relatedTasks: {
        //     type: new GraphQLList(RelatedTaskType),
        //     resolve(obj, args) {
        //         return Task.findAll({where: args})
        //     }
        // },
        // relatedTask: {
        //     type: RelatedTaskType,
        //     args: {
        //         id: {
        //             type: new GraphQLNonNull(GraphQLInt)
        //         }
        //     },
        //     resolve(obj, args) {
        //         return Task.findByPk(args.id)
        //     }
        // },
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
        },
        statuses: {
            type: new GraphQLList(StatusType),
            resolve(obj, args) {
                return Status.findAll({where: args})
            }
        },
        status: {
            type: StatusType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(obj, args) {
                return Status.findByPk(args.id)
            }
        },
        priorities: {
            type: new GraphQLList(PriorityType),
            resolve(obj, args) {
                return Priority.findAll({where: args})
            }
        },
        priority: {
            type: PriorityType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(obj, args) {
                return Priority.findByPk(args.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(obj, args) {
                return User.findAll({where: args})
            }
        },
        user: {
            type: UserType,
            args: {
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(obj, args) {
                return User.findOne({
                    where: {
                      email: args.email,
                      password: args.password
                    }
                  });
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject: {
            type: ProjectType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLString},
                statusId: {type: new GraphQLNonNull(GraphQLInt)},
                priorityId: {type: new GraphQLNonNull(GraphQLInt)},
                clientId: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(obj, {name, description, statusId, priorityId, clientId}, context) {
                return Project.create({
                    name,
                    description,
                    statusId,
                    priorityId,
                    clientId
                })
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                statusId: {type: GraphQLInt},
                priorityId: {type: GraphQLInt}
            },
            resolve: async (obj, {id, description, name, statusId, priorityId}, context) => {
                const project = await Project.findByPk(id);
                project.set('name', name);
                project.set('description', description);
                project.set('statusId', statusId);
                project.set('priorityId', priorityId);
                return project.save();
            }
        },
        addTask: {
            type: TaskType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLString},
                statusId: {type: new GraphQLNonNull(GraphQLInt)},
                priorityId: {type: new GraphQLNonNull(GraphQLInt)},
                projectId: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(obj, {name, description, statusId, priorityId, projectId}, context) {
                return Task.create({
                    name,
                    description,
                    statusId,
                    priorityId,
                    projectId
                })
            }
        },
        updateTask: {
            type: TaskType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                statusId: {type: GraphQLInt},
                priorityId: {type: GraphQLInt}
            },
            resolve: async (obj, {id, name, description, statusId, priorityId}, context) => {
                const task = await Task.findByPk(id);
                task.set('name', name);
                task.set('description', description);
                task.set('statusId', statusId);
                task.set('priorityId', priorityId);
                return task.save();
            }
        },
        addUser: {
            type: UserType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(obj, {name, email, password}, context) {
                return User.create({
                    name,
                    email,
                    password
                })
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: mutation
})