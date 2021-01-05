import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (TaskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void

}

export function Todolist(props: PropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        const taskTitle = newTaskTitle.trim()
        if (taskTitle) {
            props.addTask(taskTitle, props.id)
            setNewTaskTitle("")
        } else {
            setError("Title is required!!!");
        }
        setNewTaskTitle("");
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTaskTitle(e.currentTarget.value)

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }
    const onClickPressHandler = () => {
        addTask();
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

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    return <div>
        <h3>
            <button onClick={removeTodoList}>X</button>
            {props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error " : ""}/>
            <button onClick={onClickPressHandler}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    return <li key={t.id}
                               className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x
                        </button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={changeAllHandler}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={changeActiveHandler}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={changeCompletedHandler}>Completed
            </button>
        </div>
    </div>
}
