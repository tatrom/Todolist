import {
    addTaskAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer, updateTaskAC
} from './tasks-reducer';
import {TasksStateType} from '../../app/App';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {v1} from "uuid";

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                description: '',
                title: 'Js',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'Css',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'HTML',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '3',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                description: '',
                title: 'React',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'Redux',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'Jest',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '3',
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''
            }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC({taskId: "2", todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy();
});
test('correct task should be added to correct array', () => {

    const newTask = {
        description: '',
        title: "juice",
        status: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        id: '',
        todoListId: "todolistId2",
        order: 0,
        addedDate: ''
    }
    const action = addTaskAC({task: newTask});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});
test('status of specified task should be changed', () => {
    const action = updateTaskAC({taskId: "2", model: {status: 0}, todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});
test('title of specified task should be changed', () => {
    const action = updateTaskAC({taskId: "2", model: {title: "yogurt"}, todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("Css");
    expect(endState["todolistId2"][1].title).toBe("yogurt");
    expect(endState["todolistId2"][0].title).toBe("React");
});
test('new array should be added when new todolist is added', () => {
    let newTodolist = {
        id: v1(),
        addedDate: '',
        order: 0,
        title: 'New todolist'
    }
    const action = addTodolistAC({todolist: newTodolist});

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC({id: "todolistId2"});

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists ', () => {
    const action = setTodolistsAC({
            todolists: [{id: '1', title: 'title 1', order: 0, addedDate: ''},
                {id: '2', title: 'title 2', order: 0, addedDate: ''}]
        })
    ;

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["1"]).toStrictEqual([]);
    expect(endState["2"]).toStrictEqual([]);
});

test('tasks should be added for todolist', () => {
    const action = setTasksAC({tasks: startState['todolistId1'], todolistId: 'todolistId1'});

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)


    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
});
