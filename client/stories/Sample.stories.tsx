// YourComponent.stories.tsx

import { Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { SampleComponent } from '../components/Sample';

// This default export determines where your story goes in the story list
export default {
  title: 'SampleComponent',
  component: SampleComponent,
};

const Template: Story<ComponentProps<typeof SampleComponent>> = args => (
  <SampleComponent {...args} />
);

export const FirstStory = Template.bind({});
