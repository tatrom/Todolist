import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AdditemForm";
import EditableSpan from "./EditableSpan";

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

    return (
        <div>
            <h3><EditableSpan title={props.title} changeTaskTitle={changeTodoListTitle} /></h3>

                <AddItemForm addItem={addTask}/>
                <ul>
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
                            return <li key={t.id}
                                       className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       onChange={onChangeHandler}
                                       checked={t.isDone}/>
                                <EditableSpan title={t.title} changeTaskTitle={changeTitle}/>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <button className={props.filter === "all" ? "active-filter" : ""} onClick={changeAllHandler}>All
                    </button>
                    <button className={props.filter === "active" ? "active-filter" : ""}
                            onClick={changeActiveHandler}>Active
                    </button>
                    <button className={props.filter === "completed" ? "active-filter" : ""}
                            onClick={changeCompletedHandler}>Completed
                    </button>
                </div>
            </div>
    )
}
