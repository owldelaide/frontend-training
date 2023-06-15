import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { Input } from '@/shared/ui/redesigned/Input';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    search: string;
    type: ArticleType;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeSearch: (value: string) => void;
    onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
    const {
        className,
        onChangeOrder,
        onChangeSort,
        order,
        sort,
        type,
        onChangeType,
        search,
        onChangeSearch
    } = props;
    const { t } = useTranslation('article');

    return (
        <Card className={classNames(cls.articlesFilters, {}, [className])} padding='24'>
            <VStack gap='32'>
                <Input
                    placeholder={t('search')}
                    value={search}
                    onChange={onChangeSearch}
                    addonLeft={<Icon Svg={SearchIcon} />}
                />
                <ArticleTypeTabs
                    value={type}
                    onChangeType={onChangeType}
                    className={cls.tabs}
                />
                <ArticleSortSelector
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                    order={order}
                    sort={sort}
                />
            </VStack>
        </Card>
    );
});