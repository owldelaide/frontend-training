import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleView } from '../../model/types/article';
import { ArticleList } from './ArticleList';

export default {
   title: 'entities/Article/ArticleList',
   component: ArticleList,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList { ...args } />;

export const isLoading = Template.bind({});
isLoading.args = {
   isLoading: true,
   view: ArticleView.SMALL,
   articles: []
};

export const isLoadingBig = Template.bind({});
isLoadingBig.args = {
   isLoading: true,
   view: ArticleView.BIG,
   articles: []
};
