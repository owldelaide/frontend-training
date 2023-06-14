import { getUserAuthData } from '@/entities/User';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/ProfileSlice';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('profile');
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <HStack
            justify='between'
            className={classNames('', {}, [className])}
            max
        >
            <Text title={t('profile')} />
            {canEdit && (
                <>
                    {readonly ? (
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onEdit}
                            data-testid={'EditableProfileCardHeader.EditButton'}
                        >
                            {t('edit')}
                        </Button>
                    ) : (
                        <HStack gap='8'>
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={onCancelEdit}
                                data-testid={'EditableProfileCardHeader.CancelButton'}
                            >
                                {t('cancel')}
                            </Button>
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onSave}
                                data-testid={'EditableProfileCardHeader.SaveButton'}
                            >
                                {t('save')}
                            </Button>
                        </HStack>
                    )}
                </>
            )}
        </HStack>
    );
});