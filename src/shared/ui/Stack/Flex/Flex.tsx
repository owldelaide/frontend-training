import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32';

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    between: cls.justifyBetween,
    end: cls.justifyEnd
};

const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd
};

const directionClasses: Record<FlexDirection, string> = {
    column: cls.directionColumn,
    row: cls.directionRow
};

const gapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    32: cls.gap32,
};

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
    className?: string;
    children: ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    gap?: FlexGap;
    max?: boolean;
}

export const Flex = (props: FlexProps) => {
    const { 
        className, 
        children,
        align = 'center',
        direction = 'row',
        justify = 'start',
        gap,
        max
    } = props;

    const classes = [
        className,
        justifyClasses[justify],
        directionClasses[direction],
        alignClasses[align],
        gap && gapClasses[gap]
    ];

    const mods: Mods = {
        [cls.max]: max
    };

    return (
        <div className={classNames(cls.flex, mods, classes)}>
            {children}
        </div>
    );
};