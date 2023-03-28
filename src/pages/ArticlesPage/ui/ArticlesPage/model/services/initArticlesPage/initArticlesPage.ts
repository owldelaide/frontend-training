import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async (_, { getState, dispatch }) => {
        const _inited = getArticlesPageInited(getState());

        if (!_inited) {
            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({
              page: 1
            }));
          }
    },
);