import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotificationButton.module.scss';
import { Popover } from 'shared/ui/Popups';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { NotificationList } from 'entities/Notification';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;

    return (
        <Popover
            className={classNames('', {}, [className])}
            trigger={
                <Button theme={ButtonTheme.CLEAR}>
                    <Icon Svg={NotificationIcon} inverted />
                </Button>
            }
            direction='bottom left'
        >
            <NotificationList
                className={cls.notifications}
            />
        </Popover>
    );
});