import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticlePageFilters } from './ArticlePageFilters';

export default {
   title: 'entitites/article/ArticlePageFilters',
   component: ArticlePageFilters,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof ArticlePageFilters>;

const Template: ComponentStory<typeof ArticlePageFilters> = (args) => <ArticlePageFilters { ...args } />;

export const Normal = Template.bind({});
Normal.args = {

};
Normal.decorators=[StoreDecorator({})];
