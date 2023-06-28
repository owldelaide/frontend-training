import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { Button, ButtonSize, ButtonTheme } from '../../../../shared/ui/deprecated/Button/Button';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface SidebarProps {
    className?: string,
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSelector(getSidebarItems);

    const onToggle = () => {
        console.log(collapsed);
        setCollapsed(prev => !prev);
    };

    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            off={
                <aside
                    data-testid='sidebar'
                    className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
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
                    <VStack role='navigation' className={cls.items} gap='16'>
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
            on={
                <aside
                    data-testid='sidebar'
                    className={classNames(cls.SidebarRedesigned, { [cls.collapsedRedesigned]: collapsed }, [])}
                >
                    <AppLogo className={cls.appLogo} size={collapsed ? 30 : 50} />
                    <VStack role="navigation" gap="8" className={cls.items}>
                        {sidebarItemsList.map((item) => (
                            <SidebarItem
                                item={item}
                                collapsed={collapsed}
                                key={item.path}
                            />
                        ))}
                    </VStack>
                    <Icon
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        className={cls.collapsedBtn}
                        Svg={ArrowIcon}
                        clickable
                    />
                    <div className={cls.switchers}>
                        <ThemeSwitcher />
                        <LangSwitcher short={collapsed} className={cls.lang} />
                    </div>
                </aside>}
        />
    );
});