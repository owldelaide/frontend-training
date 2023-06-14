import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Notification } from '../../model/types/notifications';
import cls from './NotificationItem.module.scss';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

interface NotificationItemProps {
    className?: string;
    item: Notification
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <ToggleFeatures
            feature='isAppRedesigned'
            off={
                <CardDeprecated
                    className={classNames(cls.notificationItem, {}, [className])}
                    theme={CardTheme.OUTLINED}
                >
                    <TextDeprecated
                        title={item.title}
                        text={item.description}
                    />
                </CardDeprecated>
            }
            on={
                <Card
                    className={classNames(cls.notificationItem, {}, [className])}
                    variant='normal'
                >
                    <Text
                        title={item.title}
                        text={item.description}
                    />
                </Card>
            }
        />
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