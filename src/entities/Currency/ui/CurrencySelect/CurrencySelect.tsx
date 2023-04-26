import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CurrencySelect.module.scss';
import { useTranslation } from 'react-i18next';
import { Select } from '@/shared/ui/Select';
import { Currency } from '../../model/types/currency';
import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/ui/Popups';

interface CurrencySelectProps {
    className?: string,
    value?: Currency,
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    {value: Currency.EUR, content: Currency.EUR},
    {value: Currency.GBP, content: Currency.GBP},
    {value: Currency.RUB, content: Currency.RUB},
    {value: Currency.USD, content: Currency.USD}
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const { t } = useTranslation('profile');
    const {
        className,
        value,
        onChange,
        readonly
    } = props;

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    // return (
    //     <Select 
    //         className={classNames('', {}, [className])} 
    //         label={t('currency')}
    //         options={options}
    //         value={value}
    //         onChange={onChangeHandler}
    //         readonly={readonly}
    //     />
    // );

    return (
        <ListBox
            label={t('currency')} 
            onChange={onChangeHandler} 
            value={value}
            items={options}
            defaultValue={t('input_currency')}
            className={className}
            readonly={readonly}
            direction={'top right'}

        />
    );
});