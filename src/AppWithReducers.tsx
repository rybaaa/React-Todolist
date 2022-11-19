import React, {useReducer} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar} from "@material-ui/core";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./store/task-reducer";

export type FilterType = 'all' | 'active' | 'completed'


function AppWithReducer() {
//     const todolistID1 = v1();
//     const todolistID2 = v1();
//     const [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
//             {id: todolistID1, title: 'What to do', filter: 'all'},
//             {id: todolistID2, title: 'What to learn', filter: 'all'}
//         ]
//     )
//     const [tasks, dispatchToTasks] = useReducer(taskReducer,{
//             [todolistID1]: [
//                 {id: v1(), title: 'Go to job', isDone: false},
//                 {id: v1(), title: 'Do tasks for my dev courses', isDone: false},
//                 {id: v1(), title: 'Go for shopping', isDone: true},
//                 {id: v1(), title: 'Pay bills', isDone: true},
//                 {id: v1(), title: 'Do my teeth', isDone: false},
//                 {id: v1(), title: 'Repair some stuff at home', isDone: false},
//                 {id: v1(), title: 'Save some money to the future', isDone: false},
//                 {id: v1(), title: 'Visit parents', isDone: false},
//                 {id: v1(), title: 'Meet with friends', isDone: false},
//                 {id: v1(), title: 'Buy some stuff for the computer', isDone: false}
//             ],
//             [todolistID2]: [
//                 {id: v1(), title: 'HTML', isDone: false},
//                 {id: v1(), title: 'CSS', isDone: false},
//                 {id: v1(), title: 'React', isDone: true},
//                 {id: v1(), title: 'Angular', isDone: true},
//                 {id: v1(), title: 'Vue', isDone: false},
//                 {id: v1(), title: 'NodeJS', isDone: false},
//                 {id: v1(), title: 'Redux', isDone: false}
//             ]
//         }
//     )
//     const getFilteredTasks = (anyTasks: TasksType[], filter: FilterType) => {
//         let filteredTasks = anyTasks
//         if (filter === 'active') {
//             filteredTasks = anyTasks.filter(el => !el.isDone)
//         }
//         if (filter === 'completed') {
//             filteredTasks = anyTasks.filter(el => el.isDone)
//         }
//         return filteredTasks
//     }
//
//     const changeFilter = (filter: FilterType, todolistID: string) => {
//         dispatchToTodolists(changeTodolistFilterAC(todolistID, filter))
//     }
//
//     const removeTask = (id: string, todolistID: string) => {
//         dispatchToTasks(removeTaskAC(id, todolistID))
//     }
//
//     const addTask = (title: string, todolistID: string) => {
//         dispatchToTasks(addTaskAC(todolistID, title))
//     }
//
//     const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
//         dispatchToTasks(changeTaskStatusAC(todolistID, taskID, isDone))
//     }
//
//     const deleteTodolist = (todolistID: string) => {
//         dispatchToTodolists(removeTodolistAC(todolistID))
//     }
//
//     const addItem = (title: string) => {
//         let action = addTodolistAC(title)
//         dispatchToTodolists(action)
//         dispatchToTasks(action)
//     }
//
//     const changeTaskTitle = (taskID: string, title: string, todolistID: string) => {
//         dispatchToTasks(changeTaskTitleAC(todolistID, taskID, title))
//     }
//
//     const changeTodolistTitle = (title: string, todolistID: string) => {
//         dispatchToTodolists(changeTodolistTitleAC(todolistID, title))
//     }
//
//     let todolistsItems = todolists.map((tdl) => {
//             return (
//                 <Todolist
//                     key={tdl.id}
//                     title={tdl.title}
//                     filter={tdl.filter}
//                     todolistID={tdl.id}
//                     tasks={getFilteredTasks(tasks[tdl.id], tdl.filter)}
//                     removeTask={removeTask}
//                     changeFilter={changeFilter}
//                     addTask={addTask}
//                     changeTaskStatus={changeTaskStatus}
//                     deleteTodolist={deleteTodolist}
//                     changeTaskTitle={changeTaskTitle}
//                     changeTodolistTitle={changeTodolistTitle}
//                 />
//             );
//         }
//     )
//     return (
//         <div>
//             <AppBar position="static">
//                 <Toolbar style={{justifyContent: "space-between"}}>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h4">
//                         Todolists
//                     </Typography>
//                     <Button color="inherit" variant={"outlined"}>Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <div className='App'>
//                 <div style={{paddingRight: '20px'}}>
//                     <Typography
//                         style={{marginTop: '33px', fontWeight: 'bold'}}
//                         align={"center"}
//                         variant={"h6"}
//                     >Enter new title</Typography>
//                     <div>
//                         <AddItemForm addItem={addItem}/>
//                     </div>
//                 </div>
//                 {todolistsItems}
//             </div>
//
//         </div>
//     )
//
}

export default AppWithReducer;
