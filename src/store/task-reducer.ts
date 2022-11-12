import {v1} from "uuid";
import {tasksForTodolistType} from "../App";
import {AddTodolistType, RemoveTodolistType} from "./todolist-reducer";

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

export const taskReducer = (state: tasksForTodolistType, action: ActionType): tasksForTodolistType => {
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