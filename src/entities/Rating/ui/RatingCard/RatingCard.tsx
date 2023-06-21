import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input } from '@/shared/ui/redesigned/Input';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button as ButtonDeprecated, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        feedbackTitle,
        hasFeedback,
        onAccept,
        onCancel,
        title,
        rate = 0
    } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback((selectedStartsCount: number) => {
        setStarsCount(selectedStartsCount);
        if (hasFeedback) {
            setIsModalOpen(true);
        }
        else {
            onAccept?.(selectedStartsCount);
        }
    }, [hasFeedback, onAccept]);

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <ToggleFeatures
            feature='isAppRedesigned'
            off={
                <>
                    <TextDeprecated title={feedbackTitle} />
                    <InputDeprecated
                        placeholder={t('your_feedback')}
                        value={feedback}
                        onChange={setFeedback}
                        data-testid='RatingCard.Input'
                    />
                </>
            }
            on={
                <>
                    <Text title={feedbackTitle} />
                    <Input
                        placeholder={t('your_feedback')}
                        value={feedback}
                        onChange={setFeedback}
                        data-testid='RatingCard.Input'
                    />
                </>
            }
        />
    );

    const content = (
        <>
            <VStack align='center' gap='8'>
                <ToggleFeatures
                    feature='isAppRedesigned'
                    off={
                        <TextDeprecated
                            title={starsCount ? t('thanks_for_rate') : title}
                        />
                    }
                    on={
                        <Text
                            title={starsCount ? t('thanks_for_rate') : title}
                        />
                    }
                />
                <StarRating
                    size={40}
                    onSelect={onSelectStars}
                    selectedStars={starsCount}
                />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack gap='32' max>
                        {modalContent}
                        <ToggleFeatures
                            feature='isAppRedesigned'
                            off={
                                <HStack gap='16' justify='end'>
                                    <ButtonDeprecated
                                        onClick={cancelHandle}
                                        theme={ButtonTheme.OUTLINE_RED}
                                        data-testid='RatingCard.Close'
                                    >
                                        {t('close')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        onClick={acceptHandle}
                                        data-testid='RatingCard.SendButton'
                                    >
                                        {t('send')}
                                    </ButtonDeprecated>
                                </HStack>
                            }
                            on={
                                <HStack gap='16' justify='end'>
                                    <Button
                                        onClick={cancelHandle}
                                        variant='outline'
                                        data-testid='RatingCard.Close'
                                    >
                                        {t('close')}
                                    </Button>
                                    <Button
                                        onClick={acceptHandle}
                                        data-testid='RatingCard.SendButton'
                                    >
                                        {t('send')}
                                    </Button>
                                </HStack>
                            }
                        />
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} onClose={cancelHandle}>
                    <VStack gap='32'>
                        {modalContent}
                        <ToggleFeatures
                            feature='isAppRedesigned'
                            off={<ButtonDeprecated onClick={acceptHandle} size={ButtonSize.L}>{t('send')}</ButtonDeprecated>}
                            on={<Button onClick={acceptHandle} size='size_l'>{t('send')}</Button>}
                        />
                    </VStack>
                </Drawer>
            </MobileView>
        </>
    );

    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            off={
                <CardDeprecated className={classNames('', {}, [className])} max data-testid='RatingCard'>
                    {content}
                </CardDeprecated>
            }
            on={
                <Card
                    className={classNames('', {}, [className])}
                    max
                    padding='24'
                    border='partial'
                    data-testid='RatingCard'
                >
                    {content}
                </Card>
            }
        />
    );
});