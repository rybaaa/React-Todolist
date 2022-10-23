import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    editMode: boolean
    onChangeTitle:(newTitle:string)=>void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
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
            <input value={title} autoFocus onChange={onChangeTitleHandler} onBlur={offEditMode}/>
            : <span onClick={onEditMode}>{props.title}</span>
    );
};
