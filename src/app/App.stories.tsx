import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/AppWithRedux',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {},
} as Meta;


const Template: Story = (args) => <App {...args} />;


export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {}

