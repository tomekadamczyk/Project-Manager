import { ErrorsObjects } from "./types";

export enum ErrorType {
    PROJECT_FOREIGN_KEY_CONSTRAINT_FAILS = 'PROJECT_FOREIGN_KEY_CONSTRAINT_FAILS',
    STATUS_FOREIGN_KEY_CONSTRAINT_FAILS = 'STATUS_FOREIGN_KEY_CONSTRAINT_FAILS',
    STATUS_FOREIGN_KEY_CONSTRAINT_FAILS_2 = 'STATUS_FOREIGN_KEY_CONSTRAINT_FAILS_2',
    PRIORITY_FOREIGN_KEY_CONSTRAINT_FAILS = 'PRIORITY_FOREIGN_KEY_CONSTRAINT_FAILS',
    PRIORITY_FOREIGN_KEY_CONSTRAINT_FAILS_2 = 'PRIORITY_FOREIGN_KEY_CONSTRAINT_FAILS_2',
    CLIENT_ID_NOT_PROVIDED = 'CLIENT_ID_NOT_PROVIDED',
    PROJECT_ID_CANNOT_BE_NULL = 'PROJECT_ID_CANNOT_BE_NULL',
    PRIORITY_ID_CANNOT_BE_NULL = 'PRIORITY_ID_CANNOT_BE_NULL',
    STATUS_ID_CANNOT_BE_NULL = 'STATUS_ID_CANNOT_BE_NULL',
    CLIENT_FOREIGN_KEY_CONSTRAINT_FAILS = 'CLIENT_FOREIGN_KEY_CONSTRAINT_FAILS'
}

export const errorsDictionary: ErrorsObjects = {
    [ErrorType.PROJECT_FOREIGN_KEY_CONSTRAINT_FAILS]: {
        message: "Cannot add or update a child row: a foreign key constraint fails (`project_manager`.`tasks`, CONSTRAINT `tasks_ibfk_3` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id_projects`) ON DELETE SET NULL ON UPDATE CASCADE)",
        error: 'Wybierz projekt z listy'
    },
    [ErrorType.STATUS_FOREIGN_KEY_CONSTRAINT_FAILS]: {
        message: "Cannot add or update a child row: a foreign key constraint fails (`project_manager`.`tasks`, CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`statusId`) REFERENCES `statuses` (`id_status`) ON DELETE SET NULL ON UPDATE CASCADE)",
        error: 'Wybierz status z listy'
    },
    [ErrorType.STATUS_FOREIGN_KEY_CONSTRAINT_FAILS_2]: {
        message: "Cannot add or update a child row: a foreign key constraint fails (`project_manager`.`tasks`, CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`statusId`) REFERENCES `statuses` (`id_status`) ON DELETE SET NULL ON UPDATE CASCADE)",
        error: 'Wybierz status z listy'
    },
    [ErrorType.PRIORITY_FOREIGN_KEY_CONSTRAINT_FAILS]: {
        message: "Cannot add or update a child row: a foreign key constraint fails (`project_manager`.`tasks`, CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`priorityId`) REFERENCES `priorities` (`id_priorities`) ON DELETE SET NULL ON UPDATE CASCADE)",
        error: 'Wybierz priorytet z listy'
    },
    [ErrorType.PRIORITY_FOREIGN_KEY_CONSTRAINT_FAILS_2]: {
        message: "Cannot add or update a child row: a foreign key constraint fails (`project_manager`.`projects`, CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`priorityId`) REFERENCES `priorities` (`id_priorities`) ON DELETE SET NULL ON UPDATE CASCADE)",
        error: 'Wybierz priorytet z listy'
    },
    
    [ErrorType.CLIENT_ID_NOT_PROVIDED]: {
        message: 'Variable "$clientId" of required type "Int!" was not provided.',
        error: 'Wybierz klienta z listy'
    },
    [ErrorType.CLIENT_FOREIGN_KEY_CONSTRAINT_FAILS]: {
        message: 'Cannot add or update a child row: a foreign key constraint fails (`project_manager`.`projects`, CONSTRAINT `projects_ibfk_3` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id_clients`) ON DELETE SET NULL ON UPDATE CASCADE)',
        error: 'Wybierz klienta z listy'
    },
    [ErrorType.PROJECT_ID_CANNOT_BE_NULL]: {
        message: 'Variable "$projectId" of non-null type "Int!" must not be null.',
        error: 'Należy wybrać projekt'
    },
    [ErrorType.PRIORITY_ID_CANNOT_BE_NULL]: {
        message: 'Variable "$priorityId" of non-null type "Int!" must not be null.',
        error: 'Należy wybrać priorytet'
    },
    [ErrorType.STATUS_ID_CANNOT_BE_NULL]: {
        message: 'Variable "$statusId" of non-null type "Int!" must not be null.',
        error: 'Należy wybrać status'
    }
}

