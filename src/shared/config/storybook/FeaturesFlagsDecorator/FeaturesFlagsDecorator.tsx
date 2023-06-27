import { setFeatureFlags } from '@/shared/lib/features';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { Story } from '@storybook/react';

export const FeaturesFlagsDecorator = (features: FeatureFlags) => (StoryComponent: Story) => {
    setFeatureFlags(features);

    return (
        <StoryComponent />
    );
};