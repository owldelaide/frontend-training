import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/deprecated/Drawer';

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
        <>
            <Text title={feedbackTitle} />
            <Input
                placeholder={t('your_feedback')}
                value={feedback}
                onChange={setFeedback}
                data-testid='RatingCard.Input'
            />
        </>
    );

    return (
        <Card className={classNames('', {}, [className])} max data-testid='RatingCard'>
            <VStack align='center' gap='8'>
                <Text
                    title={starsCount ? t('thanks_for_rate') : title}
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
                        <HStack gap='16' justify='end'>
                            <Button
                                onClick={cancelHandle}
                                theme={ButtonTheme.OUTLINE_RED}
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
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} onClose={cancelHandle}>
                    <VStack gap='32'>
                        {modalContent}
                        <Button onClick={acceptHandle} size={ButtonSize.L}>{t('send')}</Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    );
});