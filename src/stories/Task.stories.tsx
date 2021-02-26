import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType} from "../AdditemForm";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../state/Task";

export default {
    title: 'Todolist/Task',
    component: Task,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as Meta;

const changeTaskStatusCallback = action('Status changed inside task')
const changeTaskTitleCallback = action('Title changed inside task')
const removeTaskCallback = action('Remove Button inside Task clicked')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: true, title: 'JS'}
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: false, title: 'JS'}
};

