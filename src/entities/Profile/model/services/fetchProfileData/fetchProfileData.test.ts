import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';

const data = {
    firstName: 'fN',
    lastName: 'lN',
    country: Country.Russia,
    age: 28,
    username: 'uN',
    city: 'ct',
    currency: Currency.RUB,
};

describe('fetchProfileData.test', () => {
    test('success', async() => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({data: data}));
        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('403 status', async() => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({status: 403}));
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
    });
});