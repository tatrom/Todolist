import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";


export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeFilterActionType = {
    type: 'CHANGE-FILTER'
    value: FilterValuesType
    todoListID: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST-TYPE'
    title: string
    id: string
}
export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    todolistID: string
}

type ActionType =
    ChangeTodolistTitleActionType
    | ChangeFilterActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

let initialState: Array<TodoListType> = []
export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionType) => {
    switch (action.type) {
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            debugger
            return [...state]
        }
        case 'CHANGE-FILTER': {
            const todolist = state.find(tl => tl.id === action.todoListID);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                debugger
                todolist.filter = action.value;
            }
            return [...state];
        }
        case 'ADD-TODOLIST-TYPE': {
            const newTodolist: TodoListType = {
                id: action.id,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodolist]
        }
        case "REMOVE-TODOLIST": {
            let copyState = state.filter(tl => tl.id !== action.todolistID);
            return copyState
        }
        default:
            return state
    }
}

export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}

export const ChangeFilterAC = (value: FilterValuesType, todoListID: string): ChangeFilterActionType => {
    return {type: 'CHANGE-FILTER', value, todoListID}
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST-TYPE', title, id: v1()}
}

export const RemoveTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", todolistID}
}