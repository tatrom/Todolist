import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'

type RemoveTaskAction = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistID: string
}

type AddTaskAction = {
    type: "ADD-TASK"
    title: string
    todolistID: string
}

export type ChangeTaskStatusCreator = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    isDone: boolean
    id: string
}

export type ChangeTaskTitleCreator = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    title: string
    todolistId: string
}


type ActionType =
    RemoveTaskAction
    | AddTaskAction
    | ChangeTaskStatusCreator
    | ChangeTaskTitleCreator
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            let todolistTasks = stateCopy[action.todolistID]
            stateCopy[action.todolistID] = todolistTasks.filter(t => t.id !== action.taskID)
            return stateCopy
        }
        case "ADD-TASK": {
            let stateCopy = {...state}
            const newTask = {id: v1(), title: action.title, isDone: false}
            let todoListsTasks = state[action.todolistID]
            stateCopy[action.todolistID] = [...todoListsTasks, newTask]
            return stateCopy
        }
        case CHANGE_TASK_STATUS: {
            let todolistTasks = state[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.id);
            if (task) {
                task.isDone = action.isDone;
                return {...state}
            }
            return {...state}
        }
        case CHANGE_TASK_TITLE: {
            let todolist = state[action.todolistId]
            let task = todolist.find(t => t.id === action.id)
            if (task) {
                task.title = action.title
            }
            return {...state}
        }
        case 'ADD-TODOLIST-TYPE': {
            let stateCopy = {...state}
            stateCopy[action.id] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todolistID]
            return copyState;
        }
        default:
            return state
    }
}

export const RemoveTaskAC = (taskID: string, todolistID: string): RemoveTaskAction => {
    return {type: "REMOVE-TASK", taskID, todolistID}
}

export const AddTaskAC = (title: string, todolistID: string): AddTaskAction => {
    return {type: "ADD-TASK", title, todolistID}
}

export const changeTaskStatusAC = (id: string, isDone: boolean, title: string): ChangeTaskStatusCreator => {
    return {type: CHANGE_TASK_STATUS, id: id, todolistId: title, isDone: isDone}
}

export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleCreator => {
    return {type: CHANGE_TASK_TITLE, id: id, title: title, todolistId: todolistId}
}