const Sequelize = require('sequelize');
const db = new Sequelize('project-management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

const TaskModel = db.define('task', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_tasks'},
    name: {type: Sequelize.STRING, field: 'name'},
    status: {type: Sequelize.STRING, field: 'status'},
    priority: {type: Sequelize.STRING, field: 'priority'},
    createdAt: {type: Sequelize.STRING, field: 'createdAt'},
    updatedAt: {type: Sequelize.STRING, field: 'updatedAt'}
})


const ProjectModel = db.define('project', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_projects'},
    name: {type: Sequelize.STRING, field: 'name'},
    status: {type: Sequelize.STRING, field: 'status'},
    priority: {type: Sequelize.STRING, field: 'priority'},
    createdAt: {type: Sequelize.STRING, field: 'createdAt'},
    updatedAt: {type: Sequelize.STRING, field: 'updatedAt'}
})

const ClientModel = db.define('client', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_clients'},
    name: {type: Sequelize.STRING, field: 'name'},
    createdAt: {type: Sequelize.STRING, field: 'createdAt'},
    updatedAt: {type: Sequelize.STRING, field: 'updatedAt'}
})

const NoteModel = db.define('note', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_notes'},
    name: {type: Sequelize.STRING, field: 'name'},
    createdAt: {type: Sequelize.STRING, field: 'createdAt'},
    updatedAt: {type: Sequelize.STRING, field: 'updatedAt'}
})

const MessageModel = db.define('message', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_messages'},
    name: {type: Sequelize.STRING, field: 'name'},
    content: {type: Sequelize.STRING, field: 'content'},
    createdAt: {type: Sequelize.STRING, field: 'createdAt'},
    updatedAt: {type: Sequelize.STRING, field: 'updatedAt'}
})

TaskModel.belongsTo(ProjectModel); //task.getProject();
ProjectModel.hasMany(TaskModel); //project.getTasks();

ProjectModel.belongsTo(ClientModel); //project.getClient();
ClientModel.hasMany(ProjectModel); //client.getProjects();

MessageModel.belongsTo(ClientModel); //message.getClient();
ClientModel.hasMany(MessageModel); //client.getMessages();

NoteModel.belongsTo(ProjectModel); //note.getProject();
ProjectModel.hasMany(NoteModel); //project.getNoted();

const Task = db.models.task;
const Project = db.models.project;
const Client = db.models.client;
const Message = db.models.message;
const Note = db.models.note;

db.sync();

module.exports = {Task, Project, Client, Message, Note};

