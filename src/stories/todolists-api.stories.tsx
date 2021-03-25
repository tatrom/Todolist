import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '8c49b133-928a-4a57-b997-bbf0ea6abb17'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const addTodolist = () => {
        todolistsAPI.createTodolist(title).then((res) => {
            setState(res.data);
        })
    }
    return <div>{JSON.stringify(state)}
        <input type="text" placeholder={'todolist title'} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={addTodolist}>Add todolist</button>
    </div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <input type="text" placeholder={'todolistId'} onChange={e => setTodolistId(e.currentTarget.value)}/>
        <button onClick={deleteTodolist}>Delete todolist</button>
    </div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')


    const updateTodolistTitleHandler = () => {
        todolistsAPI.updateTodolistTitle(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <input type="text" placeholder={'todolistId'} onChange={e => setTodolistId(e.currentTarget.value)}/>
        <input type="text" placeholder={'new title'} onChange={e => setTitle(e.currentTarget.value)}/>
        <button onClick={updateTodolistTitleHandler}>Update title</button>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then(
                (res) => {
                    setState(res.data.items)
                }
            )
    }
    return <div>{JSON.stringify(state)}
        <div><input type="text" placeholder={'todolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        </div>
        <button onClick={getTasks}>Get tasks</button>
    </div>
}


export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(
                (res) => {
                    setState(res.data)
                }
            )
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'taskId'} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>

}


export const CreateTask = () => {
    const [title, setTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const createTask = () => {
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                console.log(res.data.data.item.addedDate)
            })

    }

    return (<div>
            <input type="text" placeholder={'task title'} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <input type="text" placeholder={'todolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={createTask}>Add task</button>
        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('title 1')
    const [description, setDescription] = useState<string>('description 1 ')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const createTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            deadline: "",
            description: description,
            priority: priority,
            startDate: "",
            status: status,
            title: title
        })
            .then(res => {
                console.log(res.data.data.item.addedDate)
            })

    }

    return (<div>
            <input type="text" placeholder={'taskId'} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <input type="text" placeholder={'todolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input type="text" placeholder={'Task Title '} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <input type="text" placeholder={'Description'} onChange={(e) => setDescription(e.currentTarget.value)}/>
            <input type="number" placeholder={'Status'} onChange={(e) => setStatus(+e.currentTarget.value)}/>
            <input type="number" placeholder={'Priority'} onChange={(e) => setPriority(+e.currentTarget.value)}/>
            <button onClick={createTask}>Update task</button>
        </div>
    )
}