import {tasksForTodolistType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./task-reducer";
import {addTodolistAC} from "./todolist-reducer";


test('correct task should be removed', () => {
    //
    const startState: tasksForTodolistType = {
        'todolistId1': [
            {id: '1', title: 'Go to job', isDone: false},
            {id: '2', title: 'Do tasks for my dev courses', isDone: true},
            {id: '3', title: 'Go for shopping', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'React', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'CSS', isDone: false}
        ]
    }

    const action = removeTaskAC('2', 'todolistId2')
    //
    const endState = taskReducer(startState, action)
    //
    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'Go to job', isDone: false},
            {id: '2', title: 'Do tasks for my dev courses', isDone: true},
            {id: '3', title: 'Go for shopping', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'React', isDone: false},
            {id: '3', title: 'CSS', isDone: false}
        ]
    })
});

test('new task should be added', () => {
    const startState: tasksForTodolistType = {
        'todolistId1': [
            {id: '1', title: 'Go to job', isDone: false},
            {id: '2', title: 'Do tasks for my dev courses', isDone: true},
            {id: '3', title: 'Go for shopping', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'React', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'CSS', isDone: false}
        ]
    }
    const newTitle = 'Redux'
    const action = addTaskAC('todolistId2', newTitle)
    const endState = taskReducer(startState, action)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'][0].title).toBe(newTitle)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('task status should be changed', () => {
    const startState: tasksForTodolistType = {
        'todolistId1': [
            {id: '1', title: 'Go to job', isDone: false},
            {id: '2', title: 'Do tasks for my dev courses', isDone: true},
            {id: '3', title: 'Go for shopping', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'React', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'CSS', isDone: false}
        ]
    }

    const action = changeTaskStatusAC('todolistId2', '3', true)
    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][2].isDone).toBe(true)
    expect(endState['todolistId2'][1].isDone).toBe(true)
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('task title should be changed', () => {
    const startState: tasksForTodolistType = {
        'todolistId1': [
            {id: '1', title: 'Go to job', isDone: false},
            {id: '2', title: 'Do tasks for my dev courses', isDone: true},
            {id: '3', title: 'Go for shopping', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'React', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'CSS', isDone: false}
        ]
    }
    const newTitle = 'Angular'
    const action = changeTaskTitleAC('todolistId2', '3', newTitle)
    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][2].title).toBe(newTitle)
    expect(endState['todolistId2'][1].title).toBe('JS')
})

test('new array should be added when new todolist is added', () => {
    const startState: tasksForTodolistType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})