import {AppActionsType, setError, setStatus} from '../app/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolist-api'

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setError(data.messages[0]))
    } else {
        dispatch(setError('Some error occurred'))
    }
    dispatch(setStatus('failed'))
}

export const handleServerNetworkError = (error: string , dispatch: ErrorUtilsDispatchType) => {
    dispatch(setError(error))
    dispatch(setStatus('failed'))
}

type ErrorUtilsDispatchType = Dispatch<AppActionsType>
