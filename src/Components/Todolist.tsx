import React, {ChangeEvent} from "react";
import s from './Todolist.module.css'
import {FilterType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {DeleteRounded} from "@mui/icons-material";

type appPropsTypes = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (value: FilterType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    filter: FilterType
    todolistID: string
    deleteTodolist: (todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: appPropsTypes) => {

    const onClickFilterChange = (filter: FilterType) => () => props.changeFilter(filter, props.todolistID)

    const deleteTodolist = () => {
        props.deleteTodolist(props.todolistID)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.todolistID)
    }


    const Tasklist = () => {
        return (
            <List>
                {props.tasks.map((item) => {
                    const removeTask = () => {
                        props.removeTask(item.id, props.todolistID)
                    }
                    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(item.id, e.currentTarget.checked, props.todolistID)
                    }
                    const onChangeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(item.id, newTitle, props.todolistID)
                    }

                    return (
                        <ListItem key={item.id} style={{opacity: item.isDone ? 0.5 : 1, justifyContent:'space-between'}}>
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
        props.changeTodolistTitle(newTitle, props.todolistID)
    }
    return (
        <div>
            <div style={{width:'300px'}}>
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