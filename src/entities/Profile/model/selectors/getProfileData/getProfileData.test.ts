import { getProfileData } from './getProfileData';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

describe ('getProfileData.test', () => {
    test('should return correct data', () => {
        const data = {
            firstName: 'fN',
            lastName: 'lN',
            country: Country.Russia,
            age: 28,
            username: 'uN',
            city: 'ct',
            currency: Currency.RUB,
        };

        const state: DeepPartial<StateSchema> = {
            profile: {
                data
            }
        };
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
}); 