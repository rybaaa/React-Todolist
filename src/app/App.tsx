import React, {useCallback} from 'react';
import './App.css';
import {TasksType, TodolistsList} from "../features/TodolistsList/TodolistsList";
import {AddItemForm} from "../Components/AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar} from "@material-ui/core";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
} from "../features/TodolistsList/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, useAppSelector} from "./store";

export type FilterType = 'all' | 'active' | 'completed'

export type todolistType = {
    id: string
    title: string
    filter: FilterType
}
export type tasksForTodolistType = {
    [todolistID: string]: TasksType[]
}


function App() {
    const status = useAppSelector(state => state.app.status)
    return (
        <div>
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h4">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )

}

export default App;
