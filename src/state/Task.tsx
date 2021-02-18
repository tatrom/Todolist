import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "../EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../Todolist";

type TaskPropsType = {
    onRemoveHandler: (taskId: string) => void
    onChangeHandler: (isChecked: boolean, taskId: string) => void
    changeTitle: (title: string, taskId: string) => void
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.onRemoveHandler(props.task.id)
    }
    const onChangeHandler = (isChecked: boolean) => {
        props.onChangeHandler(isChecked, props.task.id)
    }
    const changeTitle = useCallback((title: string) => {
        props.changeTitle(title, props.task.id)
    }, [props.task.id, props.changeTitle])


    return (
        <div key={props.task.id}
             className={props.task.isDone ? "is-done" : ""}>
            <Checkbox onChange={e => onChangeHandler(e.currentTarget.checked)}
                      checked={props.task.isDone}/>
            <EditableSpan title={props.task.title} changeTaskTitle={changeTitle} taskId={props.task.id}/>
            <IconButton onClick={() => props.onRemoveHandler(props.task.id)}>
                <Delete/>
            </IconButton>
        </div>
    )
})