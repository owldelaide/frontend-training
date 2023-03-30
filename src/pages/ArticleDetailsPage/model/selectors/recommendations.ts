import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecommendationsError = (state: StateSchema) => state?.articleDetailsPage?.recommendations.error;
export const getArticleRecommendationsIsLoading = (state: StateSchema) => state?.articleDetailsPage?.recommendations.isLoading;