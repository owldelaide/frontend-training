import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleView } from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleListProps {
    className?: string;
    articles: Article[]
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
        <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.SMALL,
        isLoading,
        target,
    } = props;
    const { t } = useTranslation();

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text size={TextSize.L} title={t('Статьи не найдены')} />
            </div>
        );
    }

    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            on={
                <HStack
                    className={classNames(cls.ArticleListRedesigned, {}, [])}
                    gap='16'
                    data-testid="ArticleList"
                    wrap='wrap'
                >
                    {articles.map((item) => (
                        <ArticleListItem
                            article={item}
                            view={view}
                            target={target}
                            key={item.id}
                            className={cls.card}
                        />
                    ))}
                    {isLoading && getSkeletons(view)}
                </HStack>
            }
            off={
                <div
                    className={classNames(cls.ArticleList, {}, [className, cls[view]])}
                    data-testid="ArticleList"
                >
                    {articles.map((item) => (
                        <ArticleListItem
                            article={item}
                            view={view}
                            target={target}
                            key={item.id}
                            className={cls.card}
                        />
                    ))}
                    {isLoading && getSkeletons(view)}
                </div>
            }
        />
    );
});
