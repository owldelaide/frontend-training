import { CSSProperties, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import UserIcon from '../../../assets/icons/user-filled.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../../redesigned/Skeleton';
import { AppImage } from '../../redesigned/AppImage';

interface AvatarProps {
    className?: string,
    src?: string,
    size?: number,
    alt?: string,
    fallbackInverted?: boolean,
}

/**
 * Устарел, используем новые компоненты
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        size = 100,
        alt,
        fallbackInverted
    } = props;

    const styles = useMemo<CSSProperties>(() => {
        return {
            height: size,
            width: size
        };
    }, [size]);

    const errorFallback = <Icon inverted={fallbackInverted} Svg={UserIcon} width={size} height={size} />;
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