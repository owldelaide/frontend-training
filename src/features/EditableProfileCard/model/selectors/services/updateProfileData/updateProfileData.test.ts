import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { updateProfileData } from './updateProfileData';
import { ValidateProfileError } from '../../../types/EditableProfileCardSchema';

const data = {
    firstName: 'fN',
    lastName: 'lN',
    country: Country.Russia,
    age: 28,
    username: 'uN',
    city: 'ct',
    currency: Currency.RUB,
};

describe('updateProfileData.test', () => {
    test('success', async() => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data
            }
        });
        thunk.api.put.mockReturnValue(Promise.resolve({data: data}));
        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('403 status', async() => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data
            }
        });
        thunk.api.put.mockReturnValue(Promise.resolve({status: 403}));
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.SERVER_ERROR
        ]);
    });

    test('validate error', async() => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: {...data, firstName: ''}
            }
        });
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA
        ]);
    });
});