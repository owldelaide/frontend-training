import { Counter } from '@/entities/Counter';
import { Page } from '@/widgets/Page';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
    const { t } = useTranslation('article');

    return (
        <Page>
            {t('main')}
            <Counter />
        </Page>
    );
};

export default MainPage;