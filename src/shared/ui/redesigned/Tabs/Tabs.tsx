import { memo, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '../../redesigned/Card/Card';
import cls from './Tabs.module.scss';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
    const { className, onTabClick, tabs, value, direction = 'row' } = props;
    const { t } = useTranslation();

    const clickHandle = useCallback((tab: TabItem) => {
        return () => {
            onTabClick(tab);
        };
    }, [onTabClick]);

    return (
        <Flex
            className={classNames(cls.tabs, {}, [className])}
            direction={direction}
            gap='8'
            align='start'
        >
            {tabs.map(tab => (
                <Card
                    className={cls.tab}
                    key={tab.value}
                    variant={tab.value === value ? 'light' : 'normal'}
                    onClick={clickHandle(tab)}
                    border='round'
                >
                    {tab.content}
                </Card>
            ))}
        </Flex>
    );
});