import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
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
                       disabled={props.disabled}
            />
            <IconButton onClick={addItem} color={'primary'}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
})
// a4f2a95a-2f27-43ae-ad15-e63a35ca7922