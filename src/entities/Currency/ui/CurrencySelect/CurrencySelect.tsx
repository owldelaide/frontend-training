import { useTranslation } from 'react-i18next';
import { Currency } from '../../model/types/currency';
import { memo, useCallback } from 'react';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface CurrencySelectProps {
    className?: string,
    value?: Currency,
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.GBP, content: Currency.GBP },
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD }
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

    const listProps = {
        label: t('currency'),
        onChange: onChangeHandler,
        value,
        items: options,
        defaultValue: t('input_currency'),
        className,
        readonly,
        direction: 'top right' as const,
    };

    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            off={
                <ListBoxDeprecated
                    {...listProps}
                />
            }
            on={
                <ListBox
                    {...listProps}
                />
            }
        />

    );
});