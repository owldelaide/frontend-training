import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { Button, ButtonSize, ButtonTheme } from '../../../../shared/ui/deprecated/Button/Button';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/deprecated/AppLogo';

interface SidebarProps {
    className?: string,
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSelector(getSidebarItems);
    const onToggle = () => {
        setCollapsed(prev => !prev);
    };

    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            off={<aside
                data-testid='sidebar'
                className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [])}
            >
                <Button
                    data-testid='sidebar-toggle'
                    onClick={onToggle}
                    className={cls.collapsedBtn}
                    theme={ButtonTheme.BACKGROUND_INVERTED}
                    square
                    size={ButtonSize.L}
                >
                    {collapsed ? '>' : '<'}
                </Button>
                <VStack role='navigation' className={cls.items} gap='8'>
                    {sidebarItemsList.map((item) => (
                        <SidebarItem
                            item={item}
                            collapsed={collapsed}
                            key={item.path}
                        />
                    ))}
                </VStack>
                <div className={cls.switchers}>
                    <ThemeSwitcher />
                    <LangSwitcher
                        className={cls.lang}
                        short={collapsed}
                    />
                </div>
            </aside>}
            on={<aside
                data-testid='sidebar'
                className={classNames(cls.SidebarRedesigned, { [cls.collapsed]: collapsed }, [])}
            >
                <AppLogo className={cls.appLogo} />
            </aside>}
        />
    );
});