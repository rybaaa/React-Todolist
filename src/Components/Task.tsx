import React, {ChangeEvent, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../features/TodolistsList/task-reducer";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {DeleteRounded} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {TasksType} from "../features/TodolistsList/TodolistsList";

type TaskPropsType = {
    item: TasksType
    todolistID: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()
    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(props.item.id, props.todolistID))
    }, [dispatch, props.item.id, props.todolistID])
    const onChangeTaskHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.todolistID, props.item.id, e.currentTarget.checked))
    }, [dispatch, props.item.id, props.todolistID])
    const onChangeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(props.todolistID, props.item.id, newTitle))
    }, [dispatch, props.todolistID, props.item.id])

    return (
        <ListItem key={props.item.id}
                  style={{opacity: props.item.isDone ? 0.5 : 1, justifyContent: 'space-between', width:'300px', display:'flex', flexWrap:'wrap'}}>
            <Checkbox
                size={'small'}
                color={'primary'}
                checked={props.item.isDone}
                onChange={onChangeTaskHandler}/>
            <EditableSpan title={props.item.title} editMode={true} onChangeTitle={onChangeTaskTitle}/>
            <IconButton onClick={removeTask}><DeleteRounded/></IconButton>
        </ListItem>
    )
});

