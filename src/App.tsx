import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'


function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'Go to job', isDone: false},
        {id:  v1(), title: 'Do tasks for my dev courses', isDone: false},
        {id:  v1(), title: 'Go for shopping', isDone: true},
        {id:  v1(), title: 'Pay for bills', isDone: true},
        {id:  v1(), title: 'Do my teeth', isDone: false},
        {id:  v1(), title: 'Repair some stuff at home', isDone: false},
        {id:  v1(), title: 'Save some money to the future', isDone: false},
        {id:  v1(), title: 'Visit parents', isDone: false},
        {id:  v1(), title: 'Meet with friends', isDone: false},
        {id:  v1(), title: 'Buy some stuff for the computer', isDone: false}
    ])


    const removeTask = (id: string) => {
        let filtered_tasks = tasks.filter((item) => item.id !== id)
        setTasks(filtered_tasks)
    }



    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    const [filter, setFilter] = useState<FilterType>('all')

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter((item) => !item.isDone)

    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter((item) => item.isDone)
    }

    const addTask = (title:string) => {
        const newTaskTitle = {id:  v1(), title: title, isDone:false}
        setTasks([newTaskTitle, ...tasks])
    }


    return (
        <div className="App">
            <Todolist
                title='What to do'
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask = {addTask}

            />
        </div>
    );
}

export default App;
