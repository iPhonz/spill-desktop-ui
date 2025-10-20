import type { Meta, StoryObj } from '@storybook/react';
import { SidebarNav } from '../components/sidebar/SidebarNav';

const meta = {
  title: 'Sidebar/SidebarNav',
  component: SidebarNav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '260px' }} className="bg-sidebar-bg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    isMobile: false,
  },
};

export const Mobile: Story = {
  args: {
    isMobile: true,
    onClose: () => console.log('Close clicked'),
  },
};