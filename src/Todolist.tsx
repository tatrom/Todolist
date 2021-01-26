import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AdditemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Add, CheckBox, Delete} from "@material-ui/icons";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (TaskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (TaskID: string, title: string, todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeAllHandler = () => {
        props.changeFilter("all", props.id)
    }
    const changeActiveHandler = () => {
        props.changeFilter("active", props.id)
    }
    const changeCompletedHandler = () => {
        props.changeFilter("completed", props.id)
    }

    const changeTodoListTitle = (title: string) => {
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
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const changeTitle = (title: string) => {
                            props.changeTaskTitle(t.id, title, props.id)
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
