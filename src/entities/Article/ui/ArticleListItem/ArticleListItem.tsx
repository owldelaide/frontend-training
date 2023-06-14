import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Text } from '@/shared/ui/deprecated/Text';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleBlockType, ArticleView } from '../../model/consts/articleConsts';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleListItem.module.scss';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view,
        target
    } = props;
    const { t } = useTranslation('article');

    const types = <Text text={article.type.join(', ')} className={cls.types} />;
    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
        </>
    );
    const skeletonWidth = view === ArticleView.BIG ? '100%' : 200;
    const skeletonHeight = view === ArticleView.BIG ? 250 : 200;
    const image = <AppImage
        fallback={<Skeleton width={skeletonWidth} height={skeletonHeight} />}
        src={article.img}
        className={cls.img}
        alt={article.title}
    />;

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(block => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;

        return (
            <div className={classNames('', {}, [className, cls[view]])} data-testid="ArticleListItem">
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={cls.username} />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <Text title={article.title} className={cls.title} />
                    {types}
                    {image}
                    {textBlock && (
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
                    )}
                    <div className={cls.footer}>
                        <AppLink to={getRouteArticleDetails(article.id)} target={target}>
                            <Button>
                                {t('read_more')}
                            </Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <AppLink
            target={target}
            className={classNames('', {}, [className, cls[view]])}
            to={getRouteArticleDetails(article.id)}
            data-testid="ArticleListItem"
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    {image}
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text title={article.title} className={cls.title} />
            </Card>
        </AppLink>
    );
});