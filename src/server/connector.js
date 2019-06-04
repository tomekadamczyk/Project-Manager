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
    createdAt: {type: Sequelize.DATE, field: 'createdAt'},
    updatedAt: {type: Sequelize.DATE, field: 'updatedAt'}
})


const ProjectModel = db.define('project', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_projects'},
    name: {type: Sequelize.STRING, field: 'name'},
    createdAt: {type: Sequelize.DATE, field: 'createdAt'},
    updatedAt: {type: Sequelize.DATE, field: 'updatedAt'}
})

const ClientModel = db.define('client', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_clients'},
    name: {type: Sequelize.STRING, field: 'name'},
    createdAt: {type: Sequelize.DATE, field: 'createdAt'},
    updatedAt: {type: Sequelize.DATE, field: 'updatedAt'}
})

const NoteModel = db.define('note', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_notes'},
    name: {type: Sequelize.STRING, field: 'name'},
    createdAt: {type: Sequelize.DATE, field: 'createdAt'},
    updatedAt: {type: Sequelize.DATE, field: 'updatedAt'}
})

const MessageModel = db.define('message', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_messages'},
    name: {type: Sequelize.STRING, field: 'name'},
    content: {type: Sequelize.STRING, field: 'content'},
    createdAt: {type: Sequelize.DATE, field: 'createdAt'},
    updatedAt: {type: Sequelize.DATE, field: 'updatedAt'}
})

const StatusModel = db.define('status', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_status'},
    name: {type: Sequelize.STRING, field: 'name'}
})

const PriorityModel = db.define('priority', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_priorities'},
    name: {type: Sequelize.STRING, field: 'name'}
})

StatusModel.hasMany(TaskModel);
TaskModel.belongsTo(StatusModel); //task.getProject();
StatusModel.hasMany(ProjectModel);
ProjectModel.belongsTo(StatusModel); //task.getProject();

PriorityModel.hasMany(TaskModel);
TaskModel.belongsTo(PriorityModel); //task.getProject();
PriorityModel.hasMany(ProjectModel);
ProjectModel.belongsTo(PriorityModel); //task.getProject();

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
const Status = db.models.status;
const Priority = db.models.priority;

db.sync();

module.exports = {Task, Project, Client, Message, Note, Status, Priority};
