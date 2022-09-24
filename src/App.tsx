import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist";

export type FilterType = 'all' | 'active' | 'completed'


function App() {
    const [tasks, setTasks] = useState([
        {id: 1, title: 'Go to job', isDone: false},
        {id: 2, title: 'Do tasks for my dev courses', isDone: false},
        {id: 3, title: 'Go for shopping', isDone: true},
        {id: 4, title: 'Pay for bills', isDone: true},
        {id: 5, title: 'Do my teeth', isDone: false},
        {id: 6, title: 'Repair some stuff at home', isDone: false},
        {id: 7, title: 'Save some money to the future', isDone: false},
        {id: 8, title: 'Visit parents', isDone: false},
        {id: 9, title: 'Meet with friends', isDone: false},
        {id: 10, title: 'Buy some stuff for the computer', isDone: false}
    ])


    const removeTask = (id: number) => {
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


    return (
        <div className="App">
            <Todolist
                title='What to do'
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}

            />
        </div>
    );
}

export default App;
