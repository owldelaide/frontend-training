import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AppLink } from './AppLink';

export default {
    title: 'shared/AppLink',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/'
    }
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'text',
    variant: 'primary'
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//     children: 'text',
//     variant: AppLinkVariant.SECONDARY
// };

export const Red = Template.bind({});
Red.args = {
    children: 'text',
    variant: 'red'
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    children: 'text',
    variant: 'primary'
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

// export const SecondaryDark = Template.bind({});
// SecondaryDark.args = {
//     children: 'text',
//     variant: AppLinkVariant.SECONDARY
// };
// SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const RedDark = Template.bind({});
RedDark.args = {
    children: 'text',
    variant: 'red'
};
RedDark.decorators = [ThemeDecorator(Theme.DARK)];