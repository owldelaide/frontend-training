import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleView } from 'entities/Article/model/types/article';
import { ArticleList } from './ArticleList';

export default {
   title: 'entities/ArticleList',
   component: ArticleList,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList { ...args } />;

export const isLoading = Template.bind({});
isLoading.args = {
   isLoading: true,
   view: ArticleView.SMALL
};

export const isLoadingBig = Template.bind({});
isLoadingBig.args = {
   isLoading: true,
   view: ArticleView.BIG
};
