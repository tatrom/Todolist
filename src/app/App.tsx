import React, {useEffect} from 'react'
import './App.css';
import {
    AppBar,
    Button,
    Container,
    IconButton,
    Toolbar,
    Typography,
    LinearProgress,
    CircularProgress
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {TaskType,} from "../api/todolists-api";
import {TodolistsList} from "../features/todolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/errorSnackbar/ErrorSnackBar";
import {Route, Switch, Redirect} from 'react-router-dom';
import {Login} from "../features/Login/Login";
import {initializeAppTC} from "./app-reducer";
import {logoutTC} from "../features/Login/authReducer";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const status = useSelector<AppRootStateType, string>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button onClick={logoutHandler}>logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route exact path={'/login'} render={() => <Login/>}/>
                </Switch>
            </Container>
        </div>
    );
}


export default App;
