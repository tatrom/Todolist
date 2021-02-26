import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    console.log('Add item form')
    const addItem = () => {
        const itemTitle = newTaskTitle.trim()
        if (itemTitle) {
            props.addItem(itemTitle)
        } else {
            setError("Title is required!!!");
        }
        setNewTaskTitle("");
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        setNewTaskTitle(e.currentTarget.value)

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem();
    }
    return (
        <div>
            <TextField value={newTaskTitle}
                       label={'type value'}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addItem} color={'primary'}>
                <ControlPoint/>!
            </IconButton>
        </div>
    )
})