import { ArticleList } from '@/entities/Article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const { isLoading, data: articles, error } = useArticleRecommendationsList(4);

    if (isLoading || error || !articles) {
        return null;
    }

    return (
        <VStack gap={'8'} className={classNames('', {}, [className])} data-testid='ArticleRecommendationsList'>
            <Text
                text={t('recommended')}
                size={TextSize.L}
            />
            <ArticleList
                articles={articles}
                target={'_blank'}
            />
        </VStack>
    );
});