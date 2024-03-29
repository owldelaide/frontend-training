import { ArticleImageBlock } from '../../model/types/article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleImageBlockComponent.module.scss';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames('', {}, [className])}>
            <img src={block.src} className={cls.img} />
            {block.title && (

                <ToggleFeatures
                    feature='isAppRedesigned'
                    off={
                        <TextDeprecated
                            text={block.title}
                            align={TextAlign.CENTER}
                        />
                    }
                    on={
                        <Text
                            text={block.title}
                            align='center'
                        />
                    }
                />
            )}
        </div>
    );
});