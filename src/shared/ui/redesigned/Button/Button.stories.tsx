import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    children: 'Text',
};

// export const Clear = Template.bind({});
// Clear.args = {
//     children: 'Text',
//     variant: ButtonVariant.CLEAR
// };

// export const ClearInverted = Template.bind({});
// ClearInverted.args = {
//     children: 'Text',
//     variant: ButtonVariant.CLEAR_INVERTED
// };

// export const Outline = Template.bind({});
// Outline.args = {
//     children: 'Text',
//     variant: ButtonVariant.OUTLINE
// };

// export const OutlineSizeL = Template.bind({});
// OutlineSizeL.args = {
//     children: 'Text',
//     variant: ButtonVariant.OUTLINE,
//     size: ButtonSize.L
// };

// export const OutlineSizeXL = Template.bind({});
// OutlineSizeXL.args = {
//     children: 'Text',
//     variant: ButtonVariant.OUTLINE,
//     size: ButtonSize.XL
// };

// export const OutlineDark = Template.bind({});
// OutlineDark.args = {
//     children: 'Text',
//     variant: ButtonVariant.OUTLINE
// };
// OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

// export const BackgroundTheme = Template.bind({});
// BackgroundTheme.args = {
//     children: 'Text',
//     variant: ButtonVariant.BACKGROUND
// };

// export const BackgroundInverted = Template.bind({});
// BackgroundInverted.args = {
//     children: 'Text',
//     variant: ButtonVariant.BACKGROUND_INVERTED
// };

// export const SquareSizeM = Template.bind({});
// SquareSizeM.args = {
//     children: '>',
//     variant: ButtonVariant.BACKGROUND_INVERTED,
//     square: true,
//     size: ButtonSize.M
// };

// export const SquareSizeL = Template.bind({});
// SquareSizeL.args = {
//     children: '>',
//     variant: ButtonVariant.BACKGROUND_INVERTED,
//     square: true,
//     size: ButtonSize.L
// };

// export const SquareSizeXL = Template.bind({});
// SquareSizeXL.args = {
//     children: '>',
//     variant: ButtonVariant.BACKGROUND_INVERTED,
//     square: true,
//     size: ButtonSize.XL
// };

// export const Disabled = Template.bind({});
// Disabled.args = {
//     children: '>',
//     variant: ButtonVariant.OUTLINE,
//     disabled: true,
// };