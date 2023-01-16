export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error:null as null | string
}

type InitialStateType = typeof initialState
export type SetStatusType= ReturnType<typeof setStatus>
export type SetErrorType = ReturnType<typeof setError>

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setError = (error:string|null)=>({type:'APP/SET-ERROR', error} as const)

export type AppActionsType = SetStatusType | SetErrorType
