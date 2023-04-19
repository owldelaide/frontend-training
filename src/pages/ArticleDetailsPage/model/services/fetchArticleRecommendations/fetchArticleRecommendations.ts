import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';

export const fetchArticlesRecommendations = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articleDetailsPage/fetchArticlesRecommendations',
    async (props, { extra, rejectWithValue, getState }) => {

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _limit: 4,
                }
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);