import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    changeTodolistFilterAC, createTodolistTC,
    fetchTodolistsTC,
    FilterValuesType, removeTodolistTC,
    TodolistDomainType, updateTodolistTitle
} from "./todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AdditemForm";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "../../app/App";

export const TodolistsList = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        const thunk = fetchTodolistsTC()
        dispatch(thunk)
    }, [dispatch])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(todolistId, id))
    }, [dispatch]);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch]);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC(id, todolistId, {status}))
    }, [dispatch]);

    const changeTaskTitle = useCallback(function (id: string, title: string, todolistId: string) {
        dispatch(updateTaskTC(id, todolistId, {title}))
    }, [dispatch]);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback(function (todolistId: string) {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch]);

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(updateTodolistTitle(id, title))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch]);

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                entityStatus={tl.entityStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
