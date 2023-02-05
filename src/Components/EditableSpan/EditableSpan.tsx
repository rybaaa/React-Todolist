import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";
import s from '../EditableSpan/EditableSpan.module.css'
import {TaskStatuses} from "../../api/todolist-api";

type EditableSpanPropsType = {
    value: string
    onChangeTitle: (newTitle: string) => void
    taskStatus?:TaskStatuses
}
interface KeyboardEvent {
    key: string;
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [isEditMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.onChangeTitle(title)
    }
    const onEnterHandler = (e: KeyboardEvent)=>{
        if (e.key==='Enter'){
            setEditMode(false)
            props.onChangeTitle(title)
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        isEditMode ?
            <TextField rows={1} multiline variant={'standard'} size={'small'} value={title} autoFocus
                       onChange={onChangeTitleHandler} onBlur={offEditMode} onKeyDown={onEnterHandler}/>
            : <span className={props.taskStatus===TaskStatuses.Completed? `${s.task} ${s.task_completed}`: `${s.task}`} onClick={onEditMode}>{props.value}</span>
    );
});
