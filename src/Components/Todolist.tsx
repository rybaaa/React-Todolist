import React from "react";
import s from './Todolist.module.css'
import {FilterType} from "../App";

type appPropsTypes = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId:number) => void
    changeFilter: (value: FilterType) => void
}

type TasksType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: appPropsTypes) => {

    const Tasklist = ()=> {
        return (
            <ul className={s.tasks_list}>
                {props.tasks.map((item) => {
                    return (
                        <li key={item.id}>
                            <input className={s.checkbox} type='checkbox' checked={item.isDone}/>
                            <span>{item.title}</span>
                            <button onClick={ () => {props.removeTask(item.id)} } >x</button>
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
                    <input type='textarea'/>
                    <button>+</button>
                </div>
            </div>
            <Tasklist/>
            <div>
                <span className={s.button}>
                    <button onClick={() => {props.changeFilter('all')}} className={s.button_item}>All</button>
                    <button onClick={() => {props.changeFilter('active')}} className={s.button_item}>Active</button>
                    <button onClick={() => {props.changeFilter('completed')}} className={s.button_item}>Done</button>
                </span>
            </div>
        </div>

    )
}