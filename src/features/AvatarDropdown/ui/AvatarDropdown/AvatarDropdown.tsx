import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User';
import { getRouteAdmin, getRouteProfile, getRouteSettings } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const authData = useSelector(getUserAuthData);

    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const isAdminPanelAvailable = isAdmin || isManager;
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (!authData) {
        return null;
    }

    const items = [
        ...(isAdminPanelAvailable ? [{
            content: t('admin'),
            href: getRouteAdmin(),
        }] : []),
        {
            content: t('profile'),
            href: getRouteProfile(authData.id),
        },
        {
            content: t('settings'),
            href: getRouteSettings(),
        },
        {
            content: t('log_out'),
            onClick: onLogout
        },
    ];

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Dropdown
                    className={classNames('', {}, [className])}
                    direction='bottom left'
                    items={items}
                    trigger={<Avatar size={40} src={authData.avatar} />}
                />
            }
            off={
                <DropdownDeprecated
                    className={classNames('', {}, [className])}
                    direction='bottom left'
                    items={items}
                    trigger={<AvatarDeprecated size={30} src={authData.avatar} fallbackInverted />}
                />
            }
        />
    );
});