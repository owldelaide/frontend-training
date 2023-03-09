import { CSSProperties, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string,
    src?: string,
    size?: number,
    alt?: string
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        size,
        alt
    } = props;

    const styles = useMemo<CSSProperties>(() => {
        return {
            height: size,
            width: size
        };
    }, [size]);

    return (
        <img 
            src={src}
            style={styles}
            alt={alt}
            className={classNames(cls.Avatar, {}, [className])}
        />
    );
};