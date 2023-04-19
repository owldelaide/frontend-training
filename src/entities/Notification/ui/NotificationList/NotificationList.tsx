import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotificationList.module.scss';
import { useNotifications } from '../../api/notificationApi';
import { VStack } from 'shared/ui/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton/Skeleton';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 5000,
    });

    if(isLoading) {
        return (
            <VStack
                gap='16'
                className={classNames(cls.notificationList, {}, [className])}
                max
            >
                <Skeleton width={'100%'} border={'8px'} height={'80px'}/>
                <Skeleton width={'100%'} border={'8px'} height={'80px'}/>
                <Skeleton width={'100%'} border={'8px'} height={'80px'}/>
                <Skeleton width={'100%'} border={'8px'} height={'80px'}/>
            </VStack>            
        );
    }

    return (
        <VStack
            gap='16'
            className={classNames(cls.notificationList, {}, [className])}
            max
        >
            {data?.map(item => (
                <NotificationItem
                    key={item.id}
                    item={item}
                />
            ))}
        </VStack>
    );
});