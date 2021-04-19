import React from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../features/todolistsList/tasks-reducer";
import {todolistsReducer} from "../../features/todolistsList/todolists-reducer";
import {v1} from "uuid";
import {AppRootStateType} from "../../app/store";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {appReducer} from "../../app/app-reducer";
import {authReducer} from "../../features/Login/authReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: "What to buy", filter: "all", addedDate: '', order: 1, entityStatus: 'idle'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'first task',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: 'second task',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'third task',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: 'fourth task',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            }
        ]
    },
    app: {
        status: 'loading',
        error: null,
        isInitialized: false
    },
    auth: {
        isLoggedIn: true
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState)
export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>

}