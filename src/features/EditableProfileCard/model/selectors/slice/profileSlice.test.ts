import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { profileActions, profileReducer } from './ProfileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ValidateProfileError } from '../../consts/consts';
import { EditableProfileCardSchema } from '../../types/EditableProfileCardSchema';

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
        const state: DeepPartial<EditableProfileCardSchema> = { readonly: false };
        expect(profileReducer(
            state as EditableProfileCardSchema,
            profileActions.setReadonly(true)
        )).toEqual({readonly: true});
    });

    test('test cancel edit', () => {
        const state: DeepPartial<EditableProfileCardSchema> = { data, form: { username: '' } };
        expect(profileReducer(
            state as EditableProfileCardSchema,
            profileActions.cancelEdit()
        )).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data
        });
    });

    test('test update profile', () => {
        const state: DeepPartial<EditableProfileCardSchema> = { 
            form: { username: 'test' }
        };
        expect(profileReducer(
            state as EditableProfileCardSchema,
            profileActions.updateProfile({
                username: 'admin'
            })
        )).toEqual({
            form: { username: 'admin' },
        });
    });

    test('test update profile pending', () => {
        const state: DeepPartial<EditableProfileCardSchema> = { 
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR]
        };
        expect(profileReducer(
            state as EditableProfileCardSchema,
            updateProfileData.pending
        )).toEqual({
            isLoading: true,
            validateErrors: undefined
        });
    });

    test('test update profile fulfilled', () => {
        const state: DeepPartial<EditableProfileCardSchema> = { 
            isLoading: true,
            validateErrors: [ValidateProfileError.SERVER_ERROR]
        };
        expect(profileReducer(
            state as EditableProfileCardSchema,
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