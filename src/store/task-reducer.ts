import {tasksForTodolistType} from "../AppWithRedux";
import {AddTodolistType, RemoveTodolistType, todolistID1, todolistID2} from "./todolist-reducer";
import {v1} from "uuid";

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

type ActionType =
    RemoveTaskType
    | AddTaskType
    | ChangeTaskStatusType
    | changeTaskTitleType
    | AddTodolistType
    | RemoveTodolistType

let initialState:tasksForTodolistType = {
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


export const taskReducer = (state = initialState, action: ActionType): tasksForTodolistType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
            }
        case "ADD_TASK":
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistID]: [newTask, ...state[action.todolistID],]
            }
        case "CHANGE_TASK_STATUS":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case "ADD_TODOLIST":
            return {
                ...state,
                [action.todolistID]: []
            }
        case "REMOVE_TODOLIST":
            let stateCopy = {...state}
            delete stateCopy[action.todolistID]
            return stateCopy
        default :
            return state
    }
}


export const removeTaskAC = (taskID: string, todolistID: string) => ({type: 'REMOVE_TASK', taskID, todolistID} as const)
export const addTaskAC = (todolistID: string, title: string) => ({type: 'ADD_TASK', todolistID, title} as const)
export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => ({
    type: 'CHANGE_TASK_STATUS',
    todolistID,
    taskID,
    isDone
} as const)
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({
    type: 'CHANGE_TASK_TITLE',
    todolistID,
    taskID,
    title
} as const)