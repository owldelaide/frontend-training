import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select } from './Select';

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: 'sample text',
    options: [
        {value: '1', content: 'first'},
        {value: '2', content: 'second'},
        {value: '3', content: 'third'}
    ]
};