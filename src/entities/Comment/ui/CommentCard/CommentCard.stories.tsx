import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CommentCard } from './CommentCard';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

export default {
   title: 'entities/Comment/CommentCard',
   component: CommentCard,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   comment: {
      'id': '1',
      'text': 'some comment',
      'user': {
         'id': '1',
         'username': 'test',
      },
   },
};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
   comment: {
      'id': '1',
      'text': 'some comment',
      'user': {
         'id': '1',
         'username': 'test',
      },
   },
};
NormalRedesigned.decorators = [FeaturesFlagsDecorator({ isAppRedesigned: true })];

export const Loading = Template.bind({});
Loading.args = {
   isLoading: true
};
