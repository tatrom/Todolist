import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todoListsReducer
} from "./todolists-reducer";
import {v1} from "uuid";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})


test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";
    const action = ChangeTodolistTitleAC(todolistId2, newTodolistTitle);
    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct todolist should change its filter', () => {
    const action = ChangeFilterAC("active", todolistId1);
    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("active");
    expect(endState[1].filter).toBe("all");
});

test('correct todolist should be added', () => {
    const action = AddTodolistAC("New Todolist");
    const endState = todoListsReducer(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New Todolist");
});

test('correct todolist should be remove', () => {
    const action = RemoveTodolistAC(todolistId1);
    const endState = todoListsReducer(startState, action);

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe("What to buy");
});