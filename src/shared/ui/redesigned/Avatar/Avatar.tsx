import { CSSProperties, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import UserIcon from '../../../assets/icons/user-filled.svg';
import { Icon } from '../Icon';
import { AppImage } from '../../redesigned/AppImage';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
    className?: string,
    src?: string,
    size?: number,
    alt?: string,
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        size = 100,
        alt,
    } = props;

    const styles = useMemo<CSSProperties>(() => {
        return {
            height: size,
            width: size
        };
    }, [size]);

    const errorFallback = <Icon Svg={UserIcon} width={size} height={size} />;
    const fallback = <Skeleton width={size} height={size} border='50%' />;

    return (
        <AppImage
            src={src}
            style={styles}
            alt={alt}
            fallback={fallback}
            errorFallback={errorFallback}
            className={classNames(cls.Avatar, {}, [className])}
        />
    );
};