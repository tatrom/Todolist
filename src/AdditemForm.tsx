import React, {useState, ChangeEvent, KeyboardEvent} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export const AddItemForm = (props:AddItemFormPropsType) => {
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
        setError(null);
        setNewTaskTitle(e.currentTarget.value)

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem();
    }
    return (
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error " : ""}/>
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}