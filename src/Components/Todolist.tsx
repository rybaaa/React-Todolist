import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from "react";
import s from './Todolist.module.css'
import {FilterType} from "../App";

type appPropsTypes = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistID:string) => void
    changeFilter: (value: FilterType, todolistID:string) => void
    addTask: (title: string, todolistID:string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID:string) => void
    filter: FilterType
    todolistID:string
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: appPropsTypes) => {

    const [newTitleName, setNewTitleName] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitleName(e.currentTarget.value)
        setError(null)
    }
    const onEnterDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newTitleName.trim() !== '') {
                props.addTask(newTitleName, props.todolistID)
                setNewTitleName('')
            } else {
                setError('Title is required')
            }
        }
    }
    const onClickFilterChange = (filter: FilterType) => () => props.changeFilter(filter, props.todolistID)

    const addTask = () => {
        const trimedTitle = newTitleName.trim()
        if (trimedTitle !== '') {
            props.addTask(trimedTitle, props.todolistID);
        } else {
            setError('Title is required')
        }
        setNewTitleName('')
    }


    const Tasklist = () => {
        return (
            <ul className={s.tasks_list}>
                {props.tasks.map((item) => {
                    const removeTask = () => {
                        props.removeTask(item.id, props.todolistID)
                    }
                    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(item.id, e.currentTarget.checked, props.todolistID)
                    }
                    return (
                        <li key={item.id} className={item.isDone? s.isDone : ''}>
                            <input className={s.checkbox} type='checkbox' checked={item.isDone}
                                   onChange={onChangeTaskHandler}/>
                            <span>{item.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })}
            </ul>
        )
    }
    return (
        <div className={s.sdfsdf}>
            <div className={s.new_tasks}>
                <h3>
                    {props.title}
                </h3>
                <div>
                    <input value={newTitleName}
                           onChange={onChangeHandler}
                           onKeyDown={onEnterDownHandler}
                           className={error ? s.errorinput : ''}
                    />
                    <button onClick={addTask}>+</button>
                    <div className={s.error}>
                        {error}
                    </div>

                </div>
            </div>
            <Tasklist/>
            <div>
                <span className={s.button}>
                    <button onClick={onClickFilterChange('all')} className={props.filter === 'all'? s.active_btn: s.button_item}>All</button>
                    <button onClick={onClickFilterChange('active')} className={props.filter === 'active'? s.active_btn: s.button_item}>Active</button>
                    <button onClick={onClickFilterChange('completed')} className={props.filter === 'completed'? s.active_btn: s.button_item}>Done</button>
                </span>
            </div>
        </div>

    )
}