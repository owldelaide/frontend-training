import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Notification } from '../../model/types/notifications';
import cls from './NotificationItem.module.scss';
import { Card, CardTheme } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';

interface NotificationItemProps {
    className?: string;
    item: Notification
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <Card
            className={classNames(cls.notificationItem, {}, [className])}
            theme={CardTheme.OUTLINED}
        >
            <Text
                title={item.title}
                text={item.description}
            />
        </Card>
    );

    if (item.href) {
        return (
            <a target='_blank' href={item.href} rel='noreferrer' className={cls.link}>
                {content}
            </a>
        );
    }

    return content;
});