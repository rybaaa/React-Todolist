import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./Todolist.module.css";

type AddItemFormType = {
    addItem: (title:string)=>void
}

export const AddItemForm = (props:AddItemFormType) => {
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
        <div className={s.input}>
            <input value={newTitleName}
                   onChange={onChangeHandler}
                   onKeyDown={onEnterDownHandler}
                   className={error ? s.errorinput : ''}
            />
            <button onClick={addItem}>+</button>
            <div className={s.error}>
                {error}
            </div>
        </div>
    );
};

