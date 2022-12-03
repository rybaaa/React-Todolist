import React, {useCallback} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Components/Todolist";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar} from "@material-ui/core";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
} from "./store/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./store/store";

export type FilterType = 'all' | 'active' | 'completed'

export type todolistType = {
    id: string
    title: string
    filter: FilterType
}
export type tasksForTodolistType = {
    [todolistID: string]: TasksType[]
}


function AppWithRedux() {
    const todolists = useSelector<AppStoreType, Array<todolistType>>(state => state.todolists)
    const dispatch = useDispatch()

    const addItem = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    },[dispatch])

    let todolistsItems = todolists.map((tdl) => {
            return (
                <Todolist
                    key={tdl.id}
                    title={tdl.title}
                    filter={tdl.filter}
                    todolistID={tdl.id}
                />
            );
        }
    )
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
            <div className='App'>
                <div style={{paddingRight: '20px'}}>
                    <Typography
                        style={{marginTop: '33px', fontWeight: 'bold'}}
                        align={"center"}
                        variant={"h6"}
                    >Enter new title</Typography>
                    <div>
                        <AddItemForm addItem={addItem}/>
                    </div>
                </div>
                {todolistsItems}
            </div>

        </div>
    )

}

export default AppWithRedux;
