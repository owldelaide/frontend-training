import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { PAGE_ID } from 'widgets/Page/Page';
import { Article } from '../../model/types/article';
import { ArticleView } from 'entities/Article/model/consts/articleConsts';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    virtualized?: boolean;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL,
        target,
        virtualized = true,
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
        // @ts-ignore
        <WindowScroller
            onScroll={() => console.log('scroll')}
            scrollElement={document.getElementById(PAGE_ID) as Element}
        >
            {({ width, height, registerChild, onChildScroll, scrollTop, isScrolling }) => (
                // @ts-ignore
                <div className={classNames('', {}, [className, cls[view]])} ref={registerChild}>
                    {virtualized 
                    ? (
                        // @ts-ignore
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
                    )
                    : (
                        articles.map(item=>(
                            <ArticleListItem
                                article={item}
                                view={view}
                                className={cls.card}
                                target={target}
                                key={item.id}
                            />
                        ))
                    )
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
            )}
        </WindowScroller>
    );
});