import { useTranslation } from 'react-i18next';
import { Currency } from '@/entities/Currency';
import { Mods } from '@/shared/lib/classNames/classNames';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';
import { Country } from '@/entities/Country';
import { ToggleFeatures } from '@/shared/lib/features';
import { ProfileCardDeprecated, ProfileCardDeprecatedError, ProfileCardDeprecatedLoader } from '../ProfileCardDeprecated/ProfileCardDeprecated';
import { ProfileCardRedesigned, ProfileCardRedesignedError, ProfileCardRedesignedSkeleton } from '../ProfileCardRedesigned/ProfileCardRedesigned';

export interface ProfileCardProps {
    className?: string,
    data?: Profile,
    error?: string,
    isLoading?: boolean,
    readonly?: boolean,
    onChangeFirstname?: (value?: string) => void,
    onChangeLastname?: (value?: string) => void,
    onChangeAge?: (value?: string) => void,
    onChangeCity?: (value?: string) => void,
    onChangeUsername?: (value?: string) => void,
    onChangeAvatar?: (value?: string) => void,
    onChangeCurrency?: (currency: Currency) => void,
    onChangeCountry?: (country: Country) => void,
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        error,
        isLoading,
        readonly,
    } = props;
    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <ToggleFeatures
                feature='isAppRedesigned'
                on={
                    <ProfileCardRedesignedSkeleton />
                }
                off={
                    <ProfileCardDeprecatedLoader />
                }
            />
        );
    }

    if (error) {
        return (
            <ToggleFeatures
                feature='isAppRedesigned'
                on={
                    <ProfileCardRedesignedError />
                }
                off={
                    <ProfileCardDeprecatedError />
                }
            />
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            off={
                <ProfileCardDeprecated {...props} />
            }
            on={
                <ProfileCardRedesigned {...props} />
            }
        />
    );
};