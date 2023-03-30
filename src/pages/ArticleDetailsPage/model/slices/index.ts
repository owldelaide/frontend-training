import { articleDetailsCommentsReducer } from 'pages/ArticleDetailsPage/model/slices/ArticleDetailsCommentsSlice';
import { ArticleDetailsPageSchema } from '../types';
import { combineReducers } from '@reduxjs/toolkit';
import { articleDetailsPageRecommendationsSliceReducer } from './ArticleDetailsPageRecommendationsSlice';


export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendationsSliceReducer,
    comments: articleDetailsCommentsReducer
});