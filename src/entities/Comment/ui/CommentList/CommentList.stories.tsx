import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CommentList } from './CommentList';

export default {
   title: 'entities/CommentList',
   component: CommentList,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList { ...args } />;

export const Normal = Template.bind({});
Normal.args = {
   comments: [
      {
         id: '1',
         text: 'hey',
         user: { id: '1', username: 'uN' }
      },
      {
         id: '2',
         text: 'hey you',
         user: { id: '2', username: 'uN2' }
      }
   ]
};

export const Loading = Template.bind({});
Loading.args = {
   comments: [   ],
   isLoading: true
};