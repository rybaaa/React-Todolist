import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    editMode: boolean
    onChangeTitle:(newTitle:string)=>void
}

export const EditableSpan = React.memo( (props: EditableSpanPropsType) => {
    console.log('editable span')
    const [isEditMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.onChangeTitle(title)
    }
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        isEditMode ?
            <TextField variant={'standard'} size={'small'} value={title} autoFocus onChange={onChangeTitleHandler} onBlur={offEditMode}/>
            : <span onClick={onEditMode}>{props.title}</span>
    );
}) ;
