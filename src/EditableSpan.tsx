import React, {useState, ChangeEvent} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTaskTitle: (title: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        if (title.trim()) {
            props.changeTaskTitle(title.trim())
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode ? <TextField value={title}
                          onBlur={offEditMode}
                          autoFocus
                          onChange={changeTitle}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan