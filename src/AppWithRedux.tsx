import React from 'react';
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

    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(store => store.todolists)
    const dispatch = useDispatch()

    function changeTodolistTitle(title: string, todoListID: string) {
        debugger
        dispatch(ChangeTodolistTitleAC(todoListID, title))
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatch(ChangeFilterAC(value, todoListID))

    }

    function removeTodoList(todoListID: string) {
        dispatch(RemoveTodolistAC(todoListID))
    }

    function addTodoList(todoListTitle: string) {
        dispatch(AddTodolistAC(todoListTitle))
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
