import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../Components/EditableSpan";

export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  argTypes: {
    onChangeTitle: {
      description:'clicked'
    }
  },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});


EditableSpanStory.args = {
  title:'Edit',
  editMode:true,
  onChangeTitle:action('clicked')
};
