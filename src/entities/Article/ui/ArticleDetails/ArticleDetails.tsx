import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModalLoader/DynamicModalLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated, TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slices/ArticleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { renderArticleBlock } from './renderArticleBlock';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { AppImage } from '@/shared/ui/redesigned/AppImage';


interface ArticleDetailsProps {
    className?: string;
    id?: string
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer
};

const Deprecated = () => {
    const article = useSelector(getArticleDetailsData);

    return (
        <>
            <HStack justify='center' max className={cls.avatarWrapper}>
                <Avatar
                    size={200}
                    src={article?.img}
                    className={cls.avatar}
                />
            </HStack>
            <VStack gap='4' max data-testid='ArticleDetails.Info'>
                <TextDeprecated
                    title={article?.title}
                    text={article?.subtitle}
                    className={cls.title}
                    size={TextSize.L}
                />
                <HStack gap='8' className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={EyeIcon} />
                    <TextDeprecated text={String(article?.views)} />
                </HStack>
                <HStack gap='8' className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={CalendarIcon} />
                    <TextDeprecated text={article?.createdAt} />
                </HStack>
            </VStack>
            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};


const Redesigned = () => {
    const article = useSelector(getArticleDetailsData);

    return (
        <>
            <Text title={article?.title} size={'l'} bold />
            <Text title={article?.subtitle} />
            <AppImage
                fallback={<SkeletonRedesigned width={'100%'} height={420} border={'16px'} />}
                src={article?.img}
                className={cls.img}
            />
            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const article = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);

    useInitialEffect(() => {
        dispatch(fetchArticleById(id));
    });

    let content;

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        off: () => SkeletonDeprecated,
        on: () => SkeletonRedesigned
    });

    if (isLoading) {
        content = (
            <VStack gap='16' max>
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </VStack>
        );
    } else if (error) {
        content = (
            <TextDeprecated
                align={TextAlign.CENTER}
                title={t('loading_error')}
            />
        );
    } else {
        content = (
            <ToggleFeatures
                feature='isAppRedesigned'
                on={
                    <Redesigned />
                }
                off={
                    <Deprecated />
                }
            />
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount >
            <VStack gap='16' className={classNames(cls.articleDetails, {}, [className])}>
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});