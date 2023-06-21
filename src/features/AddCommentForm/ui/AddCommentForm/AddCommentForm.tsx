import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModalLoader/DynamicModalLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { getAddCommentFormError, getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation('article');
    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

    const onSentHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');

    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <ToggleFeatures
                feature='isAppRedesigned'
                off={
                    <HStack max gap='8' className={classNames(cls.addCommentForm, {}, [className])} data-testid='AddCommentForm'>
                        <InputDeprecated
                            placeholder={t('type_comment')}
                            value={text}
                            onChange={onCommentTextChange}
                            className={cls.input}
                            data-testid='AddCommentForm.Input'
                        />
                        <ButtonDeprecated
                            onClick={onSentHandler}
                            data-testid='AddCommentForm.SendButton'
                        >
                            {t('send')}
                        </ButtonDeprecated>
                    </HStack>
                }
                on={
                    <Card padding='24' max border='partial'>
                        <HStack max gap='16' className={classNames(cls.addCommentFormRedesigned, {}, [className])} data-testid='AddCommentForm'>
                            <Input
                                placeholder={t('type_comment')}
                                value={text}
                                onChange={onCommentTextChange}
                                className={cls.input}
                                data-testid='AddCommentForm.Input'
                            />
                            <Button
                                onClick={onSentHandler}
                                data-testid='AddCommentForm.SendButton'
                            >
                                {t('send')}
                            </Button>
                        </HStack>
                    </Card>
                }
            />

        </DynamicModuleLoader>
    );
});

export default AddCommentForm;