import { ButtonHTMLAttributes, ForwardedRef, forwardRef, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';
export type ButtonSize = 'size_m' | 'size_l' | 'size_xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    variant?: ButtonVariant,
    square?: boolean,
    size?: ButtonSize,
    children?: ReactNode,
    addonLeft?: ReactNode,
    addonRight?: ReactNode,
    fullWidth?: boolean;
    color?: ButtonColor;
}

export const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
        className,
        children,
        variant = 'outline',
        square,
        disabled,
        size = 'size_m',
        addonLeft,
        addonRight,
        fullWidth,
        color = 'normal',
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
        [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight)
    };

    return (

        <button
            className={classNames(cls.Button, mods, [className, cls[variant], cls[size], cls[color]])}
            disabled={disabled}
            ref={ref}
            {...otherProps}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            {children}
            <div className={cls.addonRight}>{addonRight}</div>
        </button>

    );
});