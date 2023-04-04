import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileSchema, ValidateProfileError } from '../types/profile';
import { profileActions, profileReducer } from './ProfileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const data = {
    firstName: 'fN',
    lastName: 'lN',
    country: Country.Russia,
    age: 28,
    username: 'uN',
    city: 'ct',
    currency: Currency.RUB,
};
describe('profileSlice.test', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadonly(true)
        )).toEqual({readonly: true});
    });

    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.cancelEdit()
        )).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data
        });
    });

    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = { 
            form: { username: 'test' }
        };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.updateProfile({
                username: 'admin'
            })
        )).toEqual({
            form: { username: 'admin' },
        });
    });

    test('test update profile pending', () => {
        const state: DeepPartial<ProfileSchema> = { 
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR]
        };
        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending
        )).toEqual({
            isLoading: true,
            validateErrors: undefined
        });
    });

    test('test update profile fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = { 
            isLoading: true,
            validateErrors: [ValidateProfileError.SERVER_ERROR]
        };
        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(data, '')
        )).toEqual({
            isLoading: false,
            readonly: true,
            validateErrors: undefined,
            form: data,
            data
        });
    });
});