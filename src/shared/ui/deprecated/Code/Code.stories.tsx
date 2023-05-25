import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Code } from './Code';
import { Theme } from '@/shared/const/theme';

export default {
   title: 'shared/Code',
   component: Code,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   text: `import { ComponentStory, ComponentMeta } from '@storybook/react';
   import { Code } from './Code';
   
   export default {
      title: 'shared/Code',
      component: Code,
      argTypes: {
         backgroundColor: { control: 'color' },
      },
   } as ComponentMeta<typeof Code>;
   
   const Template: ComponentStory<typeof Code> = (args) => <Code { ...args } />;`
};

export const Dark = Template.bind({});
Dark.args = {
   text: `import { ComponentStory, ComponentMeta } from '@storybook/react';
   import { Code } from './Code';
   
   export default {
      title: 'shared/Code',
      component: Code,
      argTypes: {
         backgroundColor: { control: 'color' },
      },
   } as ComponentMeta<typeof Code>;
   
   const Template: ComponentStory<typeof Code> = (args) => <Code { ...args } />;`
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];