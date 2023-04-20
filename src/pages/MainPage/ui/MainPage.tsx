import { RatingCard } from '@/entities/Rating';
import { Page } from '@/widgets/Page/Page';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
    const {t} = useTranslation('article');

    return (
        <Page>
            {t('main')}
            <RatingCard 
                title={t('what_about_article')}
                feedbackTitle={t('leave_feedback')}
                hasFeedback
            />     
        </Page>
    );
};

export default MainPage;