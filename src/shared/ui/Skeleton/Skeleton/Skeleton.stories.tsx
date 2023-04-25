import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Skeleton } from './Skeleton';
import { Theme } from '@/shared/const/theme';

export default {
   title: 'shared/Skeleton',
   component: Skeleton,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   width: '100%',
   height: 200
};
Normal.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Circle = Template.bind({});
Circle.args = {
   border: '50%',
   width: 100,
   height: 100
};
Circle.decorators = [ThemeDecorator(Theme.LIGHT)];

export const NormalDark = Template.bind({});
NormalDark.args = {
   width: '100%',
   height: 200
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

export const CircleDark = Template.bind({});
CircleDark.args = {
   border: '50%',
   width: 100,
   height: 100
};
CircleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const NormalPurple = Template.bind({});
NormalPurple.args = {
   width: '100%',
   height: 200
};
NormalPurple.decorators = [ThemeDecorator(Theme.PURPLE)];

export const CirclePurple = Template.bind({});
CirclePurple.args = {
   border: '50%',
   width: 100,
   height: 100
};
CirclePurple.decorators = [ThemeDecorator(Theme.PURPLE)];