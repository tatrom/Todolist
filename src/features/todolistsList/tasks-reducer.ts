import {TasksStateType} from '../../app/App';
import {
    addTodolistAC,
    removeTodolistAC, setTodolistsAC,
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: TasksStateType = {
    count: []
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ThunkActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const removeTaskTC = (todolistId: string, id: string) => (dispatch: Dispatch<ThunkActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTask(todolistId, id)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                const action = removeTaskAC(id, todolistId);
                dispatch(action);
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => handleServerNetworkError(error, dispatch))
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ThunkActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => handleServerNetworkError(error, dispatch))
}

export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch<ThunkActionType>, getState: () => AppRootStateType) => {

    dispatch(setAppStatusAC('loading'))
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskId
    })

    if (task) {
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        todolistsAPI.updateTask(todolistId, taskId, apiModel).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
            .catch((error) => handleServerNetworkError(error, dispatch))
    }

}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>


type ThunkActionType =
    | ActionsType
    | SetAppErrorActionType
    | SetAppStatusActionType



