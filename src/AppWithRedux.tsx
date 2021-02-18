import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./AdditemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/Store";
import {AddTodolistAC, ChangeFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./state/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    console.log("I am an App")
    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(store => store.todolists)
    const dispatch = useDispatch()
    const changeTodolistTitle = useCallback((title: string, todoListID: string) => {
        dispatch(ChangeTodolistTitleAC(todoListID, title))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(ChangeFilterAC(value, todoListID))

    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(RemoveTodolistAC(todoListID))
    }, [dispatch])
    const addTodoList = useCallback((todoListTitle: string) => {
        dispatch(AddTodolistAC(todoListTitle))
    }, [dispatch])

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
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeFilter={changeFilter}
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
