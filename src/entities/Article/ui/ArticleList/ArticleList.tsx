import { Article, ArticleView } from '../../model/types/article';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { AutoSizer, List, ListRowProps, WindowScroller } from 'react-virtualized';
import { PAGE_ID } from 'widgets/Page/Page';

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

    const isBig = view === ArticleView.BIG;
    const itemsPerRow = isBig ? 1 : 3;
    const rowCount = isBig ? articles.length : articles.length / itemsPerRow;

    const rowRenderer = ({ index, isScrolling, key, style }: ListRowProps) => {
        const items = [];
        const fromIndex = index * itemsPerRow;
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

        for (let i = fromIndex; i < toIndex; i++) {
            items.push(
                <ArticleListItem
                    article={articles[i]}
                    view={view}
                    className={cls.card}
                    target={target}
                    key={`str${i}`}
                />
            );
        }

        return (
            <div
                key={key}
                style={style}
                className={cls.row}
            >
                {items}
            </div>
        );
    };

    // const renderArticle = (article: Article) => {
    //     return (
    //         <ArticleListItem
    //             article={article}
    //             view={view}
    //             className={cls.card}
    //             key={article.id}
    //             target={target}
    //         />
    //     );
    // };

    if (!isLoading && !articles.length) {
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
        // <div className={classNames('', {}, [className, cls[view]])}>
        //     {articles.length > 0
        //         ? articles.map(renderArticle)
        //         : null
        //     }
        //     {isLoading && (
        //         <div className={classNames('', {}, [className, cls[view]])}>
        //             {
        //                 new Array(view === ArticleView.SMALL ? 9 : 3)
        //                     .fill(0)
        //                     .map((item, index) => (
        //                         <ArticleListItemSkeleton
        //                             view={view}
        //                             key={index}
        //                             className={cls.card}
        //                         />
        //                     ))
        //             }
        //         </div>
        //     )}
        // </div>
        <WindowScroller
            onScroll={() => console.log('scroll')}
            scrollElement={document.getElementById(PAGE_ID) as Element}
        >
            {({ width, height, registerChild, onChildScroll, scrollTop, isScrolling }) => (
                <div className={classNames('', {}, [className, cls[view]])} ref={registerChild}>
                    <List
                        height={height ?? 700}
                        rowCount={rowCount}
                        rowHeight={isBig ? 700 : 330}
                        rowRenderer={rowRenderer}
                        width={width ? width - 80 : 700}
                        autoHeight
                        onScroll={onChildScroll}
                        isScrolling={isScrolling}
                        scrollTop={scrollTop}
                    />
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
            )}
        </WindowScroller>
    );
});