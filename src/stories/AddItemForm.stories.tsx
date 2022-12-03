import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from "../Components/AddItemForm";
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@material-ui/core";
import {Add} from "@mui/icons-material";
import s from "../Components/Todolist.module.css";

export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem: {
      description:'clicked'
    }
  },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});


AddItemFormStory.args = {
  addItem:action('clicked')
};

const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) => {
  const [newTitleName, setNewTitleName] = useState('')
  const [error, setError] = useState<null | string>('Title is required')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitleName(e.currentTarget.value)
    setError(null)
  }
  const onEnterDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (newTitleName.trim() !== '') {
        args.addItem(newTitleName)
        setNewTitleName('')
      } else {
        setError('Title is required')
      }
    }
  }
  const addItem = () => {
    const trimedTitle = newTitleName.trim()
    if (trimedTitle !== '') {
      args.addItem(trimedTitle);
    } else {
      setError('Title is required')
    }
    setNewTitleName('')
  }
  return (
      <div>
        <TextField
            style={{border: error ? '1px solid red' : '', marginLeft:'20px'}}
            label={'Title'}
            variant={'outlined'}
            value={newTitleName}
            onChange={onChangeHandler}
            onKeyDown={onEnterDownHandler}
            size={'small'}
        />
        <IconButton onClick={addItem}><Add/></IconButton>
        <div className={s.error}>
          {error}
        </div>
      </div>
  );
}

export const AddItemFormWithErrorStory = TemplateWithError.bind({});

AddItemFormWithErrorStory.args = {
  addItem:action('clicked')
};