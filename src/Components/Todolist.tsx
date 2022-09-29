import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './Todolist.module.css'
import {FilterType} from "../App";

type appPropsTypes = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
}

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: appPropsTypes) => {

    const [newTitleName, setNewTitleName] = useState('')


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitleName(e.currentTarget.value)
    }
    const onEnterDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTitleName)
            setNewTitleName('')
        }
    }
    const onClickFilterChange = (filter: FilterType) => () => props.changeFilter(filter)

    const addTask = () => {
        const trimedTitle = newTitleName.trim()
        if (trimedTitle !== '') {
            props.addTask(trimedTitle);
        }
        setNewTitleName('')
    }


    const Tasklist = () => {
        return (
            <ul className={s.tasks_list}>
                {props.tasks.map((item) => {
                    const removeTask = () => {
                        props.removeTask(item.id)
                    }
                    return (
                        <li key={item.id}>
                            <input className={s.checkbox} type='checkbox' checked={item.isDone}/>
                            <span>{item.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })}
            </ul>
        )
    }
    return (
        <div>
            <div className={s.new_tasks}>
                <h3>
                    {props.title}
                </h3>
                <div>
                    <input value={newTitleName}
                           onChange={onChangeHandler}
                           onKeyDown={onEnterDownHandler}
                    />
                    <button onClick={addTask}>+</button>
                </div>
            </div>
            <Tasklist/>
            <div>
                <span className={s.button}>
                    <button onClick={onClickFilterChange('all')} className={s.button_item}>All</button>
                    <button onClick={onClickFilterChange('active')} className={s.button_item}>Active</button>
                    <button onClick={onClickFilterChange('completed')} className={s.button_item}>Done</button>
                </span>
            </div>
        </div>

    )
}