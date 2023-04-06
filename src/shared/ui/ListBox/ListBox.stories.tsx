import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox, ListBoxItem } from './ListBox';

export default {
   title: 'shared/ListBox',
   component: ListBox,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
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
