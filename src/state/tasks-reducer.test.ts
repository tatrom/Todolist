import {AddTaskAC, changeTaskStatusAC, changeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";
import {AddTodolistAC, RemoveTodolistAC} from "./todolists-reducer";
import {TaskStateType} from "../App";

test('correct task should be deleted from correct array', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = RemoveTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    });

});


test('correct task should be added to correct array', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = AddTaskAC("New task","todolistId2" );

    const endState = tasksReducer(startState, action)
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
});

test('status of specified task should be changed', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = changeTaskStatusAC("2", false, "todolistId2" );

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].id).toBe("2");
    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId2"].length).toBe(3);
});

test('title of specified task should be changed', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = changeTaskTitleAC("2", "NewTitle", "todolistId2" );

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("NewTitle");

});

test('new array should be added when new todolist is added', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = AddTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('array should be deleted when the todolist is deleted', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = RemoveTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});