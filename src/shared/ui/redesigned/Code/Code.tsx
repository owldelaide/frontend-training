import { memo, useCallback } from 'react';
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import CopyIconNew from '@/shared/assets/icons/copy.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '../../deprecated/Button/Button';
import cls from './Code.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '../Icon';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            off={
                <pre className={classNames(cls.Code, {}, [className])}>
                    <Button
                        className={cls.copyBtn}
                        theme={ButtonTheme.CLEAR}
                        onClick={onCopy}
                    >
                        <CopyIcon
                            className={cls.copyIcon}
                        />
                    </Button>
                    <code> {text} </code>
                </pre>
            }
            on={
                <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
                    <Icon
                        className={cls.copyBtn}
                        clickable
                        onClick={onCopy}
                        Svg={CopyIconNew}
                    />
                    <code> {text} </code>
                </pre>
            }
        />
    );
});