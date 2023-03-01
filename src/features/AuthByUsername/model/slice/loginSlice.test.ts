import { DeepPartial } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
    test('test set username', () => {
        const state: DeepPartial<LoginSchema> = { username: 'admin' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setUsername('test')
        )).toEqual({username: 'test'});
    });

    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = { password: 'admin' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setPassword('test')
        )).toEqual({password: 'test'});
    });
});