import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CurrencySelect.module.scss';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { Country } from '../../model/types/country';
import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/ListBox/ListBox';

interface CountrySelectProps {
    className?: string,
    value?: Country,
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    {value: Country.Russia, content: Country.Russia},
    {value: Country.UK, content: Country.UK},
    {value: Country.US, content: Country.US},
];

export const CountrySelect = memo((props: CountrySelectProps) => {
    const { t } = useTranslation('profile');
    const {
        className,
        value,
        onChange,
        readonly
    } = props;

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    // return (
    //     <Select 
    //         className={classNames('', {}, [className])} 
    //         label={t('country')}
    //         options={options}
    //         value={value}
    //         onChange={onChangeHandler}
    //         readonly={readonly}
    //     />
    // );

    return (
        <ListBox
            label={t('country')} 
            onChange={onChangeHandler} 
            value={value}
            items={options}
            defaultValue={t('input_country')}
            className={className}
            readonly={readonly}
            direction={'top'}
        />
    );
});