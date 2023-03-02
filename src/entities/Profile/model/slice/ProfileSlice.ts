import { USER_LOCAL_STORAGE_KEY } from 'shared/const/localStorage';
import { ProfileSchema, Profile } from './../types/profile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ProfileSchema = {
    isLoading: false,
    readonly: true,
    error: undefined,
    data: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;