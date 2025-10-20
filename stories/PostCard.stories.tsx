import type { Meta, StoryObj } from '@storybook/react';
import { PostCard } from '../components/feed/PostCard';

const meta = {
  title: 'Feed/PostCard',
  component: PostCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    post: {
      id: '1',
      author: {
        name: 'Sarah Chen',
        avatar: '👤',
        verified: true,
      },
      timestamp: '2h',
      content:
        "Just finished reading the most fascinating article about the intersection of AI and creative communities. The future of social platforms isn't just about connections—it's about cultivating spaces where authentic voices can thrive without algorithmic manipulation.\n\nWhat makes a platform truly \"culture-first\" in 2025?",
      actions: { likes: 234, comments: 67, reposts: 45, shares: 12 },
    },
  },
};

export const UnverifiedUser: Story = {
  args: {
    post: {
      id: '2',
      author: {
        name: 'Jasmine Lee',
        avatar: '👤',
        verified: false,
      },
      timestamp: '6h',
      content:
        "Hot take: The best social platforms are the ones you don't feel anxious opening. If your app makes me feel worse about myself or the world, I'm out. Give me thoughtful conversations over viral rage any day.",
      actions: { likes: 456, comments: 91, reposts: 67, shares: 23 },
    },
  },
};

export const ShortContent: Story = {
  args: {
    post: {
      id: '3',
      author: {
        name: 'Marcus Williams',
        avatar: '👤',
        verified: true,
      },
      timestamp: '4h',
      content: "Real safety means protecting communities, not just policing keywords.",
      actions: { likes: 89, comments: 12, reposts: 8, shares: 3 },
    },
  },
};