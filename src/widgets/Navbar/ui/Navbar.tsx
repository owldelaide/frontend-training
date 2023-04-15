import { getUserAuthData, isUserAdmin, isUserManager, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import cls from './Navbar.module.scss';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';

interface NavbarProps {
    className?: string,
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onOpenModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text
                    className={cls.appName}
                    title={t('owldelaide')}
                    theme={TextTheme.INVERTED}
                />
                <AppLink
                    to={RoutePath.article_create}
                    theme={AppLinkTheme.SECONDARY}
                >
                    {t('create_article')}
                </AppLink>
                <Dropdown
                    direction='bottom left'
                    className={cls.dropdown} 
                    items={[
                        ...(isAdminPanelAvailable ? [{
                            content: t('admin'),
                            href: RoutePath.admin_panel,
                        }] : []),
                        {
                            content: t('profile'),
                            href: RoutePath.profile + authData.id,
                        },
                        {
                            content: t('log_out'),
                            onClick: onLogout
                        },
                    ]} 
                    trigger={<Avatar size={30} src={authData.avatar} />} 
                />
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onOpenModal}
            >
                {t('log_in')}
            </Button>
            {isAuthModal && (<LoginModal
                isOpen={isAuthModal}
                onClose={onCloseModal}
            />)}
        </header>
    );
});

