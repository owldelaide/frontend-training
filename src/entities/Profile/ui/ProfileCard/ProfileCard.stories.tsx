import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from './ProfileCard';
import avatar from 'shared/assets/tests/test.jpg';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        firstName: 'fN',
        lastName: 'lN',
        country: Country.Russia,
        age: 27,
        username: 'uN',
        currency: Currency.RUB,
        avatar
    }
};

export const WithError = Template.bind({});
WithError.args = {error: 'true'};

export const Loading = Template.bind({});
Loading.args = {isLoading: true};