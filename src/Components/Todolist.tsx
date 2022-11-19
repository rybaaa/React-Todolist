import React, {ChangeEvent} from "react";
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

export const Todolist = (props: appPropsTypes) => {
    const tasks = useSelector<AppStoreType, TasksType[]>(state => state.tasks[props.todolistID])
    const dispatch = useDispatch()


    const onClickFilterChange = (filter: FilterType) => () => dispatch(changeTodolistFilterAC(props.todolistID, filter))

    const deleteTodolist = () => {
        dispatch(removeTodolistAC(props.todolistID))
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(props.todolistID, title))
    }


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
                {filteredTasks.map((item) => {
                    const removeTask = () => {
                        dispatch(removeTaskAC(item.id, props.todolistID))
                    }
                    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusAC(props.todolistID, item.id, e.currentTarget.checked))
                    }
                    const onChangeTaskTitle = (newTitle: string) => {
                        dispatch(changeTaskTitleAC(props.todolistID, item.id, newTitle))
                    }

                    return (
                        <ListItem key={item.id}
                                  style={{opacity: item.isDone ? 0.5 : 1, justifyContent: 'space-between'}}>
                            <Checkbox
                                size={'small'}
                                color={'primary'}
                                checked={item.isDone}
                                onChange={onChangeTaskHandler}/>
                            <EditableSpan title={item.title} editMode={true} onChangeTitle={onChangeTaskTitle}/>
                            <IconButton onClick={removeTask}><DeleteRounded/></IconButton>
                        </ListItem>
                    )
                })}
            </List>
        )
    }
    const onChangeTodolistTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleAC(props.todolistID, newTitle))
    }
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
}