import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {Task} from "../Components/Task";

export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
    args: {
        item:{id:'1', title:'React', isDone:true},
        todolistID:'1'
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});


TaskIsDoneStory.args = {
};

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
    item: {
        id: '1',
        title: 'Redux',
        isDone: false
    },
    todolistID:'1'
};

