import React from 'react'
import './App.css';
import {AppBar, Button, Container,  IconButton, Toolbar, Typography, LinearProgress} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

import { useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {TaskType,} from "../api/todolists-api";
import {TodolistsList} from "../features/todolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/errorSnackbar/ErrorSnackBar";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const status = useSelector<AppRootStateType,string>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar />
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
                { status === 'loading' && <LinearProgress/> }
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}


export default App;
