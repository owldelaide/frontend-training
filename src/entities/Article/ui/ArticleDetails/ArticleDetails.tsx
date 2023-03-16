import { articleDetailsReducer } from '../../model/slices/ArticleDetailsSlice';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModalLoader/DynamicModalLoader';
import cls from './ArticleDetails.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { memo, useEffect } from 'react';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { useSelector } from 'react-redux';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from '../../model/selectors/articleDetails';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton/Skeleton';

interface ArticleDetailsProps {
    className?: string;
    id: string
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const article = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);

    let content;

    if (isLoading) {
        content = (
            <div>
                <Skeleton width={200} height={200} border={'50%'} className={cls.avatar}/>
                <Skeleton width={400} height={25} className={cls.title}/>
                <Skeleton width={600} height={25} className={cls.skeleton}/>
                <Skeleton width={600} height={100} className={cls.skeleton}/>
            </div>
        );
    } else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                title={t('loading_error', {ns: 'article'})}
            />
        );
    } else {
        content = (
            <div>article details</div>
        );
    }


    useEffect(() => {
        dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <div className={classNames(cls.articleDetails, {}, [className])}>
                {content}
            </div>
        </DynamicModuleLoader>
    );
});