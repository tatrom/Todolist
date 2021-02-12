import {FilterValuesType, TodoListType} from "../App";
import {
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todoListsReducer
} from "./todolists-reducer";
import {v1} from "uuid";

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]


    const action = ChangeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct todolist should change its filter', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();


    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]


    const action = ChangeFilterAC("active", todolistId1);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("active");
    expect(endState[1].filter).toBe("all");
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();


    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]


    const action = AddTodolistAC("New Todolist");

    const endState = todoListsReducer(startState, action);


    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New Todolist");
});

test('correct todolist should be remove', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();


    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]


    const action = RemoveTodolistAC(todolistId1);

    const endState = todoListsReducer(startState, action);


    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe("What to buy");
});