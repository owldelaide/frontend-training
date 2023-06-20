import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { getFeatureFlags, updateFeatureFlag } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const isAppRedesigned = getFeatureFlags('isAppRedesigned');
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const [isLoading, setIsLoading] = useState(false);

    const items = [
        {
            content: t('newDesign'),
            value: 'newDesign'
        },
        {
            content: t('oldDesign'),
            value: 'oldDesign'
        }
    ];

    const onChange = async (value: string) => {
        if (authData) {
            setIsLoading(true);
            await dispatch(updateFeatureFlag({
                userId: authData?.id,
                newFeatures: {
                    isAppRedesigned: value === 'newDesign' ? true : false
                }
            })).unwrap();
            setIsLoading(false);
        }
    };

    return (
        <HStack>
            <Text text={t('interface')} />
            {isLoading
                ? <Skeleton height={40} width={150} />
                : <ListBox
                    value={isAppRedesigned ? 'newDesign' : 'oldDesign'}
                    items={items}
                    onChange={onChange}
                    className={className}
                />
            }

        </HStack>
    );
});