import React, {ChangeEvent} from "react";
import s from './Todolist.module.css'
import {FilterType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTodolistTitle:(title:string, todolistID: string)=>void
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
            <ul className={s.tasks_list}>
                {props.tasks.map((item) => {
                    const removeTask = () => {
                        props.removeTask(item.id, props.todolistID)
                    }
                    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(item.id, e.currentTarget.checked, props.todolistID)
                    }
                    const onChangeTaskTitle = (newTitle:string) => {
                        props.changeTaskTitle(item.id, newTitle, props.todolistID)
                    }

                    return (
                        <li key={item.id} className={item.isDone ? s.isDone : ''}>
                            <input className={s.checkbox} type='checkbox' checked={item.isDone}
                                   onChange={onChangeTaskHandler}/>
                            <EditableSpan title={item.title} editMode={true} onChangeTitle={onChangeTaskTitle}/>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })}
            </ul>
        )
    }
    const onChangeTodolistTitle = (newTitle:string) => {
        props.changeTodolistTitle(newTitle, props.todolistID)
    }
    return (
        <div>
            <div className={s.new_tasks}>
                <div className={s.title}>
                    <h3>
                        <EditableSpan title={props.title} editMode={true} onChangeTitle={onChangeTodolistTitle}/>
                    </h3>
                    <button onClick={deleteTodolist} className={s.title_delete}>x</button>
                </div>
                <AddItemForm addItem={addTask}/>
            </div>
            <Tasklist/>
            <div>
                <span className={s.button}>
                    <button onClick={onClickFilterChange('all')}
                            className={props.filter === 'all' ? s.active_btn : s.button_item}>All</button>
                    <button onClick={onClickFilterChange('active')}
                            className={props.filter === 'active' ? s.active_btn : s.button_item}>Active</button>
                    <button onClick={onClickFilterChange('completed')}
                            className={props.filter === 'completed' ? s.active_btn : s.button_item}>Done</button>
                </span>
            </div>
        </div>

    )
}