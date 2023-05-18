import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';
import { UserSchema, User } from './../types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { initAuthData } from '../services/initAuthData';

const initialState: UserSchema = {
    _inited: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
            setFeatureFlags(action.payload.features);
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, action.payload.id);

        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveJsonSettings.fulfilled, (state, action: PayloadAction<JsonSettings>) => {
                if (state.authData) {
                    state.authData.jsonSettings = action.payload;
                }
            });
        builder
            .addCase(initAuthData.fulfilled, (state, action: PayloadAction<User>) => {
                state.authData = action.payload;
                setFeatureFlags(action.payload.features);
                state._inited = true;
            });
        builder
            .addCase(initAuthData.rejected, (state) => {
                state._inited = true;
            });
    }
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;