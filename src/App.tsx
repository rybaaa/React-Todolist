import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";

export type FilterType = 'all' | 'active' | 'completed'

type todolistType = {
    id: string
    title: string
    filter: FilterType
}
type tasksForTodolistType = {
    [todolistID: string]: TasksType[]
}


function App() {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const [todolists, setTodolists] = useState<Array<todolistType>>([
            {id: todolistID1, title: 'What to do', filter: 'all'},
            {id: todolistID2, title: 'What to learn', filter: 'all'}
        ]
    )
    const [tasks, setTasks] = useState<tasksForTodolistType>({
            [todolistID1]: [
                {id: v1(), title: 'Go to job', isDone: false},
                {id: v1(), title: 'Do tasks for my dev courses', isDone: false},
                {id: v1(), title: 'Go for shopping', isDone: true},
                {id: v1(), title: 'Pay bills', isDone: true},
                {id: v1(), title: 'Do my teeth', isDone: false},
                {id: v1(), title: 'Repair some stuff at home', isDone: false},
                {id: v1(), title: 'Save some money to the future', isDone: false},
                {id: v1(), title: 'Visit parents', isDone: false},
                {id: v1(), title: 'Meet with friends', isDone: false},
                {id: v1(), title: 'Buy some stuff for the computer', isDone: false}
            ],
            [todolistID2]: [
                {id: v1(), title: 'HTML', isDone: false},
                {id: v1(), title: 'CSS', isDone: false},
                {id: v1(), title: 'React', isDone: true},
                {id: v1(), title: 'Angular', isDone: true},
                {id: v1(), title: 'Vue', isDone: false},
                {id: v1(), title: 'NodeJS', isDone: false},
                {id: v1(), title: 'Redux', isDone: false}
            ]
        }
    )
    const getFilteredTasks = (anyTasks: TasksType[], filter: FilterType) => {
        let filteredTasks = anyTasks
        if (filter === 'active') {
            filteredTasks = anyTasks.filter(el => !el.isDone)
        }
        if (filter === 'completed') {
            filteredTasks = anyTasks.filter(el => el.isDone)
        }
        return filteredTasks
    }

    const changeFilter = (filter: FilterType, todolistID: string) => {
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, filter: filter} : t))
    }

    const removeTask = (id: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== id)})
    }

    const addTask = (title: string, todolistID: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: isDone} : {...t})
        })
    }

    const deleteTodolist = (todolistID: string) => {
        setTodolists([...todolists.filter(t => t.id !== todolistID)])
        delete tasks[todolistID]
    }

    const addItem = (title: string) => {
        let newTodolist: todolistType = {
            id: v1(),
            title,
            filter: 'all'
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    const changeTaskTitle = (taskID: string, title: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, title} : {...t})})
    }

    const changeTodolistTitle = (title: string, todolistID: string) => {
        setTodolists(todolists.map(tdl => tdl.id === todolistID ? {...tdl, title: title} : tdl))
    }

    let todolistsItems = todolists.map((tdl) => {
            return (
                <Todolist
                    key={tdl.id}
                    title={tdl.title}
                    filter={tdl.filter}
                    todolistID={tdl.id}
                    tasks={getFilteredTasks(tasks[tdl.id], tdl.filter)}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    deleteTodolist={deleteTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                />
            );
        }
    )
    return (
        <div className="App">
            <div className='input_title'>
                <h3>Enter new title</h3>
                <div><AddItemForm addItem={addItem}/></div>
            </div>

            {todolistsItems}
        </div>
    )

}

export default App;
