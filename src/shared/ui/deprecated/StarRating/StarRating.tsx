import StarIcon from '@/shared/assets/icons/star.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useState } from 'react';
import { Icon as IconDeprecated } from '../Icon/Icon';
import cls from './StarRating.module.scss';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '../../redesigned/Icon';

interface StarRatingProps {
    className?: string;
    onSelect?: (starCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * Устарел, используем новые компоненты
 * @deprecated
 */
export const StarRating = memo((props: StarRatingProps) => {
    const { className, onSelect, selectedStars = 0, size = 30 } = props;

    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const onLeave = () => () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const isHovered = (starNumber: number) => {
        return currentStarsCount >= starNumber;
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div className={classNames(
            toggleFeatures({
                name: 'isAppRedesigned',
                on: () => cls.StarRatingRedesigned,
                off: () => cls.StarRating
            }),
            {},
            [className]
        )}>
            {stars.map((starNumber) => {
                const commonProps = {
                    Svg: StarIcon,
                    key: starNumber,
                    className: classNames(
                        cls.starIcon,
                        { [cls.isSelected]: isSelected },
                        [isHovered(starNumber) ? cls.hovered : cls.normal]
                    ),
                    width: size,
                    height: size,
                    onMouseEnter: onHover(starNumber),
                    onMouseLeave: onLeave,
                    onClick: onClick(starNumber),
                    'data-testid': `StarRating.${starNumber}`,
                    'data-selected': currentStarsCount >= starNumber
                };
                return (
                    <ToggleFeatures
                        feature='isAppRedesigned'
                        off={<Icon clickable={!isSelected} {...commonProps} />}
                        on={<IconDeprecated {...commonProps} />}
                    />
                );
            })}
        </div>
    );
});