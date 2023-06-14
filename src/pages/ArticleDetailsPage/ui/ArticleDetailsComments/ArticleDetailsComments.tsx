import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { AddCommentForm } from '@/features/AddCommentForm';
import { CommentList } from '@/entities/Comment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getArticleComments } from '../../model/slices/ArticleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ArticleDetailsCommentsProps {
    className?: string;
    id?: string;
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleCommentsIsLoading);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    return (
        <VStack gap='8' max className={classNames('', {}, [className])}>
            <Text
                text={t('comments')}
                size={TextSize.L}
            />
            <AddCommentForm
                onSendComment={onSendComment}
            />
            <CommentList
                isLoading={isLoading}
                comments={comments}
            />
        </VStack>
    );
});