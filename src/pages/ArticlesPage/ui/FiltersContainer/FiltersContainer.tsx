import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useArticlesFilters } from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const {
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
        onChangeType,
        order,
        search,
        sort,
        type,
    } = useArticlesFilters();

    return (
        <ArticlesFilters
            className={className}
            order={order}
            search={search}
            sort={sort}
            type={type}
            onChangeOrder={onChangeOrder}
            onChangeSearch={onChangeSearch}
            onChangeSort={onChangeSort}
            onChangeType={onChangeType}
        />
    );
});