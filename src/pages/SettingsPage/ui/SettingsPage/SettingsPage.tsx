import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';
import { ToggleFeatures } from '@/shared/lib/features';

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Page>
            <ToggleFeatures
                feature='isAppRedesigned'
                off={
                    <VStack max gap='16'>
                        <TextDeprecated title={t('settings')} />
                        <UiDesignSwitcher />
                    </VStack>
                }
                on={
                    <VStack max gap='16'>
                        <Text title={t('settings')} />
                        <UiDesignSwitcher />
                    </VStack>
                }
            />
        </Page>
    );
});

export default SettingsPage;