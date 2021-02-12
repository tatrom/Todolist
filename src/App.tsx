import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AdditemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const todoListID1 = v1()
    const todoListID2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])
    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todoListID2]: [{id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ]
    });


    function removeTask(id: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]

        tasks[todoListID] = todoListTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(newTaskTitle: string, todoListID: string) {
        let newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    function changeStatus(taskID: string, isDone: boolean, todolistID: string) {
        const todoListTasks = tasks[todolistID]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskID: string, title: string, todolistID: string) {
        const todoListTasks = tasks[todolistID]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function changeTodolistTitle(title: string, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(todoListTitle: string) {
        const todoListId = v1();
        const newTodoList: TodoListType = {
            id: todoListId,
            title: todoListTitle,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks,
            [todoListId]: []
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todoLists.map(tl => {
                            let tasksForTodoList = tasks[tl.id]
                            if (tl.filter === "active") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                            }
                            return <Grid item>
                                <Paper style={ {padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={tasksForTodoList}
                                        removeTodoList={removeTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
