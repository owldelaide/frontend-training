import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types';
import { Select, SelectOption } from '@/shared/ui/Select/Select';
import { ArticleSortField } from '../../model/consts/articleConsts';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const { className, onChangeOrder, onChangeSort, order, sort } = props;
    const { t } = useTranslation('article');

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('asc')
        },
        {
            value: 'desc',
            content: t('desc')
        }
    ], [t]);

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: t('by_created')
        },
        {
            value: ArticleSortField.TITLE,
            content: t('by_title')
        },
        {
            value: ArticleSortField.VIEWS,
            content: t('by_views')
        },
    ], [t]);
    
    return (
        <div className={classNames(cls.articleSortSelector, {}, [className])}>
            <Select
                label={t('sort_by')}
                options={sortFieldOptions}
                value={sort}
                onChange={onChangeSort}
            />
            <Select
                label={t('order_by')}
                options={orderOptions}
                value={order}
                onChange={onChangeOrder}
                className={cls.order}
            />
        </div>
    );
});