import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {tasksReducer} from "../features/TodolistsList/task-reducer";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app:appReducer
})

export type AppStoreType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppStoreType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

