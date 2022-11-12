import {v1} from "uuid";
import {FilterType, todolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";

test('correct todolist should be removed', () => {
    //
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<todolistType> = [
        {id: todolistId1, title: "What to do", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"}
    ]
    //
    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))
    //
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('todolist title should be changed', () => {
    //
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'Must to learn'

    const startState: Array<todolistType> = [
        {id: todolistId1, title: "What to do", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"}
    ]
    //
    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))
    //
    expect(endState[1].title).toBe(newTodolistTitle);
    expect(endState[0].title).toBe('What to do');
});

test('todolists title should be filtered', () => {
    //
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistFilter: FilterType = 'active'

    const startState: Array<todolistType> = [
        {id: todolistId1, title: "What to do", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"}
    ]
    //
    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId1, newTodolistFilter))
    //
    expect(endState[0].filter).toBe(newTodolistFilter);
    expect(endState[1].filter).toBe('all');
});

test('new todolist should be added', () => {
    //
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'NewTodolist'

    const startState: Array<todolistType> = [
        {id: todolistId1, title: "What to do", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"}
    ]
    //
    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))
    //
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState.length).toBe(3);
});

