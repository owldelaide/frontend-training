import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ProfileCard } from './ProfileCard';
import avatar from '@/shared/assets/tests/test.jpg';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const data = {
    firstName: 'fN',
    lastName: 'lN',
    country: Country.Russia,
    age: 27,
    city: 'city',
    username: '',
    currency: Currency.RUB,
    avatar
};

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: data
};

export const WithError = Template.bind({});
WithError.args = {error: 'true'};

export const Loading = Template.bind({});
Loading.args = {isLoading: true};