import React, {ChangeEvent, useCallback} from "react";
import s from './Todolist.module.css'
import {FilterType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {DeleteRounded} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../store/store";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../store/task-reducer";
import {Task} from "./Task";

type appPropsTypes = {
    title: string
    filter: FilterType
    todolistID: string
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = React.memo((props: appPropsTypes) => {
    console.log('todolist')
    const tasks = useSelector<AppStoreType, TasksType[]>(state => state.tasks[props.todolistID])
    const dispatch = useDispatch()


    const onClickFilterChange = (filter: FilterType) => () => dispatch(changeTodolistFilterAC(props.todolistID, filter))

    const deleteTodolist = useCallback(() => {
        dispatch(removeTodolistAC(props.todolistID))
    }, [dispatch, props.todolistID])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.todolistID, title))
    }, [dispatch, props.todolistID])


    const Tasklist = () => {
        let filteredTasks = tasks
        if (props.filter === 'active') {
            filteredTasks = tasks.filter(el => !el.isDone)
        }
        if (props.filter === 'completed') {
            filteredTasks = tasks.filter(el => el.isDone)
        }

        return (
            <List>
                {filteredTasks.map((item) => <Task key={item.id} item={item} todolistID={props.todolistID}/>
                )}
            </List>
        )
    }
    const onChangeTodolistTitle = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(props.todolistID, newTitle))
    }, [dispatch, props.todolistID])
    return (
        <div>
            <div style={{width: '300px'}}>
                <Typography
                    style={{marginTop: '20px', fontWeight: 'bold'}}
                    align={"center"}
                    variant={"h6"}
                >
                    <EditableSpan title={props.title} editMode={true} onChangeTitle={onChangeTodolistTitle}/>
                    <IconButton onClick={deleteTodolist}><DeleteRounded/>
                    </IconButton>
                </Typography>
                <AddItemForm addItem={addTask}/>
            </div>
            <Tasklist/>
            <div>
                <span className={s.button}>
                    <Button onClick={onClickFilterChange('all')}
                            variant={'contained'}
                            color={props.filter === 'all' ? 'secondary' : 'primary'}
                            size={'small'}
                            style={{marginRight: '3px'}}
                    >All</Button>
                    <Button onClick={onClickFilterChange('active')}
                            variant={'contained'}
                            color={props.filter === 'active' ? 'secondary' : 'primary'}
                            size={'small'}
                            style={{marginRight: '3px'}}
                    >Active</Button>
                    <Button onClick={onClickFilterChange('completed')}
                            variant={'contained'}
                            color={props.filter === 'completed' ? 'secondary' : 'primary'}
                            size={'small'}
                            style={{marginRight: '3px'}}
                    >Done</Button>
                </span>
            </div>
        </div>
    )
})