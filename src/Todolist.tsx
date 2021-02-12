import React, {ChangeEvent} from 'react';
import {AddItemForm} from "./AdditemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/Store";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";
import {ChangeFilterAC} from "./state/todolists-reducer";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

type TaskType = {
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

export function Todolist(props: TodolistPropsType) {

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch();
    const addTask = (title: string) => {
        dispatch(AddTaskAC(title, props.id));
    }
    let tasksForTodoList = tasks
    if (props.filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    const changeAllHandler = () => dispatch(ChangeFilterAC("all", props.id))
    const changeActiveHandler = () => dispatch(ChangeFilterAC("active", props.id))
    const changeCompletedHandler = () => dispatch(ChangeFilterAC("completed", props.id))


    const changeTodoListTitle = (title: string) => {
        debugger
        props.changeTodolistTitle(title, props.id)
    }
    const onRemoveTodolistHandler = () => {
        props.removeTodoList(props.id);
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} changeTaskTitle={changeTodoListTitle}/>
                <IconButton onClick={onRemoveTodolistHandler}>
                    <Delete/>
                </IconButton></h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForTodoList.map(t => {
                        const onRemoveHandler = () => {
                            dispatch(RemoveTaskAC(t.id, props.id))
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(ChangeTaskStatusAC(t.id, props.id, e.currentTarget.checked))
                        }
                        const changeTitle = (title: string) => {
                            dispatch(ChangeTaskTitleAC(t.id, title, props.id))
                        }
                        return <div key={t.id}
                                    className={t.isDone ? "is-done" : ""}>
                            <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                            <EditableSpan title={t.title} changeTaskTitle={changeTitle}/>
                            <IconButton onClick={onRemoveHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    })
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
}
