import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleCommentsError = (state: StateSchema) => state?.articleDetailsComments?.error;
export const getArticleCommentsIsLoading = (state: StateSchema) => state?.articleDetailsComments?.isLoading;