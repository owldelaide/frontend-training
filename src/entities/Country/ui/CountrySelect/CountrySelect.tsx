import { useTranslation } from 'react-i18next';
import { Country } from '../../model/types/country';
import { memo, useCallback } from 'react';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface CountrySelectProps {
    className?: string,
    value?: Country,
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    { value: Country.Russia, content: Country.Russia },
    { value: Country.UK, content: Country.UK },
    { value: Country.US, content: Country.US },
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


    const listProps = {
        label: t('country'),
        onChange: onChangeHandler,
        value,
        items: options,
        defaultValue: t('input_country'),
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