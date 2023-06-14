import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCanEditArticle } from '../../model/selectors/articles';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);
    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article.id));
        }
    }, [article, navigate]);

    return (
        <HStack max justify='between' className={classNames('', {}, [className])}>
            <Button onClick={onBackToList}>
                {t('back_to_list')}
            </Button>
            {canEdit && (
                <Button
                    onClick={onEditArticle}
                >
                    {t('edit')}
                </Button>
            )}
        </HStack>
    );
});