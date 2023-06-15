import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useArticlesFilters } from '../../lib/hooks/useArticleFilters';

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo((props: ViewSelectorContainerProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { view, onChangeView } = useArticlesFilters();

    return (
        <ArticleViewSelector
            className={className}
            view={view}
            onViewClick={onChangeView}
        />
    );
});