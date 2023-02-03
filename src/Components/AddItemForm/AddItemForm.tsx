import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./AddItemForm.module.css";
import {IconButton, TextField} from "@material-ui/core";
import {Add} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?:boolean

}

export const AddItemForm = React.memo((props: AddItemFormType) => {
    const [newTitleName, setNewTitleName] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitleName(e.currentTarget.value)
        setError(null)
    }
    const onEnterDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newTitleName.trim() !== '') {
                props.addItem(newTitleName)
                setNewTitleName('')
            } else {
                setError('Title is required')
            }
        }
    }
    const addItem = () => {
        const trimedTitle = newTitleName.trim()
        if (trimedTitle !== '') {
            props.addItem(trimedTitle);
        } else {
            setError('Title is required')
        }
        setNewTitleName('')
    }
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <TextField
                    label={'Title'}
                    variant={'outlined'}
                    value={newTitleName}
                    onChange={onChangeHandler}
                    onKeyDown={onEnterDownHandler}
                    size={'small'}

                />
                <IconButton onClick={addItem}><Add/></IconButton>
            </div>
            <div className={s.error}>
                {error}
            </div></div>

    );
});

