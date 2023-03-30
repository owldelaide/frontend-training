import { Article, ArticleView } from '../../model/types/article';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { Text, TextSize } from 'shared/ui/Text/Text';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL,
        target
    } = props;
    const { t } = useTranslation('article');

    const renderArticle = (article: Article) => {
        return (
            <ArticleListItem
                article={article}
                view={view}
                className={cls.card}
                key={article.id}
                target={target}
            />
        );
    };

    if(!isLoading && !articles.length) {
        return (
            <div className={classNames('', {}, [className, cls[view]])}>
                <Text 
                    title={t('not_found')}
                    size={TextSize.L}
                />
            </div>          
        );
    }

    return (
        <div className={classNames('', {}, [className, cls[view]])}>
            {articles.length > 0
                ? articles.map(renderArticle)
                : null
            }
            {isLoading && (
                <div className={classNames('', {}, [className, cls[view]])}>
                    {
                        new Array(view === ArticleView.SMALL ? 9 : 3)
                            .fill(0)
                            .map((item, index) => (
                                <ArticleListItemSkeleton
                                    view={view}
                                    key={index}
                                    className={cls.card}
                                />
                            ))
                    }
                </div>
            )}
        </div>
    );
});