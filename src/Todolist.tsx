import React, {useCallback} from 'react';
import {AddItemForm} from "./AdditemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/Store";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";
import {ChangeFilterAC} from "./state/todolists-reducer";
import {Task} from "./state/Task";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type FilterValuesType = "all" | "active" | "completed"
type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    const dispatch = useDispatch();

    const addTask = useCallback((title: string) => {
        dispatch(AddTaskAC(title, props.id));
    }, [dispatch, props.id])

    let tasksForTodoList = tasks

    if (props.filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    const changeAllHandler = useCallback(() => dispatch(ChangeFilterAC("all", props.id)), [dispatch, props.id])
    const changeActiveHandler = useCallback(() => dispatch(ChangeFilterAC("active", props.id)), [dispatch, props.id])
    const changeCompletedHandler = useCallback(() => dispatch(ChangeFilterAC("completed", props.id)), [dispatch, props.id])


    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.id)
    }, [])
    const onRemoveTodolistHandler = useCallback(() => {
        props.removeTodoList(props.id)
    }, []);
    const onRemoveHandler = useCallback((taskId: string) => {
        dispatch(RemoveTaskAC(taskId, props.id))
    }, [])
    const onChangeHandler = useCallback((isChecked: boolean, taskId: string) => {
        dispatch(ChangeTaskStatusAC(taskId, props.id, isChecked))
    }, [tasks])
    const changeTitle = useCallback((title: string, taskId: string) => {
        dispatch(ChangeTaskTitleAC(taskId, title, props.id))
    }, [])


    return (
        <div>
            <h3><EditableSpan title={props.title} changeTaskTitle={changeTodoListTitle}/>
                <IconButton onClick={onRemoveTodolistHandler}>
                    <Delete/>
                </IconButton></h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForTodoList.map(t => <Task changeTitle={changeTitle} onChangeHandler={onChangeHandler}
                                                    onRemoveHandler={onRemoveHandler} task={t}/>
                    )
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} onClick={changeAllHandler}>All
                </Button>
                <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={changeActiveHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={changeCompletedHandler}>Completed
                </Button>
            </div>
        </div>
    )
})
