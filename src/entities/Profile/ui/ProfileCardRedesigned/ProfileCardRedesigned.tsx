import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

export const ProfileCardRedesignedSkeleton = () => {
    return (
        <Card max padding='24'>
            <VStack gap='32'>
                <HStack max justify='center'>
                    <Skeleton border={'100%'} width={128} height={128} />
                </HStack>
                <HStack gap='32' max>
                    <VStack gap='16' max>
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                    </VStack>
                    <VStack gap='16' max>
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                    </VStack>
                </HStack>
            </VStack>
        </Card >
    );
};

export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation('profile');

    return (
        <HStack justify='center' max>
            <Text
                variant='error'
                title={t('loading_error')}
                text={t('refresh_page')}
                align='center'
            />
        </HStack >
    );
};

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
    const {
        className,
        data,
        error,
        isLoading,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCurrency,
        onChangeCountry
    } = props;
    const { t } = useTranslation('profile');

    return (
        <Card max className={classNames('', {}, [className])} padding='24' >
            <VStack gap='32'>
                {data?.avatar && (
                    <HStack justify='center' max>
                        <Avatar src={data?.avatar} size={128} />
                    </HStack>
                )}
                <HStack gap='24' max>
                    <VStack gap='16' max>
                        <Input
                            value={data?.firstName}
                            label={t('firstname')}
                            onChange={onChangeFirstname}
                            readonly={readonly}
                            data-testid={'ProfileCard.firstname'}
                        />
                        <Input
                            value={data?.lastName}
                            label={t('lastname')}
                            onChange={onChangeLastname}
                            readonly={readonly}
                            data-testid={'ProfileCard.lastname'}

                        />
                        <Input
                            value={data?.age}
                            label={t('age')}
                            onChange={onChangeAge}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.city}
                            label={t('city')}
                            onChange={onChangeCity}
                            readonly={readonly}
                        />
                    </VStack>
                    <VStack gap='16' max>
                        <Input
                            value={data?.username}
                            label={t('username')}
                            onChange={onChangeUsername}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.avatar}
                            label={t('avatar')}
                            onChange={onChangeAvatar}
                            readonly={readonly}
                        />
                        <CurrencySelect
                            value={data?.currency}
                            onChange={onChangeCurrency}
                            readonly={readonly}
                        />
                        <CountrySelect
                            value={data?.country}
                            onChange={onChangeCountry}
                            readonly={readonly}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card >
    );
});