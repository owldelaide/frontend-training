import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { NotificationList } from './NotificationList';

export default {
   title: 'entities/Notification/NotificationList',
   component: NotificationList,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
   decorators: [withMock]
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
   mockData: [
      {
         url: `${__API__}/notifications`,
         method: 'GET',
         status: 200,
         response: [
            {
               id: '1',
               title: 'note',
               description: 'like, comment, share'
            },
            {
               id: '2',
               title: 'note2',
               description: 'please subscribe'
            },
            {
               id: '3',
               title: 'note3',
               description: 'new content'
            }
         ],
      }
   ]
};