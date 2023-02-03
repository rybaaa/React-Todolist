import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";
import s from '../../features/TodolistsList/Todolist/Task/Task.module.css'

type EditableSpanPropsType = {
    value: string
    onChangeTitle: (newTitle: string) => void
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
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        isEditMode ?
            <TextField rows={1} multiline variant={'standard'} size={'small'} value={title} autoFocus
                       onChange={onChangeTitleHandler} onBlur={offEditMode}/>
            : <span className={s.task} onClick={onEditMode}>{props.value}</span>
    );
});
