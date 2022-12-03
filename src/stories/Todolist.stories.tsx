import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ReduxStoreProviderDecorator, storyBookStore} from "./decorators/ReduxStoreProviderDecorator";
import {Todolist} from "../Components/Todolist";

export default {
    title: 'Todolist/Todolist',
    component: Todolist,
    decorators: [ReduxStoreProviderDecorator],
    args: {title:storyBookStore.getState().todolists[0].title, filter: storyBookStore.getState().todolists[0].filter, todolistID:storyBookStore.getState().todolists[0].id}
} as ComponentMeta<typeof Todolist>;

const Template: ComponentStory<typeof Todolist> = (args) => <Todolist {...args} />;

export const TodolistStory = Template.bind({});


// TodolistStory.args = {
// };


