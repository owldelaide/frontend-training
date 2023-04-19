import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox, ListBoxItem } from './ListBox';

export default {
   title: 'shared/ListBox',
   component: ListBox,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
   decorators: [
      Story => <div style={{padding: '200px'}}><Story/></div>
   ]
} as ComponentMeta<typeof ListBox>;

const people: ListBoxItem[] = [
   { value: '1', content: 'Durward Reynolds', disabled: false },
   { value: '2', content: 'Kenton Towne', disabled: false },
   { value: '3', content: 'Therese Wunsch', disabled: false },
   { value: '4', content: 'Benedict Kessler', disabled: true },
   { value: '5', content: 'Katelyn Rohan', disabled: false },
 ];

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args}/>;

export const Normal = Template.bind({});
Normal.args = {
   items: people,
   value: undefined,
   defaultValue: 'выберите'
};

export const TopLeft = Template.bind({});
TopLeft.args = {
   direction: 'top left',
   items: people,
   value: undefined,
   defaultValue: 'выберите'
};

export const TopRight = Template.bind({});
TopRight.args = {
   direction: 'top right',
   items: people,
   value: undefined,
   defaultValue: 'выберите'
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
   direction: 'bottom left',
   items: people,
   value: undefined,
   defaultValue: 'выберите'
};

export const BottomRight = Template.bind({});
BottomRight.args = {
   direction: 'bottom right',
   items: people,
   value: undefined,
   defaultValue: 'выберите'
};
