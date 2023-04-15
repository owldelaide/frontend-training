import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { Profile } from 'entities/Profile';
import { getProfileForm } from '../../getProfileForm/getProfileForm';
import { ValidateProfileError } from 'features/EditableProfileCard/model/consts/consts';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
    'profile/updateProfileData',
    async (_, {extra, rejectWithValue, getState}) => {

        const formData = getProfileForm(getState());

        const errors = validateProfileData(formData);

        if(errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.put<Profile>('/profile/' + formData?.id, formData);

            if(!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);