import { ArticleList } from '@/entities/Article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const { isLoading, data: articles, error } = useArticleRecommendationsList(3);

    if (isLoading || error || !articles) {
        return null;
    }

    return (
        <VStack gap={'8'} className={classNames('', {}, [className])} data-testid='ArticleRecommendationsList'>
            <ToggleFeatures
                feature='isAppRedesigned'
                off={
                    <TextDeprecated
                        text={t('recommended')}
                        size={TextSize.L}
                    />
                }
                on={
                    <Text
                        text={t('recommended')}
                        size='l'
                    />
                }
            />
            <ArticleList
                articles={articles}
                target={'_blank'}
            />
        </VStack>
    );
});